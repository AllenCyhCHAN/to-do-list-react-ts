
import './App.css'
import InputField from './components/InputField'
import { useState } from 'react'
import { Todo } from './model'
import TodoList from './components/TodoList'
import { TodoContext } from './ToDosContext'


const App: React.FC = () => {
  
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  }

  return (
    <div className="App">
      <TodoContext.Provider value={{todos: todos, setTodos: setTodos, todo: todo, setTodo: setTodo}}>
      <span className="heading">Another To Do App</span>
      <InputField handleAdd={handleAdd} />
      <TodoList />
      </TodoContext.Provider>
    </div>
    
  )
}

export default App
