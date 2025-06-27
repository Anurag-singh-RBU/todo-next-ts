"use client";

import { createContext, ReactNode, useContext, useState } from "react";

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

    const [todo, setTodo] = useState<todo_type[]>(() => {
        const stored = localStorage.getItem("Todos") || "[]";

        if(stored){

            try {

                return JSON.parse(stored) as todo_type[];
                
            } 
            
            catch {

                return [];

            }
        }
        return [];
    });

    const handleAddTodo = (task: string) => {
        setTodo((prev: todo_type[]) => {
            const newTodo: todo_type[] = [
                {
                    id: Date.now(),  
                    task,
                    completed: false,
                    createdAt: new Date(),
                },
                ...prev,
            ];

            localStorage.setItem("Todos" , JSON.stringify(newTodo));
            return newTodo;

        });
    };

    const handleComplete = (id: number): void => {
        setTodo((prev: todo_type[]) => {
            const updatedTodos = prev.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            });
            localStorage.setItem("Todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        });
    };

    const handleDelete = (id: number): void => {
        setTodo((prev: todo_type[]) => {
            const updatedTodos = prev.filter((todo) => todo.id !== id);
            localStorage.setItem("Todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        });
    };

    return (
        <todosContext.Provider value={{ todo, handleAddTodo, handleComplete, handleDelete }}>
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
