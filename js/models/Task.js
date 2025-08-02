/**
 * Task Model - Represents a task object
 */
class Task {
    /**
     * Create a new task
     * @param {string} title - The task title
     * @param {string} description - The task description
     * @param {string} dueDate - The due date (YYYY-MM-DD format)
     */
    constructor(title, description, dueDate) {
        this.id = Date.now().toString(); // Use timestamp as unique ID
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = false;
        this.createdAt = new Date().toISOString();
        this.updatedAt = new Date().toISOString();
    }

    /**
     * Toggle the completion status of the task
     */
    toggleComplete() {
        this.completed = !this.completed;
        this.updatedAt = new Date().toISOString();
    }

    /**
     * Update task properties
     * @param {Object} data - Object containing properties to update
     */
    update(data) {
        if (data.title !== undefined) this.title = data.title;
        if (data.description !== undefined) this.description = data.description;
        if (data.dueDate !== undefined) this.dueDate = data.dueDate;
        
        this.updatedAt = new Date().toISOString();
    }
} 