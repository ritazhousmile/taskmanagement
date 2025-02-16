// src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    Button,
    IconButton
} from '@mui/material';
import { taskService } from '../services/api';

const TaskList = ({ onTaskSelect, onTaskDelete, refreshList }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, [refreshList]);

    const fetchTasks = async () => {
        try {
            const response = await taskService.getAllTasks();
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await taskService.deleteTask(id);
            onTaskDelete();
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Due Date</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task.id}>
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{task.description}</TableCell>
                            <TableCell>{task.status}</TableCell>
                            <TableCell>
                                {new Date(task.dueDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <Button 
                                    onClick={() => onTaskSelect(task)}
                                    variant="outlined"
                                    size="small"
                                >
                                    Edit
                                </Button>
                                <Button
                                    onClick={() => handleDelete(task.id)}
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    style={{ marginLeft: '8px' }}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TaskList;