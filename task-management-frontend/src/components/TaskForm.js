// src/components/TaskForm.js
import React, { useState, useEffect } from 'react';
import { 
    TextField, 
    Button, 
    Select, 
    MenuItem, 
    FormControl, 
    InputLabel,
    Box,
    Paper
} from '@mui/material';
import { taskService } from '../services/api';

const TaskForm = ({ task, onTaskSaved, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'TODO',
        dueDate: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        if (task) {
            setFormData({
                ...task,
                dueDate: new Date(task.dueDate).toISOString().split('T')[0]
            });
        }
    }, [task]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (task?.id) {
                await taskService.updateTask(task.id, formData);
            } else {
                await taskService.createTask(formData);
            }
            onTaskSaved();
            resetForm();
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            status: 'TODO',
            dueDate: new Date().toISOString().split('T')[0]
        });
    };

    return (
        <Paper style={{ padding: '20px' }}>
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        label="Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                    <TextField
                        label="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        multiline
                        rows={4}
                    />
                    <FormControl>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            label="Status"
                        >
                            <MenuItem value="TODO">To Do</MenuItem>
                            <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                            <MenuItem value="DONE">Done</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        type="date"
                        label="Due Date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                    />
                    <Box display="flex" gap={2}>
                        <Button type="submit" variant="contained" color="primary">
                            {task?.id ? 'Update Task' : 'Create Task'}
                        </Button>
                        <Button onClick={onCancel} variant="outlined">
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </form>
        </Paper>
    );
};
export default TaskForm;