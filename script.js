// //////////////////////////////////
// EXPANDING CARDS //////////////////
const featuredListingsSection = document.querySelector('.featured-listings');
const containers = featuredListingsSection.querySelectorAll('.container');

containers.forEach((container) => {
  const panels = container.querySelectorAll('.panel');

  panels.forEach((panel) => {
    panel.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent the document click listener from triggering
      resetInactiveContainers(container); // Reset all other containers
      handleActivePanel(container, panel); // Handle the clicked panel in the active container
    });
  });
});

function handleActivePanel(container, clickedPanel) {
  const panels = container.querySelectorAll('.panel');

  panels.forEach((panel) => {
    if (panel === clickedPanel) {
      panel.classList.add('active'); // Enlarge the clicked panel
    } else {
      panel.classList.remove('active'); // Collapse all other panels in the same container
    }
  });
}

function resetInactiveContainers(activeContainer) {
  containers.forEach((container) => {
    if (container !== activeContainer) {
      const panels = container.querySelectorAll('.panel');
      panels.forEach((panel) => panel.classList.remove('active')); // Collapse all panels
      panels[0].classList.add('active'); // Expand the first panel
    }
  });
}

// Add a listener for clicks on the document
document.addEventListener('click', () => {
  containers.forEach((container) => {
    const panels = container.querySelectorAll('.panel');
    panels.forEach((panel) => panel.classList.remove('active')); // Collapse all panels
    panels[0].classList.add('active'); // Expand the first panel in each container
  });
});

// //////////////////////////////////
// NAVBAR ///////////////////////////

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('#navbar');
  const hamburgerIcon = document.querySelector('.hamburger-icon');
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const closeMenuIcon = document.querySelector('.close-menu-icon');

  // Show navbar after scrolling down 80px for larger screens
  const handleScroll = () => {
    if (window.innerWidth > 800) {
      if (window.scrollY > 80) {
        navbar.classList.add('visible');
      } else {
        navbar.classList.remove('visible');
      }
    }
  };

  // Toggle hamburger menu
  hamburgerIcon.addEventListener('click', () => {
    hamburgerMenu.classList.add('open');
  });

  // Close menu when close button is clicked
  closeMenuIcon.addEventListener('click', () => {
    hamburgerMenu.classList.remove('open');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (
      !hamburgerMenu.contains(event.target) &&
      !hamburgerIcon.contains(event.target) &&
      !closeMenuIcon.contains(event.target)
    ) {
      hamburgerMenu.classList.remove('open');
    }
  });

  // Listen for scroll and resize events
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);
});

// //////////////////////////////////
// HEADER ///////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('#header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 80) {
      header.classList.add('hidden'); // Hide the header
    } else {
      header.classList.remove('hidden'); // Show the header
    }

    lastScrollY = currentScrollY;
  });
});

// //////////////////////////////////
// SITE LOGO ///////////////////////////
// Animation for when
document.addEventListener('DOMContentLoaded', () => {
  const logo = document.getElementById('site-logo'); // Ensure this ID matches the logo element

  logo.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent immediate navigation
    logo.classList.add('clicked'); // Add clicked class

    // Delay navigation until the animation completes
    setTimeout(() => {
      window.location.href = logo.getAttribute('href'); // Navigate after animation
    }, 1000); // Match animation duration (1s)
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.site-logo');

  logo.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    logo.classList.add('clicked'); // Add the clicked class

    // Delay navigation until animation completes
    setTimeout(() => {
      window.location.href = logo.getAttribute('href'); // Navigate to the link
    }, 500); // Match the transition duration (0.5s)
  });
});

// //////////////////////////////////
// HERO /////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const carouselImages = document.querySelector('.carousel-images');
  const images = document.querySelectorAll('.carousel-images img');
  const totalImages = images.length;

  let currentIndex = 0;
  let interval;

  // Clone the first image and append it to the end for seamless looping
  const firstImageClone = images[0].cloneNode(true);
  carouselImages.appendChild(firstImageClone);

  // Function to update the carousel
  function updateCarousel() {
    currentIndex++;
    carouselImages.style.transition = 'transform 1s ease-in-out';
    carouselImages.style.transform = `translateX(-${currentIndex * 100}vw)`;

    // Loop back to the first image seamlessly
    if (currentIndex === totalImages) {
      setTimeout(() => {
        carouselImages.style.transition = 'none'; // Disable transition
        carouselImages.style.transform = 'translateX(0)';
        currentIndex = 0; // Reset index
      }, 1000); // Match transition duration
    }
  }

  // Automatically slide every 7 seconds
  function startCarousel() {
    interval = setInterval(updateCarousel, 5000);
  }

  // Stop the carousel
  function stopCarousel() {
    clearInterval(interval);
  }

  // Ensure the carousel stays aligned when the viewport is resized
  function handleResize() {
    stopCarousel();
    carouselImages.style.transition = 'none'; // Disable transition during resize
    carouselImages.style.transform = `translateX(-${currentIndex * 100}vw)`;
    startCarousel();
  }

  // Listen for resize events
  window.addEventListener('resize', handleResize);

  startCarousel();
});

// WELCOME //////////////////////////
// //////////////////////////////////
// Handle button clicks to flip the card
document.querySelectorAll('.flip-button').forEach((button) => {
  button.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the document
    const card = button.closest('.card');
    card.classList.toggle('flipped');
  });
});

// Handle clicks outside the card to reset flip
document.addEventListener('click', (e) => {
  document.querySelectorAll('.card.flipped').forEach((flippedCard) => {
    if (!flippedCard.contains(e.target)) {
      flippedCard.classList.remove('flipped');
    }
  });
});

// WHAT WE MANAGE ///////////////////
// //////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.2, // Trigger when 10% of the element is visible
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // Add 'visible' class when in view
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  };

  const observer = new IntersectionObserver(callback, observerOptions);

  // Observe heading and icons
  const targets = document.querySelectorAll('.heading, .icon-item');
  targets.forEach((target) => observer.observe(target));
});
// //////////////////////////////////
// //////////////////////////////////
// //////////////////////////////////
// //////////////////////////////////
// //////////////////////////////////
// //////////////////////////////////
// //////////////////////////////////
// //////////////////////////////////
// AVERAGE MONTHLY RENT BAR GRAPH //
// //////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
  const bars = document.querySelectorAll('.bar');
  const maxRent = 1975; // Maximum rent for scaling

  function adjustBarHeights() {
    let maxBarHeight;

    // Adjust maxBarHeight based on viewport width
    if (window.innerWidth <= 588) {
      maxBarHeight = 300; // Shorter bars for very small screens
    } else if (window.innerWidth <= 768) {
      maxBarHeight = 375; // Medium-height bars for small screens
    } else {
      maxBarHeight = 450; // Default taller bars for larger screens
    }

    bars.forEach((bar) => {
      const value = parseInt(bar.getAttribute('data-value'));
      const barHeight = (value / maxRent) * maxBarHeight; // Scale bar height proportionally

      // Animate the bar height
      bar.style.height = `${barHeight}px`;

      // Animate the rent amount
      const rentAmountElem = bar.nextElementSibling.nextElementSibling;
      if (value > 0) {
        let count = 0;
        const increment = Math.ceil(value / 100);
        const counter = setInterval(() => {
          count += increment;
          if (count >= value) {
            count = value;
            clearInterval(counter);
          }
          rentAmountElem.textContent = `$${count}`;
        }, 20);
      } else {
        rentAmountElem.textContent = '$?';
      }
    });
  }

  // Run on initial load
  adjustBarHeights();

  // Run on resize to adapt to viewport changes
  window.addEventListener('resize', adjustBarHeights);
});
