/**
 * Date utility functions
 */
const DateUtils = {
    /**
     * Format a date string to a more readable format
     * @param {string} dateString - Date string in ISO or YYYY-MM-DD format
     * @returns {string} Formatted date string
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    /**
     * Check if a date is approaching (within 2 days)
     * @param {string} dateString - Date string in ISO or YYYY-MM-DD format
     * @returns {boolean} True if the date is within 2 days
     */
    isApproachingDeadline(dateString) {
        if (!dateString) return false;

        const now = new Date();
        // Reset time to start of day for accurate day comparison
        now.setHours(0, 0, 0, 0);
        
        const dueDate = new Date(dateString);
        // Reset time to start of day for accurate day comparison
        dueDate.setHours(0, 0, 0, 0);
        
        // Calculate difference in days
        const diffTime = dueDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // Return true if due date is in the future and within 2 days
        return diffDays >= 0 && diffDays <= 2;
    },

    /**
     * Check if a date is in the past
     * @param {string} dateString - Date string in ISO or YYYY-MM-DD format
     * @returns {boolean} True if the date is in the past
     */
    isPastDue(dateString) {
        if (!dateString) return false;
        
        const now = new Date();
        // Reset time to start of day for accurate day comparison
        now.setHours(0, 0, 0, 0);
        
        const dueDate = new Date(dateString);
        // Reset time to start of day for accurate day comparison
        dueDate.setHours(0, 0, 0, 0);
        
        return dueDate < now;
    }
}; 