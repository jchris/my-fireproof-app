import React from 'react'
import { useLiveQuery, useDocument } from 'use-fireproof'

function App() {
  const todos = useLiveQuery('date').docs
  const database = useLiveQuery.database
  const [todo, setTodo, saveTodo] = useDocument({ text: '', date: Date.now(), completed: false })

  return (
    <div>
      <input type="text" value={todo.text} onChange={e => setTodo({ text: e.target.value })} />
      <button
        onClick={() => {
          saveTodo()
          setTodo(false)
        }}
      >
        Save
      </button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => database.put({ ...todo, completed: !todo.completed })}
            />
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
