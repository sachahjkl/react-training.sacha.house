import { useState } from 'react';

interface ITodo {
  id: number;
  label: string;
  done: boolean;
}

interface TodoProps {
  defaultTodos: string[];
}

export default function Todo({ defaultTodos }: TodoProps) {
  let idCount = 0;

  const [todos, setTodos] = useState<ITodo[]>(
    defaultTodos.map((t) => ({
      id: idCount++,
      label: t,
      done: false,
    })) || [],
  );

  const addTodo = (todoLabel: string) => {
    setTodos([...todos, { id: idCount++, label: todoLabel, done: false }]);
  };

  const [currentInput, setCurrentInput] = useState('');

  return (
    <div>
      <h2 className="">Todo list</h2>
      <div className="not-prose">
        <form
          className="mb-2 flex flex-wrap gap-2"
          onSubmit={(e) => {
            addTodo(currentInput);
            e.preventDefault();
          }}
        >
          <input
            className="rounded-sm bg-slate-50/70 px-2 py-1 outline outline-2 outline-neutral-500/50 backdrop-blur-lg transition-all hover:outline-4"
            type="text"
            placeholder="Your task..."
            value={currentInput}
            onInput={(e) => {
              console.info(currentInput);
              setCurrentInput(e.currentTarget.value);
            }}
          />{' '}
          <button
            className="rounded-sm bg-blue-500 px-2 py-1 text-neutral-50 outline outline-2 outline-neutral-500/50 transition-all hover:bg-blue-600 hover:outline-4"
            type="submit"
          >
            Add
          </button>
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className={`${todo.done ? 'line-through' : ''}`}>
              <input
                type="checkbox"
                name="done"
                checked={todo.done}
                onChange={() =>
                  setTodos(todos.map((t) => (t.id !== todo.id ? t : { ...t, done: !t.done })))
                }
                key={todo.id}
                className="mr-2"
              />
              {todo.label}{' '}
              <button
                className="transition-transform hover:scale-110"
                onClick={() => setTodos(todos.filter((t) => t.id !== todo.id))}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
