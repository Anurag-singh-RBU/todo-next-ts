"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type todo_type = {
  id: number;
  task: string;
  completed: boolean;
  createdAt: Date;
};

export type TodoContextType = {
  todo: todo_type[];
  handleAddTodo: (task: string) => void;
  handleComplete: (id: number) => void;
  handleDelete: (id: number) => void;
};

export const todosContext = createContext<TodoContextType | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todo, setTodo] = useState<todo_type[]>([]);

  // Load todos on client-side
  useEffect(() => {
    const stored = localStorage.getItem("Todos");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as (Omit<todo_type, "createdAt"> & { createdAt: string })[];
        // Convert createdAt string back to Date
        const todosWithDate: todo_type[] = parsed.map((t) => ({
          ...t,
          createdAt: new Date(t.createdAt),
        }));
        setTodo(todosWithDate);
      } catch {
        setTodo([]);
      }
    }
  }, []);

  // Save todos on every change
  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todo));
  }, [todo]);

  const handleAddTodo = (task: string) => {
    setTodo((prev) => [
      {
        id: Date.now(),
        task,
        completed: false,
        createdAt: new Date(),
      },
      ...prev,
    ]);
  };

  const handleComplete = (id: number): void => {
    setTodo((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: number): void => {
    setTodo((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <todosContext.Provider
      value={{ todo, handleAddTodo, handleComplete, handleDelete }}
    >
      {children}
    </todosContext.Provider>
  );
};

export function useTodos() {
  const context = useContext(todosContext);

  if (!context) {
    throw new Error("useTodos must be used within a TodosProvider");
  }

  return context;
}
