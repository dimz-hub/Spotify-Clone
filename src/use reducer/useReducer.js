import React, { useCallback, useReducer, useState } from 'react'
import Todo from './Todo'

export const Actions = {
  add_todo :"add-todo",
  toggle_todo: "toggle-todo",
  delete_todo: "delete-todo"
}

function reducer (todos, action) {
  switch(action.type) {
    case Actions.add_todo:
      return [...todos, newTodo(action.payload.name) ]
    case Actions.toggle_todo:  
    return todos.map(todo => {
      if(todo.id === action.payload.id) {
        return {...todo, complete:!todo.complete}
      }
    })
    case Actions.delete_todo:
      return todos.filter(todo => todo.id !== action.payload.id)
      default:
        return todos
  }

}
function newTodo(name) {
  return {
    id: Date.now(), name:name, complete: false
  }
}

export default function App () {
 
  const [name , setName] = useState('')
  const [todos, dispatch] = useReducer(reducer, [])


  function handleSubmit(e) {
    e.preventDefault()
    dispatch({type:Actions.add_todo, payload: {name:name}})
    setName('')
  }
  console.log(todos)

  return (
    <div>

 <form onSubmit={handleSubmit}>
<input type='text' value={name}  onChange={e => setName(e.target.value) }/>
 </form>
 {todos.map(todo => {
  return <Todo key={todo.id} todo = {todo} dispatch = {dispatch}/>
 })}

    </div>
  )
}