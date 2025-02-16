// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const taskService = {
    getAllTasks: () => axios.get(`${API_URL}/tasks`),
    getTask: (id) => axios.get(`${API_URL}/tasks/${id}`),
    createTask: (task) => axios.post(`${API_URL}/tasks`, task),
    updateTask: (id, task) => axios.put(`${API_URL}/tasks/${id}`, task),
    deleteTask: (id) => axios.delete(`${API_URL}/tasks/${id}`)
};