"use client";

import { TaskForm } from "@/components/task-form";
import { TaskKanban } from "@/components/task-kanban"; 
import { TaskList } from "@/components/task-list";
import { ViewToggle } from "@/components/view-toggle";
import { useTaskContext } from "@/context/task-context";
import { ListTodo } from "lucide-react";

export default function Home() {
  const { viewMode } = useTaskContext();
  
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <ListTodo className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Tarefas</h1>
        </div>
        <div className="flex items-center space-x-2">
          <ViewToggle />
          <TaskForm />
        </div>
      </div>
  
      <div>
        {viewMode === "list" ? <TaskList /> : <TaskKanban />}
      </div>
    </>
  );
}