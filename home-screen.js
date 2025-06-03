// Home Screen Implementation for Konnect App

document.addEventListener('DOMContentLoaded', () => {
  // Initialize home screen if it's visible
  if (document.getElementById('home-screen') && 
      document.getElementById('home-screen').style.display === 'block') {
    initHomeScreen();
  }
});

// Initialize home screen
function initHomeScreen() {
  // Create main container
  const homeScreen = document.getElementById('home-screen');
  homeScreen.innerHTML = '';
  
  // Add screen components
  createHeroCarousel(homeScreen);
  createUrgentTasksCard(homeScreen);
  createQuickActionsGrid(homeScreen);
  createNearbyEventsSection(homeScreen);
  
  // Add SOS button
  createSOSButton(homeScreen);
}

// Create auto-rotating hero carousel
function createHeroCarousel(container) {
  const carouselContainer = document.createElement('div');
  carouselContainer.className = 'carousel-container';
  carouselContainer.id = 'home-hero-carousel';
  
  const carouselWrapper = document.createElement('div');
  carouselWrapper.className = 'carousel-wrapper';
  
  // Define carousel items
  const carouselItems = [
    {
      title: 'Welcome to Korea!',
      subtitle: 'Your journey begins here',
      image: 'assets/carousel-welcome.jpg',
      action: 'Explore →',
      link: 'discover'
    },
    {
      title: 'Visa Reminder',
      subtitle: 'Check your visa status',
      image: 'assets/carousel-visa.jpg',
      action: 'Check Now →',
      link: 'services/visa'
    },
    {
      title: 'Featured Events',
      subtitle: 'Connect with the community',
      image: 'assets/carousel-events.jpg',
      action: 'Join Us →',
      link: 'community/events'
    },
    {
      title: 'Language Exchange',
      subtitle: 'Practice Korean with locals',
      image: 'assets/carousel-language.jpg',
      action: 'Find Partners →',
      link: 'community/language'
    }
  ];
  
  // Create carousel items
  carouselItems.forEach((item, index) => {
    const carouselItem = document.createElement('div');
    carouselItem.className = 'carousel-item promo-banner';
    carouselItem.style.backgroundImage = `url(${item.image})`;
    
    const itemContent = document.createElement('div');
    itemContent.className = 'promo-banner-content';
    
    const itemTitle = document.createElement('h2');
    itemTitle.className = 'header-medium';
    itemTitle.textContent = item.title;
    
    const itemSubtitle = document.createElement('p');
    itemSubtitle.className = 'body-large';
    itemSubtitle.textContent = item.subtitle;
    
    const itemButton = document.createElement('button');
    itemButton.className = 'btn btn-primary';
    itemButton.textContent = item.action;
    
    // Add click event
    itemButton.addEventListener('click', () => {
      // Parse link to determine navigation
      const [tab, screen] = item.link.split('/');
      if (screen) {
        window.KonnectNavigation.navigateToScreen(tab, `${tab}-${screen}-screen`);
      } else {
        window.KonnectNavigation.switchToTab(tab);
      }
    });
    
    itemContent.appendChild(itemTitle);
    itemContent.appendChild(itemSubtitle);
    itemContent.appendChild(itemButton);
    carouselItem.appendChild(itemContent);
    carouselWrapper.appendChild(carouselItem);
  });
  
  carouselContainer.appendChild(carouselWrapper);
  
  // Add carousel indicators
  const indicatorsContainer = document.createElement('div');
  indicatorsContainer.className = 'carousel-indicators';
  
  carouselItems.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.className = index === 0 ? 'carousel-indicator active' : 'carousel-indicator';
    
    // Add click event to jump to slide
    indicator.addEventListener('click', () => {
      currentSlide = index;
      updateCarousel();
    });
    
    indicatorsContainer.appendChild(indicator);
  });
  
  carouselContainer.appendChild(indicatorsContainer);
  container.appendChild(carouselContainer);
  
  // Set up auto-rotation
  let currentSlide = 0;
  const totalSlides = carouselItems.length;
  
  function updateCarousel() {
    // Update carousel position
    carouselWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update indicators
    const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, index) => {
      if (index === currentSlide) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
  
  // Auto-rotate carousel
  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }, 5000);
  
  // Add swipe functionality
  let startX, endX;
  
  carouselContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });
  
  carouselContainer.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });
  
  // For desktop/testing
  carouselContainer.addEventListener('mousedown', (e) => {
    startX = e.clientX;
  });
  
  carouselContainer.addEventListener('mouseup', (e) => {
    endX = e.clientX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const diffX = startX - endX;
    
    // If swiped left (next)
    if (diffX > 50) {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    }
    
    // If swiped right (previous)
    if (diffX < -50) {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    }
  }
}

// Create urgent tasks card with countdown and progress
function createUrgentTasksCard(container) {
  const urgentTasksCard = document.createElement('div');
  urgentTasksCard.className = 'card card-2xl';
  
  const cardHeader = document.createElement('div');
  cardHeader.className = 'card-header';
  
  const headerTitle = document.createElement('h2');
  headerTitle.className = 'subheader-large';
  headerTitle.textContent = 'Urgent Tasks';
  
  cardHeader.appendChild(headerTitle);
  urgentTasksCard.appendChild(cardHeader);
  
  // Create tasks list
  const tasksList = document.createElement('div');
  tasksList.className = 'tasks-list';
  
  // Sample tasks - in real app, these would come from user data
  const tasks = [
    {
      title: 'Visa Expiry',
      daysLeft: 30,
      progress: 0,
      icon: '🛂',
      action: 'Renew'
    },
    {
      title: 'Housing Contract',
      daysLeft: 14,
      progress: 50,
      icon: '🏠',
      action: 'Complete'
    },
    {
      title: 'Language Class',
      daysLeft: 2,
      progress: 75,
      icon: '📚',
      action: 'Attend'
    }
  ];
  
  tasks.forEach(task => {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    
    const taskIcon = document.createElement('div');
    taskIcon.className = 'emoji-icon';
    taskIcon.textContent = task.icon;
    
    const taskContent = document.createElement('div');
    taskContent.className = 'task-content';
    
    const taskTitle = document.createElement('div');
    taskTitle.className = 'task-title';
    taskTitle.textContent = task.title;
    
    const taskDays = document.createElement('div');
    taskDays.className = 'task-days';
    taskDays.textContent = `${task.daysLeft} days left`;
    
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.width = `${task.progress}%`;
    
    progressContainer.appendChild(progressBar);
    
    const taskAction = document.createElement('button');
    taskAction.className = 'btn btn-outline';
    taskAction.textContent = task.action;
    
    taskContent.appendChild(taskTitle);
    taskContent.appendChild(taskDays);
    taskContent.appendChild(progressContainer);
    
    taskItem.appendChild(taskIcon);
    taskItem.appendChild(taskContent);
    taskItem.appendChild(taskAction);
    
    tasksList.appendChild(taskItem);
  });
  
  urgentTasksCard.appendChild(tasksList);
  container.appendChild(urgentTasksCard);
}

// Create quick actions grid
function createQuickActionsGrid(container) {
  const gridContainer = document.createElement('div');
  gridContainer.className = 'quick-actions-grid';
  
  // Define quick actions
  const quickActions = [
    {
      title: 'Legal',
      icon: '⚖️',
      action: () => window.KonnectNavigation.navigateToScreen('services', 'services-legal-screen')
    },
    {
      title: 'Housing',
      icon: '🏠',
      action: () => window.KonnectNavigation.navigateToScreen('services', 'services-housing-screen')
    },
    {
      title: 'Jobs',
      icon: '💼',
      action: () => window.KonnectNavigation.navigateToScreen('services', 'services-jobs-screen')
    },
    {
      title: 'Emergency',
      icon: '🆘',
      action: () => activateSOSFeature()
    }
  ];
  
  // Create quick action items
  quickActions.forEach(action => {
    const actionItem = document.createElement('div');
    actionItem.className = 'quick-action-item';
    
    const actionIcon = document.createElement('div');
    actionIcon.className = 'quick-action-icon';
    actionIcon.textContent = action.icon;
    
    const actionTitle = document.createElement('div');
    actionTitle.className = 'quick-action-title';
    actionTitle.textContent = action.title;
    
    actionItem.appendChild(actionIcon);
    actionItem.appendChild(actionTitle);
    
    // Add click event
    actionItem.addEventListener('click', action.action);
    
    gridContainer.appendChild(actionItem);
  });
  
  container.appendChild(gridContainer);
}

// Create nearby events section
function createNearbyEventsSection(container) {
  const eventsSection = document.createElement('div');
  eventsSection.className = 'events-section';
  
  const sectionHeader = document.createElement('div');
  sectionHeader.className = 'section-header';
  
  const headerTitle = document.createElement('h2');
  headerTitle.className = 'subheader-large';
  headerTitle.textContent = 'Nearby Events';
  
  const viewAllLink = document.createElement('a');
  viewAllLink.className = 'view-all-link';
  viewAllLink.textContent = 'View All';
  viewAllLink.href = '#';
  viewAllLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.KonnectNavigation.navigateToScreen('community', 'community-events-screen');
  });
  
  sectionHeader.appendChild(headerTitle);
  sectionHeader.appendChild(viewAllLink);
  eventsSection.appendChild(sectionHeader);
  
  // Create events list
  const eventsList = document.createElement('div');
  eventsList.className = 'events-list';
  
  // Sample events - in real app, these would come from API
  const events = [
    {
      title: 'Korean Cooking Class',
      date: 'Today, 6:00 PM',
      location: 'Gangnam, Seoul',
      image: 'assets/event-cooking.jpg',
      distance: '0.8 km'
    },
    {
      title: 'Language Exchange',
      date: 'Tomorrow, 7:00 PM',
      location: 'Hongdae, Seoul',
      image: 'assets/event-language.jpg',
      distance: '1.2 km'
    },
    {
      title: 'Hiking Group',
      date: 'Sat, 9:00 AM',
      location: 'Bukhansan',
      image: 'assets/event-hiking.jpg',
      distance: '5.4 km'
    },
    {
      title: 'Expat Networking',
      date: 'Sun, 4:00 PM',
      location: 'Itaewon, Seoul',
      image: 'assets/event-networking.jpg',
      distance: '2.1 km'
    }
  ];
  
  events.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    
    const eventImage = document.createElement('div');
    eventImage.className = 'event-image';
    eventImage.style.backgroundImage = `url(${event.image})`;
    
    const distanceBadge = document.createElement('div');
    distanceBadge.className = 'badge badge-primary distance-badge';
    distanceBadge.textContent = event.distance;
    eventImage.appendChild(distanceBadge);
    
    const eventContent = document.createElement('div');
    eventContent.className = 'event-content';
    
    const eventTitle = document.createElement('div');
    eventTitle.className = 'event-title';
    eventTitle.textContent = event.title;
    
    const eventDate = document.createElement('div');
    eventDate.className = 'event-date';
    eventDate.textContent = event.date;
    
    const eventLocation = document.createElement('div');
    eventLocation.className = 'event-location';
    eventLocation.textContent = event.location;
    
    eventContent.appendChild(eventTitle);
    eventContent.appendChild(eventDate);
    eventContent.appendChild(eventLocation);
    
    eventCard.appendChild(eventImage);
    eventCard.appendChild(eventContent);
    
    // Add click event
    eventCard.addEventListener('click', () => {
      window.KonnectNavigation.navigateToScreen('community', 'community-event-details-screen', { event });
    });
    
    eventsList.appendChild(eventCard);
  });
  
  eventsSection.appendChild(eventsList);
  container.appendChild(eventsSection);
}

// Create SOS button
function createSOSButton(container) {
  const sosButton = document.createElement('div');
  sosButton.className = 'sos-button';
  sosButton.setAttribute('aria-label', 'Emergency SOS');
  
  const sosIcon = document.createElement('span');
  sosIcon.className = 'sos-icon';
  sosIcon.textContent = 'SOS';
  
  sosButton.appendChild(sosIcon);
  
  // Add click event
  sosButton.addEventListener('click', activateSOSFeature);
  
  container.appendChild(sosButton);
}

// Activate SOS feature
function activateSOSFeature() {
  // Show SOS modal
  const sosModal = document.createElement('div');
  sosModal.className = 'modal sos-modal';
  
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  
  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';
  
  const headerTitle = document.createElement('h2');
  headerTitle.className = 'header-medium';
  headerTitle.textContent = 'Emergency SOS';
  
  const closeButton = document.createElement('button');
  closeButton.className = 'close-button';
  closeButton.innerHTML = '&times;';
  closeButton.addEventListener('click', () => {
    document.body.removeChild(sosModal);
  });
  
  modalHeader.appendChild(headerTitle);
  modalHeader.appendChild(closeButton);
  
  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';
  
  const emergencyOptions = [
    {
      title: 'Police',
      number: '112',
      icon: '👮‍♂️'
    },
    {
      title: 'Ambulance',
      number: '119',
      icon: '🚑'
    },
    {
      title: 'Fire',
      number: '119',
      icon: '🚒'
    },
    {
      title: 'Embassy',
      number: '+82-2-123-4567',
      icon: '🏛️'
    }
  ];
  
  emergencyOptions.forEach(option => {
    const optionButton = document.createElement('button');
    optionButton.className = 'emergency-option';
    
    const optionIcon = document.createElement('span');
    optionIcon.className = 'emergency-icon';
    optionIcon.textContent = option.icon;
    
    const optionContent = document.createElement('div');
    optionContent.className = 'emergency-content';
    
    const optionTitle = document.createElement('div');
    optionTitle.className = 'emergency-title';
    optionTitle.textContent = option.title;
    
    const optionNumber = document.createElement('div');
    optionNumber.className = 'emergency-number';
    optionNumber.textContent = option.number;
    
    optionContent.appendChild(optionTitle);
    optionContent.appendChild(optionNumber);
    
    optionButton.appendChild(optionIcon);
    optionButton.appendChild(optionContent);
    
    // Add click event
    optionButton.addEventListener('click', () => {
      // In a real app, this would initiate a call
      alert(`Calling ${option.title} at ${option.number}`);
    });
    
    modalBody.appendChild(optionButton);
  });
  
  // Add location sharing option
  const locationButton = document.createElement('button');
  locationButton.className = 'btn btn-primary location-button';
  locationButton.textContent = 'Share My Location';
  
  locationButton.addEventListener('click', () => {
    // In a real app, this would share the user's location
    alert('Sharing your location with emergency services');
  });
  
  modalBody.appendChild(locationButton);
  
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  sosModal.appendChild(modalContent);
  
  document.body.appendChild(sosModal);
}

// Export for use in other modules
window.HomeScreen = {
  init: initHomeScreen
};
