

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('box_slide');
    const items = container.querySelectorAll('.box_items');
    const dotIndicators = document.getElementById('dot-indicators');
    let initialXPosition = null;
    let currentXPosition = null;
    const dragThreshold = 20; // Minimum drag distance to switch items
    let autoplayInterval = null;
    const autoplayDelay = 3000; // Delay between auto-scrolls (in milliseconds)

    // Create dots based on the number of items
    items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.dataset.index = index;
        dotIndicators.appendChild(dot);
    });

    // Explicitly set the first item and dot as active on load
    function setFirstItemActive() {
        items.forEach(item => item.classList.remove('active'));
        dotIndicators.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));

        items[0].classList.add('active');
        dotIndicators.children[0].classList.add('active');

        // Reset scroll position to ensure the first item is visible on refresh
        container.scrollLeft = 1;
    }

    // Set the first item as active immediately after the DOM is loaded
    setFirstItemActive();

    // Initialize Intersection Observer but do not observe items yet
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all items and dots
                items.forEach(item => item.classList.remove('active'));
                dotIndicators.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));

                // Add active class to the currently visible item and dot
                entry.target.classList.add('active');
                dotIndicators.children[Array.from(items).indexOf(entry.target)].classList.add('active');
            }
        });
    }, {
        root: container,
        rootMargin: '0px',
        threshold: 0.8
    });

    // Manually observe items after making sure layout is stable
    function observeItems() {
        items.forEach(item => observer.observe(item));
    }

    // Add click event listeners to dots
    dotIndicators.addEventListener('click', (event) => {
        if (event.target.classList.contains('dot')) {
            const index = parseInt(event.target.dataset.index, 10);
            const targetItem = items[index];

            if (targetItem) {
                // Scroll to the target item
                targetItem.scrollIntoView({ behavior: 'smooth', inline: 'start' });

                // Update active states
                items.forEach(item => item.classList.remove('active'));
                dotIndicators.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
                targetItem.classList.add('active');
                event.target.classList.add('active');

                // Reset autoplay when user interacts
                resetAutoplay();
            }
        }
    });

    // Allow every item to trigger active state
    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Remove active class from all items and dots
            items.forEach(item => item.classList.remove('active'));
            dotIndicators.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));

            // Set the clicked item as active
            item.classList.add('active');
            dotIndicators.children[index].classList.add('active');

            // Scroll to the clicked item
            item.scrollIntoView({ behavior: 'smooth', inline: 'start' });

            // Reset autoplay when user interacts
            resetAutoplay();
        });
    });

    // Handle snap behavior based on drag
    const handleDragEnd = () => {
        if (initialXPosition !== null && currentXPosition !== null) {
            const dragDistance = currentXPosition - initialXPosition;

            if (Math.abs(dragDistance) >= dragThreshold) {
                const direction = dragDistance < 0 ? 'left' : 'right';
                let activeItemIndex = Array.from(items).findIndex(item => item.classList.contains('active'));
                let newIndex = activeItemIndex;

                // Left drag should go to the next item, right drag should go to the previous
                if (direction === 'left') {
                    newIndex = activeItemIndex + 1 < items.length ? activeItemIndex + 1 : 0; // Loop to first item if at the end
                } else if (direction === 'right') {
                    newIndex = activeItemIndex - 1 >= 0 ? activeItemIndex - 1 : items.length - 1; // Loop to last item if at the start
                }

                const targetItem = items[newIndex];
                if (targetItem) {
                    // Scroll to the target item
                    targetItem.scrollIntoView({ behavior: 'smooth', inline: 'start' });

                    // Update active states
                    items.forEach(item => item.classList.remove('active'));
                    dotIndicators.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
                    targetItem.classList.add('active');
                    dotIndicators.children[newIndex].classList.add('active');

                    // Reset autoplay when user interacts
                    resetAutoplay();
                }
            }
        }

        // Reset drag positions
        initialXPosition = null;
        currentXPosition = null;
    };

    // Event listeners for mouse/touch events to track dragging
    container.addEventListener('mousedown', (e) => {
        initialXPosition = e.clientX;
    });

    container.addEventListener('mousemove', (e) => {
        if (initialXPosition !== null) {
            currentXPosition = e.clientX;
        }
    });

    container.addEventListener('mouseup', handleDragEnd);

    container.addEventListener('touchstart', (e) => {
        initialXPosition = e.touches[0].clientX;
    });

    container.addEventListener('touchmove', (e) => {
        if (initialXPosition !== null) {
            currentXPosition = e.touches[0].clientX;
        }
    });

    container.addEventListener('touchend', handleDragEnd);

    // Enable mouse wheel scrolling with looping
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        const activeItemIndex = Array.from(items).findIndex(item => item.classList.contains('active'));
        let newIndex = activeItemIndex;

        if (e.deltaY > 0) {
            newIndex = activeItemIndex + 1 < items.length ? activeItemIndex + 1 : 0; // Loop to first item if at the end
        } else if (e.deltaY < 0) {
            newIndex = activeItemIndex - 1 >= 0 ? activeItemIndex - 1 : items.length - 1; // Loop to last item if at the start
        }

        const targetItem = items[newIndex];
        if (targetItem) {
            targetItem.scrollIntoView({ behavior: 'smooth', inline: 'start' });

            // Update active states
            items.forEach(item => item.classList.remove('active'));
            dotIndicators.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
            targetItem.classList.add('active');
            dotIndicators.children[newIndex].classList.add('active');

            // Reset autoplay when user interacts
            resetAutoplay();
        }
    });

    // Autoplay function to loop through items
    function autoplay() {
        const activeItemIndex = Array.from(items).findIndex(item => item.classList.contains('active'));
        let newIndex = activeItemIndex + 1 < items.length ? activeItemIndex + 1 : 0; // Loop to first item if at the end

        const targetItem = items[newIndex];
        if (targetItem) {
            targetItem.scrollIntoView({ behavior: 'smooth', inline: 'start' });

            // Update active states
            items.forEach(item => item.classList.remove('active'));
            dotIndicators.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
            targetItem.classList.add('active');
            dotIndicators.children[newIndex].classList.add('active');
        }
    }

    // Start autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(autoplay, autoplayDelay);
    }

    // Reset autoplay whenever user interacts with the carousel
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Start autoplay when page loads
    startAutoplay();
});

