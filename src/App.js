import React from 'react'
import { useFireproof } from 'use-fireproof'
import { Uploader } from './Uploader'

function App() {
  const { useLiveQuery, useDocument, database } = useFireproof(
    'todos',
    () => {},
    () => {}
    , {secondary: { type: 'ucan' }}
  )
  const todos = useLiveQuery('date').docs
  // const database = useLiveQuery.database
  const [todo, setTodo, saveTodo] = useDocument({ text: '', date: Date.now(), completed: false })

    window.fireproof = database

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
      <Uploader database={database} />
    </div>
  )
}

export default App
