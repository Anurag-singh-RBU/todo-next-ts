import AddToDo from "@/components/AddToDo";
import Navbar from "@/components/Navbar";
import Todos from "@/components/Todos";
import {TodosProvider} from "@/store/todos"; 
import "./globals.css";

export default function Home() {
  return (

    <TodosProvider>
      <div className="todo-title">
        TODO APP
      </div>
      <main className="flex flex-col space-y-5 items-center min-h-screen">
        <Navbar/>
        <AddToDo/>
        <Todos/>
      </main>
    </TodosProvider>

  );
}
