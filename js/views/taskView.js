/**
 * Task View - Handles DOM operations for tasks
 */
const TaskView = {
    /**
     * DOM Elements
     */
    elements: {
        taskForm: document.getElementById('taskForm'),
        taskFormContainer: document.getElementById('taskFormContainer'),
        taskTitle: document.getElementById('taskTitle'),
        taskDescription: document.getElementById('taskDescription'),
        taskDueDate: document.getElementById('taskDueDate'),
        taskId: document.getElementById('taskId'),
        saveButton: document.getElementById('saveTask'),
        cancelButton: document.getElementById('cancelEdit'),
        createTaskBtn: document.getElementById('createTaskBtn'),
        closeFormBtn: document.getElementById('closeFormBtn'),
        taskList: document.getElementById('taskList'),
        filterButtons: document.querySelectorAll('.filter-btn')
    },
    
    /**
     * Current active filter
     */
    currentFilter: 'all',
    
    /**
     * Initialize the view
     */
    init() {
        // Re-cache DOM elements
        this.elements = {
            taskForm: document.getElementById('taskForm'),
            taskFormContainer: document.getElementById('taskFormContainer'),
            taskTitle: document.getElementById('taskTitle'),
            taskDescription: document.getElementById('taskDescription'),
            taskDueDate: document.getElementById('taskDueDate'),
            taskId: document.getElementById('taskId'),
            saveButton: document.getElementById('saveTask'),
            cancelButton: document.getElementById('cancelEdit'),
            createTaskBtn: document.getElementById('createTaskBtn'),
            closeFormBtn: document.getElementById('closeFormBtn'),
            taskList: document.getElementById('taskList'),
            filterButtons: document.querySelectorAll('.filter-btn')
        };
        
        // Bind events
        this.bindEvents();
    },
    
    /**
     * Bind event listeners
     */
    bindEvents() {
        // Form submission
        this.elements.taskForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        
        // Cancel edit button
        this.elements.cancelButton.addEventListener('click', this.cancelEdit.bind(this));
        
        // Create task button
        this.elements.createTaskBtn.addEventListener('click', this.showTaskForm.bind(this));
        
        // Close form button
        this.elements.closeFormBtn.addEventListener('click', this.hideTaskForm.bind(this));
        
        // Filter buttons
        this.elements.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.setFilter(button.dataset.filter);
            });
        });
    },
    
    /**
     * Show the task form
     */
    showTaskForm() {
        this.resetForm();
        this.elements.taskFormContainer.style.display = 'block';
        this.elements.taskTitle.focus();
    },
    
    /**
     * Hide the task form
     */
    hideTaskForm() {
        this.elements.taskFormContainer.style.display = 'none';
    },
    
    /**
     * Set the active filter
     * @param {string} filter - Filter type
     */
    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active button
        this.elements.filterButtons.forEach(button => {
            if (button.dataset.filter === filter) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        
        // Render tasks with the new filter
        this.renderTasks(TaskService.filterTasks(filter));
    },
    
    /**
     * Handle form submission
     * @param {Event} event - Form submit event
     */
    handleFormSubmit(event) {
        event.preventDefault();
        
        const title = this.elements.taskTitle.value.trim();
        const description = this.elements.taskDescription.value.trim();
        const dueDate = this.elements.taskDueDate.value;
        const taskId = this.elements.taskId.value;
        
        if (!title || !dueDate) {
            alert('Please fill in all required fields.');
            return;
        }
        
        if (taskId) {
            // Update existing task
            TaskService.updateTask(taskId, { title, description, dueDate });
        } else {
            // Create new task
            const task = new Task(title, description, dueDate);
            TaskService.addTask(task);
        }
        
        // Reset form, hide it, and render tasks
        this.resetForm();
        this.hideTaskForm();
        this.renderTasks(TaskService.filterTasks(this.currentFilter));
    },
    
    /**
     * Reset the form
     */
    resetForm() {
        this.elements.taskForm.reset();
        this.elements.taskId.value = '';
        this.elements.saveButton.textContent = 'Save Task';
        this.elements.cancelButton.style.display = 'none';
    },
    
    /**
     * Cancel editing a task
     */
    cancelEdit() {
        this.resetForm();
        if (this.elements.taskId.value === '') {
            // If we were adding a new task, hide the form
            this.hideTaskForm();
        }
    },
    
    /**
     * Populate the form with task data for editing
     * @param {string} taskId - Task ID
     */
    editTask(taskId) {
        const task = TaskService.getTaskById(taskId);
        if (!task) return;
        
        this.elements.taskTitle.value = task.title;
        this.elements.taskDescription.value = task.description || '';
        this.elements.taskDueDate.value = task.dueDate;
        this.elements.taskId.value = task.id;
        
        this.elements.saveButton.textContent = 'Update Task';
        this.elements.cancelButton.style.display = 'inline-block';
        
        // Show form and scroll to it
        this.elements.taskFormContainer.style.display = 'block';
        this.elements.taskFormContainer.scrollIntoView({ behavior: 'smooth' });
    },
    
    /**
     * Delete a task
     * @param {string} taskId - Task ID
     */
    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            TaskService.deleteTask(taskId);
            this.renderTasks(TaskService.filterTasks(this.currentFilter));
        }
    },
    
    /**
     * Toggle task completion
     * @param {string} taskId - Task ID
     */
    toggleTaskComplete(taskId) {
        TaskService.toggleTaskComplete(taskId);
        this.renderTasks(TaskService.filterTasks(this.currentFilter));
    },
    
    /**
     * Render tasks to the DOM
     * @param {Array} tasks - Array of task objects
     */
    renderTasks(tasks) {
        this.elements.taskList.innerHTML = '';
        
        if (tasks.length === 0) {
            this.elements.taskList.innerHTML = '<li class="task-item empty-list">No tasks to display. Click "Create New Task" to add one.</li>';
            return;
        }
        
        tasks.forEach(task => {
            const taskElement = document.createElement('li');
            taskElement.className = `task-item ${task.completed ? 'task-completed' : ''}`;
            taskElement.dataset.id = task.id;
            
            const isApproaching = DateUtils.isApproachingDeadline(task.dueDate);
            const isPastDue = DateUtils.isPastDue(task.dueDate);
            
            taskElement.innerHTML = `
                <div class="task-content">
                    <div class="task-title">
                        ${task.title}
                        ${!task.completed && isApproaching ? '<span class="deadline-approaching" style="background-color: #fef3c7; color: #92400e;">Due Soon</span>' : ''}
                        ${!task.completed && isPastDue ? '<span class="deadline-approaching" style="background-color: #fee2e2; color: #991b1b;">Overdue</span>' : ''}
                    </div>
                    <div class="task-description">${task.description || 'No description'}</div>
                    <div class="task-due-date">📅 Due: ${DateUtils.formatDate(task.dueDate)}</div>
                </div>
                <div class="task-actions">
                    <button class="btn-toggle" title="${task.completed ? 'Mark as pending' : 'Mark as completed'}">
                        ${task.completed ? '↩️' : '✓'}
                    </button>
                    <button class="btn-edit" title="Edit task">✏️</button>
                    <button class="btn-delete" title="Delete task">🗑️</button>
                </div>
            `;
            
            // Add event listeners to buttons
            const toggleButton = taskElement.querySelector('.btn-toggle');
            const editButton = taskElement.querySelector('.btn-edit');
            const deleteButton = taskElement.querySelector('.btn-delete');
            
            toggleButton.addEventListener('click', () => this.toggleTaskComplete(task.id));
            editButton.addEventListener('click', () => this.editTask(task.id));
            deleteButton.addEventListener('click', () => this.deleteTask(task.id));
            
            this.elements.taskList.appendChild(taskElement);
        });
    }
}; 