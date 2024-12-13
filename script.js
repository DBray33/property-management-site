// ///////////////////////////////////
// HEADER FUNCTIONALITY //////////////
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('#header');
  if (header) {
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === 0) {
        header.classList.remove('hidden'); // Show header when at the top of the page
      } else {
        header.classList.add('hidden'); // Hide header when scrolling down
      }
    });
  }
});

// //////////////////////////////////////
// NAVBAR FUNCTIONALITY ////////////////
const navbar = document.querySelector('#navbar');
const hamburgerIcon = document.querySelector('.hamburger-icon');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const closeMenuIcon = document.querySelector('.close-menu-icon');

if (navbar) {
  // Show navbar after scrolling
  const handleScroll = () => {
    if (window.scrollY > 4) {
      navbar.classList.add('visible');
    } else {
      navbar.classList.remove('visible');
    }
  };
  window.addEventListener('scroll', handleScroll);

  // Hamburger menu toggle
  if (hamburgerIcon && hamburgerMenu && closeMenuIcon) {
    hamburgerIcon.addEventListener('click', () => {
      hamburgerMenu.classList.add('open');
    });

    closeMenuIcon.addEventListener('click', () => {
      hamburgerMenu.classList.remove('open');
    });

    document.addEventListener('click', (event) => {
      if (
        !hamburgerMenu.contains(event.target) &&
        !hamburgerIcon.contains(event.target) &&
        !closeMenuIcon.contains(event.target)
      ) {
        hamburgerMenu.classList.remove('open');
      }
    });
  }
}

// Navbar dropdown menu functionality
document.addEventListener('DOMContentLoaded', function () {
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector('a');
    const content = dropdown.querySelector('.dropdown-content');

    link.addEventListener('click', function (event) {
      event.preventDefault();
      dropdown.classList.toggle('active');

      // Adjust the max-height based on the content height
      if (dropdown.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0';
      }

      // Close other dropdowns
      dropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove('active');
          otherDropdown.querySelector('.dropdown-content').style.maxHeight =
            '0';
        }
      });
    });

    // Close the dropdown if clicked outside
    document.addEventListener('click', function (event) {
      if (
        !dropdown.contains(event.target) &&
        dropdown.classList.contains('active')
      ) {
        dropdown.classList.remove('active');
        content.style.maxHeight = '0';
      }
    });

    // Prevent the dropdown from closing when clicking inside
    dropdown.addEventListener('click', function (event) {
      event.stopPropagation();
    });
  });
});

// //////////////////////////////////////
// //////////////////////////////////////

// //////////////////////////////////////
// SITE LOGO ANIMATION /////////////////
const siteLogo = document.querySelector('.site-logo');
if (siteLogo) {
  siteLogo.addEventListener('click', (event) => {
    event.preventDefault();
    siteLogo.classList.add('clicked');
    setTimeout(() => {
      window.location.href = siteLogo.getAttribute('href');
    }, 500); // Adjust duration to match animation
  });
}

// //////////////////////////////////////
// FEATURED LISTINGS FUNCTIONALITY /////
const featuredListingsSection = document.querySelector('.featured-listings');
if (featuredListingsSection) {
  const containers = featuredListingsSection.querySelectorAll('.container');
  containers.forEach((container) => {
    const panels = container.querySelectorAll('.panel');

    panels.forEach((panel) => {
      panel.addEventListener('click', (event) => {
        event.stopPropagation();
        resetInactiveContainers(container);
        handleActivePanel(container, panel);
      });
    });
  });

  const handleActivePanel = (container, clickedPanel) => {
    const panels = container.querySelectorAll('.panel');
    panels.forEach((panel) => {
      if (panel === clickedPanel) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
  };

  const resetInactiveContainers = (activeContainer) => {
    containers.forEach((container) => {
      if (container !== activeContainer) {
        const panels = container.querySelectorAll('.panel');
        panels.forEach((panel) => panel.classList.remove('active'));
        panels[0].classList.add('active');
      }
    });
  };

  document.addEventListener('click', () => {
    containers.forEach((container) => {
      const panels = container.querySelectorAll('.panel');
      panels.forEach((panel) => panel.classList.remove('active'));
      panels[0].classList.add('active');
    });
  });
}

// //////////////////////////////////////
// HERO CAROUSEL FUNCTIONALITY
const carouselImages = document.querySelector('.carousel-images');
if (carouselImages) {
  const images = document.querySelectorAll('.carousel-images img');
  const totalImages = images.length;
  let currentIndex = 0;
  let interval;

  // Clone the first image for seamless looping
  const firstImageClone = images[0].cloneNode(true);
  carouselImages.appendChild(firstImageClone);

  const updateCarousel = () => {
    currentIndex++;
    carouselImages.style.transition = 'transform 1s ease-in-out';
    carouselImages.style.transform = `translateX(-${currentIndex * 100}vw)`;

    if (currentIndex === totalImages) {
      setTimeout(() => {
        carouselImages.style.transition = 'none';
        carouselImages.style.transform = 'translateX(0)';
        currentIndex = 0;
      }, 1000);
    }
  };

  const startCarousel = () => {
    interval = setInterval(updateCarousel, 5000);
  };

  const stopCarousel = () => {
    clearInterval(interval);
  };

  window.addEventListener('resize', () => {
    stopCarousel();
    carouselImages.style.transition = 'none';
    carouselImages.style.transform = `translateX(-${currentIndex * 100}vw)`;
    startCarousel();
  });

  startCarousel();
}

// WELCOME CARD FUNCTIONALITY ////////////////////
// ///////////////////////////////////////////////
// FLIP CARD ON BUTTON CLICK
document.querySelectorAll('.flip-button').forEach((button) => {
  button.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the document
    const card = button.closest('.card');
    card.classList.toggle('flipped');
  });
});

document.addEventListener('click', (e) => {
  document.querySelectorAll('.card.flipped').forEach((flippedCard) => {
    if (!flippedCard.contains(e.target)) {
      flippedCard.classList.remove('flipped');
    }
  });
});

// Scroll animation for welcome cards
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');

  const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.2, // Trigger when 20% of the element is visible
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // Add the visible class
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  cards.forEach((card) => observer.observe(card));
});

// SCROLL ANIMATION FOR "WHAT WE MANAGE"
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2, // Trigger when 20% of the element is visible
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible'); // Add 'visible' class when in view
      observer.unobserve(entry.target); // Stop observing once animated
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

const targets = document.querySelectorAll('.heading, .icon-item');
targets.forEach((target) => observer.observe(target));

// RENTAL BAR CHART FUNCTIONALITY
const bars = document.querySelectorAll('.bar');
if (bars.length > 0) {
  const maxRent = 1975;

  const adjustBarHeights = () => {
    let maxBarHeight =
      window.innerWidth <= 588 ? 300 : window.innerWidth <= 768 ? 375 : 450;

    bars.forEach((bar) => {
      const value = parseInt(bar.getAttribute('data-value'));
      const barHeight = (value / maxRent) * maxBarHeight;
      bar.style.height = `${barHeight}px`;

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
  };

  adjustBarHeights();
  window.addEventListener('resize', adjustBarHeights);
}

// //////////////////////////////////////
// BAR CHART ///////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const bars = document.querySelectorAll('.bar');
  const barAmounts = document.querySelectorAll('.bar-amount');
  const barChartSection = document.getElementById('bar-chart');
  const maxRent = 2400; // Maximum rent for scaling
  let animationDone = false;

  // Adjust bar heights and animate rent amounts
  function animateBars() {
    bars.forEach((bar) => {
      const value = parseInt(bar.getAttribute('data-value'));
      const barHeight = (value / maxRent) * 400; // Scale bar height proportionally

      bar.style.height = `${barHeight}px`; // Set the height of the bar

      // Animate the rent amount
      const rentAmountElem = bar.nextElementSibling.nextElementSibling; // Target bar-amount element
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

  // Observe when the bar chart section is in view
  const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.3, // Trigger when 30% of the section is visible
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animationDone) {
        animationDone = true; // Ensure the animation runs only once
        animateBars();
        observer.unobserve(barChartSection); // Stop observing once animation starts
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  observer.observe(barChartSection);
});

// //////////////////////////////////////
// BLOG PREVIEWS ///////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const blogItems = document.querySelectorAll('.blog-item');

  const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.2, // Trigger when 20% of the element is visible
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // Add the visible class
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  blogItems.forEach((item) => observer.observe(item));
});

// //////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const blogPosts = document.querySelectorAll('.blog-animate');
  blogPosts.forEach((post) => {
    setTimeout(() => {
      post.classList.add('loaded');
    }, 200); // Delay to allow smooth animations
  });
});

// //////////////////////////////////////
// //////////////////////////////////////
// FOOTER CONTACT JUMP TO LINK
document.addEventListener('DOMContentLoaded', () => {
  const blogPosts = document.querySelectorAll('.blog-animate');
  blogPosts.forEach((post) => {
    setTimeout(() => {
      post.classList.add('loaded');
    }, 200); // Delay to allow smooth animations
  });

  // FOOTER CONTACT JUMP TO LINK
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      setTimeout(() => {
        window.scrollTo({
          top: targetElement.offsetTop - 40, // Adjust the scroll position to land 30px higher
          behavior: 'smooth',
        });
      }, 100); // Delay to ensure the page has fully loaded
    }
  }
});
