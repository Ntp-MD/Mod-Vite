

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('card_slide');
    const items = container.querySelectorAll('.card_items');
    const dotIndicators = document.getElementById('dot-indicators');
    let initialYPosition = null;
    let currentYPosition = null;
    const dragThreshold = 30; // Minimum drag distance to switch items

    // Create dots based on the number of items
    items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.dataset.index = index;
        dotIndicators.appendChild(dot);
    });

    // Set the first item and dot as active initially
    if (items.length > 0) {
        items[0].classList.add('active');
        dotIndicators.children[0].classList.add('active');
    }

    // Initialize Intersection Observer
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

    // Observe all content items
    items.forEach(item => observer.observe(item));

    // Add click event listeners to dots
    dotIndicators.addEventListener('click', (event) => {
        if (event.target.classList.contains('dot')) {
            const index = parseInt(event.target.dataset.index, 10);
            const targetItem = items[index];

            if (targetItem) {
                // Scroll to the target item
                targetItem.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Update active states
                items.forEach(item => item.classList.remove('active'));
                dotIndicators.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
                targetItem.classList.add('active');
                event.target.classList.add('active');
            }
        }
    });

    // Handle snap behavior based on drag
    const handleDragEnd = () => {
        if (initialYPosition !== null && currentYPosition !== null) {
            const dragDistance = currentYPosition - initialYPosition;

            if (Math.abs(dragDistance) >= dragThreshold) {
                const direction = dragDistance < 0 ? 'down' : 'up';
                let activeItemIndex = Array.from(items).findIndex(item => item.classList.contains('active'));
                let newIndex = activeItemIndex;

                if (direction === 'up' && activeItemIndex > 0) {
                    newIndex = activeItemIndex - 1;
                } else if (direction === 'down' && activeItemIndex < items.length - 1) {
                    newIndex = activeItemIndex + 1;
                }

                const targetItem = items[newIndex];
                if (targetItem) {
                    // Scroll to the target item
                    targetItem.scrollIntoView({ behavior: 'smooth', block: 'start' });

                    // Update active states
                    items.forEach(item => item.classList.remove('active'));
                    dotIndicators.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
                    targetItem.classList.add('active');
                    dotIndicators.children[newIndex].classList.add('active');
                }
            }
        }

        // Reset drag positions
        initialYPosition = null;
        currentYPosition = null;
    };

    // Event listeners for mouse/touch events to track dragging
    container.addEventListener('mousedown', (e) => {
        initialYPosition = e.clientY;
    });

    container.addEventListener('mousemove', (e) => {
        if (initialYPosition !== null) {
            currentYPosition = e.clientY;
        }
    });

    container.addEventListener('mouseup', handleDragEnd);

    container.addEventListener('touchstart', (e) => {
        initialYPosition = e.touches[0].clientY;
    });

    container.addEventListener('touchmove', (e) => {
        if (initialYPosition !== null) {
            currentYPosition = e.touches[0].clientY;
        }
    });

    container.addEventListener('touchend', handleDragEnd);
});
