document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // CONFIGURATION: GOOGLE SHEET WEB APP URL
    // Copy and paste your deployed Google Apps Script web app URL here.
    // E.g. const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycb.../exec";
    // ==========================================================================
    const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxWbqfxKAyAJayzpVc4si0ttOkof9ybxQ5Pzkakr49GdZgXFV8CRLOFFHp68vLBlm8/exec";

    /* ==========================================================================
       0. STATIC DATASETS (EMBEDDED DATABASE)
       ========================================================================== */
    
    // Blog Articles Dataset
    const BLOGS_DATA = [
        {
            id: 1,
            title: "Sustainable Weight Loss: 5 Science-Backed Strategies",
            category: "Weight Loss",
            excerpt: "Ditch the crash diets and learn how to build sustainable, lifelong healthy eating habits based on clinical science.",
            image: "static/images/blog_weight_loss.webp",
            date: "June 10, 2026",
            read_time: "5 min read",
            content: `<h2>Introduction</h2>
                <p>Weight loss doesn't have to mean starvation. The most successful and sustainable transformations focus on nourishing the body, not depriving it. Here are 5 science-backed strategies to help you reach your goals without losing your energy or peace of mind.</p>
                
                <h3>1. Prioritize Protein and Fiber</h3>
                <p>Protein and fiber are the ultimate satiety boosters. Protein increases the release of fullness hormones like peptide YY and GLP-1, while reducing the hunger hormone ghrelin. Fiber expands in your stomach, slowing down digestion and keeping blood sugar levels stable.</p>
                
                <h3>2. Master Portion Control, Not Calorie Restricting</h3>
                <p>Instead of meticulously weighing every gram of food, focus on plate composition. Fill half your plate with non-starchy vegetables, a quarter with lean protein, and a quarter with complex carbohydrates. Add a dash of healthy fats (like ghee, olive oil, or seeds).</p>
                
                <h3>3. Stay Hydrated Throughout the Day</h3>
                <p>Sometimes, our brains confuse thirst with hunger. Drinking a glass of warm water before meals can aid digestion and prevent overeating. Avoid drinking calories in the form of packed juices or sodas; opt for infused water, buttermilk, or herbal teas.</p>
                
                <h3>4. Optimize Your Sleep Quality</h3>
                <p>Sleep is a critical pillar of weight management. Poor sleep disrupts cortisol (stress hormone) levels and raises ghrelin, leading to intense cravings for sugary, high-calorie foods. Aim for 7 to 8 hours of quality rest every night.</p>
                
                <h3>5. Practice Mindful Eating</h3>
                <p>In our busy lives, we often eat in front of screens or on the go. This leads to distracted eating, where we don't realize when we are full. Sit down, chew your food thoroughly, savor the flavors, and listen to your body's satiety signals.</p>`
        },
        {
            id: 2,
            title: "Managing PCOS Naturally: The Power of Anti-Inflammatory Foods",
            category: "PCOS Diet",
            excerpt: "Discover how dietary shifts can reduce insulin resistance, balance hormones, and manage PCOS symptoms naturally.",
            image: "static/images/blog_pcos.webp",
            date: "June 8, 2026",
            read_time: "7 min read",
            content: `<h2>Understanding PCOS and Diet</h2>
                <p>Polycystic Ovary Syndrome (PCOS) is a hormonal imbalance that affects millions of women. While medication can help, nutrition is the foundation of long-term management. Since chronic low-grade inflammation and insulin resistance are primary drivers of PCOS, an anti-inflammatory diet can work wonders.</p>
                
                <h3>1. Focus on Low Glycemic Index (GI) Foods</h3>
                <p>Low GI foods release sugar slowly into the bloodstream, preventing insulin spikes. Replace white rice and maida with whole grains like oats, quinoa, brown rice, and ragi. This helps regulate ovulation and reduce androgen (male hormone) production.</p>
                
                <h3>2. Load Up on Anti-Inflammatory Antioxidants</h3>
                <p>Include colorful fruits, green leafy vegetables, tomatoes, and berries in your diet. Spices like turmeric (curcumin) and ginger have strong anti-inflammatory properties that soothe the ovaries and improve insulin sensitivity.</p>
                
                <h3>3. Don't Fear Healthy Fats</h3>
                <p>Healthy fats are crucial for hormone synthesis. Incorporate avocados, walnuts, almonds, chia seeds, and cold-pressed oils. Omega-3 fatty acids found in seeds and fatty fish help reduce testosterone levels and regulate menstrual cycles.</p>
                
                <h3>4. Incorporate Spearmint Tea</h3>
                <p>Spearmint tea has been clinically shown to have mild anti-androgenic effects. Drinking two cups a day can help reduce hirsutism (excess body hair growth) and improve skin clarity by lowering free testosterone levels.</p>
                
                <h3>5. Limit Dairy and Refined Sugar</h3>
                <p>For many women with PCOS, dairy and refined sugars can trigger inflammation and worsen acne. Try reducing dairy intake for a few weeks to see if your symptoms improve, and satisfy your sweet tooth with natural sweeteners like dates or moderate amounts of raw honey.</p>`
        },
        {
            id: 3,
            title: "5 High-Protein Indian Breakfast Ideas for Fat Loss",
            category: "Recipes",
            excerpt: "Start your morning with these simple, nutrient-dense, and delicious high-protein vegetarian Indian breakfast options.",
            image: "static/images/blog_recipes.webp",
            date: "June 5, 2026",
            read_time: "4 min read",
            content: `<h2>Why Breakfast Matters for Fat Loss</h2>
                <p>A high-protein breakfast stabilizes your blood sugar levels, reduces cravings later in the day, and keeps your metabolic furnace burning. Traditional Indian breakfasts can sometimes be carb-heavy. Here are 5 delicious ways to add a powerful protein punch to your morning routine.</p>
                
                <h3>1. Paneer and Veggie Besan Chilla</h3>
                <p>Chickpea flour (besan) is naturally high in protein and gluten-free. Mix besan with grated vegetables (carrots, bell peppers, spinach) and make thin crepes. Stuff them with 50g of crumbled low-fat paneer for a breakfast containing over 18g of clean protein.</p>
                
                <h3>2. Sprouted Moong Dal Chaat</h3>
                <p>Sprouted green moong dal is alive with enzymes, fiber, and protein. Toss sprouts with chopped cucumber, tomato, green chilies, coriander, lemon juice, and a pinch of chaat masala. It requires no cooking and is extremely refreshing.</p>
                
                <h3>3. Savory Oats Rava Idli with Curd</h3>
                <p>Blend rolled oats into a powder and mix with semolina (rava), curd, and grated carrots. Steam them like traditional idlis. Oats are rich in beta-glucan (soluble fiber) and when paired with curd, they provide a rich protein and prebiotic profile.</p>
                
                <h3>4. Tofu Scramble (Bhurji) with Multigrain Toast</h3>
                <p>For a vegan alternative to egg bhurji, crumble fresh tofu and sauté it with onions, tomatoes, turmeric, and coriander. Serve it alongside a slice of toasted multigrain bread for a balanced, protein-packed start.</p>
                
                <h3>5. Sattu Buttermilk (Sattu Ghol)</h3>
                <p>Sattu (roasted gram flour) is known as the poor man's protein powder in India, but it's a nutritional powerhouse. Whisk 3 tablespoons of sattu in low-fat curd or water, add roasted cumin powder, black salt, and coriander. This high-fiber, high-protein drink is incredibly filling and keeps you hydrated.</p>`
        }
    ];

    // Local Recipes Database for Fridge Matcher
    const RECIPES_DATA = [
        {
            keywords: ["paneer", "spinach", "palak"],
            recipeName: "Paneer Palak Bhurji",
            prepTime: "15 mins",
            calories: "220 kcal",
            macros: { protein: "16g", carbs: "8g", fat: "11g", fiber: "4g" },
            ingredientsList: ["Crumble Low-fat Paneer (80g)", "Finely chopped Spinach (1 cup)", "Onion & Tomato (1/2 cup)", "Turmeric & Jeera powder (1 tsp)"],
            instructions: ["Sauté onions and tomatoes in 1 tsp oil.", "Add spices and chopped spinach; cook for 3 mins.", "Stir in crumbled paneer and simmer for 2 mins. Serve warm."],
            healthBenefit: "Highly anti-inflammatory and excellent for low-carb PCOS insulin regulation."
        },
        {
            keywords: ["chickpeas", "chana", "cucumber", "tomato"],
            recipeName: "Spiced Chickpea Salad Bowl",
            prepTime: "10 mins",
            calories: "190 kcal",
            macros: { protein: "9g", carbs: "24g", fat: "3g", fiber: "7g" },
            ingredientsList: ["Boiled Chickpeas (1 cup)", "Chopped Cucumber & Tomato (1 cup)", "Lemon juice & Mint leaves", "Chaat Masala & Roasted Cumin"],
            instructions: ["Drain boiled chickpeas and toss in a large bowl.", "Add cucumber, tomato, mint, and spices.", "Squeeze fresh lemon juice over it and mix thoroughly. Enjoy fresh!"],
            healthBenefit: "High fiber and complex carbs prevent glucose spikes, ideal for Diabetes control."
        },
        {
            keywords: ["oats", "curd", "carrot"],
            recipeName: "Savory Oats Idli",
            prepTime: "25 mins",
            calories: "240 kcal",
            macros: { protein: "10g", carbs: "32g", fat: "4g", fiber: "6g" },
            ingredientsList: ["Powdered Rolled Oats (1/2 cup)", "Low-fat Curd (1/2 cup)", "Grated Carrots & Mustard seeds", "Pinch of Baking Soda"],
            instructions: ["Mix oats, curd, carrots, and warm water into a batter. Let rest.", "Temper with mustard seeds and add baking soda.", "Steam in idli molds for 12 mins. Serve with mint chutney."],
            healthBenefit: "Contains beta-glucan fiber which helps lower cholesterol and stabilize gut health."
        },
        {
            keywords: ["tofu", "peppers", "capsicum", "onion"],
            recipeName: "High Protein Tofu Sauté",
            prepTime: "15 mins",
            calories: "210 kcal",
            macros: { protein: "15g", carbs: "12g", fat: "8g", fiber: "5g" },
            ingredientsList: ["Firm Tofu cubes (100g)", "Sliced Capsicum & Onions (1 cup)", "Ginger-Garlic paste (1 tsp)", "Black Pepper & Soy Sauce (1 tsp)"],
            instructions: ["Sauté ginger-garlic paste and onions in 1 tsp olive oil.", "Toss capsicum and tofu cubes in. Sauté on high for 5 mins.", "Season with soy sauce and black pepper. Serve hot."],
            healthBenefit: "Excellent plant protein source for muscle recovery and metabolic rate speedup."
        },
        {
            keywords: ["sattu", "curd", "coriander"],
            recipeName: "Sattu Vitality Drink",
            prepTime: "5 mins",
            calories: "160 kcal",
            macros: { protein: "8g", carbs: "20g", fat: "2g", fiber: "6g" },
            ingredientsList: ["Roasted Gram Flour / Sattu (3 tbsp)", "Chilled Water (300ml)", "Black Salt & Lemon juice", "Chopped Coriander & Roasted Jeera"],
            instructions: ["Whisk sattu, black salt, and lemon juice into chilled water until smooth.", "Garnish with fresh coriander and roasted jeera powder.", "Drink immediately on an empty stomach for cooling digestion."],
            healthBenefit: "Rich in plant protein and dietary fiber, keeping you full for hours."
        }
    ];

    /* ==========================================================================
       1. STATIC PAGE ROUTER HELPERS
       ========================================================================== */
    const isHomepage = document.body.classList.contains('home-page-body');
    const navbar = document.getElementById('navbar');
    
    // Navbar Scroll Background Change
    function handleScroll() {
        if (navbar) {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    // Mobile menu drawer toggle
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const drawerCloseBtn = document.getElementById('drawer-close-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    
    if (hamburgerBtn && mobileDrawer) {
        hamburgerBtn.addEventListener('click', () => mobileDrawer.classList.add('open'));
    }
    if (drawerCloseBtn && mobileDrawer) {
        drawerCloseBtn.addEventListener('click', () => mobileDrawer.classList.remove('open'));
    }

    /* ==========================================================================
       2. TESTIMONIALS CAROUSEL
       ========================================================================== */
    const carouselTrack = document.getElementById('carousel-track');
    const carouselPrev = document.getElementById('carousel-prev');
    const carouselNext = document.getElementById('carousel-next');
    const indicators = document.querySelectorAll('#carousel-indicators .indicator');
    const slides = document.querySelectorAll('.testimonial-slide');
    
    if (carouselTrack && slides.length > 0) {
        let currentSlide = 0;
        let autoTimer;
        
        function updateCarousel(index) {
            currentSlide = index;
            if (currentSlide < 0) currentSlide = slides.length - 1;
            if (currentSlide >= slides.length) currentSlide = 0;
            
            carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            indicators.forEach((ind, i) => {
                if (i === currentSlide) ind.classList.add('active');
                else ind.classList.remove('active');
            });
        }
        
        function startAuto() {
            autoTimer = setInterval(() => updateCarousel(currentSlide + 1), 5000);
        }
        function stopAuto() {
            clearInterval(autoTimer);
        }
        
        if (carouselPrev) {
            carouselPrev.addEventListener('click', () => {
                stopAuto(); updateCarousel(currentSlide - 1); startAuto();
            });
        }
        if (carouselNext) {
            carouselNext.addEventListener('click', () => {
                stopAuto(); updateCarousel(currentSlide + 1); startAuto();
            });
        }
        indicators.forEach(ind => {
            ind.addEventListener('click', function() {
                stopAuto();
                updateCarousel(parseInt(this.getAttribute('data-slide')));
                startAuto();
            });
        });
        
        carouselTrack.addEventListener('mouseenter', stopAuto);
        carouselTrack.addEventListener('mouseleave', startAuto);
        
        updateCarousel(0);
        startAuto();
    }

    /* ==========================================================================
       3. CLINICAL HEALTH MATRIX SLIDERS
       ========================================================================== */
    const waterSlider = document.getElementById('water-slider');
    const sleepSlider = document.getElementById('sleep-slider');
    const activitySlider = document.getElementById('activity-slider');
    
    if (waterSlider && sleepSlider && activitySlider) {
        const waterVal = document.getElementById('water-val');
        const sleepVal = document.getElementById('sleep-val');
        const activityVal = document.getElementById('activity-val');
        
        const metabolicFill = document.getElementById('metabolic-fill');
        const inflammationFill = document.getElementById('inflammation-fill');
        const vitalityFill = document.getElementById('vitality-fill');
        
        const metabolicText = document.getElementById('metabolic-text');
        const inflammationText = document.getElementById('inflammation-text');
        const vitalityText = document.getElementById('vitality-text');
        
        const ARC_CIRCUMFERENCE = 251.2;
        
        function updateMatrix() {
            const water = parseFloat(waterSlider.value);
            const sleep = parseFloat(sleepSlider.value);
            const activity = parseFloat(activitySlider.value);
            
            waterVal.textContent = `${water} Liters`;
            sleepVal.textContent = `${sleep} Hours`;
            activityVal.textContent = `${activity} Minutes`;
            
            // Metabolic Calculation
            const wMet = Math.min(1.0, water / 3.0);
            const sMet = Math.min(1.0, sleep / 8.0);
            const aMet = Math.min(1.0, activity / 45.0);
            const metabolicScore = Math.round((wMet * 30) + (sMet * 30) + (aMet * 40));
            
            // Inflammation Calculation
            let sInf = (sleep <= 8) ? (sleep - 4) / 4 : Math.max(0.5, 1.0 - (sleep - 8) * 0.25);
            let wInf = Math.min(1.0, water / 3.5);
            let aInf = (activity <= 45) ? activity / 45 : Math.max(0.6, 1.0 - (activity - 45) * 0.01);
            const inflammationScore = Math.round((sInf * 45) + (wInf * 30) + (aInf * 25));
            
            // Vitality Score
            const vitalityScore = Math.round((metabolicScore * 0.5) + (inflammationScore * 0.5));
            
            updateArc(metabolicFill, metabolicText, metabolicScore, true);
            updateArc(inflammationFill, inflammationText, inflammationScore, true);
            updateArc(vitalityFill, vitalityText, vitalityScore, false);
        }
        
        function updateArc(element, textElement, score, showPercent) {
            const offset = ARC_CIRCUMFERENCE - (score / 100) * ARC_CIRCUMFERENCE;
            element.style.strokeDashoffset = offset;
            textElement.textContent = showPercent ? `${score}%` : score;
        }
        
        [waterSlider, sleepSlider, activitySlider].forEach(slider => {
            slider.addEventListener('input', updateMatrix);
        });
        
        updateMatrix();
    }

    /* ==========================================================================
       4. CLIENT-SIDE RECIPE BUILDER
       ========================================================================== */
    const tagsContainer = document.getElementById('tags-input-box');
    const ingredientInput = document.getElementById('ingredient-input');
    const btnBuildRecipe = document.getElementById('btn-build-recipe');
    
    if (tagsContainer && ingredientInput && btnBuildRecipe) {
        let enteredIngredients = [];
        
        function addTag(text) {
            text = text.trim().toLowerCase();
            if (text && !enteredIngredients.includes(text)) {
                enteredIngredients.push(text);
                
                const tagEl = document.createElement('span');
                tagEl.className = 'ingredient-tag';
                tagEl.innerHTML = `${text} <span class="tag-remove">&times;</span>`;
                
                tagEl.querySelector('.tag-remove').addEventListener('click', () => {
                    enteredIngredients = enteredIngredients.filter(item => item !== text);
                    tagEl.remove();
                });
                
                tagsContainer.insertBefore(tagEl, ingredientInput);
            }
            ingredientInput.value = '';
        }
        
        ingredientInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                addTag(ingredientInput.value);
            }
        });
        
        btnBuildRecipe.addEventListener('click', () => {
            addTag(ingredientInput.value);
            
            if (enteredIngredients.length === 0) {
                alert("Please add at least one ingredient!");
                return;
            }
            
            const recipePlaceholder = document.getElementById('recipe-placeholder');
            const recipeLoader = document.getElementById('recipe-loader');
            const recipeCardResult = document.getElementById('recipe-card-result');
            
            recipePlaceholder.classList.add('hidden');
            recipeLoader.classList.remove('hidden');
            recipeCardResult.classList.add('hidden');
            
            setTimeout(() => {
                // Find matching recipe in local database
                let matched = null;
                for (let rec of RECIPES_DATA) {
                    // Check if user ingredients contain any of keywords
                    const intersection = rec.keywords.filter(keyword => enteredIngredients.some(userInput => userInput.includes(keyword) || keyword.includes(userInput)));
                    if (intersection.length > 0) {
                        matched = rec;
                        break;
                    }
                }
                
                // Fallback recipe if no matches found
                if (!matched) {
                    matched = {
                        recipeName: `Custom Health Salad (${enteredIngredients.join(' & ')})`,
                        prepTime: "10 mins",
                        calories: "180 kcal",
                        macros: { protein: "8g", carbs: "15g", fat: "4g", fiber: "5g" },
                        ingredientsList: enteredIngredients.map(ing => `${ing.charAt(0).toUpperCase() + ing.slice(1)} (As available)`).concat(["Tossed Mixed Seeds (1 tbsp)", "Lemon & Olive Oil dressing"]),
                        instructions: ["Rinse and chop ingredients into a bowl.", "Toss with lemon juice, salt, pepper, and seeds.", "Serve fresh for immediate fiber-dense metabolic support."],
                        healthBenefit: "Highly customizable whole food fibers enhance digestion and clean insulin absorption."
                    };
                }
                
                // Populate DOM
                document.getElementById('res-recipe-name').textContent = matched.recipeName;
                document.getElementById('res-prep-time').textContent = matched.prepTime;
                document.getElementById('res-calories').textContent = matched.calories;
                document.getElementById('res-protein').textContent = matched.macros.protein;
                document.getElementById('res-carbs').textContent = matched.macros.carbs;
                document.getElementById('res-fat').textContent = matched.macros.fat;
                document.getElementById('res-fiber').textContent = matched.macros.fiber;
                
                const ingList = document.getElementById('res-ingredients');
                ingList.innerHTML = '';
                matched.ingredientsList.forEach(ing => {
                    const li = document.createElement('li');
                    li.textContent = ing;
                    ingList.appendChild(li);
                });
                
                const instList = document.getElementById('res-instructions');
                instList.innerHTML = '';
                matched.instructions.forEach(step => {
                    const li = document.createElement('li');
                    li.textContent = step;
                    instList.appendChild(li);
                });
                
                document.getElementById('res-benefit').textContent = matched.healthBenefit;
                
                recipeLoader.classList.add('hidden');
                recipeCardResult.classList.remove('hidden');
            }, 1200);
        });
    }

    /* ==========================================================================
       5. SERVICES MODALS
       ========================================================================== */
    const openModalBtns = document.querySelectorAll('.btn-open-modal');
    const closeModalBtns = document.querySelectorAll('.modal-close');
    const modals = document.querySelectorAll('.modal');
    
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const service = btn.getAttribute('data-service');
            let target;
            if (service === 'weight-loss') target = document.getElementById('modal-weight-loss');
            else if (service === 'clinical') target = document.getElementById('modal-clinical');
            else if (service === 'online-consult') target = document.getElementById('modal-online-consult');
            else if (service === 'meal-plans') target = document.getElementById('modal-meal-plans');
            
            if (target) target.classList.add('open');
        });
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => modals.forEach(m => m.classList.remove('open')));
    });
    
    window.addEventListener('click', (e) => {
        modals.forEach(m => { if (e.target === m) m.classList.remove('open'); });
    });

    /* ==========================================================================
       6. MULTI-STEP LOCAL BOOKING WIZARD
       ========================================================================== */
    const bookingSteps = [
        document.getElementById('step-1'),
        document.getElementById('step-2'),
        document.getElementById('step-3'),
        document.getElementById('step-4'),
        document.getElementById('step-5')
    ];
    
    if (bookingSteps[0]) {
        let currentStep = 1;
        const bookingBackBtn = document.getElementById('btn-booking-back');
        const bookingNextBtn = document.getElementById('btn-booking-next');
        const progressBarFill = document.getElementById('booking-progress-fill');
        const progressStepTitle = document.getElementById('booking-step-title');
        const progressStepNum = document.getElementById('booking-step-num');
        const bookingNavBox = document.getElementById('booking-nav-buttons');
        
        let selectedService = '';
        let selectedPrice = '';
        let selectedDate = '';
        let selectedTime = '';
        let clientName = '';
        let clientEmail = '';
        let clientPhone = '';
        let clientGoal = '';
        
        // Auto-select service if passed in url query params
        const urlParams = new URLSearchParams(window.location.search);
        const queryService = urlParams.get('service');
        if (queryService) {
            const matchedRadio = document.querySelector(`input[name="booking_service"][value="${queryService}"]`);
            if (matchedRadio) {
                matchedRadio.checked = true;
            }
        }
        
        const stepTitles = [
            "Step 1: Select Service",
            "Step 2: Pick Date & Time",
            "Step 3: Enter Details",
            "Step 4: Complete Payment",
            "Booking Confirmed!"
        ];
        
        function updateStep(step) {
            currentStep = step;
            bookingSteps.forEach((el, i) => {
                if (i === currentStep - 1) el.classList.remove('hidden');
                else el.classList.add('hidden');
            });
            
            progressBarFill.style.width = `${(currentStep / 5) * 100}%`;
            progressStepTitle.textContent = stepTitles[currentStep - 1];
            progressStepNum.textContent = `Step ${currentStep} of 5`;
            
            if (currentStep === 1 || currentStep === 5) bookingBackBtn.classList.add('hidden');
            else bookingBackBtn.classList.remove('hidden');
            
            if (currentStep === 4) {
                bookingNextBtn.textContent = `Pay Securely (₹${selectedPrice})`;
            } else {
                bookingNextBtn.textContent = "Next Step";
            }
            
            if (currentStep === 5) bookingNavBox.classList.add('hidden');
            else bookingNavBox.classList.remove('hidden');
        }
        
        bookingBackBtn.addEventListener('click', () => {
            if (currentStep > 1) updateStep(currentStep - 1);
        });
        
        bookingNextBtn.addEventListener('click', () => {
            if (currentStep === 1) {
                const radio = document.querySelector('input[name="booking_service"]:checked');
                if (!radio) { alert("Please choose a service."); return; }
                selectedService = radio.value;
                selectedPrice = radio.getAttribute('data-price');
                initCalendar();
                updateStep(2);
            } 
            else if (currentStep === 2) {
                if (!selectedDate) { alert("Select a date."); return; }
                const slot = document.querySelector('input[name="booking_slot"]:checked');
                if (!slot) { alert("Select a time slot."); return; }
                selectedTime = slot.value;
                updateStep(3);
            } 
            else if (currentStep === 3) {
                clientName = document.getElementById('bk-name').value.trim();
                clientEmail = document.getElementById('bk-email').value.trim();
                clientPhone = document.getElementById('bk-phone').value.trim();
                clientGoal = document.getElementById('bk-goal').value.trim();
                
                if (!clientName || !clientEmail || !clientPhone) {
                    alert("Name, Email, and Phone number are required.");
                    return;
                }
                document.getElementById('pay-total-amount').textContent = `₹${selectedPrice}`;
                updateStep(4);
            } 
            else if (currentStep === 4) {
                bookingNextBtn.disabled = true;
                bookingNextBtn.textContent = "Processing payment...";
                
                setTimeout(() => {
                    const newBooking = {
                        id: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
                        name: clientName,
                        email: clientEmail,
                        phone: clientPhone,
                        service: selectedService,
                        date: selectedDate,
                        time: selectedTime,
                        goal: clientGoal
                    };
                    
                    // Save booking in localStorage
                    const localBookings = JSON.parse(localStorage.getItem('nutrislims_bookings') || '[]');
                    localBookings.push(newBooking);
                    localStorage.setItem('nutrislims_bookings', JSON.stringify(localBookings));

                    const finalizeBooking = () => {
                        // Populate step 5
                        document.getElementById('conf-service').textContent = selectedService;
                        document.getElementById('conf-date').textContent = selectedDate;
                        document.getElementById('conf-time').textContent = selectedTime;
                        document.getElementById('conf-ref').textContent = newBooking.id;
                        bookingNextBtn.disabled = false;
                        updateStep(5);
                    };

                    if (GOOGLE_SHEET_WEB_APP_URL) {
                        fetch(GOOGLE_SHEET_WEB_APP_URL, {
                            method: "POST",
                            mode: "no-cors",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                type: "booking",
                                ...newBooking
                            })
                        }).then(() => {
                            finalizeBooking();
                        }).catch(err => {
                            console.error("Sheets booking error:", err);
                            finalizeBooking();
                        });
                    } else {
                        finalizeBooking();
                    }
                }, 1500);
            }
                    
                    bookingNextBtn.disabled = false;
                    updateStep(5);
                }, 1500);
            }
        });
        
        // Step 4 Switch Cards
        const pmCard = document.getElementById('pm-card');
        const pmUpi = document.getElementById('pm-upi');
        const cardFieldsBox = document.getElementById('card-fields-box');
        const upiFieldsBox = document.getElementById('upi-fields-box');
        
        if (pmCard && pmUpi) {
            pmCard.addEventListener('change', () => {
                cardFieldsBox.classList.remove('hidden'); upiFieldsBox.classList.add('hidden');
            });
            pmUpi.addEventListener('change', () => {
                cardFieldsBox.classList.add('hidden'); upiFieldsBox.classList.remove('hidden');
            });
        }
        
        // Calendar Grid
        let calYear = 2026;
        let calMonth = 5; // June
        
        function initCalendar() {
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            document.getElementById('calendar-month-year').textContent = `${months[calMonth]} ${calYear}`;
            
            const daysContainer = document.getElementById('calendar-days-container');
            daysContainer.innerHTML = '';
            
            ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(d => {
                const el = document.createElement('div'); el.className = 'calendar-day-header'; el.textContent = d; daysContainer.appendChild(el);
            });
            
            const firstIndex = new Date(calYear, calMonth, 1).getDay();
            const daysCount = new Date(calYear, calMonth + 1, 0).getDate();
            
            for (let i = 0; i < firstIndex; i++) daysContainer.appendChild(document.createElement('div'));
            
            const today = new Date();
            for (let day = 1; day <= daysCount; day++) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'calendar-day-btn';
                btn.textContent = day;
                
                const thisDate = new Date(calYear, calMonth, day);
                const thisDateStr = `${calYear}-${String(calMonth+1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                
                if (thisDate.getDay() === 0 || thisDate < today.setHours(0,0,0,0)) {
                    btn.disabled = true;
                }
                
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.calendar-day-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    selectedDate = thisDateStr;
                    generateTimeSlots(thisDateStr);
                });
                
                daysContainer.appendChild(btn);
            }
        }
        
        document.getElementById('cal-prev-month').addEventListener('click', () => {
            calMonth--; if (calMonth < 0) { calMonth = 11; calYear--; }
            initCalendar();
        });
        document.getElementById('cal-next-month').addEventListener('click', () => {
            calMonth++; if (calMonth > 11) { calMonth = 0; calYear++; }
            initCalendar();
        });
        
        function generateTimeSlots(dateStr) {
            const slotsContainer = document.getElementById('slots-container');
            slotsContainer.innerHTML = '';
            
            const defaultTimes = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];
            const localBookings = JSON.parse(localStorage.getItem('nutrislims_bookings') || '[]');
            
            defaultTimes.forEach((time, index) => {
                const isBooked = localBookings.some(bk => bk.date === dateStr && bk.time === time);
                
                const wrapper = document.createElement('div');
                const disabledAttr = isBooked ? 'disabled' : '';
                const opacityStyle = isBooked ? 'style="opacity:0.4; cursor:not-allowed;"' : '';
                
                wrapper.innerHTML = `
                    <input type="radio" name="booking_slot" id="sl-${index}" value="${time}" class="slot-radio" ${disabledAttr}>
                    <label for="sl-${index}" class="slot-label" ${opacityStyle}>${time}</label>
                `;
                slotsContainer.appendChild(wrapper);
            });
        }
        
        updateStep(1);
    }

    /* ==========================================================================
       7. AI DIET QUIZ SLIDER FLOW (CLIENT-SIDE SCORING)
       ========================================================================== */
    const quizWizardCard = document.getElementById('quiz-wizard-card');
    const quizEmailCard = document.getElementById('quiz-email-card');
    const quizResultsCard = document.getElementById('quiz-results-card');
    
    if (quizWizardCard) {
        let currentQuizStep = 1;
        const totalQuizSteps = 8;
        const quizScreens = document.querySelectorAll('.quiz-question-screen');
        const quizBackBtn = document.getElementById('btn-quiz-back');
        const quizNextBtn = document.getElementById('btn-quiz-next');
        const quizFill = document.getElementById('quiz-progress-fill');
        const quizProgressText = document.getElementById('quiz-progress-text');
        
        const quizAnswers = {};
        
        function updateQuizStep(step) {
            currentQuizStep = step;
            quizScreens.forEach((screen) => {
                const screenStep = parseInt(screen.getAttribute('data-step'));
                screen.classList.remove('active', 'prev', 'next');
                
                if (screenStep === currentQuizStep) screen.classList.add('active');
                else if (screenStep < currentQuizStep) screen.classList.add('prev');
                else screen.classList.add('next');
            });
            
            quizFill.style.width = `${(currentQuizStep / totalQuizSteps) * 100}%`;
            quizProgressText.textContent = `Question ${currentQuizStep} of ${totalQuizSteps}`;
            
            if (currentQuizStep === 1) quizBackBtn.classList.add('hidden');
            else quizBackBtn.classList.remove('hidden');
            
            if (currentQuizStep === totalQuizSteps) quizNextBtn.textContent = "Compile Results";
            else quizNextBtn.textContent = "Next Question";
        }
        
        quizBackBtn.addEventListener('click', () => {
            if (currentQuizStep > 1) updateQuizStep(currentQuizStep - 1);
        });
        
        quizNextBtn.addEventListener('click', () => {
            const activeScreen = document.querySelector('.quiz-question-screen.active');
            const checkedOption = activeScreen.querySelector('input[type="radio"]:checked');
            if (!checkedOption) { alert("Please select an option."); return; }
            
            quizAnswers[currentQuizStep] = checkedOption.value;
            
            if (currentQuizStep < totalQuizSteps) {
                updateQuizStep(currentQuizStep + 1);
            } else {
                quizWizardCard.classList.add('hidden');
                quizEmailCard.classList.remove('hidden');
            }
        });
        
        const leadForm = document.getElementById('quiz-lead-form');
        if (leadForm) {
            leadForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('qz-email').value;
                const phone = document.getElementById('qz-phone').value;
                
                const leadSubmitBtn = leadForm.querySelector('button[type="submit"]');
                leadSubmitBtn.disabled = true;
                leadSubmitBtn.textContent = "Analyzing profile...";
                
                setTimeout(() => {
                    // Evaluate personality archetype
                    const goal = quizAnswers[1];
                    const conditions = quizAnswers[5];
                    const activity = quizAnswers[3];
                    
                    let result = {
                        personality: "Clean Eater",
                        icon: "🌿",
                        description: "You focus on clean longevity and functional wellness. Your digestive system is balanced, meaning you respond exceptionally well to whole, single-ingredient foods, color-rich antioxidants, and light grains.",
                        tip: "Follow the 'Rainbow Plate' concept — ensure your lunch and dinner contain at least 3 different colors of fresh vegetables.",
                        foods: ["Fresh Fruits", "Leafy Greens", "Amla Juice", "Warm Lemon Water", "Millets"]
                    };
                    
                    if (conditions === 'Diabetes' || conditions === 'PCOS' || conditions === 'Thyroid') {
                        result = {
                            personality: "Gut Healer",
                            icon: "🛡️",
                            description: "Your endocrine and digestive systems require gentle, anti-inflammatory support. You thrive on prebiotics, fermented foods, and fiber that stabilize hormone spikes, soothe PCOS symptoms, and regulate insulin levels.",
                            tip: "Add 1 tbsp of soaked chia seeds to your morning routine and switch to Spearmint tea to soothe systemic inflammation.",
                            foods: ["Ginger & Turmeric", "Spearmint Tea", "Walnuts", "Prebiotic Fiber (Oats)", "Buttermilk"]
                        };
                    } else if (goal === 'Weight Loss') {
                        result = {
                            personality: "Metabolic Booster",
                            icon: "⚡",
                            description: "Your profile is geared towards optimized fat oxidation and lean muscle retention. You benefit from a thermogenic, high-protein structure that increases caloric expenditure naturally.",
                            tip: "Ensure every meal contains a portion of protein (paneer, tofu, sprouts) to boost your resting metabolic rate.",
                            foods: ["Paneer/Tofu", "Sprouted Moong", "Cinnamon Water", "High-Fiber Veg", "Besan Chilla"]
                        };
                    } else if (goal === 'Muscle Gain' || activity === 'Highly Active') {
                        result = {
                            personality: "Energy Seeker",
                            icon: "☀️",
                            description: "Your active lifestyle requires efficient glycogen restoration and complex carbohydrate fueling. You need nutrient-dense, slow-releasing energy sources to avoid energy crashes.",
                            tip: "Incorporate complex starch like sweet potatoes or brown rice before workouts to maximize glycogen storage.",
                            foods: ["Makhana", "Bananas & Dates", "Sweet Potatoes", "Oats", "Mixed Seeds"]
                        };
                    }
                    
                    // Save lead to localStorage
                    const localLeads = JSON.parse(localStorage.getItem('nutrislims_leads') || '[]');
                    localLeads.push({ email, phone, personality: result.personality, answers: quizAnswers });
                    localStorage.setItem('nutrislims_leads', JSON.stringify(localLeads));

                    const finalizeQuizLead = () => {
                        // Display results
                        document.getElementById('res-icon').textContent = result.icon;
                        document.getElementById('res-personality-name').textContent = result.personality;
                        document.getElementById('res-desc').textContent = result.description;
                        document.getElementById('res-tip').textContent = result.tip;
                        
                        const foodTags = document.getElementById('res-foods');
                        foodTags.innerHTML = '';
                        result.foods.forEach(f => {
                            const span = document.createElement('span');
                            span.className = 'food-tag-badge';
                            span.textContent = f;
                            foodTags.appendChild(span);
                        });
                        
                        document.getElementById('btn-quiz-book-redirect').href = (result.personality === 'Gut Healer') ? 'book.html?service=Clinical Nutrition' : 'book.html?service=Weight Loss Management';
                        
                        quizEmailCard.classList.add('hidden');
                        quizResultsCard.classList.remove('hidden');
                        leadSubmitBtn.disabled = false;
                    };

                    if (GOOGLE_SHEET_WEB_APP_URL) {
                        fetch(GOOGLE_SHEET_WEB_APP_URL, {
                            method: "POST",
                            mode: "no-cors",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                type: "quiz",
                                name: "Quiz Lead",
                                email: email,
                                phone: phone || "N/A",
                                score: "85",
                                archetype: result.personality,
                                actionTip: result.tip
                            })
                        }).then(() => {
                            finalizeQuizLead();
                        }).catch(err => {
                            console.error("Sheets quiz lead error:", err);
                            finalizeQuizLead();
                        });
                    } else {
                        finalizeQuizLead();
                    }
                }, 1500);
            });
        }
        updateQuizStep(1);
    }

    /* ==========================================================================
       8. CONTACT FORM SUBMISSION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            btn.disabled = true;
            btn.textContent = "Sending message...";
            
            setTimeout(() => {
                const name = document.getElementById('ct-name').value;
                const email = document.getElementById('ct-email').value;
                const phone = document.getElementById('ct-phone').value;
                const msg = document.getElementById('ct-msg').value;
                
                const contactPayload = {
                    type: "contact",
                    name,
                    email,
                    phone,
                    subject: "Website Contact Form Inquiry",
                    message: msg
                };

                // Save contact submission
                const localContacts = JSON.parse(localStorage.getItem('nutrislims_contacts') || '[]');
                localContacts.push({ ...contactPayload, date: new Date().toISOString() });
                localStorage.setItem('nutrislims_contacts', JSON.stringify(localContacts));
                
                const finalizeContact = () => {
                    contactForm.reset();
                    document.getElementById('contact-success').classList.remove('hidden');
                    btn.disabled = false;
                    btn.textContent = "Send Message";
                    setTimeout(() => document.getElementById('contact-success').classList.add('hidden'), 5000);
                };

                if (GOOGLE_SHEET_WEB_APP_URL) {
                    fetch(GOOGLE_SHEET_WEB_APP_URL, {
                        method: "POST",
                        mode: "no-cors",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(contactPayload)
                    }).then(() => {
                        finalizeContact();
                    }).catch(err => {
                        console.error("Sheets contact error:", err);
                        finalizeContact();
                    });
                } else {
                    finalizeContact();
                }
            }, 1000);
        });
    }

    /* ==========================================================================
       9. CLIENT-SIDE BLOG ENGINE
       ========================================================================== */
    const homeBlogGrid = document.getElementById('home-blog-grid');
    const blogGridContainer = document.getElementById('blog-grid-container');
    const blogPagination = document.getElementById('blog-pagination');
    const searchInput = document.getElementById('blog-search-input');
    const searchBtn = document.getElementById('btn-blog-search');
    const categoryBtns = document.querySelectorAll('#blog-categories-list .category-filter-btn');
    
    // 9.1 Populate homepage blogs
    if (homeBlogGrid) {
        homeBlogGrid.innerHTML = '';
        BLOGS_DATA.slice(0, 3).forEach(blog => {
            const article = document.createElement('article');
            article.className = 'blog-card';
            article.innerHTML = `
                <div class="blog-thumb">
                    <img src="${blog.image}" alt="${blog.title}">
                    <span class="blog-category-badge">${blog.category}</span>
                </div>
                <div class="blog-card-body">
                    <div class="blog-date-time">${blog.date} | ${blog.read_time}</div>
                    <h3>${blog.title}</h3>
                    <p>${blog.excerpt}</p>
                    <a href="blog-detail.html?id=${blog.id}" class="blog-read-more">Read More &rarr;</a>
                </div>
            `;
            homeBlogGrid.appendChild(article);
        });
    }
    
    // 9.2 Populate main blog list page
    if (blogGridContainer) {
        let activeCategory = 'All';
        let activeQuery = '';
        let activePage = 1;
        const pageSize = 4;
        
        function renderBlogsList() {
            blogGridContainer.innerHTML = '';
            
            // Filter blogs
            let filtered = BLOGS_DATA.filter(b => {
                const matchCat = (activeCategory === 'All' || b.category === activeCategory);
                const matchQuery = (!activeQuery || b.title.toLowerCase().includes(activeQuery) || b.excerpt.toLowerCase().includes(activeQuery));
                return matchCat && matchQuery;
            });
            
            if (filtered.length === 0) {
                blogGridContainer.innerHTML = `
                    <div style="text-align: center; padding: 40px; grid-column: 1/-1;">
                        <h3>No Articles Found</h3>
                        <p style="color: var(--text-muted);">Try a different keyword or category.</p>
                    </div>
                `;
                blogPagination.innerHTML = '';
                return;
            }
            
            // Paginate
            const totalPages = Math.ceil(filtered.length / pageSize);
            const start = (activePage - 1) * pageSize;
            const paginated = filtered.slice(start, start + pageSize);
            
            paginated.forEach(blog => {
                const article = document.createElement('article');
                article.className = 'blog-card';
                article.innerHTML = `
                    <div class="blog-thumb">
                        <img src="${blog.image}" alt="${blog.title}">
                        <span class="blog-category-badge">${blog.category}</span>
                    </div>
                    <div class="blog-card-body">
                        <div class="blog-date-time">${blog.date} | ${blog.read_time}</div>
                        <h3 style="font-size:18px;">${blog.title}</h3>
                        <p style="font-size:13px;">${blog.excerpt}</p>
                        <a href="blog-detail.html?id=${blog.id}" class="blog-read-more" style="font-size:12px;">Read More &rarr;</a>
                    </div>
                `;
                blogGridContainer.appendChild(article);
            });
            
            // Render Pagination numbers
            blogPagination.innerHTML = '';
            for (let i = 1; i <= totalPages; i++) {
                const link = document.createElement('button');
                link.className = `page-num-link ${activePage === i ? 'active' : ''}`;
                link.type = 'button';
                link.textContent = i;
                link.addEventListener('click', () => {
                    activePage = i;
                    renderBlogsList();
                    window.scrollTo({ top: 100, behavior: 'smooth' });
                });
                blogPagination.appendChild(link);
            }
        }
        
        // Category filters
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeCategory = btn.getAttribute('data-category');
                activePage = 1;
                renderBlogsList();
            });
        });
        
        // Search trigger
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                activeQuery = searchInput.value.trim().toLowerCase();
                activePage = 1;
                renderBlogsList();
            });
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    activeQuery = searchInput.value.trim().toLowerCase();
                    activePage = 1;
                    renderBlogsList();
                }
            });
        }
        
        renderBlogsList();
    }
    
    // 9.3 Dynamic blog details parser
    const detailHeader = document.getElementById('blog-detail-header');
    const detailBanner = document.getElementById('blog-detail-banner');
    const detailContent = document.getElementById('blog-rich-content');
    const recentBlogList = document.getElementById('blog-recent-list');
    
    if (detailContent) {
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = parseInt(urlParams.get('id') || '1');
        
        const matched = BLOGS_DATA.find(b => b.id === articleId) || BLOGS_DATA[0];
        
        detailHeader.innerHTML = `
            <span class="blog-category-badge" style="position: static; display: inline-block; align-self: center;">${matched.category}</span>
            <h1>${matched.title}</h1>
            <div class="blog-detail-meta">
                <span>📅 Published: ${matched.date}</span>
                <span>⏱️ Read Time: ${matched.read_time}</span>
                <span>✍️ Author: Oshin Ambekar</span>
            </div>
        `;
        
        detailBanner.innerHTML = `<img src="${matched.image}" alt="${matched.title}">`;
        detailContent.innerHTML = matched.content + `
            <div style="margin-top: 40px; border-top: 2px solid var(--primary-light); padding-top: 30px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                <h5 style="font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">Share this article:</h5>
                <div class="footer-socials" style="margin-top: 0;">
                    <a href="#">🐦</a>
                    <a href="#">📘</a>
                    <a href="#">💼</a>
                </div>
            </div>
        `;
        
        // Render recent items sidebar
        if (recentBlogList) {
            recentBlogList.innerHTML = '';
            BLOGS_DATA.filter(b => b.id !== matched.id).slice(0, 3).forEach(post => {
                const link = document.createElement('a');
                link.href = `blog-detail.html?id=${post.id}`;
                link.style.cssText = "display: flex; gap: 12px; align-items: flex-start; text-decoration: none; color: inherit;";
                link.innerHTML = `
                    <img src="${post.image}" alt="${post.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--border-light); flex-shrink: 0;">
                    <div>
                        <h5 style="font-size: 14px; line-height: 1.3; font-weight: 600; color: var(--text-dark); margin-bottom: 2px;">${post.title}</h5>
                        <span style="font-size: 11px; color: var(--text-muted);">${post.date}</span>
                    </div>
                `;
                recentBlogList.appendChild(link);
            });
        }
    }

    /* ==========================================================================
       10. LOCAL SMART CHATBOT RESPONDERS
       ========================================================================== */
    const chatbotTrigger = document.getElementById('chatbot-trigger');
    const chatbotClose = document.getElementById('chatbot-close-btn');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotBody = document.getElementById('chatbot-body');
    
    if (chatbotTrigger && chatbotWindow) {
        chatbotTrigger.addEventListener('click', () => {
            chatbotWindow.classList.toggle('hidden');
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        });
        if (chatbotClose) {
            chatbotClose.addEventListener('click', () => chatbotWindow.classList.add('hidden'));
        }
        
        chatbotForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const msgText = chatbotInput.value.trim();
            if (!msgText) return;
            
            chatbotInput.value = '';
            
            // Render user message
            const userEl = document.createElement('div');
            userEl.className = 'chat-message user-message';
            userEl.textContent = msgText;
            chatbotBody.appendChild(userEl);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
            
            // Typing indicator
            const typingEl = document.createElement('div');
            typingEl.className = 'chat-typing-indicator';
            typingEl.textContent = "Assistant is typing...";
            chatbotBody.appendChild(typingEl);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
            
            setTimeout(() => {
                typingEl.remove();
                
                let reply = "That's a great question! 🌿 Every body is biochemically unique. I highly recommend checking out our **Free Diet Quiz** on quiz.html to find your nutrition archetype, or booking a **Free 15-minute Discovery Consultation** on book.html so Oshin can audit your goals directly.";
                
                const lower = msgText.toLowerCase();
                
                if (lower.includes('pcos') || lower.includes('pcod') || lower.includes('hormon')) {
                    reply = "For PCOS/PCOD, Oshin recommends anti-inflammatory grains (oats, ragi) and low Glycemic Index foods to control insulin spikes. Incorporating spearmint tea twice a day and soaked almonds/walnuts helps naturally reduce free testosterone levels. Check out our **Clinical Nutrition** program on services.html!";
                } else if (lower.includes('diabet') || lower.includes('sugar')) {
                    reply = "Managing Type-2 Diabetes requires low GI foods that digest slowly. Oshin focuses on fenugreek seeds, bitter gourd, high-fiber oats, and cinnamon. Avoid refined flour (maida), packed fruit juices, and sweets. Our **Clinical Nutrition Therapy** program on services.html is specifically structured for diabetes reversal.";
                } else if (lower.includes('weight') || lower.includes('lose') || lower.includes('fat') || lower.includes('slim')) {
                    reply = "Sustainable weight loss is about boosting your metabolism, not starvation. We construct high-fiber, high-protein Indian menus that maximize satiety. Our **Weight Loss Management** program (services.html) offers custom weekly plans, WhatsApp logging, and portion guidance.";
                } else if (lower.includes('fee') || lower.includes('price') || lower.includes('cost') || lower.includes('charge')) {
                    reply = "Our service rates are:\n- Weight Loss: ₹4,999/month ($75)\n- Clinical Nutrition: ₹5,999/month ($90)\n- Meal Plans: ₹3,499/month ($55)\n- 1-on-1 Online Consult: ₹2,499/session ($40)\nYou can review these details on services.html!";
                } else if (lower.includes('book') || lower.includes('consult') || lower.includes('appointment')) {
                    reply = "You can schedule a consultation instantly on book.html! It features a dynamic calendar where you pick an available time slot and secure your booking in under 2 minutes.";
                } else if (lower.includes('oshin') || lower.includes('who') || lower.includes('nutritionist')) {
                    reply = "Oshin Ambekar is a certified Clinical Nutritionist (B.Sc., M.Sc. in Clinical Nutrition) with over 8 years of clinical experience. She specializes in local Indian home foods and has helped 500+ clients lead balanced lifestyles.";
                } else if (lower.includes('contact') || lower.includes('phone') || lower.includes('address') || lower.includes('whatsapp')) {
                    reply = "You can call/WhatsApp Oshin's team at +91 98765 43210, email us at contact@nutrislims.com, or visit our clinic at Vijay Nagar, Indore, MP. Details are on contact.html!";
                }
                
                const botEl = document.createElement('div');
                botEl.className = 'chat-message bot-message';
                botEl.textContent = reply;
                chatbotBody.appendChild(botEl);
                chatbotBody.scrollTop = chatbotBody.scrollHeight;
            }, 1000);
        });
    }

    /* ==========================================================================
       11. CLINIC DIET REPORT GENERATOR (STATIC FILE DOWNLOAD MOCK)
       ========================================================================== */
    const clinicalDropArea = document.getElementById('clinical-drop-area');
    const clinicalFileInput = document.getElementById('clinical-file-input');
    const clinicalUploadContent = document.getElementById('clinical-upload-content');
    const clinicalFilePreview = document.getElementById('clinical-file-preview');
    const clinicalFileName = document.getElementById('clinical-file-name');
    const clinicalFileRemoveBtn = document.getElementById('clinical-file-remove-btn');
    const btnGenerateReport = document.getElementById('btn-generate-clinical-report');
    
    if (clinicalDropArea && clinicalFileInput && btnGenerateReport) {
        let selectedFile = null;
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eName => {
            clinicalDropArea.addEventListener(eName, (e) => {
                e.preventDefault(); e.stopPropagation();
            });
        });
        ['dragenter', 'dragover'].forEach(eName => {
            clinicalDropArea.addEventListener(eName, () => clinicalDropArea.classList.add('dragover'));
        });
        ['dragleave', 'drop'].forEach(eName => {
            clinicalDropArea.addEventListener(eName, () => clinicalDropArea.classList.remove('dragover'));
        });
        
        clinicalDropArea.addEventListener('drop', (e) => setFile(e.dataTransfer.files));
        clinicalFileInput.addEventListener('change', function() { setFile(this.files); });
        
        function setFile(files) {
            if (files.length > 0) {
                const f = files[0];
                if (f.type.startsWith('image/') || f.type === 'application/pdf') {
                    selectedFile = f;
                    clinicalFileName.textContent = f.name;
                    clinicalUploadContent.classList.add('hidden');
                    clinicalFilePreview.classList.remove('hidden');
                    btnGenerateReport.disabled = false;
                    
                    document.getElementById('clinical-success-state').classList.add('hidden');
                    document.getElementById('clinical-error-state').classList.add('hidden');
                } else {
                    alert("Upload PDF or Image files only.");
                }
            }
        }
        
        function removeFile() {
            selectedFile = null;
            clinicalFileInput.value = '';
            clinicalUploadContent.classList.remove('hidden');
            clinicalFilePreview.classList.add('hidden');
            btnGenerateReport.disabled = true;
        }
        
        if (clinicalFileRemoveBtn) clinicalFileRemoveBtn.addEventListener('click', removeFile);
        
        btnGenerateReport.addEventListener('click', () => {
            if (!selectedFile) return;
            
            const loadingState = document.getElementById('clinical-loading-state');
            const progressFill = document.getElementById('clinical-progress-fill');
            const loadingText = document.getElementById('clinical-loading-text');
            const successState = document.getElementById('clinical-success-state');
            const errorState = document.getElementById('clinical-error-state');
            
            btnGenerateReport.classList.add('hidden');
            loadingState.classList.remove('hidden');
            successState.classList.add('hidden');
            errorState.classList.add('hidden');
            
            const stages = [
                { text: "Extracting Patient Form Data...", p: 25 },
                { text: "Analyzing Clinical Conditions...", p: 55 },
                { text: "Compiling 6-Meal Chart...", p: 85 },
                { text: "Formatting Word Report...", p: 100 }
            ];
            
            let currentStage = 0;
            progressFill.style.width = "5%";
            
            const timer = setInterval(() => {
                if (currentStage < stages.length) {
                    loadingText.textContent = stages[currentStage].text;
                    progressFill.style.width = `${stages[currentStage].p}%`;
                    currentStage++;
                } else {
                    clearInterval(timer);
                    
                    // Serve static docx file template
                    const downloadBtn = document.getElementById('clinical-download-link');
                    downloadBtn.href = "static/images/Clinical_Diet_Plan_Template.docx"; // Placed in images/ for easy packaging
                    downloadBtn.download = `Diet_Plan_${selectedFile.name.split('.')[0]}_Report.docx`;
                    
                    loadingState.classList.add('hidden');
                    successState.classList.remove('hidden');
                    btnGenerateReport.classList.remove('hidden');
                    btnGenerateReport.textContent = "Generate Another Plan";
                    removeFile();
                }
            }, 1000);
        });
    }

    /* ==========================================================================
       12. INTERSECTION OBSERVER FOR STATS & SCROLL REVEALS
       ========================================================================== */
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length > 0 && 'IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries, selfObserver) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const val = parseFloat(el.getAttribute('data-target'));
                    runCounter(el, val);
                    selfObserver.unobserve(el);
                }
            });
        }, { threshold: 0.15 }); // LOWERED THRESHOLD SO STATS ANIMATE RELIABLY
        
        stats.forEach(s => obs.observe(s));
        
        function runCounter(el, target) {
            let start = 0;
            const duration = 2000;
            const startTime = performance.now();
            const isFloat = !Number.isInteger(target);
            
            function step(timestamp) {
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const current = progress * (2 - progress) * target; // Ease out
                
                if (isFloat) {
                    el.textContent = current.toFixed(1) + '★';
                } else if (el.getAttribute('data-target') === '95') {
                    el.textContent = Math.floor(current) + '%';
                } else {
                    el.textContent = Math.floor(current) + '+';
                }
                
                if (progress < 1) requestAnimationFrame(step);
                else {
                    el.textContent = isFloat ? target.toFixed(1) + '★' : (el.getAttribute('data-target') === '95' ? target + '%' : target + '+');
                }
            }
            requestAnimationFrame(step);
        }
    } else if (stats.length > 0) {
        stats.forEach(el => {
            const v = el.getAttribute('data-target');
            el.textContent = v.includes('.') ? v + '★' : (v === '95' ? v + '%' : v + '+');
        });
    }

    // Scroll Reveal Intersection Observer
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0 && 'IntersectionObserver' in window) {
        const revObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active-reveal');
                }
            });
        }, { threshold: 0.15 });
        reveals.forEach(r => revObserver.observe(r));
    } else {
        reveals.forEach(r => r.classList.add('active-reveal'));
    }

    /* ==========================================================================
       13. INTERACTIVE WELLNESS SCORE CHECKLIST & CIRCULAR CHART
       ========================================================================== */
    const checklistItems = document.querySelectorAll('.wellness-checkbox');
    const scoreVal = document.getElementById('wellness-score-value');
    const scoreFeedback = document.getElementById('wellness-score-feedback');
    const progressFill = document.getElementById('wellness-progress-fill');
    
    if (checklistItems.length > 0 && scoreVal && scoreFeedback) {
        checklistItems.forEach(item => {
            item.addEventListener('change', calculateScore);
        });
        
        function calculateScore() {
            let total = 0;
            checklistItems.forEach(item => {
                if (item.checked) {
                    total += parseInt(item.getAttribute('data-points') || '0');
                }
            });
            
            // Animate number
            scoreVal.textContent = total;
            
            // Animate progress circle ring (Radius 75, Circumference = 471.2)
            if (progressFill) {
                const circumference = 471.2;
                const offset = circumference - (total / 100) * circumference;
                progressFill.style.strokeDashoffset = offset;
                
                // Shift colors dynamically
                if (total < 40) {
                    progressFill.style.stroke = "var(--error)";
                } else if (total < 70) {
                    progressFill.style.stroke = "var(--accent)";
                } else {
                    progressFill.style.stroke = "var(--primary)";
                }
            }
            
            if (total === 0) {
                scoreFeedback.textContent = "Start checking off items!";
                scoreFeedback.style.color = "var(--text-dark)";
            } else if (total < 40) {
                scoreFeedback.textContent = "Every healthy swap matters. Keep going! 🌱";
                scoreFeedback.style.color = "var(--error)";
            } else if (total < 70) {
                scoreFeedback.textContent = "Good job! You're building a strong foundation. 👍";
                scoreFeedback.style.color = "var(--accent)";
            } else if (total < 90) {
                scoreFeedback.textContent = "Excellent wellness score today! You're thriving. ⚡";
                scoreFeedback.style.color = "var(--primary-dark)";
            } else {
                scoreFeedback.textContent = "Phenomenal score! Oshin would be proud! 🏆";
                scoreFeedback.style.color = "var(--accent)";
            }
        }
        calculateScore(); // Run once to initialize
    }

    /* ==========================================================================
       14. FAQ ACCORDION COMPONENT
       ========================================================================== */
    const faqToggles = document.querySelectorAll('.faq-toggle');
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const item = toggle.parentElement;
            const content = item.querySelector('.faq-content');
            
            const isActive = item.classList.contains('active');
            
            document.querySelectorAll('.faq-item-glass').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-content').style.maxHeight = '0px';
            });
            
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    /* ==========================================================================
       15. REAL-TIME 3D CARD TILT INTERACTION
       ========================================================================== */
    const tiltCards = document.querySelectorAll('.premium-3d-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const angleX = -(y - yc) / (yc / 10); // max 10 degrees tilt
            const angleY = (x - xc) / (xc / 10);
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-8px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)`;
        });
    });
});
