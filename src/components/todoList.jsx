import React, { useState, useEffect } from 'react'
import { USER_FIELDS } from './FormFields'

const todoList = () => {

    /**
    La todolist dois pouvoir :
    - ajouter une tâche
    - supprimer une tache avec l'emoji 🗑️ à droite de la tache
    - quand je clique sur une tache, elle doit se barrer avec un style text-decoration: line-through
    - si je clique sur la tache barrée, elle doit se débarrer
    
    règle : 
    - Utiliser le local storage pour garder les données en session
    - pas le droit d'utiliser Slice, For, Foreach
     */

    const [task, setTask] = useState({
        tache: ''
    });

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos')
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const handleChange = (event) => {
        const { name, value } = event.target
        setTask((prevTask) => ({...prevTask, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (task.tache.trim() !== '') {
            const newTodo = {
                id: Date.now(),
                text: task.tache,
                completed: false
            }
            setTodos([newTodo, ...todos])
            setTask({ tache: '' })
        }
    }

    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const handleToggle = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ))
    }

  return (
    <div>
        <h1>Todo List</h1>
        
        <form onSubmit={handleSubmit} >
            {USER_FIELDS.map((field, index) => (
                <div key={index}>
                    <input
                        type={field.type}
                        id={field.id}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={task[field.name]}
                        onChange={handleChange}
                    />
                </div>
            ))}
            <button>Valider</button>
        </form>

        <div>
            {todos.map(todo => (
                <div key={todo.id}>
                    <span 
                        onClick={() => handleToggle(todo.id)}
                        style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
                    >
                        {todo.text}
                    </span>
                    <span 
                        onClick={() => handleDelete(todo.id)}
                        style={{ cursor: 'pointer', marginLeft: '10px' }}
                    >
                        🗑️
                    </span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default todoList