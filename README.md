# Task Manager Web App

A clean, responsive task management application built with vanilla HTML, CSS, and JavaScript.

## Features

- Add tasks with title, description, and due date
- Edit existing tasks
- Delete tasks
- Mark tasks as complete/incomplete
- Filter tasks (all, pending, completed)
- Highlight approaching deadlines (tasks due within 2 days)
- Data persistence using localStorage
- Mobile-responsive design
- Dedicated "Create Task" button for better UI flow

## Architecture

The project follows a modular architecture to separate concerns:

### Directory Structure

```
task-manager/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Styles
├── js/
│   ├── app.js          # Main application controller
│   ├── models/         # Data models
│   │   └── Task.js     # Task model
│   ├── services/       # Data services
│   │   └── taskService.js  # localStorage operations
│   ├── views/          # UI components
│   │   └── taskView.js # DOM manipulation
│   └── utils/          # Helper utilities
│       └── dateUtils.js # Date-related functions
└── README.md           # Documentation
```

### Components

1. **Task Model** (`js/models/Task.js`): Defines the task data structure.
2. **Task Service** (`js/services/taskService.js`): Handles data operations and localStorage interactions.
3. **Task View** (`js/views/taskView.js`): Manages DOM interactions and UI rendering.
4. **Date Utilities** (`js/utils/dateUtils.js`): Helper functions for date operations.
5. **App Controller** (`js/app.js`): Initializes and coordinates the application.

## User Interface

The UI is designed to be clean, intuitive, and mobile-friendly:

- **Task Creation**: Click the "Create New Task" button to display the task form
- **Task List**: All tasks are displayed in a clean list format with proper spacing
- **Task Filters**: Filter buttons to show all, pending, or completed tasks
- **Visual Indicators**: 
  - "Due Soon" badge for tasks due within 2 days
  - "Overdue" badge for tasks past their due date
  - Strikethrough styling for completed tasks
- **Responsive Design**: Adapts to different screen sizes and devices

## Data Schema

Tasks are stored in localStorage with the following structure:

```javascript
{
  id: String,          // Unique identifier
  title: String,       // Task title
  description: String, // Task description
  dueDate: String,     // Due date (YYYY-MM-DD)
  completed: Boolean,  // Completion status
  createdAt: String,   // Creation timestamp
  updatedAt: String    // Last update timestamp
}
```

## Future Extensions

For extending the app to use a backend:

1. **Backend Stack**: Node.js with Express would provide a lightweight, JavaScript-based solution.

2. **API-Ready Structure**: The current service layer can be modified to use fetch API instead of localStorage:

```javascript
// Example of how taskService.js could be modified:
const TaskService = {
  API_URL: '/api/tasks',
  
  async getTasks() {
    const response = await fetch(this.API_URL);
    return response.json();
  },
  
  async addTask(task) {
    const response = await fetch(this.API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    return response.json();
  },
  
  // Additional methods...
};
```

3. **Environment Configuration**: A `.env` structure might include:

```
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=user
DB_PASSWORD=password
DB_NAME=taskmanager

# API Configuration
API_VERSION=v1
API_PREFIX=/api

# Authentication (if added later)
JWT_SECRET=your_jwt_secret
```

## Getting Started

Simply open `index.html` in your browser to start using the application. No server or installation required.

## Browser Compatibility

Tested and working in all modern browsers (Chrome, Firefox, Safari, Edge).

## Created By

Task Manager App - By Madhav # local-task-manager
