/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useTodos } from '@/store/todos'
import { useSearchParams } from 'next/navigation';
import React from 'react'

const Todos = () => {

    const {todo , handleAddTodo , handleComplete , handleDelete} = useTodos();
    const filterTodos = todo;
    const search_params = useSearchParams();
    const filter_todo = search_params.get('todos');

    let all_todos = todo;

    if (filter_todo === 'active') {
        all_todos = all_todos.filter((todo) => !todo.completed);
    } 
    
    else if (filter_todo === 'completed') {
        all_todos = all_todos.filter((todo) => todo.completed);
    }

    return (
       <ul className='main-task'>
        
        {all_todos.map((todo) => {

            return <li key={todo.id}>

                <input type='checkbox' id = {`todo-${todo.id}`} checked = {todo.completed} onChange={() => handleComplete(todo.id)}></input>
                <label htmlFor = {`todo-${todo.id}`}>
                    {todo.task}
                </label>
                <button type = "button" onClick={() => handleDelete(todo.id)}>Delete</button>

            </li>

        })}

       </ul>
    )
}

export default Todos
