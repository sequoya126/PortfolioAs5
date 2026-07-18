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
        function renderHeatmap() {
            const mapContainer = document.getElementById('chart-wrapper-1');
            if (!mapContainer) return;

            // Clear any existing map content (in case of re-render)
            mapContainer.innerHTML = '';

            // Add a div specifically for the map
            const mapDiv = document.createElement('div');
            mapDiv.id = 'vanilla-map';
            mapDiv.style.width = '100%';
            mapDiv.style.height = '100%';
            mapDiv.style.borderRadius = '12px';
            mapContainer.appendChild(mapDiv);

            // Initialize Leaflet Map
            const map = L.map('vanilla-map').setView([0, 40], 2); // Centered on equator

            // Base tile layer (light, clean background for good Figure-Ground contrast)
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; CartoDB'
            }).addTo(map);

            // ----- MOCK DATA: Current Suitability (Lat, Lng, Intensity) -----
            // We generate points around major vanilla regions: Madagascar, Indonesia, Mexico, PNG, Uganda
            const currentData = generateVanillaPoints(1.0); // 1.0 = current climate
            const futureData = generateVanillaPoints(0.6); // 0.6 = degraded future (shrinking)

            // Add Current Heatmap Layer
            const heatLayer = L.heatLayer(currentData, {
                radius: 25,
                blur: 15,
                maxZoom: 10,
                gradient: {
                    0.2: '#fdf8f0', // Cream (low suitability)
                    0.4: '#e8d5bc', // Light tan
                    0.6: '#c5a67c', // Medium gold
                    0.8: '#9a5c3a', // Burnt orange
                    1.0: '#5b2a1a'  // Dark brown/red (perfect)
                }
            }).addTo(map);

            // Add a toggle control (Current / 2050)
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
            currentBtn.innerText = '🌱 Current';
            currentBtn.style.padding = '4px 14px';
            currentBtn.style.border = '2px solid #5b3e1a';
            currentBtn.style.borderRadius = '20px';
            currentBtn.style.background = '#5b3e1a';
            currentBtn.style.color = 'white';
            currentBtn.style.cursor = 'pointer';

            const futureBtn = document.createElement('button');
            futureBtn.innerText = '🔥 2050 (RCP 4.5)';
            futureBtn.style.padding = '4px 14px';
            futureBtn.style.border = '2px solid #5b3e1a';
            futureBtn.style.borderRadius = '20px';
            futureBtn.style.background = 'transparent';
            futureBtn.style.color = '#5b3e1a';
            futureBtn.style.cursor = 'pointer';

            controlDiv.appendChild(currentBtn);
            controlDiv.appendChild(futureBtn);

            // Position the control on the map (top-right)
            const controlPos = L.control({ position: 'topright' });
            controlPos.onAdd = function () { return controlDiv; };
            controlPos.addTo(map);

            // Toggle logic
            currentBtn.addEventListener('click', function () {
                heatLayer.setLatLngs(currentData);
                currentBtn.style.background = '#5b3e1a';
                currentBtn.style.color = 'white';
                futureBtn.style.background = 'transparent';
                futureBtn.style.color = '#5b3e1a';
                // Add a tiny animation to the map to signal change
                map.flyTo([0, 40], 2);
            });

            futureBtn.addEventListener('click', function () {
                heatLayer.setLatLngs(futureData);
                futureBtn.style.background = '#d94a38';
                futureBtn.style.color = 'white';
                currentBtn.style.background = 'transparent';
                currentBtn.style.color = '#5b3e1a';
                // Fly to a slightly different view to emphasize change
                map.flyTo([5, 45], 2);
            });

            // Trigger resize after a moment to ensure the map renders correctly
            setTimeout(() => map.invalidateSize(), 100);
        }

        // ============================================================
        // 5. HELPER: Generate Synthetic Vanilla Points
        // ============================================================
        function generateVanillaPoints(scalar) {
            // Base hotspots (lat, lng) with intensity modifiers
            // Scalar affects the intensity (1.0 = current, 0.5 = shrunk)
            const regions = [
                // Madagascar / Comoros (Indian Ocean)
                { lat: -18, lng: 48, intensity: 0.95 * scalar },
                { lat: -16, lng: 47, intensity: 0.85 * scalar },
                { lat: -14, lng: 49, intensity: 0.70 * scalar },
                { lat: -20, lng: 46, intensity: 0.60 * scalar },
                { lat: -12, lng: 44, intensity: 0.50 * scalar }, // Comoros
                // Indonesia / Papua New Guinea
                { lat: -5, lng: 105, intensity: 0.85 * scalar },
                { lat: -3, lng: 120, intensity: 0.75 * scalar },
                { lat: -8, lng: 115, intensity: 0.70 * scalar },
                { lat: -9, lng: 148, intensity: 0.80 * scalar }, // PNG
                // Mexico / Central America
                { lat: 20, lng: -98, intensity: 0.90 * scalar },
                { lat: 18, lng: -96, intensity: 0.85 * scalar },
                { lat: 16, lng: -94, intensity: 0.70 * scalar },
                // Uganda / East Africa
                { lat: 0, lng: 32, intensity: 0.60 * scalar },
                { lat: 1, lng: 33, intensity: 0.55 * scalar },
                // Small scattering to simulate spread
                { lat: -22, lng: 30, intensity: 0.20 * scalar }, // Southern Africa (low)
                { lat: 10, lng: -85, intensity: 0.40 * scalar }, // Costa Rica
            ];

            // Generate a dense scatter of points around each hotspot (for the heatmap to look smooth)
            const points = [];
            regions.forEach(region => {
                // Each hotspot generates 15-25 random nearby points
                const numPoints = Math.floor(Math.random() * 15) + 15;
                for (let i = 0; i < numPoints; i++) {
                    const latOffset = (Math.random() - 0.5) * 4.0; // ±2 degrees
                    const lngOffset = (Math.random() - 0.5) * 4.0;
                    // Intensity drops off slightly as you move away from the center
                    const distanceFactor = 1 - (Math.abs(latOffset) + Math.abs(lngOffset)) / 8;
                    const finalIntensity = Math.max(0, region.intensity * distanceFactor * (0.8 + 0.2 * Math.random()));

                    points.push([
                        region.lat + latOffset,
                        region.lng + lngOffset,
                        finalIntensity
                    ]);
                }
            });
            return points;
        }

        // --- Expose data to template ---
        return { acts };
    }
});

app.mount('#app');