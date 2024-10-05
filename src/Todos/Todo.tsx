import React, { useState, useRef, useEffect } from 'react'
import { TodoList } from './TodoList'
import { ITodoItem } from './TodoItem'

const LOCAL_STORAGE_KEY = 'todosApp.todos'

export function Todo() {
    const [todos, setTodos] = useState<ITodoItem[]>(getTodos())

    const titleRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    function getTodos()
    {
        const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (storedTodos)
            return JSON.parse(storedTodos);
        return []
    }

    function toggleTodo(id: string)
    {
        const newTodos = [ ...todos ]

        const todo = newTodos.find(x => x.id === id)

        if (todo === undefined)
            return;

        todo.completed = !todo?.completed;

        setTodos(newTodos);
    }

    function addTodo()
    {
        if (titleRef.current === null)
            return;

        const name = titleRef.current.value

        if (name === '' || name === undefined) return;

        setTodos(prevTodos =>
            {
                return [
                    ...prevTodos,
                    {
                        id: crypto.randomUUID().toString(),
                        completed: false,
                        title: name
                    }
                ];
            }
        )

        titleRef.current.value = ""
    }

    function clearTodoList()
    {
        const unCompletedTodos = todos.filter(x => !x.completed);

        setTodos(unCompletedTodos)
    }

    function getTodosCount()
    {
        return todos.filter(x => !x.completed).length
    }

    return (
    <>
        <input ref={titleRef} type="text" />
        <button onClick={addTodo}>Add To Do</button>
        <button onClick={clearTodoList}>Remove Todo</button>
        <div>{getTodosCount()} left to do</div>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
    </>
    )
}
