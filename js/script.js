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
        onMounted(() => {
            nextTick(() => {
                // 1. Initialize all charts
                acts.value.forEach((act, index) => {
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
                    chartInstances.value.push(chart);
                });

                // 2. Set up Intersection Observer (Scroll Trigger)
                const wrappers = document.querySelectorAll('.chart-wrapper');
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                        }
                        // Optional: Remove class when out of view? 
                        // Keeping it visible once seen is better for scrollytelling.
                    });
                }, { threshold: 0.3 });

                wrappers.forEach(w => observer.observe(w));

                console.log('🍦 Vue Scrollytelling Dashboard ready!');
            });
        });

        // --- Expose data to template ---
        return { acts };
    }
});

app.mount('#app');