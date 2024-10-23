// src/utils/storage.js

// Save tasks to local storage
export const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  
  // Load tasks from local storage
  export const loadTasksFromLocalStorage = () => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  };
  
  // Clear tasks from local storage (optional, for reset functionality)
  export const clearTasksFromLocalStorage = () => {
    localStorage.removeItem('tasks');
  };
  