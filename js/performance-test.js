// Performance Testing für LD Commerce Solutions Website

class PerformanceTester {
    constructor() {
        this.metrics = {
            loadTime: 0,
            animationFPS: 0,
            memoryUsage: 0,
            domUpdates: 0
        };
        this.results = [];
    }
    
    // Lighthouse-similar tests
    async runTests() {
        console.log('🚀 Starte Performance Tests für LD Commerce Solutions...');
        
        // Test 1: Page Load Time
        await this.testPageLoad();
        
        // Test 2: Animation Performance
        await this.testAnimationPerformance();
        
        // Test 3: Memory Usage
        await this.testMemoryUsage();
        
        // Test 4: DOM Manipulation Performance
        await this.testDOMPerformance();
        
        // Test 5: Network Performance
        await this.testNetworkPerformance();
        
        // Display results
        this.displayResults();
        
        return this.results;
    }
    
    async testPageLoad() {
        const startTime = performance.now();
        
        // Simulate different connection speeds
        const connectionTypes = [
            { name: '4G', speed: 50 }, // 50ms latency
            { name: '3G', speed: 200 },
            { name: '2G', speed: 800 }
        ];
        
        for (const connection of connectionTypes) {
            const loadTime = await this.simulateLoad(connection.speed);
            this.results.push({
                test: 'Page Load',
                connection: connection.name,
                time: loadTime,
                status: loadTime < 3000 ? '✅ Gut' : loadTime < 5000 ? '⚠️ Akzeptabel' : '❌ Langsam'
            });
        }
    }
    
    simulateLoad(latency) {
        return new Promise(resolve => {
            setTimeout(() => {
                // Simulate resource loading
                const resources = document.querySelectorAll('img, script, link');
                const totalSize = resources.length * latency;
                resolve(totalSize);
            }, 100);
        });
    }
    
    async testAnimationPerformance() {
        // Create test animation
        const testElement = document.createElement('div');
        testElement.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            width: 100px;
            height: 100px;
            background: var(--primary-color);
            border-radius: 10px;
            z-index: 9999;
        `;
        document.body.appendChild(testElement);
        
        let frameCount = 0;
        const startTime = performance.now();
        
        // Run animation for 1 second
        const animate = () => {
            frameCount++;
            testElement.style.transform = `rotate(${frameCount * 10}deg) scale(${1 + Math.sin(frameCount * 0.1) * 0.2})`;
            
            if (performance.now() - startTime < 1000) {
                requestAnimationFrame(animate);
            } else {
                const fps = frameCount;
                document.body.removeChild(testElement);
                
                this.results.push({
                    test: 'Animation FPS',
                    value: fps,
                    status: fps >= 50 ? '✅ Exzellent' : fps >= 30 ? '✅ Gut' : fps >= 20 ? '⚠️ Akzeptabel' : '❌ Schlecht'
                });
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    async testMemoryUsage() {
        // Memory usage estimation
        if (performance.memory) {
            const memory = performance.memory;
            const usedJSHeap = memory.usedJSHeapSize / (1024 * 1024); // MB
            const totalJSHeap = memory.totalJSHeapSize / (1024 * 1024);
            
            this.results.push({
                test: 'Memory Usage',
                value: `${usedJSHeap.toFixed(2)}MB / ${totalJSHeap.toFixed(2)}MB`,
                status: usedJSHeap < 50 ? '✅ Gut' : usedJSHeap < 100 ? '⚠️ Akzeptabel' : '❌ Hoch'
            });
        } else {
            this.results.push({
                test: 'Memory Usage',
                value: 'Nicht verfügbar',
                status: '⚠️ Nicht getestet'
            });
        }
    }
    
    async testDOMPerformance() {
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            top: 120px;
            left: 10px;
            z-index: 9998;
        `;
        document.body.appendChild(container);
        
        const startTime = performance.now();
        const iterations = 1000;
        
        // Test DOM manipulation speed
        for (let i = 0; i < iterations; i++) {
            const element = document.createElement('div');
            element.textContent = `Test ${i}`;
            element.style.cssText = `
                display: inline-block;
                padding: 2px 5px;
                margin: 1px;
                background: #f0f0f0;
                font-size: 10px;
            `;
            container.appendChild(element);
            
            // Remove some elements to keep DOM size manageable
            if (i % 10 === 0) {
                const children = container.children;
                if (children.length > 50) {
                    container.removeChild(children[0]);
                }
            }
        }
        
        const endTime = performance.now();
        const domTime = endTime - startTime;
        
        document.body.removeChild(container);
        
        this.results.push({
            test: 'DOM Manipulation',
            value: `${domTime.toFixed(2)}ms für ${iterations} Operationen`,
            status: domTime < 100 ? '✅ Sehr schnell' : domTime < 300 ? '✅ Gut' : domTime < 500 ? '⚠️ Akzeptabel' : '❌ Langsam'
        });
    }
    
    async testNetworkPerformance() {
        // Test image loading performance
        const images = document.querySelectorAll('img');
        let totalLoadTime = 0;
        let loadedImages = 0;
        
        if (images.length === 0) {
            this.results.push({
                test: 'Network Performance',
                value: 'Keine Bilder gefunden',
                status: '⚠️ Nicht getestet'
            });
            return;
        }
        
        const promises = Array.from(images).map(img => {
            return new Promise(resolve => {
                if (img.complete) {
                    resolve(0);
                    return;
                }
                
                const startTime = performance.now();
                img.addEventListener('load', () => {
                    const loadTime = performance.now() - startTime;
                    resolve(loadTime);
                });
                
                img.addEventListener('error', () => {
                    resolve(-1); // Error
                });
                
                // Timeout for images that never load
                setTimeout(() => resolve(-1), 5000);
            });
        });
        
        const results = await Promise.all(promises);
        const validResults = results.filter(time => time >= 0);
        
        if (validResults.length > 0) {
            const avgLoadTime = validResults.reduce((a, b) => a + b, 0) / validResults.length;
            this.results.push({
                test: 'Image Load Time',
                value: `${avgLoadTime.toFixed(2)}ms Durchschnitt`,
                status: avgLoadTime < 500 ? '✅ Sehr schnell' : avgLoadTime < 1000 ? '✅ Gut' : avgLoadTime < 2000 ? '⚠️ Akzeptabel' : '❌ Langsam'
            });
        }
    }
    
    displayResults() {
        console.log('📊 PERFORMANCE TEST RESULTS:');
        console.table(this.results);
        
        // Create visual display
        const resultsDiv = document.createElement('div');
        resultsDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 10000;
            max-width: 400px;
            font-family: monospace;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        `;
        
        const title = document.createElement('h3');
        title.textContent = '📊 Performance Test Results';
        title.style.cssText = `
            margin: 0 0 15px 0;
            color: var(--primary-color);
        `;
        resultsDiv.appendChild(title);
        
        this.results.forEach(result => {
            const resultDiv = document.createElement('div');
            resultDiv.style.cssText = `
                margin-bottom: 10px;
                padding: 8px;
                background: rgba(255,255,255,0.1);
                border-radius: 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            `;
            
            const testName = document.createElement('span');
            testName.textContent = result.test;
            testName.style.fontWeight = 'bold';
            
            const testValue = document.createElement('span');
            testValue.textContent = result.value;
            
            const testStatus = document.createElement('span');
            testStatus.textContent = result.status;
            testStatus.style.cssText = `
                padding: 2px 8px;
                border-radius: 3px;
                background: ${result.status.includes('✅') ? '#10b981' : result.status.includes('⚠️') ? '#f59e0b' : '#ef4444'};
                color: white;
                font-size: 0.9em;
            `;
            
            resultDiv.appendChild(testName);
            resultDiv.appendChild(testValue);
            resultDiv.appendChild(testStatus);
            resultsDiv.appendChild(resultDiv);
        });
        
        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 5px;
            line-height: 1;
        `;
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(resultsDiv);
        });
        resultsDiv.appendChild(closeBtn);
        
        // Auto-remove after 30 seconds
        setTimeout(() => {
            if (document.body.contains(resultsDiv)) {
                document.body.removeChild(resultsDiv);
            }
        }, 30000);
        
        document.body.appendChild(resultsDiv);
    }
}

// Run tests when page is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.addEventListener('load', () => {
            setTimeout(() => {
                // Only run in development or when explicitly requested
                if (window.location.hostname === 'localhost' || window.location.hash === '#performance-test') {
                    const tester = new PerformanceTester();
                    tester.runTests().catch(console.error);
                }
            }, 1000);
        });
    });
}

// Export for manual testing
window.runPerformanceTests = () => {
    const tester = new PerformanceTester();
    return tester.runTests();
};

// Simple performance monitor
window.performanceMonitor = {
    log: [],
    
    startMonitoring() {
        console.log('🔍 Performance Monitoring gestartet...');
        
        // Monitor frame rate
        this.monitorFPS();
        
        // Monitor memory
        this.monitorMemory();
        
        // Monitor network requests
        this.monitorNetwork();
    },
    
    monitorFPS() {
        let lastTime = performance.now();
        let frames = 0;
        
        const measureFPS = () => {
            frames++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frames * 1000) / (currentTime - lastTime));
                this.log.push({ time: new Date().toISOString(), type: 'FPS', value: fps });
                
                // Only warn if FPS drops significantly
                if (fps < 30) {
                    console.warn(`⚠️ Niedrige FPS: ${fps}`);
                }
                
                frames = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        requestAnimationFrame(measureFPS);
    },
    
    monitorMemory() {
        if (performance.memory) {
            setInterval(() => {
                const memory = performance.memory;
                const usedMB = memory.usedJSHeapSize / (1024 * 1024);
                this.log.push({ time: new Date().toISOString(), type: 'Memory', value: usedMB.toFixed(2) + 'MB' });
                
                if (usedMB > 100) {
                    console.warn(`⚠️ Hoher Speicherverbrauch: ${usedMB.toFixed(2)}MB`);
                }
            }, 5000);
        }
    },
    
    monitorNetwork() {
        // Resource timing API
        if (performance.getEntriesByType) {
            setInterval(() => {
                const resources = performance.getEntriesByType('resource');
                resources.forEach(resource => {
                    if (resource.duration > 1000) {
                        console.warn(`⚠️ Langsame Resource: ${resource.name} (${resource.duration.toFixed(2)}ms)`);
                    }
                });
            }, 10000);
        }
    },
    
    getReport() {
        return {
            timestamp: new Date().toISOString(),
            log: this.log,
            summary: {
                avgFPS: this.log.filter(l => l.type === 'FPS').map(l => l.value).reduce((a, b) => a + b, 0) / this.log.filter(l => l.type === 'FPS').length || 0,
                maxMemory: Math.max(...this.log.filter(l => l.type === 'Memory').map(l => parseFloat(l.value))) || 0
            }
        };
    }
};