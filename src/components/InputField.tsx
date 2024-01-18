import React, {useRef, useContext} from 'react';
import './style.css';
import { TodoContext, useTodoContext } from '../ToDosContext';


interface Props {
  handleAdd: (e: React.FormEvent) => void;
}

const InputField = ({ handleAdd }: Props) => {
  
  const inputRef = useRef<HTMLInputElement>(null);

  const todoProps = useTodoContext();

  const todo = todoProps?.todo;

  const setTodo = todoProps?.setTodo;


  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }
      }

    >
    <input
      type="text"
      placeholder="Enter a Task"
      value={todo}
      onChange={(e) => setTodo(e.target.value)}
      className="input__box"
    />
    <button type="submit" className="input_submit">
      Add
      </button>
      </form>
  );
}

export default InputField;