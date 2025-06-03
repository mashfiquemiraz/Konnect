// Services Screen Implementation for Konnect App

document.addEventListener('DOMContentLoaded', () => {
  // Initialize services screen if it's visible
  if (document.getElementById('services-screen') && 
      document.getElementById('services-screen').style.display === 'block') {
    initServicesScreen();
  }
});

// Initialize services screen
function initServicesScreen() {
  // Create main container
  const servicesScreen = document.getElementById('services-screen');
  servicesScreen.innerHTML = '';
  
  // Add screen components
  createCategoryTiles(servicesScreen);
  
  // Add back button container (initially hidden)
  const backButtonContainer = document.createElement('div');
  backButtonContainer.className = 'back-button-container';
  backButtonContainer.id = 'services-back-button';
  backButtonContainer.style.display = 'none';
  
  const backButton = document.createElement('button');
  backButton.className = 'back-button';
  backButton.innerHTML = '&larr; Back';
  
  backButtonContainer.appendChild(backButton);
  servicesScreen.prepend(backButtonContainer);
}

// Create category tiles for services
function createCategoryTiles(container) {
  const categoriesContainer = document.createElement('div');
  categoriesContainer.className = 'categories-container';
  
  // Define service categories
  const categories = [
    {
      title: 'Visa Help',
      icon: '🛂',
      color: '#FF6B00', // Primary orange
      screen: 'services-visa-screen'
    },
    {
      title: 'Housing',
      icon: '🏠',
      color: '#60C1A3', // Accent mint
      screen: 'services-housing-screen'
    },
    {
      title: 'Jobs',
      icon: '💼',
      color: '#003366', // Deep navy
      screen: 'services-jobs-screen'
    },
    {
      title: 'Language Classes',
      icon: '📚',
      color: '#FF8A33', // Light orange
      screen: 'services-language-screen'
    },
    {
      title: 'Legal Advice',
      icon: '⚖️',
      color: '#4A9A82', // Dark mint
      screen: 'services-legal-screen'
    },
    {
      title: 'SIM/Bank',
      icon: '📱',
      color: '#FF6B00', // Primary orange
      screen: 'services-sim-bank-screen'
    },
    {
      title: 'Health Insurance',
      icon: '🏥',
      color: '#60C1A3', // Accent mint
      screen: 'services-health-screen'
    }
  ];
  
  // Create category tiles
  categories.forEach(category => {
    const categoryTile = document.createElement('div');
    categoryTile.className = 'category-tile';
    categoryTile.style.backgroundColor = category.color;
    
    const categoryIcon = document.createElement('div');
    categoryIcon.className = 'category-icon';
    categoryIcon.textContent = category.icon;
    
    const categoryTitle = document.createElement('div');
    categoryTitle.className = 'category-title';
    categoryTitle.textContent = category.title;
    
    categoryTile.appendChild(categoryIcon);
    categoryTile.appendChild(categoryTitle);
    
    // Add click event
    categoryTile.addEventListener('click', () => {
      showServiceProviders(category);
    });
    
    categoriesContainer.appendChild(categoryTile);
  });
  
  container.appendChild(categoriesContainer);
}

// Show service providers for selected category
function showServiceProviders(category) {
  // Create or get the service providers screen
  let providersScreen = document.getElementById(category.screen);
  
  if (!providersScreen) {
    providersScreen = document.createElement('div');
    providersScreen.id = category.screen;
    providersScreen.className = 'services-subscreen';
    document.getElementById('main-app').appendChild(providersScreen);
  }
  
  // Clear previous content
  providersScreen.innerHTML = '';
  
  // Create screen header
  const screenHeader = document.createElement('div');
  screenHeader.className = 'screen-header';
  
  const headerTitle = document.createElement('h1');
  headerTitle.className = 'header-large';
  headerTitle.textContent = category.title;
  
  screenHeader.appendChild(headerTitle);
  providersScreen.appendChild(screenHeader);
  
  // Create filters section
  createFiltersSection(providersScreen);
  
  // Create providers list
  createProvidersList(providersScreen, category);
  
  // Navigate to the screen
  window.KonnectNavigation.navigateToScreen('services', category.screen);
}

// Create filters section
function createFiltersSection(container) {
  const filtersContainer = document.createElement('div');
  filtersContainer.className = 'filters-container';
  
  // Create filter options
  const filters = [
    {
      name: 'location',
      label: 'Location',
      options: ['All', 'Seoul', 'Busan', 'Incheon', 'Daegu', 'Nearby']
    },
    {
      name: 'price',
      label: 'Price',
      options: ['All', '$', '$$', '$$$']
    },
    {
      name: 'rating',
      label: 'Rating',
      options: ['All', '4+', '3+', '2+']
    },
    {
      name: 'languages',
      label: 'Languages',
      options: ['All', 'English', 'Korean', 'Chinese', 'Spanish']
    }
  ];
  
  filters.forEach(filter => {
    const filterGroup = document.createElement('div');
    filterGroup.className = 'filter-group';
    
    const filterLabel = document.createElement('label');
    filterLabel.className = 'filter-label';
    filterLabel.textContent = filter.label;
    
    const filterSelect = document.createElement('select');
    filterSelect.className = 'filter-select';
    filterSelect.name = filter.name;
    
    filter.options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.toLowerCase();
      optionElement.textContent = option;
      filterSelect.appendChild(optionElement);
    });
    
    // Add change event
    filterSelect.addEventListener('change', () => {
      // In a real app, this would filter the providers list
      console.log(`Filter ${filter.name} changed to ${filterSelect.value}`);
    });
    
    filterGroup.appendChild(filterLabel);
    filterGroup.appendChild(filterSelect);
    filtersContainer.appendChild(filterGroup);
  });
  
  container.appendChild(filtersContainer);
}

// Create providers list
function createProvidersList(container, category) {
  const providersContainer = document.createElement('div');
  providersContainer.className = 'providers-container';
  
  // Get providers based on category
  const providers = getProvidersByCategory(category.title);
  
  providers.forEach(provider => {
    const providerCard = document.createElement('div');
    providerCard.className = 'provider-card card';
    
    const providerHeader = document.createElement('div');
    providerHeader.className = 'provider-header';
    
    const providerLogo = document.createElement('div');
    providerLogo.className = 'provider-logo';
    providerLogo.style.backgroundImage = `url(${provider.logo})`;
    
    const providerInfo = document.createElement('div');
    providerInfo.className = 'provider-info';
    
    const providerName = document.createElement('h3');
    providerName.className = 'provider-name';
    providerName.textContent = provider.name;
    
    const providerRating = document.createElement('div');
    providerRating.className = 'provider-rating';
    
    // Create star rating
    for (let i = 0; i < 5; i++) {
      const star = document.createElement('span');
      star.className = i < provider.rating ? 'star filled' : 'star';
      star.innerHTML = '&#9733;'; // Star symbol
      providerRating.appendChild(star);
    }
    
    const ratingValue = document.createElement('span');
    ratingValue.className = 'rating-value';
    ratingValue.textContent = provider.rating.toFixed(1);
    providerRating.appendChild(ratingValue);
    
    providerInfo.appendChild(providerName);
    providerInfo.appendChild(providerRating);
    
    providerHeader.appendChild(providerLogo);
    providerHeader.appendChild(providerInfo);
    
    const providerDetails = document.createElement('div');
    providerDetails.className = 'provider-details';
    
    const providerLocation = document.createElement('div');
    providerLocation.className = 'provider-location';
    providerLocation.innerHTML = `<strong>Location:</strong> ${provider.location}`;
    
    const providerLanguages = document.createElement('div');
    providerLanguages.className = 'provider-languages';
    providerLanguages.innerHTML = `<strong>Languages:</strong> ${provider.languages.join(', ')}`;
    
    const providerPrice = document.createElement('div');
    providerPrice.className = 'provider-price';
    providerPrice.innerHTML = `<strong>Price:</strong> ${provider.price}`;
    
    providerDetails.appendChild(providerLocation);
    providerDetails.appendChild(providerLanguages);
    providerDetails.appendChild(providerPrice);
    
    const providerActions = document.createElement('div');
    providerActions.className = 'provider-actions';
    
    const contactButton = document.createElement('button');
    contactButton.className = 'btn btn-primary';
    contactButton.textContent = 'Contact';
    
    const bookmarkButton = document.createElement('button');
    bookmarkButton.className = 'btn btn-outline';
    bookmarkButton.textContent = 'Save';
    
    providerActions.appendChild(contactButton);
    providerActions.appendChild(bookmarkButton);
    
    providerCard.appendChild(providerHeader);
    providerCard.appendChild(providerDetails);
    providerCard.appendChild(providerActions);
    
    // Add click event
    providerCard.addEventListener('click', () => {
      showProviderDetails(provider);
    });
    
    providersContainer.appendChild(providerCard);
  });
  
  container.appendChild(providersContainer);
}

// Show provider details
function showProviderDetails(provider) {
  // Create modal for provider details
  const modal = document.createElement('div');
  modal.className = 'modal provider-modal';
  
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  
  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';
  
  const headerTitle = document.createElement('h2');
  headerTitle.className = 'header-medium';
  headerTitle.textContent = provider.name;
  
  const closeButton = document.createElement('button');
  closeButton.className = 'close-button';
  closeButton.innerHTML = '&times;';
  closeButton.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  
  modalHeader.appendChild(headerTitle);
  modalHeader.appendChild(closeButton);
  
  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';
  
  // Provider details content
  const providerImage = document.createElement('div');
  providerImage.className = 'provider-image';
  providerImage.style.backgroundImage = `url(${provider.image || provider.logo})`;
  
  const providerDescription = document.createElement('p');
  providerDescription.className = 'provider-description';
  providerDescription.textContent = provider.description || 'No description available.';
  
  const providerServices = document.createElement('div');
  providerServices.className = 'provider-services';
  
  const servicesTitle = document.createElement('h3');
  servicesTitle.textContent = 'Services Offered';
  
  const servicesList = document.createElement('ul');
  
  (provider.services || ['Consultation', 'Document Preparation', 'Translation']).forEach(service => {
    const serviceItem = document.createElement('li');
    serviceItem.textContent = service;
    servicesList.appendChild(serviceItem);
  });
  
  providerServices.appendChild(servicesTitle);
  providerServices.appendChild(servicesList);
  
  const bookingSection = document.createElement('div');
  bookingSection.className = 'booking-section';
  
  const bookingTitle = document.createElement('h3');
  bookingTitle.textContent = 'Book an Appointment';
  
  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.className = 'date-input';
  
  const timeSelect = document.createElement('select');
  timeSelect.className = 'time-select';
  
  // Add time options
  ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'].forEach(time => {
    const option = document.createElement('option');
    option.value = time;
    option.textContent = time;
    timeSelect.appendChild(option);
  });
  
  const bookButton = document.createElement('button');
  bookButton.className = 'btn btn-primary book-button';
  bookButton.textContent = 'Book Now';
  
  bookButton.addEventListener('click', () => {
    // In a real app, this would book the appointment
    alert(`Appointment booked with ${provider.name} on ${dateInput.value} at ${timeSelect.value}`);
    document.body.removeChild(modal);
  });
  
  bookingSection.appendChild(bookingTitle);
  bookingSection.appendChild(dateInput);
  bookingSection.appendChild(timeSelect);
  bookingSection.appendChild(bookButton);
  
  modalBody.appendChild(providerImage);
  modalBody.appendChild(providerDescription);
  modalBody.appendChild(providerServices);
  modalBody.appendChild(bookingSection);
  
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modal.appendChild(modalContent);
  
  document.body.appendChild(modal);
}

// Get providers by category
function getProvidersByCategory(category) {
  // Sample providers data - in a real app, this would come from an API
  const allProviders = {
    'Visa Help': [
      {
        name: 'Korea Visa Services',
        logo: 'assets/providers/visa-1.png',
        rating: 4.8,
        location: 'Gangnam, Seoul',
        languages: ['English', 'Korean', 'Chinese'],
        price: '$$$',
        description: 'Professional visa consultation and application services for all visa types. Specializing in work visas and long-term residency.',
        services: ['Visa Application', 'Document Review', 'Interview Preparation', 'Status Extension']
      },
      {
        name: 'Expat Visa Assistance',
        logo: 'assets/providers/visa-2.png',
        rating: 4.5,
        location: 'Jongno, Seoul',
        languages: ['English', 'Korean', 'Japanese'],
        price: '$$',
        description: 'Friendly and affordable visa services for expatriates. We handle all paperwork and guide you through the process.',
        services: ['Visa Application', 'Document Translation', 'Status Changes', 'Family Visas']
      },
      {
        name: 'Global Immigration Center',
        logo: 'assets/providers/visa-3.png',
        rating: 4.2,
        location: 'Haeundae, Busan',
        languages: ['English', 'Korean', 'Russian'],
        price: '$$',
        description: 'Comprehensive immigration services for all nationalities. Our team has over 15 years of experience.',
        services: ['Visa Processing', 'Legal Consultation', 'Document Preparation', 'Appeals']
      }
    ],
    'Housing': [
      {
        name: 'Seoul Stays',
        logo: 'assets/providers/housing-1.png',
        rating: 4.7,
        location: 'Mapo, Seoul',
        languages: ['English', 'Korean'],
        price: '$$',
        description: 'Find your perfect home in Seoul. We specialize in foreigner-friendly housing with no language barriers.',
        services: ['Apartment Hunting', 'Contract Review', 'Deposit Protection', 'Utility Setup']
      },
      {
        name: 'K-Home Finders',
        logo: 'assets/providers/housing-2.png',
        rating: 4.3,
        location: 'Yongsan, Seoul',
        languages: ['English', 'Korean', 'Chinese'],
        price: '$$$',
        description: 'Premium housing service with the largest selection of foreigner-friendly apartments and houses.',
        services: ['Property Tours', 'Lease Negotiation', 'Legal Check', 'Moving Assistance']
      },
      {
        name: 'Budget Rooms Korea',
        logo: 'assets/providers/housing-3.png',
        rating: 4.0,
        location: 'Multiple Locations',
        languages: ['English', 'Korean'],
        price: '$',
        description: 'Affordable housing options for students and young professionals. Shared and private rooms available.',
        services: ['Room Sharing', 'Short-term Rentals', 'Student Housing', 'Goshiwon Booking']
      }
    ],
    'Jobs': [
      {
        name: 'Korea Career Connect',
        logo: 'assets/providers/job-1.png',
        rating: 4.6,
        location: 'Online + Gangnam Office',
        languages: ['English', 'Korean'],
        price: 'Free',
        description: 'Connecting international talent with Korean companies. Specializing in tech, teaching, and translation jobs.',
        services: ['Job Matching', 'Resume Review', 'Interview Coaching', 'Salary Negotiation']
      },
      {
        name: 'Teach in Korea',
        logo: 'assets/providers/job-2.png',
        rating: 4.8,
        location: 'Online + Seocho Office',
        languages: ['English', 'Korean'],
        price: 'Free',
        description: 'The leading platform for teaching positions in Korea. Public and private school placements available.',
        services: ['School Placement', 'Contract Review', 'VISA Assistance', 'Teacher Training']
      },
      {
        name: 'Seoul Startups',
        logo: 'assets/providers/job-3.png',
        rating: 4.4,
        location: 'Seongsu, Seoul',
        languages: ['English', 'Korean'],
        price: '$',
        description: 'Connecting international professionals with Korean startups and tech companies.',
        services: ['Job Listings', 'Networking Events', 'Skill Workshops', 'Startup Matching']
      }
    ],
    'Language Classes': [
      {
        name: 'Seoul Korean Academy',
        logo: 'assets/providers/language-1.png',
        rating: 4.9,
        location: 'Hongdae, Seoul',
        languages: ['English', 'Korean'],
        price: '$$',
        description: 'Intensive Korean language courses for all levels. Small class sizes and experienced teachers.',
        services: ['Group Classes', 'Private Tutoring', 'TOPIK Preparation', 'Business Korean']
      },
      {
        name: 'K-Language Online',
        logo: 'assets/providers/language-2.png',
        rating: 4.5,
        location: 'Online',
        languages: ['English', 'Korean', 'Multiple'],
        price: '$',
        description: 'Flexible online Korean classes that fit your schedule. Learn from anywhere with live instructors.',
        services: ['Video Classes', 'Self-study Materials', 'Speaking Practice', 'Cultural Lessons']
      },
      {
        name: 'Language Exchange Club',
        logo: 'assets/providers/language-3.png',
        rating: 4.2,
        location: 'Multiple Locations',
        languages: ['Multiple'],
        price: 'Free/$',
        description: 'Practice Korean with native speakers in a casual setting. Make friends while improving your language skills.',
        services: ['Language Meetups', 'Tandem Partners', 'Cultural Events', 'Basic Classes']
      }
    ],
    'Legal Advice': [
      {
        name: 'Expat Legal Services',
        logo: 'assets/providers/legal-1.png',
        rating: 4.7,
        location: 'Jung-gu, Seoul',
        languages: ['English', 'Korean', 'Chinese'],
        price: '$$$',
        description: 'Comprehensive legal services for expatriates in Korea. Specializing in immigration, employment, and business law.',
        services: ['Legal Consultation', 'Document Review', 'Court Representation', 'Contract Drafting']
      },
      {
        name: 'Korea Law Partners',
        logo: 'assets/providers/legal-2.png',
        rating: 4.6,
        location: 'Gangnam, Seoul',
        languages: ['English', 'Korean', 'Japanese'],
        price: '$$$',
        description: 'Full-service law firm with dedicated expatriate services. Our team includes foreign-licensed attorneys.',
        services: ['Business Law', 'Immigration', 'Real Estate', 'Dispute Resolution']
      },
      {
        name: 'Legal Aid for Foreigners',
        logo: 'assets/providers/legal-3.png',
        rating: 4.3,
        location: 'Jongno, Seoul',
        languages: ['English', 'Korean', 'Multiple'],
        price: '$',
        description: 'Non-profit organization providing affordable legal assistance to foreigners in need.',
        services: ['Basic Consultation', 'Document Translation', 'Referrals', 'Rights Education']
      }
    ],
    'SIM/Bank': [
      {
        name: 'Korea Mobile Connect',
        logo: 'assets/providers/sim-1.png',
        rating: 4.5,
        location: 'Multiple Locations',
        languages: ['English', 'Korean', 'Chinese'],
        price: '$$',
        description: 'Easy mobile plans for foreigners. No alien registration card required for some plans.',
        services: ['SIM Cards', 'Data Plans', 'Phone Rentals', 'Plan Consultation']
      },
      {
        name: 'Global Banking Korea',
        logo: 'assets/providers/bank-1.png',
        rating: 4.4,
        location: 'Multiple Branches',
        languages: ['English', 'Korean', 'Chinese', 'Japanese'],
        price: 'Free',
        description: 'Banking services designed for expatriates and international residents. Easy account opening process.',
        services: ['Account Opening', 'Remittance', 'Debit Cards', 'Mobile Banking']
      },
      {
        name: 'Expat Financial Services',
        logo: 'assets/providers/bank-2.png',
        rating: 4.6,
        location: 'Gangnam, Seoul',
        languages: ['English', 'Korean'],
        price: 'Free/$$',
        description: 'Comprehensive financial services for expatriates, including banking, insurance, and investment.',
        services: ['Bank Account Setup', 'Insurance', 'Investment Planning', 'Tax Consultation']
      }
    ],
    'Health Insurance': [
      {
        name: 'Korea Health Connect',
        logo: 'assets/providers/health-1.png',
        rating: 4.7,
        location: 'Online + Seocho Office',
        languages: ['English', 'Korean', 'Chinese'],
        price: 'Free/$$',
        description: 'Guidance on Korean national health insurance and private insurance options for foreigners.',
        services: ['NHIS Registration', 'Private Insurance', 'Hospital Navigation', 'Claim Assistance']
      },
      {
        name: 'Expat Insurance Korea',
        logo: 'assets/providers/health-2.png',
        rating: 4.5,
        location: 'Gangnam, Seoul',
        languages: ['English', 'Korean'],
        price: '$$',
        description: 'Specialized insurance plans for expatriates and international residents in Korea.',
        services: ['Health Insurance', 'Travel Insurance', 'Accident Coverage', 'Family Plans']
      },
      {
        name: 'Medical Assistance Service',
        logo: 'assets/providers/health-3.png',
        rating: 4.8,
        location: 'Multiple Locations',
        languages: ['English', 'Korean', 'Multiple'],
        price: '$$$',
        description: 'Premium medical concierge service for expatriates. We handle everything from appointments to translations.',
        services: ['Hospital Appointments', 'Medical Translation', 'Emergency Assistance', 'Medication Guidance']
      }
    ]
  };
  
  return allProviders[category] || [];
}

// Export for use in other modules
window.ServicesScreen = {
  init: initServicesScreen
};
