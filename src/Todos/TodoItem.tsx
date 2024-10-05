import React from 'react'

export function TodoItem(param: {
    item: ITodoItem,
    toggleTodo: (id: string) => void}) {

    const { title, completed, id } = param.item;

    return (
        <li>
            <label>
                <input type="checkbox" checked={completed} onChange={() => param.toggleTodo(id)}/>
                {title}
            </label>
        </li>
    )
}

export interface ITodoItem
{
    id: string,
    title: string,
    completed: boolean
}
