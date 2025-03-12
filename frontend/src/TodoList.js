import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import './index.css';
    function TodoList() {
        const [todos, setTodos] = useState([]);
        const [newTask, setNewTask] = useState('');
        useEffect(() => {
            axios.get('/todos').then(res => setTodos(res.data));
        }, []);
        const addTodo = () => {
            axios.post('/todos', { task: newTask }).then(res => setTodos([...todos, { id: res.data.id, task: newTask, completed: 0 }]));
            setNewTask('');
        };
        const toggleTodo = (id) => {
            const todo = todos.find(todo => todo.id === id);
            axios.put(`/todos/${id}`, { ...todo, completed: todo.completed === 0 ? 1 : 0 }).then(() => setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: todo.completed === 0 ? 1 : 0 } : todo)));
        };
        const deleteTodo = (id) => {
            axios.delete(`/todos/${id}`).then(() => setTodos(todos.filter(todo => todo.id !== id)));
        };
        return (
            <div>
                <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} />
                <button disabled={!newTask.trim()} onClick={addTodo}>Add</button>
                <ul>
                    {todos.map(todo => (
                        <li key={todo.id} style={{ textDecoration: todo.completed === 1 ? 'line-through' : 'none' }}>
                            <input type="checkbox" checked={todo.completed === 1} onChange={() => toggleTodo(todo.id)} />
                            {todo.task}
                            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
    /*App.get('/liste_abrufen', (req,res)=> {
        db.all('SELECT * FROM todos', function(err, req) {
            res.json(rows)
        })
    });
    */
    export default TodoList;