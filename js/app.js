/**
 * App - Main application controller
 */
const App = {
    /**
     * Initialize the application
     */
    init() {
        // Set today's date as the default due date
        const today = new Date().toISOString().split('T')[0];
        if (document.getElementById('taskDueDate')) {
            document.getElementById('taskDueDate').min = today;
            document.getElementById('taskDueDate').value = today;
        }
        
        // Initialize the task view
        TaskView.init();
        
        // Render tasks on load
        this.loadTasks();
    },
    
    /**
     * Load tasks from the service and render them
     */
    loadTasks() {
        const tasks = TaskService.getTasks();
        TaskView.renderTasks(tasks);
    }
};

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init();
}); 