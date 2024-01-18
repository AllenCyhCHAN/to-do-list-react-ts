import React, {useRef, useState, useEffect} from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from "react-icons/md";

type Props = {
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({todo, todos, setTodos} : Props ) => {
  
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit])


  const handleDone = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
  
    // Find the newly marked todo item
    const newlyMarkedTodo = updatedTodos.find((todo) => todo.id === id);
  
    // Only proceed if the newly marked todo item is found
    if (newlyMarkedTodo) {
      // Remove the newly marked todo item from the array
      const filteredTodos = updatedTodos.filter((todo) => todo.id !== id);
  
      // Add the newly marked todo item to the end of the array
      const reorderedTodos = [...filteredTodos, newlyMarkedTodo];
  
      setTodos(reorderedTodos);
    }
  };

  const handleDelete = (id: number) => {
    setTodos(
      todos.filter((todo) => {
        todo.id === id 
      })
    );
  }

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(todos.map((todo) => (
      todo.id === id ? { ...todo, todo: editTodo } : todo
    ))
    );

    setEdit(false);
  }

  return (
    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input type="text" value={editTodo} onChange={(e) => setEditTodo(e.target.value)} className="todos__single--text"/>
      ):
      (todo.isDone ? (
          <s className="todos__single--text">{todo.todo}</s>
        ): (
          <span className="todos__single--text">{todo.todo}</span>
        ))}
      <div>
        <span className="icon"
          onClick={() => {
            if (!edit) {
              setEdit(!edit);
            }
          }}
        ><AiFillEdit /></span>
        <span className="icon">
          <AiFillDelete onClick={()=> handleDelete(todo.id) } />
        </span>

            <span className="icon">
          <MdDone onClick={() => 
            handleDone(todo.id)
          } />
            </span>
      </div>
    </form>
  )
}

export default SingleTodo