"use client";

import { useTaskContext } from "@/context/task-context";
import { TaskCard } from "./task-card";
import { TaskCategory, TaskStatus } from "@/types";
import { Input } from "./ui/input";
import { useState } from "react";
import { TaskFilters } from "./task-filters";

export function TaskList() {
  const { tasks } = useTaskContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | 'todas'>('todas');
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | 'todas'>('todas');
  
  const filteredTasks = tasks.filter(task => {
    // Filtro de busca
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro de categoria
    const matchesCategory = selectedCategory === 'todas' || task.category === selectedCategory;
    
    // Filtro de status
    const matchesStatus = selectedStatus === 'todas' || task.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

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
          showStatusFilter={true}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />
      </div>
      
      {filteredTasks.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Nenhuma tarefa encontrada</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}