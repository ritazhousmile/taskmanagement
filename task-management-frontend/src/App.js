// src/App.js
import React, { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
    const [selectedTask, setSelectedTask] = useState(null);
    const [refreshList, setRefreshList] = useState(false);

    const handleTaskSaved = () => {
        setSelectedTask(null);
        setRefreshList(!refreshList);
    };

    return (
        <Container>
            <Box py={4}>
                <Typography variant="h4" gutterBottom>
                    Task Management System
                </Typography>
                <Box mb={4}>
                    <TaskForm 
                        task={selectedTask}
                        onTaskSaved={handleTaskSaved}
                        onCancel={() => setSelectedTask(null)}
                    />
                </Box>
                <TaskList 
                    onTaskSelect={setSelectedTask}
                    onTaskDelete={() => setRefreshList(!refreshList)}
                    refreshList={refreshList}
                />
            </Box>
        </Container>
    );
}

export default App;