const { createApp, ref, onMounted, nextTick } = Vue;

const app = createApp({
    setup() {
        const currentLang = ref('en');
        const translations = {
            en: {
                heroTitle: 'What Climate Change <br>Can Take From Us',
                heroSubtitle: 'The 500-year journey of vanilla—from sacred orchid to global obsession, and the climate crisis threatening its last breath.',
                publishedDate: 'Published July 18, 2026',
                readTime: '5 min read',
                beginStory: 'Begin the story',
                navHome: 'Home',
                navAbout: 'About',
                navStory: 'The Story',
                navData: 'Data',
                navMore: 'More',
                introTitle: 'Why this story matters',
                introText1: 'Vanilla is the world\'s second-most expensive spice. But behind its sweet aroma lies a fragile supply chain, reliant on <strong>one specific bee</strong>, <strong>one 12-year-old\'s hand-pollination method</strong>, and <strong>one climate-vulnerable island</strong>—Madagascar.',
                introText2: 'This interactive documentary uses climate data, trade routes, and price forecasts to trace how rising temperatures are rewriting the fate of an entire agricultural heritage. <strong>What happens when a crop\'s "perfect recipe" no longer exists anywhere on Earth?</strong>',
                scrollExplore: 'Scroll to explore',
                filterRegion: 'Filter by Region',
                allCountries: 'All Countries',
                footerData: 'Data sourced from FAOSTAT, World Bank, and CHELSA Climate Projections.',
                footerAssignment: 'Assignment for SEG3125 — Design & Interactive Media.',
                dataTitle: 'Data Sources',
                dataIntro: 'All data used in this interactive story comes from the following publicly available sources:',
                dataFaostat: 'Global vanilla production volumes by country (1961–present).',
                dataTrade: 'Import/export trade flows and commodity values.',
                dataChelsa: 'Future climate suitability scenarios (2050).',
                dataPrices: 'Historical vanilla price indices and market volatility.',
                dataDuke: 'Farmer surveys on climate impacts in Madagascar.',
                dataArchives: 'Historical Archives — Colonial records and agricultural timelines (1520–present).',
                dataNote: 'All datasets have been synthesized and normalized for narrative clarity.',
                moreTitle: 'About This Project',
                moreProject: 'The Last Bite is an interactive scrollytelling dashboard created as a design assignment for SEG3125 — Design and Interactive Media at the University of Ottawa.',
                moreGoal: 'The goal was to apply Gestalt design principles (Proximity, Similarity, Figure-Ground, Continuity, and Common Fate) to transform complex climate and agricultural data into a compelling, narrative-driven user experience.',
                moreExplore: 'This project explores how data visualization can humanize abstract statistics—turning vanilla\'s 500-year journey into a lens for understanding climate vulnerability.',
                morePortfolio: 'View My Portfolio',
                morePlaceholder: '(Replace this link with your actual portfolio URL)',
            },
            fr: {
                heroTitle: 'Ce que le changement climatique <br>peut nous enlever',
                heroSubtitle: 'Le voyage de 500 ans de la vanille—de l\'orchidée sacrée à l\'obsession mondiale, et la crise climatique qui menace son dernier souffle.',
                publishedDate: 'Publié le 18 juillet 2026',
                readTime: '5 min de lecture',
                beginStory: 'Commencer l\'histoire',
                navHome: 'Accueil',
                navAbout: 'À propos',
                navStory: 'L\'histoire',
                navData: 'Données',
                navMore: 'Plus',
                introTitle: 'Pourquoi cette histoire compte',
                introText1: 'La vanille est la deuxième épice la plus chère du monde. Mais derrière son arôme sucré se cache une chaîne d\'approvisionnement fragile, dépendante d\'<strong>une seule abeille</strong>, de la <strong>méthode de pollinisation manuelle d\'un jeune de 12 ans</strong> et d\'<strong>une île vulnérable au climat</strong>—Madagascar.',
                introText2: 'Ce documentaire interactif utilise des données climatiques, des routes commerciales et des prévisions de prix pour retracer comment la hausse des températures réécrit le destin d\'un patrimoine agricole entier. <strong>Que se passe-t-il lorsque la "recette parfaite" d\'une culture n\'existe plus nulle part sur Terre ?</strong>',
                scrollExplore: 'Défiler pour explorer',
                filterRegion: 'Filtrer par région',
                allCountries: 'Tous les pays',
                footerData: 'Données provenant de FAOSTAT, de la Banque mondiale et des projections climatiques CHELSA.',
                footerAssignment: 'Projet pour SEG3125 — Design et Médias Interactifs.',
                dataTitle: 'Sources de données',
                dataIntro: 'Toutes les données utilisées dans cette histoire interactive proviennent des sources publiques suivantes :',
                dataFaostat: 'Volumes de production mondiale de vanille par pays (1961–présent).',
                dataTrade: 'Flux commerciaux d\'importation/exportation et valeurs des matières premières.',
                dataChelsa: 'Scénarios de climat futur (2050).',
                dataPrices: 'Indices historiques des prix de la vanille et volatilité du marché.',
                dataDuke: 'Enquêtes auprès des agriculteurs sur les impacts climatiques à Madagascar.',
                dataArchives: 'Archives historiques — Documents coloniaux et chronologies agricoles (1520–présent).',
                dataNote: 'Tous les ensembles de données ont été synthétisés et normalisés pour plus de clarté narrative.',
                moreTitle: 'À propos de ce projet',
                moreProject: 'The Last Bite est un tableau de bord narratif interactif créé pour le projet de SEG3125 — Design et Médias Interactifs à l\'Université d\'Ottawa.',
                moreGoal: "L'objectif était d'appliquer les principes de conception Gestalt (Proximité, Similarité, Figure-Fond, Continuité et Destin Commun) pour transformer des données complexes sur le climat et l'agriculture en une expérience utilisateur narrative et convaincante.",
                moreExplore: "Ce projet explore comment la visualisation de données peut humaniser les statistiques abstraites—transformant le voyage de 500 ans de la vanille en un prisme pour comprendre la vulnérabilité climatique.",
                morePortfolio: 'Voir mon portfolio',
                morePlaceholder: '(Remplacez ce lien par votre URL de portfolio réelle)',
            }
        };

        const productionData = {
            all: [44, 29, 7, 10, 10],
            madagascar: [44, 0, 0, 0, 0],
            indonesia: [0, 29, 0, 0, 0],
            mexico: [0, 0, 7, 0, 0]
        };

        const acts = ref([
        
            {
                title: ' The Perfect Recipe',
                titleFr: ' La Recette Parfaite',
                text: `<em>Vanilla planifolia</em> is one of nature's most demanding crops. 
                       It needs <span class="highlight">27–29°C</span> days, 
                       <span class="highlight">70–80%</span> humidity, 
                       and rich volcanic soil. Miss any mark, and it simply won't fruit.`,
                textFr: `<em>Vanilla planifolia</em> est l'une des cultures les plus exigeantes de la nature. 
                         Elle a besoin de journées à <span class="highlight">27–29°C</span>, 
                         d'une humidité de <span class="highlight">70–80%</span> 
                         et d'un sol volcanique riche. Si l'une de ces conditions n'est pas remplie, 
                         elle ne donnera tout simplement pas de fruits.`,
                chartType: 'radar',
                data: {
                    labels: ['Temperature', 'Humidity', 'Altitude', 'Soil Organics', 'Shade'],
                    labelsFr: ['Température', 'Humidité', 'Altitude', 'Matière organique', 'Ombre'],
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
            // ACT II: Heatmap
            {
                title: ' The Vanilla Belt',
                titleFr: ' La Ceinture de la Vanille',
                text: `Currently, vanilla thrives in a narrow band <span class="highlight">20° north and south</span> of the equator. 
                       But look closely at the heatmap below. <strong>Red hotspots</strong> are ideal zones. 
                       Toggle the slider to see how these zones <strong>shift and shrink</strong> by 2050.`,
                textFr: `Actuellement, la vanille prospère dans une étroite bande <span class="highlight">à 20° nord et sud</span> de l'équateur. 
                         Mais regardez attentivement la carte de chaleur ci-dessous. Les <strong>zones rouges</strong> sont les zones idéales. 
                         Utilisez le curseur pour voir comment ces zones <strong>se déplacent et rétrécissent</strong> d'ici 2050.`,
                chartType: 'heatmap',
                data: null,
                options: null
            },
            // ACT III: Bar Chart
            {
                title: ' Who Grows It?',
                titleFr: ' Qui le Cultive ?',
                text: `Despite its global fame, <span class="highlight">80%</span> of the world's 
                       vanilla comes from a single region — the Sava district of Madagascar.`,
                textFr: `Malgré sa renommée mondiale, <span class="highlight">80%</span> de la vanille mondiale 
                         provient d'une seule région — le district de Sava à Madagascar.`,
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
            // ACT IV: Line Chart
            {
                title: ' Voyage Across Oceans',
                titleFr: ' Voyage à Travers les Océans',
                text: `From Mexico (1520) to Europe, then to Réunion where 
                       <span class="highlight">12-year-old Edmond Albius</span> 
                       invented hand-pollination in 1841.`,
                textFr: `Du Mexique (1520) à l'Europe, puis à La Réunion où 
                         <span class="highlight">Edmond Albius, âgé de 12 ans</span> 
                         a inventé la pollinisation manuelle en 1841.`,
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
            // ACT V: Dual-Axis
            {
                title: ' The Fragile Future',
                titleFr: ' L\'Avenir Fragile',
                text: `Madagascar is the <span class="highlight">4th most climate-vulnerable</span> 
                       country. By 2050, ideal zones in Mexico could shrink by 50%.`,
                textFr: `Madagascar est le <span class="highlight">4ème pays le plus vulnérable au climat</span> 
                         au monde. D'ici 2050, les zones de culture idéales au Mexique pourraient diminuer de 50%.`,
                chartType: 'bar',
                data: {
                    labels: ['2015', '2018', '2021', '2024', '2027 (proj)'],
                    datasets: [
                        { label: 'Production (k tons)', data: [3.2, 2.8, 2.5, 2.2, 1.9], backgroundColor: '#d94a38', order: 2 },
                        { label: 'Price Index (2015=100)', data: [100, 420, 280, 350, 500], type: 'line', borderColor: '#2c3e50', backgroundColor: 'rgba(44, 62, 80, 0.1)', tension: 0.3, fill: true, order: 1 }
                    ]
                },
                options: { plugins: { legend: { position: 'top' } } }
            },
            // ACT VI: Forecast
            {
                title: ' The Last Scoop',
                titleFr: 'La Dernière Bouchée',
                text: `The market hit <span class="highlight">$13.1 billion</span> in 2025. 
                       But this isn't abundance — it's scarcity driving prices up.`,
                textFr: `Le marché a atteint <span class="highlight">13,1 milliards de dollars</span> en 2025. 
                         Mais ce n'est pas l'abondance — c'est la rareté qui fait monter les prix.`,
                chartType: 'line',
                data: {
                    labels: ['2024', '2026', '2028', '2030', '2032', '2034', '2036'],
                    datasets: [
                        { label: 'Projected Price ($/kg)', data: [24, 28, 35, 42, 55, 60, 72], borderColor: '#3a2c1b', backgroundColor: 'rgba(58, 44, 27, 0.15)', fill: true, tension: 0.4 },
                        { label: 'Upper Bound', data: [30, 38, 48, 58, 72, 80, 95], borderColor: 'rgba(217, 74, 56, 0.3)', backgroundColor: 'rgba(217, 74, 56, 0.05)', borderDash: [5, 5], fill: false, tension: 0.4 },
                        { label: 'Lower Bound', data: [18, 20, 25, 30, 38, 42, 50], borderColor: 'rgba(217, 74, 56, 0.3)', backgroundColor: 'rgba(217, 74, 56, 0.05)', fill: '+1', borderDash: [5, 5], tension: 0.4 }
                    ]
                },
                options: { plugins: { legend: { position: 'top' } } }
            }
        ]);

        // --- Chart instances storage ---
        const chartInstances = ref([]);
        let mapRendered = false;

        // --- Interactivity: Update Bar Chart ---
        function updateBarChart(region) {
            if (!window.barChart) {
                console.warn('Bar chart not initialized yet');
                return;
            }
            const data = productionData[region] || productionData.all;
            window.barChart.data.datasets[0].data = data;
            window.barChart.update();
        }

        // --- Switch Language (and update radar chart labels) ---
        function switchLanguage(lang) {
            currentLang.value = lang;
           
            const radarChart = chartInstances.value[0];
            if (radarChart) {
                const act = acts.value[0];
                const labels = lang === 'fr' ? act.data.labelsFr : act.data.labels;
                radarChart.data.labels = labels;
                radarChart.update();
                console.log(` Radar chart labels updated to ${lang}`);
            }
        }

        // --- Heatmap Render (using iframe) ---
        function renderHeatmap() {
            const container = document.getElementById('chart-wrapper-1');
            if (!container) {
                console.error('Heatmap container not found');
                return;
            }
            container.innerHTML = '';
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
            container.style.background = 'transparent';
            container.style.boxShadow = 'none';
            container.style.padding = '0';
            container.style.height = '400px';
            const iframe = document.createElement('iframe');
            iframe.src = 'test-heatmap.html';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            iframe.style.borderRadius = '16px';
            iframe.style.background = '#ffffff';
            container.appendChild(iframe);
            console.log(' Heatmap iframe embedded.');
        }

      
        onMounted(() => {
            nextTick(() => {
                setTimeout(() => {
                   
                    acts.value.forEach((act, index) => {
                        if (index === 1) return;
                        const canvas = document.getElementById(`chart-${index}`);
                        if (!canvas) {
                            console.warn(`Canvas #chart-${index} not found — skipping`);
                            return;
                        }
                        console.log(` Initializing chart ${index} (${act.chartType})`);
                        
                        
                        if (index === 0) {
                            act.data.labels = currentLang.value === 'fr' ? act.data.labelsFr : act.data.labels;
                        }
                        
                        const ctx = canvas.getContext('2d');
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
                        // Store bar chart reference for interactivity
                        if (index === 2) {
                            window.barChart = chart;
                            console.log('📊 Bar chart stored for interactivity');
                        }
                    });

                    // Lazy-load heatmap when scrolled into view
                    const wrappers = document.querySelectorAll('.chart-wrapper');
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                entry.target.classList.add('visible');
                                if (entry.target.id === 'chart-wrapper-1' && !mapRendered) {
                                    mapRendered = true;
                                    renderHeatmap();
                                }
                            }
                        });
                    }, { threshold: 0.25 });
                    wrappers.forEach(w => observer.observe(w));

                    console.log(`🍦 Vue Scrollytelling ready! (${chartInstances.value.length} charts initialized)`);
                }, 100);
            });
        });

        // --- Expose data to template ---
        return {
            acts,
            currentLang,
            translations,
            updateBarChart,
            switchLanguage
        };
    }
});

app.mount('#app');

(function() {
    const dataModal = document.getElementById('data-modal');
    const moreModal = document.getElementById('more-modal');
    const dataLink = document.getElementById('data-link');
    const moreLink = document.getElementById('more-link');
    const closeData = document.getElementById('close-data');
    const closeMore = document.getElementById('close-more');

    function openModal(modal) {
        if (modal) modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    dataLink.addEventListener('click', (e) => { e.preventDefault();
        openModal(dataModal); });
    moreLink.addEventListener('click', (e) => { e.preventDefault();
        openModal(moreModal); });
    closeData.addEventListener('click', () => closeModal(dataModal));
    closeMore.addEventListener('click', () => closeModal(moreModal));
    dataModal.addEventListener('click', (e) => { if (e.target === dataModal) closeModal(dataModal); });
    moreModal.addEventListener('click', (e) => { if (e.target === moreModal) closeModal(moreModal); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { closeModal(dataModal);
            closeModal(moreModal); }
    });
})();