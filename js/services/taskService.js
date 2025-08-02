/**
 * Task Service - Handles data operations for tasks
 */
const TaskService = {
    /**
     * Storage key for localStorage
     */
    STORAGE_KEY: 'taskManager_tasks',
    
    /**
     * Get all tasks from localStorage
     * @returns {Array} Array of task objects
     */
    getTasks() {
        const tasksJson = localStorage.getItem(this.STORAGE_KEY);
        return tasksJson ? JSON.parse(tasksJson) : [];
    },
    
    /**
     * Save all tasks to localStorage
     * @param {Array} tasks - Array of task objects
     */
    saveTasks(tasks) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    },
    
    /**
     * Add a new task
     * @param {Task} task - Task object to add
     */
    addTask(task) {
        const tasks = this.getTasks();
        tasks.push(task);
        this.saveTasks(tasks);
        return task;
    },
    
    /**
     * Get a task by ID
     * @param {string} id - Task ID
     * @returns {Task|null} Task object or null if not found
     */
    getTaskById(id) {
        const tasks = this.getTasks();
        return tasks.find(task => task.id === id) || null;
    },
    
    /**
     * Update an existing task
     * @param {string} id - Task ID
     * @param {Object} data - Task data to update
     * @returns {Task|null} Updated task or null if not found
     */
    updateTask(id, data) {
        const tasks = this.getTasks();
        const index = tasks.findIndex(task => task.id === id);
        
        if (index === -1) return null;
        
        // Create a task instance to use the update method
        const taskInstance = Object.assign(new Task(), tasks[index]);
        taskInstance.update(data);
        
        // Update the task in the array
        tasks[index] = taskInstance;
        this.saveTasks(tasks);
        
        return taskInstance;
    },
    
    /**
     * Delete a task
     * @param {string} id - Task ID
     * @returns {boolean} True if task was deleted, false if not found
     */
    deleteTask(id) {
        const tasks = this.getTasks();
        const filteredTasks = tasks.filter(task => task.id !== id);
        
        if (filteredTasks.length === tasks.length) {
            return false; // Task not found
        }
        
        this.saveTasks(filteredTasks);
        return true;
    },
    
    /**
     * Toggle task completion status
     * @param {string} id - Task ID
     * @returns {Task|null} Updated task or null if not found
     */
    toggleTaskComplete(id) {
        const tasks = this.getTasks();
        const index = tasks.findIndex(task => task.id === id);
        
        if (index === -1) return null;
        
        // Create a task instance to use the toggleComplete method
        const taskInstance = Object.assign(new Task(), tasks[index]);
        taskInstance.toggleComplete();
        
        // Update the task in the array
        tasks[index] = taskInstance;
        this.saveTasks(tasks);
        
        return taskInstance;
    },
    
    /**
     * Filter tasks based on the specified filter
     * @param {string} filter - Filter type: 'all', 'pending', 'completed'
     * @returns {Array} Filtered array of tasks
     */
    filterTasks(filter = 'all') {
        const tasks = this.getTasks();
        
        switch (filter) {
            case 'pending':
                return tasks.filter(task => !task.completed);
            case 'completed':
                return tasks.filter(task => task.completed);
            case 'all':
            default:
                return tasks;
        }
    }
}; 