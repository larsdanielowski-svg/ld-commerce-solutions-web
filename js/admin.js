// Admin Panel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const addUserBtn = document.getElementById('addUserBtn');
    const addUserModal = document.getElementById('addUserModal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const saveUserBtn = document.getElementById('saveUserBtn');
    const addUserForm = document.getElementById('addUserForm');

    // Open modal
    if (addUserBtn) {
        addUserBtn.addEventListener('click', () => {
            addUserModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    // Close modal
    closeModalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            addUserModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            addUserForm.reset();
        });
    });

    // Close modal when clicking outside
    addUserModal.addEventListener('click', (e) => {
        if (e.target === addUserModal) {
            addUserModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            addUserForm.reset();
        }
    });

    // Save user
    if (saveUserBtn) {
        saveUserBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('userName').value;
            const email = document.getElementById('userEmail').value;
            const role = document.getElementById('userRole').value;
            const password = document.getElementById('userPassword').value;

            // Basic validation
            if (!name || !email || !role || !password) {
                alert('Bitte füllen Sie alle Felder aus.');
                return;
            }

            if (password.length < 8) {
                alert('Das Passwort muss mindestens 8 Zeichen lang sein.');
                return;
            }

            // In a real application, this would make an API call
            // For now, we'll just show a success message
            alert(`Benutzer ${name} wurde erfolgreich hinzugefügt!`);
            
            // Close modal
            addUserModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            addUserForm.reset();

            // In a real application, you would refresh the user table here
        });
    }

    // Edit user buttons
    const editButtons = document.querySelectorAll('.btn-icon.edit');
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const userId = row.querySelector('td:first-child').textContent;
            const userName = row.querySelector('td:nth-child(2)').textContent;
            const userEmail = row.querySelector('td:nth-child(3)').textContent;
            const userRole = row.querySelector('.role-tag').textContent;
            
            alert(`Benutzer bearbeiten:\nID: ${userId}\nName: ${userName}\nE-Mail: ${userEmail}\nRolle: ${userRole}`);
            
            // In a real application, open edit modal with user data
        });
    });

    // Delete user buttons
    const deleteButtons = document.querySelectorAll('.btn-icon.delete');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const userName = row.querySelector('td:nth-child(2)').textContent;
            
            if (confirm(`Möchten Sie den Benutzer "${userName}" wirklich löschen?`)) {
                // In a real application, make API call to delete user
                row.remove();
                alert(`Benutzer "${userName}" wurde gelöscht.`);
                
                // Update statistics
                updateUserCount(-1);
            }
        });
    });

    // Status toggle functionality
    const statusCells = document.querySelectorAll('.status');
    statusCells.forEach(cell => {
        cell.addEventListener('click', function() {
            const currentStatus = this.textContent;
            const newStatus = currentStatus === 'Aktiv' ? 'Inaktiv' : 'Aktiv';
            const newClass = newStatus === 'Aktiv' ? 'active' : 'inactive';
            
            this.textContent = newStatus;
            this.className = `status ${newClass}`;
            
            alert(`Status geändert zu: ${newStatus}`);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('.user-table tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }

    // Notification bell
    const notificationBell = document.querySelector('.notifications');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            alert('Benachrichtigungen:\n1. Neue Bestellung erhalten\n2. System-Update verfügbar\n3. 3 neue Benutzerregistrierungen');
            this.querySelector('.notification-count').textContent = '0';
        });
    }

    // Update user count function
    function updateUserCount(change) {
        const userStat = document.querySelector('.stat-card:first-child h3');
        if (userStat) {
            let currentCount = parseInt(userStat.textContent.replace(/,/g, ''));
            currentCount += change;
            userStat.textContent = currentCount.toLocaleString();
        }
    }

    // Simulate real-time updates (for demo purposes)
    setInterval(() => {
        // Randomly update some stats
        const stats = document.querySelectorAll('.stat-card h3');
        stats.forEach(stat => {
            const current = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
            if (current < 100000) { // Don't update large numbers too much
                const change = Math.floor(Math.random() * 11) - 5; // -5 to +5
                const newValue = Math.max(1, current + change);
                stat.textContent = newValue.toLocaleString();
            }
        });

        // Add random activity
        const activities = [
            'Neue Bestellung aufgegeben',
            'System-Backup abgeschlossen',
            'Kundenbewertung erhalten',
            'Newsletter versendet',
            'SEO-Analyse durchgeführt'
        ];
        const users = ['Max Mustermann', 'Anna Schmidt', 'Peter Müller', 'Lisa Fischer', 'Thomas Weber'];
        
        if (Math.random() > 0.7) { // 30% chance each interval
            const activityList = document.querySelector('.activity-list');
            if (activityList) {
                const newActivity = document.createElement('div');
                newActivity.className = 'activity-item';
                newActivity.innerHTML = `
                    <div class="activity-icon">
                        <i class="fas fa-bell"></i>
                    </div>
                    <div class="activity-content">
                        <p><strong>${users[Math.floor(Math.random() * users.length)]}</strong> hat ${activities[Math.floor(Math.random() * activities.length)]}</p>
                        <span class="activity-time">gerade eben</span>
                    </div>
                `;
                
                // Add to top and limit to 5 items
                activityList.insertBefore(newActivity, activityList.firstChild);
                if (activityList.children.length > 5) {
                    activityList.removeChild(activityList.lastChild);
                }
            }
        }
    }, 10000); // Update every 10 seconds

    // Initialize tooltips
    const tooltips = document.querySelectorAll('[title]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.title;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.position = 'fixed';
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
            tooltip.style.background = 'var(--dark-color)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '0.5rem';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '0.875rem';
            tooltip.style.zIndex = '3000';
            
            this.tooltipElement = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
                this.tooltipElement = null;
            }
        });
    });
});

// Theme persistence
(function() {
    const savedTheme = localStorage.getItem('admin-theme');
    const themeToggle = document.querySelector('.theme-toggle');
    const themeText = document.querySelector('.theme-toggle span');
    
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        if (themeText) themeText.textContent = 'Light Mode';
        if (themeToggle) themeToggle.querySelector('i').className = 'fas fa-sun';
    }
    
    // Update theme toggle to save preference
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.body.removeAttribute('data-theme');
                localStorage.setItem('admin-theme', 'light');
                if (themeText) themeText.textContent = 'Dark Mode';
                themeToggle.querySelector('i').className = 'fas fa-moon';
            } else {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('admin-theme', 'dark');
                if (themeText) themeText.textContent = 'Light Mode';
                themeToggle.querySelector('i').className = 'fas fa-sun';
            }
        });
    }
})();