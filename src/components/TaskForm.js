import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addTask(title, category, priority);
    setTitle('');
    setCategory('');
    setPriority('');
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
        label="Category"
        variant="outlined"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Priority"
        variant="outlined"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        margin="normal"
      />
    </form>
  );
};

export default TaskForm;
