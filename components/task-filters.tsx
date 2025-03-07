// components/task-filters.tsx
"use client";

import { TaskCategory, TaskStatus } from "@/types";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "./ui/select";
import { Label } from "./ui/label";

interface TaskFiltersProps {
  selectedCategory: TaskCategory | 'todas';
  onCategoryChange: (category: TaskCategory | 'todas') => void;
  showStatusFilter?: boolean;
  selectedStatus?: TaskStatus | 'todas';
  onStatusChange?: (status: TaskStatus | 'todas') => void;
  className?: string;
}

export function TaskFilters({
  selectedCategory,
  onCategoryChange,
  showStatusFilter = false,
  selectedStatus = 'todas',
  onStatusChange,
  className = ""
}: TaskFiltersProps) {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="category-filter">Categoria</Label>
        <Select 
          value={selectedCategory} 
          onValueChange={(value) => onCategoryChange(value as TaskCategory | 'todas')}
        >
          <SelectTrigger id="category-filter" className="w-[180px]">
            <SelectValue placeholder="Todas as categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas as categorias</SelectItem>
            <SelectItem value="trabalho">Trabalho</SelectItem>
            <SelectItem value="pessoal">Pessoal</SelectItem>
            <SelectItem value="estudos">Estudos</SelectItem>
            <SelectItem value="saude">Saúde</SelectItem>
            <SelectItem value="financas">Finanças</SelectItem>
            <SelectItem value="outros">Outros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {showStatusFilter && onStatusChange && (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="status-filter">Status</Label>
          <Select 
            value={selectedStatus} 
            onValueChange={(value) => onStatusChange(value as TaskStatus | 'todas')}
          >
            <SelectTrigger id="status-filter" className="w-[180px]">
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todos os status</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="em_andamento">Em Andamento</SelectItem>
              <SelectItem value="concluida">Concluída</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}