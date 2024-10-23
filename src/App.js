import React, { useState, useEffect } from 'react';
import { Container, Typography, CssBaseline, Button, Switch, FormControlLabel } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Timer from './components/Timer';
import { saveTasksToLocalStorage, loadTasksFromLocalStorage } from './utils/storage';

function App() {
  const [tasks, setTasks] = useState(loadTasksFromLocalStorage());
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Typography variant="h4" align="center" gutterBottom>
        Task Tracker with Pomodoro Timer
      </Typography>
      <FormControlLabel
        control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
        label="Dark Mode"
      />
      <TaskForm addTask={(title, category, priority) => {
        const newTask = { id: Date.now(), title, completed: false, category, priority };
        setTasks((prevTasks) => [...prevTasks, newTask]);
      }} />
      <TaskList tasks={tasks} toggleTaskCompletion={(id) => {
        setTasks((prevTasks) => prevTasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
      }} deleteTask={(id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      }} />
      <Timer isActive={isActive} setIsActive={setIsActive} timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
    </Container>
  );
}

export default App;
