import React, { useContext } from 'react'
import { TodoContext, useTodoContext } from '../ToDosContext';
import { Todo } from '../model'
import SingleTodo from './SingleTodo';


const TodoList: React.FC = () => {

  const todoProps = useTodoContext();

  const todos = todoProps?.todos;

  const setTodos = todoProps?.setTodos;


  return (
    < div className = "todos" >
      {todos?.map((todo) => (
        <SingleTodo
          todo={todo}
          key={todo.id}
          todos={todos}
          setTodos={setTodos}
        />

      ))}
    </ div>
  )
}

export default TodoList