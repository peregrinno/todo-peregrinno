export type TaskStatus = "pendente" | "em_andamento" | "concluida";

export type TaskCategory = 
  | "trabalho" 
  | "pessoal" 
  | "estudos" 
  | "saude" 
  | "financas" 
  | "outros"
  | string;

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  status: TaskStatus;
  dueDate: string; // formato ISO
  createdAt: string; // formato ISO
  updatedAt: string; // formato ISO
}
