// src/components/TaskForm.js

import React, { useState } from 'react';
import { TextField, Button, Grid, MenuItem } from '@mui/material';

const TaskForm = ({ addTask, categories }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('low'); // Default to 'low'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addTask(title, category, priority);
    setTitle('');
    setCategory('');
    setPriority('low'); // Reset to 'low'
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Task Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Task
          </Button>
        </Grid>
      </Grid>
      <TextField
        fullWidth
        select
        label="Category"
        variant="outlined"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        margin="normal"
      >
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        select
        label="Priority"
        variant="outlined"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        margin="normal"
      >
        <MenuItem value="low">Low</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="high">High</MenuItem>
      </TextField>
    </form>
  );
};

export default TaskForm;