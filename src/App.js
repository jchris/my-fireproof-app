import React, { useState } from 'react'
import { useLiveQuery } from 'use-fireproof'

function App() {
  const todos = useLiveQuery('date').docs
  const database = useLiveQuery.database
  const [newTodo, setNewTodo] = useState('')

  return (
    <div>
      <input type="text" value={newTodo} onChange={e => setNewTodo(e.target.value)} />
      <button onClick={() => {
        setNewTodo('')
        database.put({ text: newTodo, date: Date.now(), completed: false })
        
        }}>Save</button>
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
