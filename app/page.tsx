"use client";

import { TaskForm } from "@/components/task-form";
import { TaskKanban } from "@/components/task-kanban"; 
import { TaskList } from "@/components/task-list";
import { ViewToggle } from "@/components/view-toggle";
import { useTaskContext } from "@/context/task-context";

export default function Home() {
  const { viewMode } = useTaskContext();
  
  return (
    <>
      <div className="flex justify-end items-center space-x-2 mb-4">
        <ViewToggle />
        <TaskForm />
      </div>

      <div>
        {viewMode === "list" ? <TaskList /> : <TaskKanban />}
      </div>
    </>
  );
}