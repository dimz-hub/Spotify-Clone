import React from 'react'
import { Actions } from './App'

export default function Todo({todo, dispatch}) {
  return (
    <div>
        <span style={{color: todo.complete? "grey": "black"}}>{todo.name}</span>
        <button onClick={() => dispatch({type: Actions.toggle_todo, payload: {id:todo.id}})}>toggle</button>
        <button onClick={() => dispatch({type: Actions.delete_todo, payload: {id:todo.id}})}>delete</button>
        


    </div>
  )
}
 