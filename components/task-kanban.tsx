"use client";

import { useTaskContext } from "@/context/task-context";
import { TaskCard } from "./task-card";
import { Task, TaskCategory, TaskStatus } from "@/types";
import { Input } from "./ui/input";
import { useState } from "react";
import { 
  DndContext, 
  closestCorners,
  DragEndEvent,
  DragOverEvent, 
  DragOverlay, 
  DragStartEvent, 
  MouseSensor,
  TouchSensor,
  useSensor, 
  useSensors,
  useDroppable,
} from "@dnd-kit/core";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { TaskFilters } from "./task-filters";

// Status para as colunas do kanban
const TASK_STATUS = {
  PENDENTE: "pendente" as TaskStatus,
  EM_ANDAMENTO: "em_andamento" as TaskStatus,
  CONCLUIDA: "concluida" as TaskStatus
};

const getStatusLabel = (status: TaskStatus): string => {
  switch (status) {
    case TASK_STATUS.PENDENTE: return "Pendente";
    case TASK_STATUS.EM_ANDAMENTO: return "Em Andamento";
    case TASK_STATUS.CONCLUIDA: return "Concluída";
    default: return `Status: ${status}`;
  }
};

export function TaskKanban() {
  const { tasks, updateTask } = useTaskContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | 'todas'>('todas');
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeColumn, setActiveColumn] = useState<TaskStatus | null>(null);
  

  const filteredTasks = tasks.filter(task => {
    // Filtro de busca
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro de categoria
    const matchesCategory = selectedCategory === 'todas' || task.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const groupedTasks: Record<TaskStatus, Task[]> = {
    "pendente": filteredTasks.filter(task => task.status === TASK_STATUS.PENDENTE),
    "em_andamento": filteredTasks.filter(task => task.status === TASK_STATUS.EM_ANDAMENTO),
    "concluida": filteredTasks.filter(task => task.status === TASK_STATUS.CONCLUIDA),
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const taskId = String(active.id);
    const task = filteredTasks.find(t => t.id === taskId);
    
    if (task) {
      setActiveTask(task);
      setActiveColumn(task.status);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    
    if (!over || !activeTask) return;
    
    const overId = String(over.id);
    
    if (Object.values(TASK_STATUS).includes(overId as TaskStatus)) {
      if (activeColumn !== overId) {
        setActiveColumn(overId as TaskStatus);
      }
    } 
    else {
      const overTask = filteredTasks.find(t => t.id === overId);
      if (overTask && activeColumn !== overTask.status) {
        setActiveColumn(overTask.status);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;
    
    if (!over || !activeTask) {
      resetDragState();
      return;
    }

    const overId = String(over.id);
    let newStatus: TaskStatus | null = null;
    
    if (Object.values(TASK_STATUS).includes(overId as TaskStatus)) {
      newStatus = overId as TaskStatus;
    } 
    else {
      const overTask = filteredTasks.find(t => t.id === overId);
      if (overTask) {
        newStatus = overTask.status;
      }
    }
    
    if (newStatus && activeTask.status !== newStatus) {
      updateTask(activeTask.id, { status: newStatus });
      toast.success(`Tarefa movida para ${getStatusLabel(newStatus)}`);
    }
    
    resetDragState();
  };
  
  const resetDragState = () => {
    setActiveTask(null);
    setActiveColumn(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <Input
          placeholder="Buscar tarefa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        
        <TaskFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          showStatusFilter={false}
        />
      </div>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <KanbanColumn 
              key={status}
              id={status as TaskStatus}
              title={getStatusLabel(status as TaskStatus)} 
              tasks={tasks}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask && (
            <TaskCard 
              task={{
                ...activeTask,
                status: activeColumn || activeTask.status
              }}
              isKanban 
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

interface KanbanColumnProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}

function KanbanColumn({ id, title, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: id
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        bg-muted/40 p-4 rounded-md flex flex-col h-[calc(100vh-200px)] 
        overflow-hidden transition-colors duration-200
        ${isOver ? 'bg-muted/70 ring-2 ring-primary/20' : ''}
      `}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-sm">{title}</h3>
        <Badge variant="secondary" className="font-normal">
          {tasks.length}
        </Badge>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-3 p-0.5 min-h-[100px]">
        {tasks.length === 0 ? (
          <div className="text-muted-foreground text-center py-6 text-sm italic">
            Arraste tarefas para esta coluna
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              isKanban 
            />
          ))
        )}
      </div>
    </div>
  );
}