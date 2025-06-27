"use client"

import { useTodos } from '@/store/todos';
import React, { FormEvent, useState } from 'react'

const AddToDo = () => {

  const [task , setTask] = useState<string>("");
  const {handleAddTodo} = useTodos();

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) : void =>{

    e.preventDefault();
    handleAddTodo(task);
    setTask("");

  }

  return (
    <form onSubmit={handleOnSubmit}>

      <input type = "text" value = {task} 
      onChange = {(event) => setTask(event.target.value)} 
      placeholder='Add Your Task' 
      className='rounded-md p-2 border border-gray-200 text-black'/>
      <button type = "submit" className='rounded-md p-2 border border-gray-200 text-black'>
        Add
      </button>

    </form>
  )
}

export default AddToDo