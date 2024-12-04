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

// //////////////////////////////////
// HERO /////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const carouselImages = document.querySelector('.carousel-images');
  const totalImages = document.querySelectorAll('.carousel-images img').length;
  let currentIndex = 0;

  setInterval(() => {
    // Move to the next image
    currentIndex = (currentIndex + 1) % totalImages;

    // Apply sliding effect by adjusting the transform property
    const offset = currentIndex * -100; // Move one image width
    carouselImages.style.transform = `translateX(${offset}vw)`;
  }, 7000); // 7 seconds per image
});