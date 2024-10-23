import React, { useState, useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';

const Timer = ({ isActive, setIsActive, timeLeft, setTimeLeft }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      alert("Time's up! Take a break!");
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, setIsActive, setTimeLeft]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(1500); // Reset to 25 minutes
  };

  return (
    <Box textAlign="center" my={4}>
      <Typography variant="h5">Pomodoro Timer</Typography>
      <Typography variant="h2">{formatTime(timeLeft)}</Typography>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleStart} disabled={isActive}>
          Start
        </Button>
        <Button variant="contained" color="secondary" onClick={handleStop} disabled={!isActive}>
          Stop
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default Timer;
