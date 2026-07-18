// ============================================================
// 1. VUE APP SETUP (The JS Framework Requirement)
// ============================================================
const { createApp, ref, onMounted, nextTick } = Vue;

const app = createApp({
    setup() {
        // --- Reactive Data: All Act Content ---
        const acts = ref([
            {
                title: ' The Perfect Recipe',
                text: `<em>Vanilla planifolia</em> is one of nature's most demanding crops. 
                       It needs <span class="highlight">27–29°C</span> days, 
                       <span class="highlight">70–80%</span> humidity, 
                       and rich volcanic soil. Miss any mark, and it simply won't fruit.`,
                chartType: 'radar',
                data: {
                    labels: ['Temperature', 'Humidity', 'Altitude', 'Soil Organics', 'Shade'],
                    datasets: [{
                        label: 'Ideal Vanilla Conditions',
                        data: [85, 80, 65, 90, 70],
                        backgroundColor: 'rgba(91, 123, 74, 0.25)',
                        borderColor: '#5b7b4a',
                        pointBackgroundColor: '#5b7b4a',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: { scales: { r: { min: 0, max: 100, ticks: { stepSize: 20 } } } }
            },

            // -- Act II : Interactive HeatMAP --

            {
                title: '🗺️ The Vanilla Belt',
                text: `Currently, vanilla thrives in a narrow band <span class="highlight">20° north and south</span> of the equator. 
               But look closely at the heatmap below. <strong>Red hotspots</strong> are ideal zones. 
               Toggle the slider to see how these zones <strong>shift and shrink</strong> by 2050.`,
                chartType: 'heatmap', // We'll handle this in the mounted hook
                data: null, // Not used for maps
                options: null
            },

            {
                title: ' The Vanilla Belt',
                text: `Despite its global fame, <span class="highlight">80%</span> of the world's 
                       vanilla comes from a single region — the Sava district of Madagascar. 
                       Indonesia and Mexico trail far behind.`,
                chartType: 'bar',
                data: {
                    labels: ['Madagascar', 'Indonesia', 'Mexico', 'Papua New Guinea', 'Others'],
                    datasets: [{
                        label: 'Global Production Share (%)',
                        data: [44, 29, 7, 10, 10],
                        backgroundColor: ['#c5a67c', '#a68b6b', '#8b7355', '#6d5c43', '#d4c3a8'],
                        borderRadius: 6
                    }]
                },
                options: { plugins: { legend: { display: false } } }
            },
            {
                title: ' Voyage Across Oceans',
                text: `From Mexico (1520) to Europe, then to Réunion where 
                       <span class="highlight">12-year-old Edmond Albius</span> 
                       invented hand-pollination in 1841. That single moment unlocked the global industry.`,
                chartType: 'line',
                data: {
                    labels: ['1520', '1600', '1841', '1866', '1893', '2025'],
                    datasets: [{
                        label: 'Cumulative Producing Countries',
                        data: [1, 2, 3, 5, 7, 15],
                        borderColor: '#8b6b4d',
                        backgroundColor: 'rgba(139, 107, 77, 0.1)',
                        tension: 0.3,
                        fill: true,
                        pointBackgroundColor: '#5b3e1a',
                        pointRadius: 5
                    }]
                },
                options: { plugins: { legend: { display: false } } }
            },
            {
                title: 'The Fragile Future',
                text: `Madagascar is the <span class="highlight">4th most climate-vulnerable</span> 
                       country on Earth. By 2050, ideal growing zones in Mexico could shrink by 
                       50%. The vines are already suffering.`,
                chartType: 'bar',
                data: {
                    labels: ['2015', '2018', '2021', '2024', '2027 (proj)'],
                    datasets: [
                        {
                            label: 'Production (k tons)',
                            data: [3.2, 2.8, 2.5, 2.2, 1.9],
                            backgroundColor: '#d94a38',
                            order: 2
                        },
                        {
                            label: 'Price Index (2015=100)',
                            data: [100, 420, 280, 350, 500],
                            type: 'line',
                            borderColor: '#2c3e50',
                            backgroundColor: 'rgba(44, 62, 80, 0.1)',
                            tension: 0.3,
                            pointBackgroundColor: '#2c3e50',
                            fill: true,
                            order: 1
                        }
                    ]
                },
                options: { plugins: { legend: { position: 'top' } } }
            },
            {
                title: 'The Last Scoop',
                text: `The market hit <span class="highlight">$13.1 billion</span> in 2025. 
                       But this isn't abundance — it's scarcity driving prices up. 
                       Some stories don't get a sequel.`,
                chartType: 'line',
                data: {
                    labels: ['2024', '2026', '2028', '2030', '2032', '2034', '2036'],
                    datasets: [
                        {
                            label: 'Projected Price ($/kg)',
                            data: [24, 28, 35, 42, 55, 60, 72],
                            borderColor: '#3a2c1b',
                            backgroundColor: 'rgba(58, 44, 27, 0.15)',
                            fill: true,
                            tension: 0.4
                        },
                        {
                            label: 'Upper Bound',
                            data: [30, 38, 48, 58, 72, 80, 95],
                            borderColor: 'rgba(217, 74, 56, 0.3)',
                            backgroundColor: 'rgba(217, 74, 56, 0.05)',
                            borderDash: [5, 5],
                            fill: false,
                            tension: 0.4
                        },
                        {
                            label: 'Lower Bound',
                            data: [18, 20, 25, 30, 38, 42, 50],
                            borderColor: 'rgba(217, 74, 56, 0.3)',
                            backgroundColor: 'rgba(217, 74, 56, 0.05)',
                            fill: '+1', // Fills the ribbon between upper and lower
                            borderDash: [5, 5],
                            tension: 0.4
                        }
                    ]
                },
                options: { plugins: { legend: { position: 'top' } } }
            }
        ]);

        // --- Chart instances storage ---
        const chartInstances = ref([]);

        // --- Lifecycle: Render charts after DOM is ready ---
        // --- Lifecycle: Render charts and maps after DOM is ready ---
        onMounted(() => {
            nextTick(() => {
                const chartInstances = [];

                // 1. Initialize Charts (skip index 1, which is the heatmap)
                acts.value.forEach((act, index) => {
                    if (index === 1) return; // Skip heatmap act

                    const ctx = document.getElementById(`chart-${index}`).getContext('2d');
                    const chart = new Chart(ctx, {
                        type: act.chartType,
                        data: act.data,
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: true } },
                            ...act.options
                        }
                    });
                    chartInstances.push(chart);
                });

                // 2. Initialize the Heatmap (Act Index = 1)
                renderHeatmap();

                // 3. Intersection Observer for fade-in (Works for both charts and map wrapper)
                const wrappers = document.querySelectorAll('.chart-wrapper');
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                        }
                    });
                }, { threshold: 0.25 });

                wrappers.forEach(w => observer.observe(w));

                console.log('🍦 Vue Scrollytelling with Heatmap ready!');
            });
        });

        // ============================================================
        // 4. HEATMAP RENDER FUNCTION
        // ============================================================
        // ============================================================
        // 4. HEATMAP RENDER FUNCTION (UPDATED)
        // ============================================================
        function renderHeatmap() {
            const mapContainer = document.getElementById('chart-wrapper-1');
            if (!mapContainer) {
                console.error('Heatmap container not found!');
                return;
            }

            // Clear any existing map content
            mapContainer.innerHTML = '';

            // Add a div specifically for the map
            const mapDiv = document.createElement('div');
            mapDiv.id = 'vanilla-map';
            mapDiv.style.width = '100%';
            mapDiv.style.height = '100%';
            mapDiv.style.borderRadius = '12px';
            mapContainer.appendChild(mapDiv);

            // Initialize Leaflet Map
            const map = L.map('vanilla-map').setView([0, 40], 2);

            // Base tile layer (clean, light background)
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; CartoDB'
            }).addTo(map);

            // --- Check if the Heat plugin loaded ---
            if (typeof L.heatLayer !== 'function') {
                console.error('🔥 L.heatLayer is not a function. Plugin failed to load!');
                // Fallback: show a text message on the map
                mapDiv.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#7a6248;font-size:1rem;">⚠️ Heatmap plugin failed to load. Please check your internet connection.</div>';
                return;
            }

            // ----- Generate boosted mock data -----
            const currentData = generateVanillaPoints(1.2); // Boosted scalar for current
            const futureData = generateVanillaPoints(0.5);  // Reduced scalar for future

            console.log(`🌍 Current points generated: ${currentData.length}`);
            console.log(`🔥 Future points generated: ${futureData.length}`);
            console.log('Sample current point:', currentData[0]);

            // --- Add Current Heatmap Layer with boosted radius ---
            const heatLayer = L.heatLayer(currentData, {
                radius: 35,        // Increased from 25
                blur: 20,          // Increased from 15
                maxZoom: 8,
                gradient: {
                    0.0: '#fdf8f0', // Cream (very low)
                    0.3: '#e8d5bc', // Light tan
                    0.5: '#c5a67c', // Medium gold
                    0.7: '#d94a38', // Bright red-orange (warning)
                    1.0: '#5b1a0a'  // Deep burgundy (perfect)
                }
            }).addTo(map);

            // Force a map resize after adding the layer to fix rendering glitches
            setTimeout(() => map.invalidateSize(), 200);

            // --- Add the Toggle Control (Current / 2050) ---
            const controlDiv = document.createElement('div');
            controlDiv.className = 'leaflet-control leaflet-bar';
            controlDiv.style.padding = '8px 12px';
            controlDiv.style.background = 'white';
            controlDiv.style.borderRadius = '8px';
            controlDiv.style.boxShadow = '0 2px 10px rgba(0,0,0,0.15)';
            controlDiv.style.display = 'flex';
            controlDiv.style.gap = '8px';
            controlDiv.style.fontSize = '0.85rem';
            controlDiv.style.fontWeight = '500';

            const currentBtn = document.createElement('button');
            currentBtn.innerText = '🌱 Current (2024)';
            currentBtn.style.padding = '6px 16px';
            currentBtn.style.border = '2px solid #5b3e1a';
            currentBtn.style.borderRadius = '20px';
            currentBtn.style.background = '#5b3e1a';
            currentBtn.style.color = 'white';
            currentBtn.style.cursor = 'pointer';
            currentBtn.style.transition = 'all 0.2s ease';

            const futureBtn = document.createElement('button');
            futureBtn.innerText = '🔥 2050 (RCP 4.5)';
            futureBtn.style.padding = '6px 16px';
            futureBtn.style.border = '2px solid #5b3e1a';
            futureBtn.style.borderRadius = '20px';
            futureBtn.style.background = 'transparent';
            futureBtn.style.color = '#5b3e1a';
            futureBtn.style.cursor = 'pointer';
            futureBtn.style.transition = 'all 0.2s ease';

            controlDiv.appendChild(currentBtn);
            controlDiv.appendChild(futureBtn);

            const controlPos = L.control({ position: 'topright' });
            controlPos.onAdd = function () { return controlDiv; };
            controlPos.addTo(map);

            // --- Toggle Logic (with forced redraw) ---
            currentBtn.addEventListener('click', function () {
                heatLayer.setLatLngs(currentData);
                currentBtn.style.background = '#5b3e1a';
                currentBtn.style.color = 'white';
                futureBtn.style.background = 'transparent';
                futureBtn.style.color = '#5b3e1a';
                map.flyTo([0, 40], 2);
                // Force redraw after fly
                setTimeout(() => map.invalidateSize(), 300);
            });

            futureBtn.addEventListener('click', function () {
                heatLayer.setLatLngs(futureData);
                futureBtn.style.background = '#d94a38';
                futureBtn.style.color = 'white';
                currentBtn.style.background = 'transparent';
                currentBtn.style.color = '#5b3e1a';
                map.flyTo([5, 45], 2);
                setTimeout(() => map.invalidateSize(), 300);
            });

            // Final resize after everything loads
            setTimeout(() => map.invalidateSize(), 400);
        }

        // ============================================================
        // 5. HELPER: Generate Dense, High-Intensity Points
        // ============================================================
        function generateVanillaPoints(scalar) {
            // Base hotspots with high base intensity (so they show up vividly)
            const regions = [
                // Madagascar / Comoros
                { lat: -18, lng: 48, intensity: 1.8 * scalar },
                { lat: -16, lng: 47, intensity: 1.6 * scalar },
                { lat: -14, lng: 49, intensity: 1.4 * scalar },
                { lat: -20, lng: 46, intensity: 1.1 * scalar },
                { lat: -12, lng: 44, intensity: 0.9 * scalar },
                // Indonesia / PNG
                { lat: -5, lng: 105, intensity: 1.5 * scalar },
                { lat: -3, lng: 120, intensity: 1.3 * scalar },
                { lat: -8, lng: 115, intensity: 1.2 * scalar },
                { lat: -9, lng: 148, intensity: 1.4 * scalar },
                // Mexico
                { lat: 20, lng: -98, intensity: 1.7 * scalar },
                { lat: 18, lng: -96, intensity: 1.5 * scalar },
                { lat: 16, lng: -94, intensity: 1.2 * scalar },
                // Uganda / East Africa
                { lat: 0, lng: 32, intensity: 1.0 * scalar },
                { lat: 1, lng: 33, intensity: 0.9 * scalar },
                // Costa Rica / Central America
                { lat: 10, lng: -85, intensity: 0.8 * scalar },
            ];

            const points = [];
            regions.forEach(region => {
                // Generate 30-50 dense points per region for a smooth heatmap
                const numPoints = Math.floor(Math.random() * 25) + 30;
                for (let i = 0; i < numPoints; i++) {
                    const latOffset = (Math.random() - 0.5) * 3.5;
                    const lngOffset = (Math.random() - 0.5) * 3.5;
                    // Intensity drops smoothly from center
                    const dist = Math.sqrt(latOffset * latOffset + lngOffset * lngOffset);
                    const distanceFactor = Math.max(0, 1 - (dist / 4.5));
                    // Add slight random variation
                    const finalIntensity = Math.max(0, region.intensity * distanceFactor * (0.85 + 0.15 * Math.random()));

                    // Only push if intensity is meaningful (> 0.05) to keep data clean
                    if (finalIntensity > 0.05) {
                        points.push([
                            region.lat + latOffset,
                            region.lng + lngOffset,
                            Math.min(finalIntensity, 2.5) // Cap at 2.5 to keep gradient sensible
                        ]);
                    }
                }
            });
            return points;
        }

        // --- Expose data to template ---
        return { acts };
    }
});

app.mount('#app');