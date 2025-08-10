// Minecraft Bedwars Leaderboard - Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Bedwars Leaderboard initialized successfully!');

    // Initialize all components
    initializeCursor();
    initializeRippleEffect();
    initializeAnimations();
    initializeStatCalculators();
    initializeFormValidation();
    initializeMobileOptimizations();
    initializePerformanceMetrics();
    initializeAccessibility();
    initializeAdvancedFeatures();
    initializeGradientSystem();
    initializeLazyLoading();

    // Apply current theme if set
    applyCurrentTheme();

    // Initialize i18n when DOM is loaded
    if (typeof window.bedwarsI18n === 'undefined') {
        window.bedwarsI18n = new I18n();
    }

    // Ensure language switching works
    setTimeout(() => {
        if (window.bedwarsI18n && typeof window.bedwarsI18n.createLanguageSwitcher === 'function') {
            window.bedwarsI18n.createLanguageSwitcher();
        }
    }, 100);
});

// Advanced Custom Cursor System
function initializeCursor() {
    console.log('🖱️ Initializing elite custom cursor...');

    // Check if device supports custom cursor (not mobile/touch)
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        console.log('📱 Touch device detected, skipping custom cursor');
        return;
    }

    // Create main cursor element
    const cursor = document.createElement('div');
    cursor.className = 'elite-cursor default';
    document.body.appendChild(cursor);

    // Create cursor trail elements
    const trailElements = [];
    for (let i = 0; i < 5; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        trailElements.push(trail);
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    const trailPositions = [];

    // Initialize trail positions
    for (let i = 0; i < 5; i++) {
        trailPositions.push({ x: mouseX, y: mouseY });
    }

    // Mouse move handler
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function updateCursor() {
        // Smooth cursor movement
        const deltaX = mouseX - cursorX;
        const deltaY = mouseY - cursorY;

        cursorX += deltaX * 0.2;
        cursorY += deltaY * 0.2;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Update trail
        trailPositions.unshift({ x: cursorX, y: cursorY });
        trailPositions.pop();

        trailElements.forEach((trail, index) => {
            const pos = trailPositions[index];
            if (pos) {
                trail.style.left = pos.x + 'px';
                trail.style.top = pos.y + 'px';
                trail.style.opacity = (0.6 - index * 0.1);
            }
        });

        requestAnimationFrame(updateCursor);
    }

    updateCursor();

    // Cursor state handlers
    const interactiveElements = 'a, button, input, select, textarea, [role="button"], .btn, .clickable';
    const textElements = 'input[type="text"], input[type="email"], input[type="password"], textarea, [contenteditable="true"]';
    const disabledElements = '[disabled], .disabled';

    // Mouse down - click state
    document.addEventListener('mousedown', (e) => {
        cursor.className = 'elite-cursor click';
        createClickEffect(e.clientX, e.clientY);
    });

    // Mouse up - return to previous state
    document.addEventListener('mouseup', (e) => {
        const target = e.target;
        if (target.matches && target.matches(disabledElements)) {
            cursor.className = 'elite-cursor disabled';
        } else if (target.matches && target.matches(textElements)) {
            cursor.className = 'elite-cursor text';
        } else if (target.matches && target.matches(interactiveElements)) {
            cursor.className = 'elite-cursor hover';
        } else {
            cursor.className = 'elite-cursor default';
        }
    });

    // Mouse over - hover states
    document.addEventListener('mouseover', (e) => {
        const target = e.target;
        if (target && target.nodeType === 1 && target.matches) {
            if (target.matches(disabledElements)) {
                cursor.className = 'elite-cursor disabled';
            } else if (target.matches(textElements)) {
                cursor.className = 'elite-cursor text';
            } else if (target.matches(interactiveElements)) {
                cursor.className = 'elite-cursor hover';
            }
        }
    });

    // Mouse out - return to default
    document.addEventListener('mouseout', (e) => {
        const target = e.target;
        if (target && target.nodeType === 1 && target.matches) {
            if (target.matches(interactiveElements) || target.matches(textElements) || target.matches(disabledElements)) {
                cursor.className = 'elite-cursor default';
            }
        }
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        trailElements.forEach(trail => trail.style.opacity = '0');
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

    // Activate custom cursor
    document.body.classList.add('custom-cursor-active');
}

// Click effect function
function createClickEffect(x, y) {
    const clickEffect = document.createElement('div');
    clickEffect.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 30px;
        height: 30px;
        border: 2px solid #ffc107;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%) scale(0);
        animation: clickRipple 0.6s ease-out forwards;
    `;

    document.body.appendChild(clickEffect);

    setTimeout(() => {
        clickEffect.remove();
    }, 600);
}

// Add click ripple animation to CSS
const clickRippleCSS = `
@keyframes clickRipple {
    0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) scale(2);
        opacity: 0;
    }
}
`;

// Add the CSS to head
const styleSheet = document.createElement('style');
styleSheet.textContent = clickRippleCSS;
document.head.appendChild(styleSheet);

function createCursorRipple(e) {
    const ripple = document.createElement('div');
    ripple.className = 'cursor-ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 800);
}


function initializeRippleEffect() {
    function createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        document.body.appendChild(ripple);

        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 800);
    }

    // Make createRipple available globally
    window.createRipple = createRipple;

    document.addEventListener('click', function(e) {
        if (e.target && e.target.nodeType === 1 && e.target.matches && e.target.matches('button, .btn, .card, .ripple')) {
            createRippleFromEvent(e);
        }
    });
}

function createRippleFromEvent(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms linear;
        background-color: rgba(255, 255, 255, 0.6);
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
    `;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function initializeAnimations() {
    console.log('✨ Initializing animations...');

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.player-row, .stat-card, .achievement-card').forEach(el => {
        observer.observe(el);
    });

    // Animate stat counters
    animateStatCounters();

    // Update winrate colors
    updateWinRateColors();
}

function animateStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-value');

    statNumbers.forEach((stat, index) => {
        const value = parseInt(stat.textContent.replace(/,/g, ''));
        if (!isNaN(value) && value > 0) {
            setTimeout(() => {
                animateNumber(stat, 0, value, 1500);
            }, index * 100);
        }
    });
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOut);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Enhanced Gradient System
function initializeGradientSystem() {
    console.log('🎨 Initializing gradient system...');

    // Load all player gradients on leaderboard
    loadLeaderboardGradients();

    // Initialize gradient inventory system
    initializeGradientInventory();

    // Fix any broken gradients
    fixBrokenGradients();
}

function loadLeaderboardGradients() {
    const playerRows = document.querySelectorAll('.player-row');
    playerRows.forEach(row => {
        const playerId = row.getAttribute('data-player-id');
        if (playerId) {
            loadPlayerGradients(parseInt(playerId));
        }
    });
}

function loadPlayerGradients(playerId) {
    fetch(`/api/player/${playerId}/gradients`)
        .then(response => response.json())
        .then(data => {
            if (data.success && data.gradients) {
                applyPlayerGradients(playerId, data.gradients);
            }
        })
        .catch(error => {
            console.error('Error loading player gradients:', error);
        });
}

function applyPlayerGradients(playerId, gradients) {
    Object.entries(gradients).forEach(([elementType, gradientData]) => {
        if (gradientData && gradientData.css_gradient) {
            applyGradientToElement(playerId, elementType, gradientData);
        }
    });
}

function applyGradientToElement(playerId, elementType, gradientData) {
    const elements = document.querySelectorAll(`[data-player-id="${playerId}"][data-element="${elementType}"]`);

    elements.forEach(element => {
        if (gradientData.css_gradient) {
            element.style.background = gradientData.css_gradient;
            element.style.backgroundSize = '200% 200%';
            element.style.webkitBackgroundClip = 'text';
            element.style.webkitTextFillColor = 'transparent';
            element.style.backgroundClip = 'text';

            if (gradientData.is_animated) {
                element.style.animation = 'gradientShift 3s ease-in-out infinite';
            }

            element.classList.add('gradient-text');
        }
    });
}

function initializeGradientInventory() {
    // Initialize gradient inventory if on inventory page
    if (window.location.pathname === '/inventory') {
        initializeInventoryHandlers();
    }
}

function initializeInventoryHandlers() {
    // Apply gradient buttons
    document.querySelectorAll('.apply-gradient-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const gradientId = this.getAttribute('data-gradient-id');
            const elementType = this.getAttribute('data-element-type');
            applyInventoryGradient(gradientId, elementType);
        });
    });

    // Remove gradient buttons
    document.querySelectorAll('.remove-gradient-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const elementType = this.getAttribute('data-element-type');
            removeInventoryGradient(elementType);
        });
    });
}

function applyInventoryGradient(gradientId, elementType) {
    fetch('/api/apply-gradient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            gradient_id: gradientId,
            element_type: elementType
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showToast('Градиент применён!', 'success');
            setTimeout(() => location.reload(), 1000);
        } else {
            showToast(data.error || 'Ошибка применения градиента', 'error');
        }
    })
    .catch(error => {
        console.error('Error applying gradient:', error);
        showToast('Ошибка применения градиента', 'error');
    });
}

function removeInventoryGradient(elementType) {
    fetch('/api/remove-gradient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            element_type: elementType
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showToast('Градиент удалён!', 'success');
            setTimeout(() => location.reload(), 1000);
        } else {
            showToast(data.error || 'Ошибка удаления градиента', 'error');
        }
    })
    .catch(error => {
        console.error('Error removing gradient:', error);
        showToast('Ошибка удаления градиента', 'error');
    });
}

function fixBrokenGradients() {
    // Fix gradient fallbacks for unsupported browsers
    document.querySelectorAll('.gradient-text').forEach(element => {
        if (!CSS.supports('-webkit-background-clip', 'text')) {
            const fallbackColor = element.getAttribute('data-fallback-color') || '#ffc107';
            element.style.color = fallbackColor;
            element.style.background = 'none';
        }
    });
}

// Statistics Calculators
function initializeStatCalculators() {
    console.log('🧮 Initializing stat calculators...');

    // Real-time K/D ratio calculator
    const killInputs = document.querySelectorAll('input[name="kills"]');
    const deathInputs = document.querySelectorAll('input[name="deaths"]');

    function updateKDRatio() {
        const kills = parseInt(killInputs[0]?.value || 0);
        const deaths = parseInt(deathInputs[0]?.value || 0);
        const ratio = deaths > 0 ? (kills / deaths).toFixed(2) : kills;

        const kdDisplay = document.querySelector('.kd-preview');
        if (kdDisplay) {
            kdDisplay.textContent = ratio;
            kdDisplay.className = `kd-preview ${ratio >= 2 ? 'text-success' : ratio >= 1 ? 'text-warning' : 'text-danger'}`;
        }
    }

    killInputs.forEach(input => input.addEventListener('input', updateKDRatio));
    deathInputs.forEach(input => input.addEventListener('input', updateKDRatio));

    // Auto-calculate stats in admin forms
    const statsInputs = document.querySelectorAll('input[type="number"][data-stat]');
    statsInputs.forEach(input => {
        input.addEventListener('input', function() {
            calculateDerivedStats();
        });
    });
}

function calculateDerivedStats() {
    const killsInput = document.querySelector('input[name="kills"]');
    const deathsInput = document.querySelector('input[name="deaths"]');
    const winsInput = document.querySelector('input[name="wins"]');
    const gamesInput = document.querySelector('input[name="games_played"]');

    if (killsInput && deathsInput) {
        const kills = parseInt(killsInput.value) || 0;
        const deaths = parseInt(deathsInput.value) || 0;
        const kd = deaths > 0 ? (kills / deaths).toFixed(2) : kills;

        const kdDisplay = document.querySelector('.kd-display');
        if (kdDisplay) {
            kdDisplay.textContent = `K/D: ${kd}`;
        }
    }

    if (winsInput && gamesInput) {
        const wins = parseInt(winsInput.value) || 0;
        const games = parseInt(gamesInput.value) || 0;
        const winRate = games > 0 ? ((wins / games) * 100).toFixed(1) : 0;

        const wrDisplay = document.querySelector('.wr-display');
        if (wrDisplay) {
            wrDisplay.textContent = `Win Rate: ${winRate}%`;
        }
    }
}

// Form Validation
function initializeFormValidation() {
    console.log('✅ Initializing form validation...');

    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(form)) {
                e.preventDefault();
                return false;
            }
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
        });
    });
}

function validateForm(form) {
    let isValid = true;

    // Check required fields
    const required = form.querySelectorAll('[required]');
    required.forEach(input => {
        if (!input.value.trim()) {
            markInputError(input, 'Это поле обязательно');
            isValid = false;
        }
    });

    // Check numeric ranges
    const numbers = form.querySelectorAll('input[type="number"]');
    numbers.forEach(input => {
        const value = parseInt(input.value);
        const min = parseInt(input.min);
        const max = parseInt(input.max);

        if (value < min) {
            markInputError(input, `Минимальное значение: ${min}`);
            isValid = false;
        }

        if (max && value > max) {
            markInputError(input, `Максимальное значение: ${max}`);
            isValid = false;
        }
    });

    // Game logic validation
    const wins = parseInt(form.querySelector('input[name="wins"]')?.value || 0);
    const games = parseInt(form.querySelector('input[name="games_played"]')?.value || 0);

    if (wins > games) {
        showErrorMessage('Количество побед не может превышать количество игр!');
        isValid = false;
    }

    return isValid;
}

function validateInput(input) {
    clearInputError(input);

    const value = parseFloat(input.value);
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);

    if (input.hasAttribute('required') && !input.value.trim()) {
        markInputError(input, 'Обязательное поле');
        return false;
    }

    if (!isNaN(min) && value < min) {
        markInputError(input, `Мин: ${min}`);
        return false;
    }

    if (!isNaN(max) && value > max) {
        markInputError(input, `Макс: ${max}`);
        return false;
    }

    return true;
}

function markInputError(input, message) {
    input.classList.add('is-invalid');

    let errorDiv = input.parentNode.querySelector('.invalid-feedback');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        input.parentNode.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
}

function clearInputError(input) {
    input.classList.remove('is-invalid');
    const errorDiv = input.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Mobile Optimizations
function initializeMobileOptimizations() {
    console.log('📱 Initializing mobile optimizations...');

    // Touch support for cards
    if ('ontouchstart' in window) {
        document.querySelectorAll('.card, .player-row').forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });

            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            });
        });
    }

    // Responsive table handling
    const tables = document.querySelectorAll('.table-responsive');
    tables.forEach(table => {
        if (window.innerWidth < 768) {
            table.classList.add('mobile-scrollable');
        }
    });

    if (window.innerWidth <= 768) {
        // Disable heavy animations on mobile
        document.body.classList.add('mobile-optimized');

        // Reduce gradient animations
        const animatedGradients = document.querySelectorAll('.gradient-animated');
        animatedGradients.forEach(element => {
            element.style.animation = 'none';
        });
    }
}

// Performance Metrics
function initializePerformanceMetrics() {
    console.log('⚡ Performance Metrics:', {
        'Load Time': `${(performance.now()).toFixed(2)}ms`,
        'DOM Content Loaded': `${(performance.getEntriesByType('navigation')[0]?.domContentLoadedEventEnd - performance.getEntriesByType('navigation')[0]?.domContentLoadedEventStart || 0).toFixed(1)}ms`,
        'Total Page Load': `${(performance.getEntriesByType('navigation')[0]?.loadEventEnd - performance.getEntriesByType('navigation')[0]?.navigationStart || 0).toFixed(1)}ms`
    });
}

// Accessibility Enhancements
function initializeAccessibility() {
    console.log('♿ Initializing accessibility features...');

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }

        // Escape key handling
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.show');
            if (activeModal) {
                const modal = bootstrap.Modal.getInstance(activeModal);
                if (modal) modal.hide();
            }
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Screen reader announcements
    const announceRegion = document.createElement('div');
    announceRegion.setAttribute('aria-live', 'polite');
    announceRegion.setAttribute('aria-atomic', 'true');
    announceRegion.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
    document.body.appendChild(announceRegion);

    window.announceToScreenReader = function(message) {
        announceRegion.textContent = message;
    };

    // Add ARIA labels to interactive elements
    document.querySelectorAll('button, a, input, select').forEach(element => {
        if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
            const text = element.textContent?.trim() || element.getAttribute('title') || element.getAttribute('placeholder');
            if (text) {
                element.setAttribute('aria-label', text);
            }
        }
    });

    // Keyboard navigation for custom elements
    document.querySelectorAll('.player-row').forEach(row => {
        row.setAttribute('tabindex', '0');
        row.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = this.querySelector('a');
                if (link) link.click();
            }
        });
    });
}

// Advanced Features
function initializeAdvancedFeatures() {
    console.log('🚀 Initializing advanced features...');

    initializeQuickFilters();
    initializeKeyboardShortcuts();
    initializeTableEnhancements();
    initializeSearchEnhancements();
    initializeTooltips();
}

function initializeQuickFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const playerRows = document.querySelectorAll('.player-row');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter rows
            playerRows.forEach(row => {
                const shouldShow = filter === 'all' || row.getAttribute('data-filter') === filter;
                row.style.display = shouldShow ? '' : 'none';
            });
        });
    });
}

function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + F to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            const searchInput = document.querySelector('input[name="search"]');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }

        // Escape to clear search
        if (e.key === 'Escape') {
            const searchInput = document.querySelector('input[name="search"]');
            if (searchInput && searchInput.value) {
                searchInput.value = '';
                searchInput.form.submit();
            }
        }
    });
}

function initializeTableEnhancements() {
    const tables = document.querySelectorAll('.leaderboard-table');

    tables.forEach(table => {
        // Add zebra striping enhancement
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach((row, index) => {
            if (index % 2 === 0) {
                row.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
            }
        });

        // Enhanced row hover effects
        rows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
                this.style.boxShadow = '0 4px 15px rgba(255, 193, 7, 0.3)';
            });

            row.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
                this.style.boxShadow = 'none';
            });
        });
    });
}

function initializeTooltips() {
    // Simple tooltip implementation
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0,0,0,0.9);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 0.875rem;
                pointer-events: none;
                z-index: 10000;
                white-space: nowrap;
            `;

            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';

            this._tooltip = tooltip;
        });

        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                delete this._tooltip;
            }
        });
    });
}

function initializeSearchEnhancements() {
    const searchInput = document.querySelector('input[name="search"]');
    if (searchInput) {
        // Debounced search
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (this.value.length >= 2 || this.value.length === 0) {
                    this.form.submit();
                }
            }, 300);
        });

        // Search suggestions
        searchInput.addEventListener('focus', function() {
            // Could implement search suggestions here
        });
    }
}

// Theme System
function applyCurrentTheme() {
    const savedTheme = localStorage.getItem('selected_theme');
    if (savedTheme) {
        try {
            const theme = JSON.parse(savedTheme);
            updateThemeVariables(theme);
        } catch (e) {
            console.error('Error parsing saved theme:', e);
        }
    }

    // Also update variables if there's a session theme
    const sessionTheme = window.sessionTheme;
    if (sessionTheme) {
        updateThemeVariables(sessionTheme);
    }
}

function updateThemeVariables(theme) {
    const root = document.documentElement;

    if (theme.primary_color) root.style.setProperty('--primary-color', theme.primary_color);
    if (theme.secondary_color) root.style.setProperty('--secondary-color', theme.secondary_color);
    if (theme.background_color) root.style.setProperty('--background-color', theme.background_color);
    if (theme.card_background) root.style.setProperty('--card-background', theme.card_background);
    if (theme.text_color) root.style.setProperty('--text-color', theme.text_color);
    if (theme.accent_color) root.style.setProperty('--accent-color', theme.accent_color);
}

// Update winrate colors on load and after animations
function updateWinRateColors() {
    document.querySelectorAll('.winrate').forEach(element => {
        const winrate = parseFloat(element.textContent);
        element.classList.remove('winrate-low', 'winrate-medium', 'winrate-high');

        if (winrate >= 50) {
            element.classList.add('winrate-high');    // Green for 50%+
        } else if (winrate >= 40) {
            element.classList.add('winrate-medium');  // Yellow for 40-49%
        } else {
            element.classList.add('winrate-low');     // Red for 0-39%
        }
    });
}

// Lazy loading function
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Enhanced Feedback System
function showSuccessMessage(message, details = '') {
    showAdvancedToast(message, 'success', details);
}

function showErrorMessage(message, details = '') {
    showAdvancedToast(message, 'error', details);
}

function showInfoMessage(message, details = '') {
    showAdvancedToast(message, 'info', details);
}

function showWarningMessage(message, details = '') {
    showAdvancedToast(message, 'warning', details);
}

// Enhanced loading states
function setButtonLoading(button, loading = true) {
    if (loading) {
        button.disabled = true;
        button.dataset.originalText = button.innerHTML;
        button.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2" role="status"></span>
            Загрузка...
        `;
        button.classList.add('loading');
    } else {
        button.disabled = false;
        button.innerHTML = button.dataset.originalText || button.innerHTML;
        button.classList.remove('loading');
    }
}

// Progress indicator
function showProgress(percentage, message = 'Загрузка...') {
    let progressContainer = document.getElementById('global-progress');

    if (!progressContainer) {
        progressContainer = document.createElement('div');
        progressContainer.id = 'global-progress';
        progressContainer.className = 'global-progress-container';
        progressContainer.innerHTML = `
            <div class="progress-backdrop"></div>
            <div class="progress-content">
                <div class="progress-spinner">
                    <div class="spinner-ring"></div>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: 0%"></div>
                </div>
                <div class="progress-message">Инициализация...</div>
                <div class="progress-percentage">0%</div>
            </div>
        `;
        document.body.appendChild(progressContainer);
    }

    const progressBar = progressContainer.querySelector('.progress-bar');
    const progressMessage = progressContainer.querySelector('.progress-message');
    const progressPercentage = progressContainer.querySelector('.progress-percentage');

    progressContainer.style.display = 'flex';
    progressBar.style.width = percentage + '%';
    progressMessage.textContent = message;
    progressPercentage.textContent = Math.round(percentage) + '%';

    if (percentage >= 100) {
        setTimeout(() => {
            progressContainer.style.display = 'none';
        }, 500);
    }
}

// Enhanced notification system
function showAdvancedToast(message, type = 'info', details = '', duration = 4000) {
    const toastContainer = getOrCreateToastContainer();

    const toast = document.createElement('div');
    toast.className = `advanced-toast toast-${type}`;

    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-triangle',
        warning: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle'
    };

    toast.innerHTML = `
        <div class="toast-icon">
            <i class="${icons[type]}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-message">${message}</div>
            ${details ? `<div class="toast-details">${details}</div>` : ''}
        </div>
        <div class="toast-progress">
            <div class="toast-progress-bar"></div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    toastContainer.appendChild(toast);

    // Animate in
    setTimeout(() => toast.classList.add('show'), 10);

    // Auto remove
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    }, duration);

    // Progress bar animation
    const progressBar = toast.querySelector('.toast-progress-bar');
    progressBar.style.animation = `toastProgress ${duration}ms linear`;
}

function getOrCreateToastContainer() {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    return container;
}

// Form validation feedback
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    // Remove existing error
    clearFieldError(fieldId);

    field.classList.add('is-invalid');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    errorDiv.id = fieldId + '_error';

    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    field.classList.remove('is-invalid');

    const errorDiv = document.getElementById(fieldId + '_error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Action confirmations
function confirmAction(message, callback, options = {}) {
    const {
        title = 'Подтверждение',
        confirmText = 'Подтвердить',
        cancelText = 'Отмена',
        type = 'warning'
    } = options;

    const modal = document.createElement('div');
    modal.className = 'confirmation-modal';
    modal.innerHTML = `
        <div class="confirmation-backdrop"></div>
        <div class="confirmation-content">
            <div class="confirmation-header">
                <h5 class="confirmation-title">${title}</h5>
            </div>
            <div class="confirmation-body">
                <div class="confirmation-icon confirmation-${type}">
                    <i class="fas fa-${type === 'danger' ? 'exclamation-triangle' : 'question-circle'}"></i>
                </div>
                <p class="confirmation-message">${message}</p>
            </div>
            <div class="confirmation-footer">
                <button class="btn btn-secondary confirmation-cancel">${cancelText}</button>
                <button class="btn btn-${type === 'danger' ? 'danger' : 'warning'} confirmation-confirm">${confirmText}</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Event listeners
    modal.querySelector('.confirmation-cancel').onclick = () => {
        modal.remove();
    };

    modal.querySelector('.confirmation-confirm').onclick = () => {
        callback();
        modal.remove();
    };

    modal.querySelector('.confirmation-backdrop').onclick = () => {
        modal.remove();
    };

    // Animate in
    setTimeout(() => modal.classList.add('show'), 10);
}

function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-message toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
            <span>${message}</span>
        </div>
    `;

    // Add to page
    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after delay
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('🚨 JavaScript Error:', {
        message: e.message,
        filename: e.filename,
        line: e.lineno,
        column: e.colno
    });
});

// Initialize Elite Squad specific features
console.log('🎮 Elite Squad Bedwars initialized successfully!');

// Admin Calculator Functions
function showCalculator() {
    const calculator = document.getElementById('quick_calculator');
    if (calculator) {
        calculator.style.display = calculator.style.display === 'none' ? 'block' : 'none';
    }
}

function setOperation(operation, value) {
    document.getElementById('operation').value = operation;
    document.getElementById('value').value = value;

    // Auto-set common stat types based on value
    const statType = document.getElementById('stat_type');
    if (value >= 1000) {
        statType.value = 'experience';
    } else if (value >= 100) {
        statType.value = 'coins';
    } else if (value <= 50 && value > 0) {
        statType.value = 'reputation';
    }

    // Visual feedback
    showInfoMessage(`Операция установлена: ${operation === 'add' ? 'Добавить' : operation === 'subtract' ? 'Убавить' : 'Установить'} ${value}`);
}

// Enhanced form submissions with feedback
function enhanceFormSubmissions() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                setButtonLoading(submitBtn, true);

                // Re-enable button after timeout (fallback)
                setTimeout(() => {
                    setButtonLoading(submitBtn, false);
                }, 5000);
            }
        });
    });
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
    enhanceFormSubmissions();

    // Auto-hide flash messages after delay
    setTimeout(() => {
        document.querySelectorAll('.alert').forEach(alert => {
            if (alert.classList.contains('alert-success')) {
                alert.style.transition = 'opacity 0.5s ease';
                alert.style.opacity = '0';
                setTimeout(() => alert.remove(), 500);
            }
        });
    }, 3000);
});


// Enhanced dropdown functionality
document.addEventListener('click', function(e) {
    // Close dropdowns when clicking outside
    if (e.target && e.target.matches && !e.target.matches('.dropdown-toggle')) {
        const dropdowns = document.querySelectorAll('.dropdown-menu.show');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }
});

// Enhanced ripple effect for buttons
function createRipple(button, event) {
    if (!button || typeof button.getBoundingClientRect !== 'function') {
        return;
    }

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    try {
        const rect = button.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        circle.classList.add("ripple");

        const ripple = button.getElementsByClassName("ripple")[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    } catch (error) {
        console.warn('Ripple effect error:', error);
    }
}

// Event delegation for dynamic elements
document.addEventListener('click', function(e) {
    if (e.target && e.target.nodeType === 1 && e.target.matches) {
        if (e.target.matches('.btn, button, .clickable')) {
            createRipple(e.target, e);
        }

        if (e.target.matches('.tab-button')) {
            switchTab(e.target.dataset.tab);
        }
    }
});