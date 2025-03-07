"use client";

import { TaskForm } from "@/components/task-form";
import { TaskKanban } from "@/components/task-kanban"; 
import { TaskList } from "@/components/task-list";
import { ViewToggle } from "@/components/view-toggle";
import { useTaskContext } from "@/context/task-context";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const { viewMode } = useTaskContext();

  return (
    <div className="container mx-auto py-6 px-4">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          
          <h1 className="text-3xl font-bold tracking-tight">Todo Peregrinno</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie suas tarefas de forma simples e eficiente
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <ViewToggle />
          <TaskForm />
        </div>
      </header>

      <main>
        {viewMode === "list" ? <TaskList /> : <TaskKanban />}
      </main>
    </div>
  );
}
