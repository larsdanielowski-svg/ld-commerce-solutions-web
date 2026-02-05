// Analytics Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts
    initRevenueChart();
    initUserActivityChart();
    initConversionFunnelChart();
    initMasterclassChart();
    initDropshippingChart();
    
    // Populate data table
    populateMetricsTable();
    
    // Set up event listeners
    setupEventListeners();
    
    // Update KPI cards with live data
    updateKPICards();
    
    // Start live data updates
    startLiveUpdates();
});

// Revenue Chart
function initRevenueChart() {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        datasets: [{
            label: 'Umsatz (€)',
            data: [28500, 32400, 38900, 42580, 48500, 52000, 49800, 53400, 61200, 65800, 72000, 78400],
            backgroundColor: 'rgba(0, 180, 216, 0.2)',
            borderColor: 'rgba(0, 180, 216, 1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
        }, {
            label: 'Prognose (€)',
            data: [null, null, null, null, null, null, null, null, null, null, 72000, 78400],
            backgroundColor: 'rgba(255, 193, 7, 0.1)',
            borderColor: 'rgba(255, 193, 7, 1)',
            borderWidth: 2,
            borderDash: [5, 5],
            tension: 0.4,
            fill: false
        }]
    };
    
    window.revenueChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: €${context.raw.toLocaleString('de-DE')}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '€' + value.toLocaleString('de-DE');
                        }
                    }
                }
            }
        }
    });
}

// User Activity Chart
function initUserActivityChart() {
    const ctx = document.getElementById('userActivityChart').getContext('2d');
    const data = {
        labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
        datasets: [{
            label: 'Aktive Benutzer',
            data: [1240, 1360, 1580, 1720, 1890, 1640, 1480],
            backgroundColor: [
                'rgba(76, 175, 80, 0.6)',
                'rgba(76, 175, 80, 0.7)',
                'rgba(76, 175, 80, 0.8)',
                'rgba(76, 175, 80, 0.9)',
                'rgba(76, 175, 80, 1)',
                'rgba(76, 175, 80, 0.8)',
                'rgba(76, 175, 80, 0.7)'
            ],
            borderColor: 'rgba(76, 175, 80, 1)',
            borderWidth: 1
        }]
    };
    
    window.userActivityChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString('de-DE');
                        }
                    }
                }
            }
        }
    });
}

// Conversion Funnel Chart
function initConversionFunnelChart() {
    const ctx = document.getElementById('conversionFunnelChart').getContext('2d');
    const data = {
        labels: ['Besucher', 'Produktansicht', 'Warenkorb', 'Kaufabschluss'],
        datasets: [{
            data: [45200, 18900, 3120, 1248],
            backgroundColor: [
                'rgba(33, 150, 243, 0.6)',
                'rgba(33, 150, 243, 0.7)',
                'rgba(33, 150, 243, 0.8)',
                'rgba(33, 150, 243, 0.9)'
            ],
            borderColor: 'rgba(33, 150, 243, 1)',
            borderWidth: 1
        }]
    };
    
    window.conversionFunnelChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw;
                            const percentage = ((value / data.datasets[0].data[0]) * 100).toFixed(1);
                            return `${label}: ${value.toLocaleString('de-DE')} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Masterclass Performance Chart
function initMasterclassChart() {
    const ctx = document.getElementById('masterclassChart').getContext('2d');
    const data = {
        labels: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026'],
        datasets: [{
            label: 'Teilnehmer',
            data: [45, 68, 92, 127, 189],
            backgroundColor: 'rgba(156, 39, 176, 0.2)',
            borderColor: 'rgba(156, 39, 176, 1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            yAxisID: 'y'
        }, {
            label: 'Umsatz (€)',
            data: [11250, 17000, 23000, 31750, 47250],
            backgroundColor: 'rgba(255, 193, 7, 0.2)',
            borderColor: 'rgba(255, 193, 7, 1)',
            borderWidth: 2,
            tension: 0.4,
            fill: false,
            yAxisID: 'y1'
        }]
    };
    
    window.masterclassChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Teilnehmer'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Umsatz (€)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '€' + value.toLocaleString('de-DE');
                        }
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });
}

// Dropshipping Performance Chart
function initDropshippingChart() {
    const ctx = document.getElementById('dropshippingChart').getContext('2d');
    const data = {
        labels: ['eBay', 'Amazon', 'Shopify', 'Eigenes', 'Andere'],
        datasets: [{
            label: 'Bestellungen',
            data: [420, 380, 210, 150, 88],
            backgroundColor: 'rgba(121, 85, 72, 0.6)',
            borderColor: 'rgba(121, 85, 72, 1)',
            borderWidth: 1
        }, {
            label: 'Umsatz (€)',
            data: [16800, 22800, 12600, 10500, 4400],
            backgroundColor: 'rgba(255, 152, 0, 0.6)',
            borderColor: 'rgba(255, 152, 0, 1)',
            borderWidth: 1
        }]
    };
    
    window.dropshippingChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString('de-DE');
                        }
                    }
                },
                y1: {
                    type: 'linear',
                    display: false,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });
}

// Populate Metrics Table
function populateMetricsTable() {
    const tableBody = document.getElementById('metricsTable');
    const metricsData = [
        { date: '2026-02-05', product: 'Future Force Masterclass', revenue: 47250, orders: 189, users: 189, conversion: '4.2%', profit: 35438 },
        { date: '2026-02-04', product: 'eBay Dropshipping', revenue: 16800, orders: 420, users: 380, conversion: '2.8%', profit: 6720 },
        { date: '2026-02-03', product: 'Amazon Dropshipping', revenue: 22800, orders: 380, users: 350, conversion: '3.1%', profit: 9120 },
        { date: '2026-02-02', product: 'Shopify Integration', revenue: 12600, orders: 210, users: 190, conversion: '3.5%', profit: 5670 },
        { date: '2026-02-01', product: 'Beratung Paket Pro', revenue: 7500, orders: 25, users: 18, conversion: '8.9%', profit: 6000 },
        { date: '2026-01-31', product: 'Future Force Masterclass', revenue: 31750, orders: 127, users: 127, conversion: '4.0%', profit: 23813 },
        { date: '2026-01-30', product: 'eBay Dropshipping', revenue: 15400, orders: 385, users: 350, conversion: '2.7%', profit: 6160 },
        { date: '2026-01-29', product: 'Amazon Dropshipping', revenue: 21000, orders: 350, users: 320, conversion: '3.0%', profit: 8400 }
    ];
    
    tableBody.innerHTML = '';
    
    metricsData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(item.date)}</td>
            <td><strong>${item.product}</strong></td>
            <td>€${item.revenue.toLocaleString('de-DE')}</td>
            <td>${item.orders.toLocaleString('de-DE')}</td>
            <td>${item.users.toLocaleString('de-DE')}</td>
            <td><span class="${getConversionClass(item.conversion)}">${item.conversion}</span></td>
            <td>€${item.profit.toLocaleString('de-DE')}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Update KPI Cards with Live Data
function updateKPICards() {
    // Simulate live data updates
    const totalRevenue = 42580 + Math.floor(Math.random() * 5000);
    const totalOrders = 1248 + Math.floor(Math.random() * 100);
    const conversionRate = 3.8 + Math.random() * 0.5;
    const newUsers = 326 + Math.floor(Math.random() * 50);
    
    document.getElementById('totalRevenue').textContent = `€${totalRevenue.toLocaleString('de-DE')}`;
    document.getElementById('totalOrders').textContent = totalOrders.toLocaleString('de-DE');
    document.getElementById('conversionRate').textContent = `${conversionRate.toFixed(1)}%`;
    document.getElementById('newUsers').textContent = newUsers.toLocaleString('de-DE');
    
    // Update trend indicators
    const revenueTrend = document.querySelector('#totalRevenue + p + .kpi-trend');
    revenueTrend.innerHTML = `<i class="fas fa-arrow-up"></i><span>+${Math.floor(Math.random() * 10 + 15)}% vs. Vormonat</span>`;
}

// Setup Event Listeners
function setupEventListeners() {
    // Time range selector
    document.getElementById('timeRange').addEventListener('change', function(e) {
        updateChartsForTimeRange(e.target.value);
    });
    
    // Chart type buttons
    document.querySelectorAll('.btn-chart').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.btn-chart').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            updateChartType(this.dataset.chart);
        });
    });
    
    // Table filter
    document.getElementById('tableFilter').addEventListener('change', function(e) {
        filterMetricsTable(e.target.value);
    });
    
    // Export buttons
    document.getElementById('exportPDF').addEventListener('click', exportAsPDF);
    document.getElementById('exportCSV').addEventListener('click', exportAsCSV);
}

// Update charts based on time range
function updateChartsForTimeRange(range) {
    console.log('Updating charts for time range:', range);
    // In a real implementation, this would fetch new data from the server
    // For now, we'll simulate by updating chart data
    
    // Simulate loading
    showLoadingIndicator();
    
    setTimeout(() => {
        updateKPICards();
        hideLoadingIndicator();
    }, 500);
}

// Update chart type
function updateChartType(chartType) {
    console.log('Switching to chart type:', chartType);
    // Implementation would depend on the specific chart type
}

// Filter metrics table
function filterMetricsTable(filter) {
    const rows = document.querySelectorAll('#metricsTable tr');
    rows.forEach(row => {
        const product = row.querySelector('td:nth-child(2) strong')?.textContent || '';
        const shouldShow = filter === 'all' || 
                          (filter === 'masterclass' && product.includes('Masterclass')) ||
                          (filter === 'dropshipping' && product.includes('Dropshipping')) ||
                          (filter === 'consulting' && product.includes('Beratung'));
        
        row.style.display = shouldShow ? '' : 'none';
    });
}

// Export functions
function exportAsPDF() {
    alert('PDF Export wird vorbereitet...\nIn einer echten Implementierung würde dies ein PDF generieren.');
}

function exportAsCSV() {
    alert('CSV Export wird heruntergeladen...\nIn einer echten Implementierung würde dies eine CSV-Datei generieren.');
}

// Start live updates
function startLiveUpdates() {
    // Update KPI cards every 30 seconds
    setInterval(updateKPICards, 30000);
    
    // Update charts every 5 minutes
    setInterval(() => {
        // Simulate data refresh
        if (window.revenueChart) {
            // Add new data point
            const chart = window.revenueChart;
            const lastData = chart.data.datasets[0].data[chart.data.datasets[0].data.length - 1];
            chart.data.datasets[0].data.push(lastData + Math.floor(Math.random() * 1000 - 500));
            
            // Remove first data point if too many
            if (chart.data.datasets[0].data.length > 20) {
                chart.data.datasets[0].data.shift();
            }
            
            chart.update('none');
        }
    }, 300000);
}

// Helper functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function getConversionClass(conversion) {
    const value = parseFloat(conversion);
    if (value >= 4) return 'conversion-high';
    if (value >= 2.5) return 'conversion-medium';
    return 'conversion-low';
}

function showLoadingIndicator() {
    // Add loading indicator
    const loading = document.createElement('div');
    loading.className = 'loading-overlay';
    loading.innerHTML = '<div class="loading-spinner"></div><p>Daten werden aktualisiert...</p>';
    document.querySelector('.main-content').appendChild(loading);
}

function hideLoadingIndicator() {
    const loading = document.querySelector('.loading-overlay');
    if (loading) loading.remove();
}

// Add CSS for loading indicator
const style = document.createElement('style');
style.textContent = `
.loading-overlay {
    position: fixed;
    top: 0;
    left: 250px;
    right: 0;
    bottom: 0;
    background: rgba(var(--primary-color-rgb, 0, 70, 139), 0.9);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    color: white;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.conversion-high {
    color: #4caf50;
    font-weight: 600;
}

.conversion-medium {
    color: #ff9800;
    font-weight: 600;
}

.conversion-low {
    color: #f44336;
    font-weight: 600;
}
`;
document.head.appendChild(style);