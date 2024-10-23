import React, { useState, useEffect } from 'react';
import { Container, Typography, CssBaseline } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { saveTasksToLocalStorage, loadTasksFromLocalStorage } from './utils/storage';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(loadTasksFromLocalStorage());
  const [categories] = useState(['Housework', 'Schoolwork', 'Work', 'Personal']);

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  return (
    <div className="App dark-mode">
      <CssBaseline />
      <Container component="main">
        <Typography variant="h4" align="center" gutterBottom>
          <u><b>Trackr</b></u>
        </Typography>
        <TaskForm addTask={(title, category, priority) => {
          const newTask = { id: Date.now(), title, completed: false, category, priority, timeLeft: 1500, isActive: false };
          setTasks((prevTasks) => [...prevTasks, newTask]);
        }} categories={categories} />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </Container>
    </div>
  );
}

export default App;
