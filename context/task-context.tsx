"use client";

import React, { createContext } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Task } from "@/types";
import { v4 as uuidv4 } from "uuid";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
  viewMode: "list" | "kanban";
  setViewMode: (mode: "list" | "kanban") => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

export function useTaskContext() {
  const context = React.useContext(TaskContext);
  if (context === null) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [viewMode, setViewMode] = useLocalStorage<"list" | "kanban">("viewMode", "list");

  const addTask = (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const newTask: Task = {
      id: uuidv4(),
      ...task,
      createdAt: now,
      updatedAt: now,
    };

    setTasks([newTask, ...tasks]);
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, ...updatedTask, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getTaskById = (id: string) => {
    return tasks.find((task) => task.id === id);
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
    viewMode,
    setViewMode,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}
