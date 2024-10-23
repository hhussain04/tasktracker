// src/components/TaskList.js

import React, { useEffect } from 'react';
import { List, ListItem, ListItemText, IconButton, Checkbox, Button, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList = ({ tasks, setTasks }) => {
  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleStart = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) => task.id === id ? { ...task, isActive: true } : task));
  };

  const handleStop = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) => task.id === id ? { ...task, isActive: false } : task));
  };

  const handleReset = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) => task.id === id ? { ...task, isActive: false, timeLeft: 1500 } : task));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    const timers = tasks.map((task) => {
      if (task.isActive && task.timeLeft > 0) {
        return setInterval(() => {
          setTasks((prevTasks) => prevTasks.map((t) => t.id === task.id ? { ...t, timeLeft: t.timeLeft - 1 } : t));
        }, 1000);
      }
      return null;
    });

    return () => timers.forEach((timer) => clearInterval(timer));
  }, [tasks, setTasks]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'black';
    }
  };

  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id} style={{ borderLeft: `5px solid ${getPriorityColor(task.priority)}` }}>
          <Checkbox
            checked={task.completed}
            onChange={() => toggleTaskCompletion(task.id)}
          />
          <ListItemText
            primary={<span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>{task.title}</span>}
            secondary={`Category: ${task.category}, Priority: ${task.priority}`}
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          />
          <Box textAlign="center" my={4}>
            <Typography variant="h5">Timer</Typography>
            <Typography variant="h6">{formatTime(task.timeLeft)}</Typography>
            <Box mt={2}>
              <Button variant="contained" color="primary" onClick={() => handleStart(task.id)} disabled={task.isActive}>
                Start
              </Button>
              <Button variant="contained" color="secondary" onClick={() => handleStop(task.id)} disabled={!task.isActive}>
                Stop
              </Button>
              <Button variant="outlined" onClick={() => handleReset(task.id)}>
                Reset
              </Button>
            </Box>
          </Box>
          <IconButton edge="end" onClick={() => deleteTask(task.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;