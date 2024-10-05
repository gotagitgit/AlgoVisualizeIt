import React from 'react'
import { ITodoItem, TodoItem } from './TodoItem';

export function TodoList(props: {
  todos: ITodoItem[],
  toggleTodo: (id: string) => void })
{
  const { todos, toggleTodo } = props;

  return (
    <ul>
      { todos.map(todo => <TodoItem key={todo.id} item={todo} toggleTodo={toggleTodo} />) }
    </ul>
  )
}
