import React from 'react';
import { List, ListItem, ListItemText, IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList = ({ tasks, toggleTaskCompletion, deleteTask }) => {
  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          <Checkbox
            checked={task.completed}
            onChange={() => toggleTaskCompletion(task.id)}
          />
          <ListItemText
            primary={task.title}
            secondary={`Category: ${task.category}, Priority: ${task.priority}`}
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          />
          <IconButton edge="end" onClick={() => deleteTask(task.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
