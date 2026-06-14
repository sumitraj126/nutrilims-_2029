document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. GLOBAL UTILITIES & NAVBAR SCROLL
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    
    function handleScroll() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    // Mobile menu drawer toggle
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const drawerCloseBtn = document.getElementById('drawer-close-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    
    if (hamburgerBtn && mobileDrawer) {
        hamburgerBtn.addEventListener('click', () => {
            mobileDrawer.classList.add('open');
        });
    }
    
    if (drawerCloseBtn && mobileDrawer) {
        drawerCloseBtn.addEventListener('click', () => {
            mobileDrawer.classList.remove('open');
        });
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
        let autoScrollTimer;
        
        function updateCarousel(index) {
            currentSlide = index;
            if (currentSlide < 0) currentSlide = slides.length - 1;
            if (currentSlide >= slides.length) currentSlide = 0;
            
            carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update indicators
            indicators.forEach((ind, i) => {
                if (i === currentSlide) {
                    ind.classList.add('active');
                } else {
                    ind.classList.remove('active');
                }
            });
        }
        
        function startAutoScroll() {
            autoScrollTimer = setInterval(() => {
                updateCarousel(currentSlide + 1);
            }, 5000);
        }
        
        function stopAutoScroll() {
            clearInterval(autoScrollTimer);
        }
        
        if (carouselPrev) {
            carouselPrev.addEventListener('click', () => {
                stopAutoScroll();
                updateCarousel(currentSlide - 1);
                startAutoScroll();
            });
        }
        
        if (carouselNext) {
            carouselNext.addEventListener('click', () => {
                stopAutoScroll();
                updateCarousel(currentSlide + 1);
                startAutoScroll();
            });
        }
        
        indicators.forEach(ind => {
            ind.addEventListener('click', function() {
                stopAutoScroll();
                updateCarousel(parseInt(this.getAttribute('data-slide')));
                startAutoScroll();
            });
        });
        
        // Pause auto scroll when user hovers over carousel
        carouselTrack.addEventListener('mouseenter', stopAutoScroll);
        carouselTrack.addEventListener('mouseleave', startAutoScroll);
        
        updateCarousel(0);
        startAutoScroll();
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
        
        const ARC_CIRCUMFERENCE = 251.2; // 2 * PI * r (r=40)
        
        function updateMatrix() {
            const water = parseFloat(waterSlider.value);
            const sleep = parseFloat(sleepSlider.value);
            const activity = parseFloat(activitySlider.value);
            
            // Update labels
            waterVal.textContent = `${water} Liters`;
            sleepVal.textContent = `${sleep} Hours`;
            activityVal.textContent = `${activity} Minutes`;
            
            // 1. Metabolic Activation Score (Ideal: 3.5L water, 8h sleep, 45m active)
            const wMet = Math.min(1.0, water / 3.0);
            const sMet = Math.min(1.0, sleep / 8.0);
            const aMet = Math.min(1.0, activity / 45.0);
            const metabolicScore = Math.round((wMet * 30) + (sMet * 30) + (aMet * 40));
            
            // 2. Inflammation Control Score (Ideal: 8h sleep, 3.5L water, 30-45m activity. Oversleeping/overworking decreases control)
            let sInf = 0;
            if (sleep <= 8) sInf = (sleep - 4) / 4; // 4h = 0, 8h = 1
            else sInf = Math.max(0.5, 1.0 - (sleep - 8) * 0.25); // 10h = 0.5
            
            let wInf = Math.min(1.0, water / 3.5);
            
            let aInf = 0;
            if (activity <= 45) aInf = activity / 45; 
            else aInf = Math.max(0.6, 1.0 - (activity - 45) * 0.01); // Over-exercising adds slight physical stress
            
            const inflammationScore = Math.round((sInf * 45) + (wInf * 30) + (aInf * 25));
            
            // 3. Vitality Index (Weighted Aggregate)
            const vitalityScore = Math.round((metabolicScore * 0.5) + (inflammationScore * 0.5));
            
            // Set SVG stroke offset and texts
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
        
        updateMatrix(); // Initial call
    }

    /* ==========================================================================
       4. AI FRIDGE RECIPE BUILDER WIDGET
       ========================================================================== */
    const tagsContainer = document.getElementById('tags-input-box');
    const ingredientInput = document.getElementById('ingredient-input');
    const btnBuildRecipe = document.getElementById('btn-build-recipe');
    
    if (tagsContainer && ingredientInput && btnBuildRecipe) {
        let ingredientsList = [];
        
        function addTag(text) {
            text = text.trim();
            if (text && !ingredientsList.includes(text)) {
                ingredientsList.push(text);
                
                const tagEl = document.createElement('span');
                tagEl.className = 'ingredient-tag';
                tagEl.innerHTML = `${text} <span class="tag-remove">&times;</span>`;
                
                // Add tag remove listener
                tagEl.querySelector('.tag-remove').addEventListener('click', () => {
                    ingredientsList = ingredientsList.filter(item => item !== text);
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
        
        // Add tag on blur if value exists
        ingredientInput.addEventListener('blur', () => {
            addTag(ingredientInput.value);
        });
        
        btnBuildRecipe.addEventListener('click', async () => {
            // Handle any pending input in text box
            addTag(ingredientInput.value);
            
            if (ingredientsList.length === 0) {
                alert("Please add at least one ingredient tag first!");
                return;
            }
            
            const recipePlaceholder = document.getElementById('recipe-placeholder');
            const recipeLoader = document.getElementById('recipe-loader');
            const recipeCardResult = document.getElementById('recipe-card-result');
            
            recipePlaceholder.classList.add('hidden');
            recipeLoader.classList.remove('hidden');
            recipeCardResult.classList.add('hidden');
            btnBuildRecipe.disabled = true;
            
            try {
                const goal = document.getElementById('recipe-goal').value;
                const response = await fetch('/api/recipe-builder', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ingredients: ingredientsList.join(', '),
                        goal: goal
                    })
                });
                
                if (!response.ok) throw new Error('Recipe compilation failed');
                
                const recipe = await response.json();
                
                // Populate results
                document.getElementById('res-recipe-name').textContent = recipe.recipeName;
                document.getElementById('res-prep-time').textContent = recipe.prepTime;
                document.getElementById('res-calories').textContent = recipe.calories;
                
                document.getElementById('res-protein').textContent = recipe.macros.protein;
                document.getElementById('res-carbs').textContent = recipe.macros.carbs;
                document.getElementById('res-fat').textContent = recipe.macros.fat;
                document.getElementById('res-fiber').textContent = recipe.macros.fiber;
                
                // Populate ingredients
                const ingredientsUL = document.getElementById('res-ingredients');
                ingredientsUL.innerHTML = '';
                recipe.ingredientsList.forEach(ing => {
                    const li = document.createElement('li');
                    li.textContent = ing;
                    ingredientsUL.appendChild(li);
                });
                
                // Populate instructions
                const instructionsOL = document.getElementById('res-instructions');
                instructionsOL.innerHTML = '';
                recipe.instructions.forEach(step => {
                    const li = document.createElement('li');
                    li.textContent = step;
                    instructionsOL.appendChild(li);
                });
                
                document.getElementById('res-benefit').textContent = recipe.healthBenefit;
                
                recipeLoader.classList.add('hidden');
                recipeCardResult.classList.remove('hidden');
                
            } catch (err) {
                console.error(err);
                recipeLoader.classList.add('hidden');
                recipePlaceholder.classList.remove('hidden');
                alert("Failed to build recipe. Please verify your connection/API key and try again.");
            } finally {
                btnBuildRecipe.disabled = false;
            }
        });
    }

    /* ==========================================================================
       5. SERVICE DETAILS MODALS
       ========================================================================== */
    const openModalBtns = document.querySelectorAll('.btn-open-modal');
    const closeModalBtns = document.querySelectorAll('.modal-close');
    const modals = document.querySelectorAll('.modal');
    
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const service = btn.getAttribute('data-service');
            let targetModal;
            if (service === 'weight-loss') targetModal = document.getElementById('modal-weight-loss');
            else if (service === 'clinical') targetModal = document.getElementById('modal-clinical');
            else if (service === 'online-consult') targetModal = document.getElementById('modal-online-consult');
            else if (service === 'meal-plans') targetModal = document.getElementById('modal-meal-plans');
            
            if (targetModal) targetModal.classList.add('open');
        });
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modals.forEach(modal => modal.classList.remove('open'));
        });
    });
    
    // Close modal on background click
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) modal.classList.remove('open');
        });
    });

    /* ==========================================================================
       6. MULTI-STEP BOOKING FLOW
       ========================================================================== */
    const bookingSteps = [
        document.getElementById('step-1'),
        document.getElementById('step-2'),
        document.getElementById('step-3'),
        document.getElementById('step-4'),
        document.getElementById('step-5')
    ];
    
    if (bookingSteps[0]) {
        let currentBookingStep = 1;
        
        const bookingBackBtn = document.getElementById('btn-booking-back');
        const bookingNextBtn = document.getElementById('btn-booking-next');
        const progressBarFill = document.getElementById('booking-progress-fill');
        const progressStepTitle = document.getElementById('booking-step-title');
        const progressStepNum = document.getElementById('booking-step-num');
        const bookingNavBox = document.getElementById('booking-nav-buttons');
        
        // Selected values state
        let selectedService = '';
        let selectedPrice = '';
        let selectedDate = '';
        let selectedTime = '';
        let clientName = '';
        let clientEmail = '';
        let clientPhone = '';
        let clientGoal = '';
        
        const stepHeaders = [
            "Step 1: Select Service",
            "Step 2: Pick Date & Time",
            "Step 3: Enter Details",
            "Step 4: Complete Payment",
            "Booking Confirmed!"
        ];
        
        function updateBookingStep(step) {
            currentBookingStep = step;
            
            // Show/hide step contents
            bookingSteps.forEach((stepEl, idx) => {
                if (idx === currentBookingStep - 1) {
                    stepEl.classList.remove('hidden');
                } else {
                    stepEl.classList.add('hidden');
                }
            });
            
            // Update progress indicators
            progressBarFill.style.width = `${(currentBookingStep / 5) * 100}%`;
            progressStepTitle.textContent = stepHeaders[currentBookingStep - 1];
            progressStepNum.textContent = `Step ${currentBookingStep} of 5`;
            
            // Back button visibility
            if (currentBookingStep === 1 || currentBookingStep === 5) {
                bookingBackBtn.classList.add('hidden');
            } else {
                bookingBackBtn.classList.remove('hidden');
            }
            
            // Next button text
            if (currentBookingStep === 4) {
                bookingNextBtn.textContent = `Pay Securely ${selectedPrice ? '₹' + selectedPrice : ''}`;
            } else {
                bookingNextBtn.textContent = "Next Step";
            }
            
            // Hide navigation entirely on confirmation page
            if (currentBookingStep === 5) {
                bookingNavBox.classList.add('hidden');
            } else {
                bookingNavBox.classList.remove('hidden');
            }
        }
        
        bookingBackBtn.addEventListener('click', () => {
            if (currentBookingStep > 1) {
                updateBookingStep(currentBookingStep - 1);
            }
        });
        
        bookingNextBtn.addEventListener('click', async () => {
            if (currentBookingStep === 1) {
                // Validate Service Selection
                const serviceRadio = document.querySelector('input[name="booking_service"]:checked');
                if (!serviceRadio) {
                    alert("Please select a program to continue.");
                    return;
                }
                selectedService = serviceRadio.value;
                selectedPrice = serviceRadio.getAttribute('data-price');
                
                // Initialize calendar for Step 2
                initCalendar();
                updateBookingStep(2);
                
            } else if (currentBookingStep === 2) {
                // Validate Date & Time Slot
                if (!selectedDate) {
                    alert("Please select a date on the calendar.");
                    return;
                }
                const timeRadio = document.querySelector('input[name="booking_slot"]:checked');
                if (!timeRadio) {
                    alert("Please select an available time slot.");
                    return;
                }
                selectedTime = timeRadio.value;
                updateBookingStep(3);
                
            } else if (currentBookingStep === 3) {
                // Validate Details Form
                clientName = document.getElementById('bk-name').value.trim();
                clientEmail = document.getElementById('bk-email').value.trim();
                clientPhone = document.getElementById('bk-phone').value.trim();
                clientGoal = document.getElementById('bk-goal').value.trim();
                
                if (!clientName || !clientEmail || !clientPhone) {
                    alert("Name, Email, and Phone number are required.");
                    return;
                }
                
                // Show selected amount in payment mockup
                document.getElementById('pay-total-amount').textContent = `₹${selectedPrice}`;
                updateBookingStep(4);
                
            } else if (currentBookingStep === 4) {
                // Mock Payment Processing
                bookingNextBtn.disabled = true;
                bookingNextBtn.textContent = "Processing payment...";
                
                try {
                    // Send booking data to API
                    const response = await fetch('/api/book', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            name: clientName,
                            email: clientEmail,
                            phone: clientPhone,
                            service: selectedService,
                            date: selectedDate,
                            time: selectedTime,
                            health_goal: clientGoal
                        })
                    });
                    
                    if (!response.ok) {
                        const err = await response.json();
                        throw new Error(err.error || 'Booking slots collision occurred.');
                    }
                    
                    // Render Confirmation Receipt Details
                    document.getElementById('conf-service').textContent = selectedService;
                    document.getElementById('conf-date').textContent = selectedDate;
                    document.getElementById('conf-time').textContent = selectedTime;
                    document.getElementById('conf-ref').textContent = `BK-${Math.floor(100000 + Math.random() * 900000)}`;
                    
                    updateBookingStep(5);
                } catch (err) {
                    alert(`Booking Error: ${err.message}`);
                    updateBookingStep(2); // Go back to calendar to select another slot
                } finally {
                    bookingNextBtn.disabled = false;
                }
            }
        });
        
        // Step 4 payment radio switch visual helper
        const pmCard = document.getElementById('pm-card');
        const pmUpi = document.getElementById('pm-upi');
        const cardFieldsBox = document.getElementById('card-fields-box');
        const upiFieldsBox = document.getElementById('upi-fields-box');
        
        if (pmCard && pmUpi) {
            pmCard.addEventListener('change', () => {
                cardFieldsBox.classList.remove('hidden');
                upiFieldsBox.classList.add('hidden');
            });
            pmUpi.addEventListener('change', () => {
                cardFieldsBox.classList.add('hidden');
                upiFieldsBox.classList.remove('hidden');
            });
        }
        
        // CALENDAR WIDGET GENERATION
        let calendarYear = 2026;
        let calendarMonth = 5; // June (0-indexed represents January, so 5 is June)
        
        function initCalendar() {
            const months = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            
            document.getElementById('calendar-month-year').textContent = `${months[calendarMonth]} ${calendarYear}`;
            
            const daysContainer = document.getElementById('calendar-days-container');
            daysContainer.innerHTML = '';
            
            // Create day headers
            const dayHeaders = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
            dayHeaders.forEach(day => {
                const headerEl = document.createElement('div');
                headerEl.className = 'calendar-day-header';
                headerEl.textContent = day;
                daysContainer.appendChild(headerEl);
            });
            
            // Calendar grid logic
            const firstDayIndex = new Date(calendarYear, calendarMonth, 1).getDay();
            const totalDays = new Date(calendarYear, calendarMonth + 1, 0).getDate();
            
            // Pre-fill empty slots
            for (let i = 0; i < firstDayIndex; i++) {
                const emptyEl = document.createElement('div');
                daysContainer.appendChild(emptyEl);
            }
            
            // Fill days
            const today = new Date();
            for (let day = 1; day <= totalDays; day++) {
                const dayBtn = document.createElement('button');
                dayBtn.type = 'button';
                dayBtn.className = 'calendar-day-btn';
                dayBtn.textContent = day;
                
                const curDate = new Date(calendarYear, calendarMonth, day);
                const curDateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                
                // Disable Sundays (index 0) and past dates
                if (curDate.getDay() === 0 || curDate < today.setHours(0,0,0,0)) {
                    dayBtn.disabled = true;
                }
                
                dayBtn.addEventListener('click', () => {
                    document.querySelectorAll('.calendar-day-btn').forEach(btn => btn.classList.remove('selected'));
                    dayBtn.classList.add('selected');
                    selectedDate = curDateStr;
                    fetchAvailableSlots(curDateStr);
                });
                
                daysContainer.appendChild(dayBtn);
            }
        }
        
        // Month controls
        document.getElementById('cal-prev-month').addEventListener('click', () => {
            calendarMonth--;
            if (calendarMonth < 0) {
                calendarMonth = 11;
                calendarYear--;
            }
            initCalendar();
        });
        
        document.getElementById('cal-next-month').addEventListener('click', () => {
            calendarMonth++;
            if (calendarMonth > 11) {
                calendarMonth = 0;
                calendarYear++;
            }
            initCalendar();
        });
        
        async function fetchAvailableSlots(dateStr) {
            const slotsContainer = document.getElementById('slots-container');
            slotsContainer.innerHTML = '<div class="recipe-loader"><div class="recipe-spinner" style="width:30px; height:30px;"></div></div>';
            
            try {
                const response = await fetch(`/api/slots?date=${dateStr}`);
                if (!response.ok) throw new Error('Slots fetch failed');
                
                const slots = await response.json();
                slotsContainer.innerHTML = '';
                
                if (slots.length === 0) {
                    slotsContainer.innerHTML = '<p class="recipe-placeholder" style="grid-column: 1 / -1;">No slots available for this date.</p>';
                    return;
                }
                
                slots.forEach(slot => {
                    const slotDiv = document.createElement('div');
                    slotDiv.className = 'slot-item-wrapper';
                    
                    const disabledAttr = slot.is_booked ? 'disabled' : '';
                    const opacityStyle = slot.is_booked ? 'style="opacity:0.4; cursor:not-allowed;"' : '';
                    
                    slotDiv.innerHTML = `
                        <input type="radio" name="booking_slot" id="sl-${slot.id}" value="${slot.time}" class="slot-radio" ${disabledAttr}>
                        <label for="sl-${slot.id}" class="slot-label" ${opacityStyle}>${slot.time}</label>
                    `;
                    slotsContainer.appendChild(slotDiv);
                });
            } catch (err) {
                console.error(err);
                slotsContainer.innerHTML = '<p class="recipe-placeholder" style="grid-column: 1 / -1; color: var(--error);">Error retrieving slots.</p>';
            }
        }
    }

    /* ==========================================================================
       7. AI DIET QUIZ SLIDER FLOW
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
            
            // Update slider screens with classes for slide animation
            quizScreens.forEach((screen, index) => {
                const screenStep = parseInt(screen.getAttribute('data-step'));
                
                screen.classList.remove('active', 'prev', 'next');
                
                if (screenStep === currentBookingStep) {
                    // This was a variable mismatch, let's make it local to quiz screen step
                }
                
                if (screenStep === currentQuizStep) {
                    screen.classList.add('active');
                } else if (screenStep < currentQuizStep) {
                    screen.classList.add('prev');
                } else {
                    screen.classList.add('next');
                }
            });
            
            // Progress details
            quizFill.style.width = `${(currentQuizStep / totalQuizSteps) * 100}%`;
            quizProgressText.textContent = `Question ${currentQuizStep} of ${totalQuizSteps}`;
            
            // Back button
            if (currentQuizStep === 1) {
                quizBackBtn.classList.add('hidden');
            } else {
                quizBackBtn.classList.remove('hidden');
            }
            
            // Next button text
            if (currentQuizStep === totalQuizSteps) {
                quizNextBtn.textContent = "Compile Results";
            } else {
                quizNextBtn.textContent = "Next Question";
            }
        }
        
        quizBackBtn.addEventListener('click', () => {
            if (currentQuizStep > 1) {
                updateQuizStep(currentQuizStep - 1);
            }
        });
        
        quizNextBtn.addEventListener('click', () => {
            // Save answer of the current active screen
            const activeScreen = document.querySelector('.quiz-question-screen.active');
            const checkedOption = activeScreen.querySelector('input[type="radio"]:checked');
            
            if (!checkedOption) {
                alert("Please select an option to proceed.");
                return;
            }
            
            quizAnswers[currentQuizStep] = checkedOption.value;
            
            if (currentQuizStep < totalQuizSteps) {
                updateQuizStep(currentQuizStep + 1);
            } else {
                // All questions answered, show email capture card
                quizWizardCard.classList.add('hidden');
                quizEmailCard.classList.remove('hidden');
            }
        });
        
        // Lead capture submission
        const leadForm = document.getElementById('quiz-lead-form');
        if (leadForm) {
            leadForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const email = document.getElementById('qz-email').value;
                const phone = document.getElementById('qz-phone').value;
                const leadSubmitBtn = leadForm.querySelector('button[type="submit"]');
                
                leadSubmitBtn.disabled = true;
                leadSubmitBtn.textContent = "Compiling profile...";
                
                try {
                    const response = await fetch('/api/quiz', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: email,
                            phone: phone,
                            answers: quizAnswers
                        })
                    });
                    
                    if (!response.ok) throw new Error('Lead compile failed');
                    
                    const result = await response.json();
                    
                    // Render Results Card
                    document.getElementById('res-icon').textContent = result.icon;
                    document.getElementById('res-personality-name').textContent = result.personality;
                    document.getElementById('res-desc').textContent = result.description;
                    document.getElementById('res-tip').textContent = result.tip;
                    
                    // Append foods
                    const foodsBox = document.getElementById('res-foods');
                    foodsBox.innerHTML = '';
                    result.foods.forEach(food => {
                        const span = document.createElement('span');
                        span.className = 'food-tag-badge';
                        span.textContent = food;
                        foodsBox.appendChild(span);
                    });
                    
                    // Modify redirect link to pre-select Clinical Nutrition for Gut Healers
                    const bookRedirectBtn = document.getElementById('btn-quiz-book-redirect');
                    if (result.personality === 'Gut Healer') {
                        bookRedirectBtn.href = '/book?service=Clinical Nutrition';
                    } else {
                        bookRedirectBtn.href = `/book?service=Weight Loss Management`;
                    }
                    
                    quizEmailCard.classList.add('hidden');
                    quizResultsCard.classList.remove('hidden');
                    
                } catch (err) {
                    console.error(err);
                    alert("Failed to submit lead data. Please try again.");
                } finally {
                    leadSubmitBtn.disabled = false;
                }
            });
        }
        
        updateQuizStep(1);
    }

    /* ==========================================================================
       8. CONTACT FORM SUBMISSION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const contactSuccessMsg = document.getElementById('contact-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const name = document.getElementById('ct-name').value;
            const email = document.getElementById('ct-email').value;
            const phone = document.getElementById('ct-phone').value;
            const message = document.getElementById('ct-msg').value;
            
            submitBtn.disabled = true;
            submitBtn.textContent = "Sending message...";
            
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        phone: phone,
                        message: message
                    })
                });
                
                if (!response.ok) throw new Error('Contact submit failed');
                
                contactForm.reset();
                contactSuccessMsg.classList.remove('hidden');
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    contactSuccessMsg.classList.add('hidden');
                }, 5000);
                
            } catch (err) {
                console.error(err);
                alert("Failed to send message. Please verify your connection.");
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = "Send Message";
            }
        });
    }

    /* ==========================================================================
       9. PERSISTENT FLOATING AI CHATBOT WIDGET
       ========================================================================== */
    const chatbotTrigger = document.getElementById('chatbot-trigger');
    const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotBody = document.getElementById('chatbot-body');
    
    if (chatbotTrigger && chatbotWindow) {
        const chatHistory = []; // Local session state
        
        chatbotTrigger.addEventListener('click', () => {
            chatbotWindow.classList.toggle('hidden');
            // Scroll to bottom on open
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        });
        
        if (chatbotCloseBtn) {
            chatbotCloseBtn.addEventListener('click', () => {
                chatbotWindow.classList.add('hidden');
            });
        }
        
        chatbotForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const messageText = chatbotInput.value.trim();
            if (!messageText) return;
            
            chatbotInput.value = '';
            
            // 1. Render User Message
            const userMsgEl = document.createElement('div');
            userMsgEl.className = 'chat-message user-message';
            userMsgEl.textContent = messageText;
            chatbotBody.appendChild(userMsgEl);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
            
            // 2. Add Typing Indicator
            const typingEl = document.createElement('div');
            typingEl.className = 'chat-typing-indicator';
            typingEl.textContent = "Assistant is typing...";
            chatbotBody.appendChild(typingEl);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
            
            // Store user history
            const payloadHistory = [...chatHistory];
            chatHistory.push({ role: 'user', content: messageText });
            
            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: messageText,
                        history: payloadHistory
                    })
                });
                
                typingEl.remove();
                
                if (!response.ok) throw new Error('Chat API failed');
                
                const data = await response.json();
                
                // 3. Render Bot Response
                const botMsgEl = document.createElement('div');
                botMsgEl.className = 'chat-message bot-message';
                botMsgEl.textContent = data.reply;
                
                chatbotBody.appendChild(botMsgEl);
                chatbotBody.scrollTop = chatbotBody.scrollHeight;
                
                // Store bot history
                chatHistory.push({ role: 'assistant', content: data.reply });
                
            } catch (err) {
                console.error(err);
                typingEl.remove();
                
                const errEl = document.createElement('div');
                errEl.className = 'chat-message bot-message';
                errEl.innerHTML = "I am sorry, I am having trouble connecting. Feel free to message Oshin directly on <a href='https://wa.me/919876543210' target='_blank'>WhatsApp</a>! 🌿";
                chatbotBody.appendChild(errEl);
                chatbotBody.scrollTop = chatbotBody.scrollHeight;
            }
        });
    }

    /* ==========================================================================
       10. CLINIC DIET REPORT GENERATOR (REDESIGNED STAFF PORTAL)
       ========================================================================== */
    const clinicalDropArea = document.getElementById('clinical-drop-area');
    const clinicalFileInput = document.getElementById('clinical-file-input');
    const clinicalUploadContent = document.getElementById('clinical-upload-content');
    const clinicalFilePreview = document.getElementById('clinical-file-preview');
    const clinicalFileName = document.getElementById('clinical-file-name');
    const clinicalFileRemoveBtn = document.getElementById('clinical-file-remove-btn');
    const btnGenerateReport = document.getElementById('btn-generate-clinical-report');
    
    if (clinicalDropArea && clinicalFileInput && btnGenerateReport) {
        let selectedIntakeFile = null;
        
        // Drag-Drop events
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evt => {
            clinicalDropArea.addEventListener(evt, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(evt => {
            clinicalDropArea.addEventListener(evt, () => {
                clinicalDropArea.classList.add('dragover');
            });
        });
        
        ['dragleave', 'drop'].forEach(evt => {
            clinicalDropArea.addEventListener(evt, () => {
                clinicalDropArea.classList.remove('dragover');
            });
        });
        
        clinicalDropArea.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            validateAndSetFile(dt.files);
        });
        
        clinicalFileInput.addEventListener('change', function() {
            validateAndSetFile(this.files);
        });
        
        function validateAndSetFile(files) {
            if (files.length > 0) {
                const file = files[0];
                if (file.type.startsWith('image/') || file.type === 'application/pdf') {
                    selectedIntakeFile = file;
                    clinicalFileName.textContent = file.name;
                    clinicalUploadContent.classList.add('hidden');
                    clinicalFilePreview.classList.remove('hidden');
                    btnGenerateReport.disabled = false;
                    
                    // Reset success/error blocks
                    document.getElementById('clinical-success-state').classList.add('hidden');
                    document.getElementById('clinical-error-state').classList.add('hidden');
                } else {
                    alert("Only PDF files and Image documents are accepted.");
                }
            }
        }
        
        function removeSelectedFile() {
            selectedIntakeFile = null;
            clinicalFileInput.value = '';
            clinicalUploadContent.classList.remove('hidden');
            clinicalFilePreview.classList.add('hidden');
            btnGenerateReport.disabled = true;
        }
        
        if (clinicalFileRemoveBtn) {
            clinicalFileRemoveBtn.addEventListener('click', removeSelectedFile);
        }
        
        btnGenerateReport.addEventListener('click', async () => {
            if (!selectedIntakeFile) return;
            
            const loadingState = document.getElementById('clinical-loading-state');
            const progressFill = document.getElementById('clinical-progress-fill');
            const loadingText = document.getElementById('clinical-loading-text');
            const successState = document.getElementById('clinical-success-state');
            const errorState = document.getElementById('clinical-error-state');
            const downloadLink = document.getElementById('clinical-download-link');
            
            // Toggle visibility states
            btnGenerateReport.classList.add('hidden');
            loadingState.classList.remove('hidden');
            successState.classList.add('hidden');
            errorState.classList.add('hidden');
            
            // Progress Stages Animation
            const stages = [
                { text: "Extracting Patient Form Data...", progress: 20 },
                { text: "Analyzing Clinical Conditions...", progress: 45 },
                { text: "Compiling 6-Meal Chart...", progress: 75 },
                { text: "Formatting Word Report...", progress: 92 }
            ];
            
            let stageIdx = 0;
            progressFill.style.width = "5%";
            
            const timer = setInterval(() => {
                if (stageIdx < stages.length) {
                    loadingText.textContent = stages[stageIdx].text;
                    progressFill.style.width = `${stages[stageIdx].progress}%`;
                    stageIdx++;
                }
            }, 2000);
            
            try {
                const formData = new FormData();
                formData.append('file', selectedIntakeFile);
                
                const activeMode = document.querySelector('input[name="patient_mode"]:checked').value;
                formData.append('mode', activeMode);
                
                const response = await fetch('/api/generate', {
                    method: 'POST',
                    body: formData
                });
                
                clearInterval(timer);
                
                if (!response.ok) {
                    const err = await response.json();
                    throw new Error(err.error || 'Diet generation failed.');
                }
                
                progressFill.style.width = "100%";
                loadingText.textContent = "Finalizing document...";
                
                // Get the blob response (DOCX file)
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                
                // Filename parsing
                let filename = 'Clinical_Diet_Plan.docx';
                const disposition = response.headers.get('Content-Disposition');
                if (disposition && disposition.includes('attachment')) {
                    const match = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(disposition);
                    if (match && match[1]) {
                        filename = match[1].replace(/['"]/g, '');
                    }
                }
                
                downloadLink.href = url;
                downloadLink.download = filename;
                
                setTimeout(() => {
                    loadingState.classList.add('hidden');
                    successState.classList.remove('hidden');
                    btnGenerateReport.classList.remove('hidden');
                    btnGenerateReport.textContent = "Generate Another Plan";
                    removeSelectedFile();
                }, 500);
                
            } catch (err) {
                clearInterval(timer);
                console.error(err);
                loadingState.classList.add('hidden');
                btnGenerateReport.classList.remove('hidden');
                
                document.getElementById('clinical-error-message').textContent = err.message;
                errorState.classList.remove('hidden');
            }
        });
    }

    /* ==========================================================================
       11. VISIBLE STATS OBSERVER (COUNT UP ANIMATION)
       ========================================================================== */
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseFloat(el.getAttribute('data-target'));
                    animateCountUp(el, target);
                    obs.unobserve(el); // Only count up once
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(num => observer.observe(num));
        
        function animateCountUp(element, target) {
            let start = 0;
            const duration = 2000; // 2 seconds
            const startTime = performance.now();
            const isFloat = !Number.isInteger(target);
            
            function updateCount(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out quad
                const easeProgress = progress * (2 - progress);
                const currentVal = easeProgress * target;
                
                if (isFloat) {
                    element.textContent = currentVal.toFixed(1) + '★';
                } else {
                    element.textContent = Math.floor(currentVal) + '+';
                    if (element.getAttribute('data-target') === '95') {
                        element.textContent = Math.floor(currentVal) + '%';
                    }
                }
                
                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    // Force final value
                    if (isFloat) {
                        element.textContent = target.toFixed(1) + '★';
                    } else if (element.getAttribute('data-target') === '95') {
                        element.textContent = target + '%';
                    } else {
                        element.textContent = target + '+';
                    }
                }
            }
            
            requestAnimationFrame(updateCount);
        }
    } else {
        // Fallback for browsers without IntersectionObserver
        statNumbers.forEach(el => {
            const val = el.getAttribute('data-target');
            if (val.includes('.')) el.textContent = val + '★';
            else if (val === '95') el.textContent = val + '%';
            else el.textContent = val + '+';
        });
    }
});
