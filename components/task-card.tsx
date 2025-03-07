"use client";

import { useState } from "react";
import { Task } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useTaskContext } from "@/context/task-context";
import { useCategoryContext } from "@/context/category-context";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { CheckIcon, MoreVerticalIcon, Pencil, Timer, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { TaskEditForm } from "./task-edit-form";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const categoryColors: Record<string, string> = {
  trabalho: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
  pessoal: "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100",
  estudos: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
  saude: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
  financas: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
  outros: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
};

const statusIcons: Record<string, React.ReactNode> = {
  pendente: <Timer className="h-4 w-4" />,
  em_andamento: <Pencil className="h-4 w-4" />,
  concluida: <CheckIcon className="h-4 w-4" />
};

interface TaskCardProps {
  task: Task;
  isKanban?: boolean;
}

export function TaskCard({ task, isKanban = false }: TaskCardProps) {
  const { updateTask, deleteTask } = useTaskContext();
  const { customCategories } = useCategoryContext();
  const [editModalOpen, setEditModalOpen] = useState(false);
  
  // Substituindo useSortable por useDraggable para simplificar
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging
  } = useDraggable({
    id: task.id,
    data: {
      task,
    }
  });

  const style = transform ? {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 'auto',
  } : undefined;
  
  const statusToLabel = {
    pendente: "Pendente",
    em_andamento: "Em Andamento",
    concluida: "Concluída"
  };

  const handleStatusChange = (status: "pendente" | "em_andamento" | "concluida") => {
    updateTask(task.id, { status });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  const isPastDue = () => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < today && task.status !== "concluida";
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Não abrir o modal se o card está sendo arrastado ou se o clique foi no dropdown
    if ((e.target as Element).closest('[data-no-edit]') || isDragging) {
      return;
    }
    setEditModalOpen(true);
  };

  // Função para obter a cor da categoria personalizada ou usar a cor padrão
  const getCategoryColor = () => {
    // Verificar se é uma categoria personalizada
    const customCategory = customCategories.find(cat => cat.value === task.category);
    
    if (customCategory) {
      // Se for uma categoria personalizada, retornar um objeto de estilo com a cor personalizada
      return {
        style: {
          backgroundColor: customCategory.color,
          color: getContrastColor(customCategory.color)
        },
        className: ''
      };
    } else {
      // Se for uma categoria padrão, usar as classes CSS predefinidas
      return {
        style: {},
        className: categoryColors[task.category] || categoryColors.outros
      };
    }
  };

  // Função helper para calcular cor de texto contrastante (preta ou branca)
  const getContrastColor = (hexColor: string): string => {
    // Remover o # se existir
    const hex = hexColor.replace('#', '');
    
    // Converter para RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Calcular luminância
    // Fórmula padrão para calcular brilho percebido
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Retornar preto para cores claras, branco para cores escuras
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  const categoryColorInfo = getCategoryColor();

  return (
    <>
      <Card 
        ref={isKanban ? setNodeRef : undefined}
        style={isKanban ? style : undefined}
        {...(isKanban ? attributes : {})}
        {...(isKanban ? listeners : {})}
        className={cn(
          "transition-all hover:shadow-md cursor-pointer", 
          isPastDue() && "border-red-300 dark:border-red-700",
          isKanban && "cursor-grab active:cursor-grabbing"
        )}
        onClick={handleCardClick}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{task.title}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" data-no-edit>
                  <MoreVerticalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleStatusChange("pendente")}>
                  <Timer className="mr-2 h-4 w-4" />
                  <span>Marcar como Pendente</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("em_andamento")}>
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Marcar como Em Andamento</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange("concluida")}>
                  <CheckIcon className="mr-2 h-4 w-4" />
                  <span>Marcar como Concluída</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => deleteTask(task.id)}
                  className="text-red-600 dark:text-red-400"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Excluir</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardDescription className="flex flex-wrap gap-2 pt-1">
            <Badge 
              variant="secondary" 
              className={categoryColorInfo.className}
              style={categoryColorInfo.style}
            >
              {task.category.charAt(0).toUpperCase() + task.category.slice(1).replace('_', ' ')}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              {statusIcons[task.status]}
              {statusToLabel[task.status]}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm">{task.description}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Data de entrega: {formatDate(task.dueDate)}
            {isPastDue() && (
              <span className="text-red-500 ml-2 font-medium">Atrasada</span>
            )}
          </p>
        </CardContent>
      </Card>

      <TaskEditForm 
        taskId={task.id}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
      />
    </>
  );
}
