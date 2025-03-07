"use client";

import React, { createContext } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { TaskCategory } from "@/types";
import { v4 as uuidv4 } from "uuid";

export interface CustomCategory {
  id: string;
  name: string;
  value: string;
  color: string; 
}

interface CategoryContextType {
  customCategories: CustomCategory[];
  addCategory: (category: Omit<CustomCategory, "id">) => void;
  updateCategory: (id: string, category: Partial<CustomCategory>) => void;
  deleteCategory: (id: string) => void;
  getAllCategories: () => (TaskCategory | string)[];
  getCategoryColor: (categoryValue: string) => string;
}

const CategoryContext = createContext<CategoryContextType | null>(null);

export function useCategoryContext() {
  const context = React.useContext(CategoryContext);
  if (context === null) {
    throw new Error("useCategoryContext must be used within a CategoryProvider");
  }
  return context;
}

const defaultCategoryColors: Record<string, string> = {
  trabalho: "#3b82f6", // azul
  pessoal: "#8b5cf6", // roxo
  estudos: "#10b981", // verde
  saude: "#ef4444",   // vermelho
  financas: "#f59e0b", // amarelo
  outros: "#6b7280",   // cinza
};

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [customCategories, setCustomCategories] = useLocalStorage<CustomCategory[]>("customCategories", []);

  const addCategory = (category: Omit<CustomCategory, "id">) => {
    const newCategory: CustomCategory = {
      id: uuidv4(),
      ...category,
    };

    setCustomCategories([...customCategories, newCategory]);
  };

  const updateCategory = (id: string, updatedCategory: Partial<CustomCategory>) => {
    setCustomCategories(
      customCategories.map((category) =>
        category.id === id
          ? { ...category, ...updatedCategory }
          : category
      )
    );
  };

  const deleteCategory = (id: string) => {
    setCustomCategories(customCategories.filter((category) => category.id !== id));
  };

  const getAllCategories = (): (TaskCategory | string)[] => {
    const defaultCategories: TaskCategory[] = [
      "trabalho", "pessoal", "estudos", "saude", "financas", "outros"
    ];
    
    const customCategoryValues = customCategories.map(cat => cat.value);
    
    return [...defaultCategories, ...customCategoryValues];
  };

  const getCategoryColor = (categoryValue: string): string => {
    if (defaultCategoryColors[categoryValue]) {
      return defaultCategoryColors[categoryValue];
    }
    
    const customCategory = customCategories.find(cat => cat.value === categoryValue);
    if (customCategory) {
      return customCategory.color;
    }
    
    return defaultCategoryColors.outros;
  };

  const value = {
    customCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getCategoryColor
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}