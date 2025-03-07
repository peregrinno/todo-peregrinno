"use client";

import { Button } from "@/components/ui/button";
import { useTaskContext } from "@/context/task-context";
import { KanbanSquare, List } from "lucide-react";

export function ViewToggle() {
  const { viewMode, setViewMode } = useTaskContext();

  return (
    <div className="flex space-x-2">
      <Button
        variant={viewMode === "list" ? "default" : "outline"}
        size="sm"
        onClick={() => setViewMode("list")}
        className="h-8 w-8 p-0"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === "kanban" ? "default" : "outline"}
        size="sm"
        onClick={() => setViewMode("kanban")}
        className="h-8 w-8 p-0"
      >
        <KanbanSquare className="h-4 w-4" />
      </Button>
    </div>
  );
}
