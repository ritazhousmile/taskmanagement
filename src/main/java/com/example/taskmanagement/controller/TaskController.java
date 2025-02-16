// src/main/java/com/example/taskmanagement/controller/TaskController.java
package com.example.taskmanagement.controller;

import com.example.taskmanagement.model.Task;
import com.example.taskmanagement.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {
    
    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);
    
    @Autowired
    private TaskRepository taskRepository;
    
    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody Task task) {
        try {
            logger.info("Received task: {}", task);
            Task savedTask = taskRepository.save(task);
            return ResponseEntity.ok(savedTask);
        } catch (Exception e) {
            logger.error("Error creating task: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Error creating task: " + e.getMessage());
        }
    }
    
    // ... other methods remain the same
}