'use client'
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useTodos } from '@/store/todos'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Navbar = () => {
  const { todo , handleAddTodo , handleComplete , handleDelete } = useTodos();
  const search_params = useSearchParams();
  const filter_todo = search_params.get('todos');

  return (

    <nav>
      <Link href="/" className={(filter_todo === null) ? "active" : ""}> All</Link>
      <Link href="/?todos=active" className={filter_todo === 'active' ? "active" : ""}> Active</Link>
      <Link href="/?todos=completed" className={filter_todo === 'completed' ? "active" : ""}> Completed</Link>
    </nav>

  );
};

export default Navbar;
