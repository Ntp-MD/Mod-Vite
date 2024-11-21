export function slide1() {
  $(document).ready(function () {
    const $container = $('#box_slide');
    const $items = $container.find('.box_items');
    const $dotIndicators = $('#dot-indicators');
    let initialXPosition = null;
    let currentXPosition = null;
    const dragThreshold = 20; // Minimum drag distance to switch items
    const autoplayDelay = 3000; // Delay between auto-scrolls (in milliseconds)
    let autoplayInterval = null;

    // Create dots based on the number of items
    $items.each(function (index) {
      $dotIndicators.append(`<div class="dot" data-index="${index}"></div>`);
    });

    // Call the updateDots function to apply initial styles
    updateDots();

    // Explicitly set the first item and dot as active
    function setActive(index) {
      $items.removeClass('active').eq(index).addClass('active');
      $dotIndicators.find('.dot').removeClass('active').eq(index).addClass('active');
      $items.eq(index)[0].scrollIntoView({ behavior: 'smooth', inline: 'start' });
      updateDots(); // Ensure dots update after setting active item
    }

    // Initialize active state for the first item
    setActive(0);

    // Add click event listener to dots
    $dotIndicators.on('click', '.dot', function () {
      const index = $(this).data('index');
      setActive(index);
      resetAutoplay();
    });

    // Handle dragging behavior
    function handleDragEnd() {
      if (initialXPosition !== null && currentXPosition !== null) {
        const dragDistance = currentXPosition - initialXPosition;
        const activeIndex = $items.filter('.active').index();
        let newIndex = activeIndex;

        if (Math.abs(dragDistance) >= dragThreshold) {
          if (dragDistance < 0) {
            newIndex = (activeIndex + 1) % $items.length; // Next item or loop back to the first
          } else {
            newIndex = (activeIndex - 1 + $items.length) % $items.length; // Previous item or loop to the last
          }
          setActive(newIndex);
          resetAutoplay();
        }
      }
      initialXPosition = currentXPosition = null;
    }

    // Event listeners for dragging
    $container
      .on('mousedown touchstart', function (e) {
        initialXPosition = e.type === 'mousedown' ? e.clientX : e.originalEvent.touches[0].clientX;
      })
      .on('mousemove touchmove', function (e) {
        if (initialXPosition !== null) {
          currentXPosition = e.type === 'mousemove' ? e.clientX : e.originalEvent.touches[0].clientX;
        }
      })
      .on('mouseup touchend', handleDragEnd);

    // Enable mouse wheel scrolling with looping
    $container.on('wheel', function (e) {
      e.preventDefault();
      const activeIndex = $items.filter('.active').index();
      let newIndex = activeIndex;

      if (e.originalEvent.deltaY > 0) {
        newIndex = (activeIndex + 1) % $items.length; // Next item or loop back to the first
      } else {
        newIndex = (activeIndex - 1 + $items.length) % $items.length; // Previous item or loop to the last
      }
      setActive(newIndex);
      resetAutoplay();
    });

    // Autoplay functionality
    function autoplay() {
      const activeIndex = $items.filter('.active').index();
      const newIndex = (activeIndex + 1) % $items.length; // Next item or loop back to the first
      setActive(newIndex);
    }

    function startAutoplay() {
      autoplayInterval = setInterval(autoplay, autoplayDelay);
    }

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
    }

    // Start autoplay when page loads
    startAutoplay();

    // Update dot styles
    function updateDots() {
      $('.dot').each(function () {
        // Set default styles for all dots
        $(this).css({
          'width': '20px',
          'height': '20px',
          'background': '#ccc',
          'border-radius': '50%',
          'margin': '5px',
          'display': 'inline-block'
        });

        // Apply 'active' styles for the active dot
        if ($(this).hasClass('active')) {
          $(this).css('background', 'var(--color1)'); // Active state color
        }
      });
    }
  });
}
