// Discover Screen Implementation for Konnect App

document.addEventListener('DOMContentLoaded', () => {
  // Initialize discover screen if it's visible
  if (document.getElementById('discover-screen') && 
      document.getElementById('discover-screen').style.display === 'block') {
    initDiscoverScreen();
  }
});

// Initialize discover screen
function initDiscoverScreen() {
  // Create main container
  const discoverScreen = document.getElementById('discover-screen');
  discoverScreen.innerHTML = '';
  
  // Add screen components
  createSearchBar(discoverScreen);
  createTopDealsSection(discoverScreen);
  createCulturalTipsCarousel(discoverScreen);
  createARExperienceButton(discoverScreen);
  
  // Add back button container (initially hidden)
  const backButtonContainer = document.createElement('div');
  backButtonContainer.className = 'back-button-container';
  backButtonContainer.id = 'discover-back-button';
  backButtonContainer.style.display = 'none';
  
  const backButton = document.createElement('button');
  backButton.className = 'back-button';
  backButton.innerHTML = '&larr; Back';
  
  backButtonContainer.appendChild(backButton);
  discoverScreen.prepend(backButtonContainer);
}

// Create search bar
function createSearchBar(container) {
  const searchContainer = document.createElement('div');
  searchContainer.className = 'search-bar';
  
  const searchIcon = document.createElement('span');
  searchIcon.className = 'search-icon';
  searchIcon.innerHTML = '🔍';
  
  const searchInput = document.createElement('input');
  searchInput.className = 'search-input';
  searchInput.type = 'text';
  searchInput.placeholder = 'Find tours, articles...';
  
  // Add event listeners
  searchInput.addEventListener('focus', () => {
    searchInput.placeholder = '';
  });
  
  searchInput.addEventListener('blur', () => {
    searchInput.placeholder = 'Find tours, articles...';
  });
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch(searchInput.value);
    }
  });
  
  searchContainer.appendChild(searchIcon);
  searchContainer.appendChild(searchInput);
  container.appendChild(searchContainer);
}

// Perform search
function performSearch(query) {
  // In a real app, this would search the database
  console.log(`Searching for: ${query}`);
  
  // Create search results screen
  const searchResultsScreen = document.getElementById('discover-search-results-screen') || 
                             document.createElement('div');
  
  if (!searchResultsScreen.id) {
    searchResultsScreen.id = 'discover-search-results-screen';
    searchResultsScreen.className = 'discover-subscreen';
    document.getElementById('main-app').appendChild(searchResultsScreen);
  }
  
  // Clear previous results
  searchResultsScreen.innerHTML = '';
  
  // Create screen header
  const screenHeader = document.createElement('div');
  screenHeader.className = 'screen-header';
  
  const headerTitle = document.createElement('h1');
  headerTitle.className = 'header-large';
  headerTitle.textContent = `Search Results: "${query}"`;
  
  screenHeader.appendChild(headerTitle);
  searchResultsScreen.appendChild(screenHeader);
  
  // Create results container
  const resultsContainer = document.createElement('div');
  resultsContainer.className = 'search-results-container';
  
  // Sample search results - in a real app, these would come from an API
  const searchResults = [
    {
      type: 'tour',
      title: 'Seoul Palace Tour',
      image: 'assets/tours/palace-tour.jpg',
      price: '₩30,000',
      rating: 4.7,
      reviews: 128
    },
    {
      type: 'article',
      title: 'Top 10 Korean Phrases for Travelers',
      image: 'assets/articles/korean-phrases.jpg',
      readTime: '5 min read',
      category: 'Language'
    },
    {
      type: 'tour',
      title: 'Korean Cooking Class',
      image: 'assets/tours/cooking-class.jpg',
      price: '₩45,000',
      rating: 4.9,
      reviews: 86
    },
    {
      type: 'article',
      title: 'Navigating Seoul\'s Subway System',
      image: 'assets/articles/subway-guide.jpg',
      readTime: '8 min read',
      category: 'Transportation'
    }
  ];
  
  // Filter results based on query (simple contains check)
  const filteredResults = searchResults.filter(result => 
    result.title.toLowerCase().includes(query.toLowerCase())
  );
  
  if (filteredResults.length === 0) {
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.textContent = 'No results found. Try different keywords.';
    resultsContainer.appendChild(noResults);
  } else {
    filteredResults.forEach(result => {
      const resultCard = document.createElement('div');
      resultCard.className = 'result-card card';
      
      const resultImage = document.createElement('div');
      resultImage.className = 'result-image';
      resultImage.style.backgroundImage = `url(${result.image})`;
      
      const resultContent = document.createElement('div');
      resultContent.className = 'result-content';
      
      const resultType = document.createElement('div');
      resultType.className = 'result-type badge';
      resultType.textContent = result.type === 'tour' ? 'Tour' : 'Article';
      resultType.classList.add(result.type === 'tour' ? 'badge-primary' : 'badge-accent');
      
      const resultTitle = document.createElement('h3');
      resultTitle.className = 'result-title';
      resultTitle.textContent = result.title;
      
      const resultDetails = document.createElement('div');
      resultDetails.className = 'result-details';
      
      if (result.type === 'tour') {
        resultDetails.innerHTML = `
          <div class="result-price">${result.price}</div>
          <div class="result-rating">★ ${result.rating} (${result.reviews})</div>
        `;
      } else {
        resultDetails.innerHTML = `
          <div class="result-read-time">${result.readTime}</div>
          <div class="result-category">${result.category}</div>
        `;
      }
      
      resultContent.appendChild(resultType);
      resultContent.appendChild(resultTitle);
      resultContent.appendChild(resultDetails);
      
      resultCard.appendChild(resultImage);
      resultCard.appendChild(resultContent);
      
      // Add click event
      resultCard.addEventListener('click', () => {
        if (result.type === 'tour') {
          showTourDetails(result);
        } else {
          showArticleDetails(result);
        }
      });
      
      resultsContainer.appendChild(resultCard);
    });
  }
  
  searchResultsScreen.appendChild(resultsContainer);
  
  // Navigate to search results screen
  window.KonnectNavigation.navigateToScreen('discover', 'discover-search-results-screen');
}

// Create top deals section
function createTopDealsSection(container) {
  const sectionContainer = document.createElement('div');
  sectionContainer.className = 'section-container';
  
  const sectionHeader = document.createElement('div');
  sectionHeader.className = 'section-header';
  
  const headerTitle = document.createElement('h2');
  headerTitle.className = 'subheader-large';
  headerTitle.textContent = 'Top Deals';
  
  const viewAllLink = document.createElement('a');
  viewAllLink.className = 'view-all-link';
  viewAllLink.textContent = 'View All';
  viewAllLink.href = '#';
  viewAllLink.addEventListener('click', (e) => {
    e.preventDefault();
    showAllDeals();
  });
  
  sectionHeader.appendChild(headerTitle);
  sectionHeader.appendChild(viewAllLink);
  sectionContainer.appendChild(sectionHeader);
  
  // Create deals grid
  const dealsGrid = document.createElement('div');
  dealsGrid.className = 'deals-grid';
  
  // Sample deals - in a real app, these would come from an API
  const deals = [
    {
      title: 'DMZ Tour',
      image: 'assets/tours/dmz-tour.jpg',
      price: '₩55,000',
      discount: '20% OFF',
      rating: 4.6
    },
    {
      title: 'Nami Island Day Trip',
      image: 'assets/tours/nami-island.jpg',
      price: '₩40,000',
      discount: '15% OFF',
      rating: 4.8
    },
    {
      title: 'Korean BBQ Class',
      image: 'assets/tours/bbq-class.jpg',
      price: '₩50,000',
      discount: '10% OFF',
      rating: 4.7
    },
    {
      title: 'Seoul Night Tour',
      image: 'assets/tours/night-tour.jpg',
      price: '₩35,000',
      discount: '25% OFF',
      rating: 4.5
    }
  ];
  
  deals.forEach(deal => {
    const dealCard = document.createElement('div');
    dealCard.className = 'deal-card';
    
    const dealImage = document.createElement('div');
    dealImage.className = 'deal-image';
    dealImage.style.backgroundImage = `url(${deal.image})`;
    
    const discountBadge = document.createElement('div');
    discountBadge.className = 'badge badge-primary discount-badge';
    discountBadge.textContent = deal.discount;
    dealImage.appendChild(discountBadge);
    
    const dealContent = document.createElement('div');
    dealContent.className = 'deal-content';
    
    const dealTitle = document.createElement('div');
    dealTitle.className = 'deal-title';
    dealTitle.textContent = deal.title;
    
    const dealPrice = document.createElement('div');
    dealPrice.className = 'deal-price';
    dealPrice.textContent = deal.price;
    
    const dealRating = document.createElement('div');
    dealRating.className = 'deal-rating';
    dealRating.innerHTML = `★ ${deal.rating}`;
    
    dealContent.appendChild(dealTitle);
    dealContent.appendChild(dealPrice);
    dealContent.appendChild(dealRating);
    
    dealCard.appendChild(dealImage);
    dealCard.appendChild(dealContent);
    
    // Add click event
    dealCard.addEventListener('click', () => {
      showTourDetails(deal);
    });
    
    dealsGrid.appendChild(dealCard);
  });
  
  sectionContainer.appendChild(dealsGrid);
  container.appendChild(sectionContainer);
}

// Show all deals
function showAllDeals() {
  // In a real app, this would load more deals from an API
  console.log('Showing all deals');
  
  // Create all deals screen
  const allDealsScreen = document.getElementById('discover-all-deals-screen') || 
                        document.createElement('div');
  
  if (!allDealsScreen.id) {
    allDealsScreen.id = 'discover-all-deals-screen';
    allDealsScreen.className = 'discover-subscreen';
    document.getElementById('main-app').appendChild(allDealsScreen);
  }
  
  // Clear previous content
  allDealsScreen.innerHTML = '';
  
  // Create screen header
  const screenHeader = document.createElement('div');
  screenHeader.className = 'screen-header';
  
  const headerTitle = document.createElement('h1');
  headerTitle.className = 'header-large';
  headerTitle.textContent = 'All Deals';
  
  screenHeader.appendChild(headerTitle);
  allDealsScreen.appendChild(screenHeader);
  
  // Create filters
  const filtersContainer = document.createElement('div');
  filtersContainer.className = 'filters-container';
  
  const categoryFilter = document.createElement('select');
  categoryFilter.className = 'filter-select';
  
  ['All Categories', 'Tours', 'Activities', 'Classes', 'Tickets'].forEach(category => {
    const option = document.createElement('option');
    option.value = category.toLowerCase();
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
  
  const priceFilter = document.createElement('select');
  priceFilter.className = 'filter-select';
  
  ['All Prices', 'Under ₩30,000', '₩30,000 - ₩50,000', 'Over ₩50,000'].forEach(price => {
    const option = document.createElement('option');
    option.value = price.toLowerCase().replace(/\s/g, '-');
    option.textContent = price;
    priceFilter.appendChild(option);
  });
  
  filtersContainer.appendChild(categoryFilter);
  filtersContainer.appendChild(priceFilter);
  allDealsScreen.appendChild(filtersContainer);
  
  // Create deals grid (expanded version of the one on main screen)
  const dealsGrid = document.createElement('div');
  dealsGrid.className = 'deals-grid deals-grid-large';
  
  // Sample deals - in a real app, these would come from an API
  const deals = [
    {
      title: 'DMZ Tour',
      image: 'assets/tours/dmz-tour.jpg',
      price: '₩55,000',
      discount: '20% OFF',
      rating: 4.6
    },
    {
      title: 'Nami Island Day Trip',
      image: 'assets/tours/nami-island.jpg',
      price: '₩40,000',
      discount: '15% OFF',
      rating: 4.8
    },
    {
      title: 'Korean BBQ Class',
      image: 'assets/tours/bbq-class.jpg',
      price: '₩50,000',
      discount: '10% OFF',
      rating: 4.7
    },
    {
      title: 'Seoul Night Tour',
      image: 'assets/tours/night-tour.jpg',
      price: '₩35,000',
      discount: '25% OFF',
      rating: 4.5
    },
    {
      title: 'Bukchon Hanok Village Tour',
      image: 'assets/tours/hanok-tour.jpg',
      price: '₩25,000',
      discount: '15% OFF',
      rating: 4.4
    },
    {
      title: 'K-Pop Dance Class',
      image: 'assets/tours/kpop-class.jpg',
      price: '₩45,000',
      discount: '10% OFF',
      rating: 4.9
    },
    {
      title: 'Lotte World Tickets',
      image: 'assets/tours/lotte-world.jpg',
      price: '₩28,000',
      discount: '30% OFF',
      rating: 4.3
    },
    {
      title: 'Han River Cruise',
      image: 'assets/tours/river-cruise.jpg',
      price: '₩20,000',
      discount: '20% OFF',
      rating: 4.5
    }
  ];
  
  deals.forEach(deal => {
    const dealCard = document.createElement('div');
    dealCard.className = 'deal-card';
    
    const dealImage = document.createElement('div');
    dealImage.className = 'deal-image';
    dealImage.style.backgroundImage = `url(${deal.image})`;
    
    const discountBadge = document.createElement('div');
    discountBadge.className = 'badge badge-primary discount-badge';
    discountBadge.textContent = deal.discount;
    dealImage.appendChild(discountBadge);
    
    const dealContent = document.createElement('div');
    dealContent.className = 'deal-content';
    
    const dealTitle = document.createElement('div');
    dealTitle.className = 'deal-title';
    dealTitle.textContent = deal.title;
    
    const dealPrice = document.createElement('div');
    dealPrice.className = 'deal-price';
    dealPrice.textContent = deal.price;
    
    const dealRating = document.createElement('div');
    dealRating.className = 'deal-rating';
    dealRating.innerHTML = `★ ${deal.rating}`;
    
    dealContent.appendChild(dealTitle);
    dealContent.appendChild(dealPrice);
    dealContent.appendChild(dealRating);
    
    dealCard.appendChild(dealImage);
    dealCard.appendChild(dealContent);
    
    // Add click event
    dealCard.addEventListener('click', () => {
      showTourDetails(deal);
    });
    
    dealsGrid.appendChild(dealCard);
  });
  
  allDealsScreen.appendChild(dealsGrid);
  
  // Navigate to all deals screen
  window.KonnectNavigation.navigateToScreen('discover', 'discover-all-deals-screen');
}

// Create cultural tips carousel
function createCulturalTipsCarousel(container) {
  const sectionContainer = document.createElement('div');
  sectionContainer.className = 'section-container';
  
  const sectionHeader = document.createElement('div');
  sectionHeader.className = 'section-header';
  
  const headerTitle = document.createElement('h2');
  headerTitle.className = 'subheader-large';
  headerTitle.textContent = 'Cultural Tips';
  
  const viewAllLink = document.createElement('a');
  viewAllLink.className = 'view-all-link';
  viewAllLink.textContent = 'View All';
  viewAllLink.href = '#';
  viewAllLink.addEventListener('click', (e) => {
    e.preventDefault();
    showAllCulturalTips();
  });
  
  sectionHeader.appendChild(headerTitle);
  sectionHeader.appendChild(viewAllLink);
  sectionContainer.appendChild(sectionHeader);
  
  // Create carousel container
  const carouselContainer = document.createElement('div');
  carouselContainer.className = 'carousel-container cultural-tips-carousel';
  
  const carouselWrapper = document.createElement('div');
  carouselWrapper.className = 'carousel-wrapper';
  
  // Sample cultural tips - in a real app, these would come from an API
  const culturalTips = [
    {
      title: 'Slang of the Day',
      content: '대박 (Daebak) - "Awesome!" or "Jackpot!"',
      image: 'assets/cultural/slang.jpg',
      category: 'Language'
    },
    {
      title: 'Dining Etiquette',
      content: 'Wait for elders to start eating before you begin',
      image: 'assets/cultural/dining.jpg',
      category: 'Customs'
    },
    {
      title: 'Public Transport Tip',
      content: 'Give up your seat to the elderly, pregnant, or disabled',
      image: 'assets/cultural/transport.jpg',
      category: 'Etiquette'
    },
    {
      title: 'Business Card Exchange',
      content: 'Use both hands when giving or receiving business cards',
      image: 'assets/cultural/business.jpg',
      category: 'Business'
    }
  ];
  
  culturalTips.forEach(tip => {
    const carouselItem = document.createElement('div');
    carouselItem.className = 'carousel-item cultural-tip-card card';
    
    const tipCategory = document.createElement('div');
    tipCategory.className = 'tip-category badge badge-accent';
    tipCategory.textContent = tip.category;
    
    const tipTitle = document.createElement('h3');
    tipTitle.className = 'tip-title';
    tipTitle.textContent = tip.title;
    
    const tipContent = document.createElement('p');
    tipContent.className = 'tip-content';
    tipContent.textContent = tip.content;
    
    const tipImage = document.createElement('div');
    tipImage.className = 'tip-image';
    tipImage.style.backgroundImage = `url(${tip.image})`;
    
    carouselItem.appendChild(tipCategory);
    carouselItem.appendChild(tipTitle);
    carouselItem.appendChild(tipContent);
    carouselItem.appendChild(tipImage);
    
    // Add click event
    carouselItem.addEventListener('click', () => {
      showCulturalTipDetails(tip);
    });
    
    carouselWrapper.appendChild(carouselItem);
  });
  
  carouselContainer.appendChild(carouselWrapper);
  
  // Add carousel navigation
  const carouselNav = document.createElement('div');
  carouselNav.className = 'carousel-nav';
  
  const prevButton = document.createElement('button');
  prevButton.className = 'carousel-nav-button prev';
  prevButton.innerHTML = '&larr;';
  
  const nextButton = document.createElement('button');
  nextButton.className = 'carousel-nav-button next';
  nextButton.innerHTML = '&rarr;';
  
  carouselNav.appendChild(prevButton);
  carouselNav.appendChild(nextButton);
  
  // Add carousel navigation functionality
  let currentPosition = 0;
  const itemWidth = 280; // Width of each carousel item + margin
  const maxPosition = (culturalTips.length - 1) * itemWidth;
  
  prevButton.addEventListener('click', () => {
    currentPosition = Math.max(currentPosition - itemWidth, 0);
    carouselWrapper.style.transform = `translateX(-${currentPosition}px)`;
  });
  
  nextButton.addEventListener('click', () => {
    currentPosition = Math.min(currentPosition + itemWidth, maxPosition);
    carouselWrapper.style.transform = `translateX(-${currentPosition}px)`;
  });
  
  carouselContainer.appendChild(carouselNav);
  sectionContainer.appendChild(carouselContainer);
  container.appendChild(sectionContainer);
}

// Show all cultural tips
function showAllCulturalTips() {
  // In a real app, this would load more tips from an API
  console.log('Showing all cultural tips');
  
  // Create all tips screen
  const allTipsScreen = document.getElementById('discover-all-tips-screen') || 
                       document.createElement('div');
  
  if (!allTipsScreen.id) {
    allTipsScreen.id = 'discover-all-tips-screen';
    allTipsScreen.className = 'discover-subscreen';
    document.getElementById('main-app').appendChild(allTipsScreen);
  }
  
  // Clear previous content
  allTipsScreen.innerHTML = '';
  
  // Create screen header
  const screenHeader = document.createElement('div');
  screenHeader.className = 'screen-header';
  
  const headerTitle = document.createElement('h1');
  headerTitle.className = 'header-large';
  headerTitle.textContent = 'Cultural Tips';
  
  screenHeader.appendChild(headerTitle);
  allTipsScreen.appendChild(screenHeader);
  
  // Create category tabs
  const categoryTabs = document.createElement('div');
  categoryTabs.className = 'category-tabs';
  
  ['All', 'Language', 'Customs', 'Etiquette', 'Business'].forEach((category, index) => {
    const tab = document.createElement('div');
    tab.className = index === 0 ? 'category-tab active' : 'category-tab';
    tab.textContent = category;
    
    tab.addEventListener('click', () => {
      // Update active tab
      document.querySelectorAll('.category-tab').forEach(t => {
        t.classList.remove('active');
      });
      tab.classList.add('active');
      
      // Filter tips by category (in a real app)
      console.log(`Filtering tips by category: ${category}`);
    });
    
    categoryTabs.appendChild(tab);
  });
  
  allTipsScreen.appendChild(categoryTabs);
  
  // Create tips grid
  const tipsGrid = document.createElement('div');
  tipsGrid.className = 'tips-grid';
  
  // Sample cultural tips - in a real app, these would come from an API
  const culturalTips = [
    {
      title: 'Slang of the Day',
      content: '대박 (Daebak) - "Awesome!" or "Jackpot!"',
      image: 'assets/cultural/slang.jpg',
      category: 'Language'
    },
    {
      title: 'Dining Etiquette',
      content: 'Wait for elders to start eating before you begin',
      image: 'assets/cultural/dining.jpg',
      category: 'Customs'
    },
    {
      title: 'Public Transport Tip',
      content: 'Give up your seat to the elderly, pregnant, or disabled',
      image: 'assets/cultural/transport.jpg',
      category: 'Etiquette'
    },
    {
      title: 'Business Card Exchange',
      content: 'Use both hands when giving or receiving business cards',
      image: 'assets/cultural/business.jpg',
      category: 'Business'
    },
    {
      title: 'Useful Phrase',
      content: '감사합니다 (Kamsahamnida) - "Thank you"',
      image: 'assets/cultural/phrase.jpg',
      category: 'Language'
    },
    {
      title: 'Shoes Off',
      content: 'Always remove your shoes when entering a Korean home',
      image: 'assets/cultural/shoes.jpg',
      category: 'Customs'
    },
    {
      title: 'Drinking Etiquette',
      content: 'Turn your head away when drinking with elders',
      image: 'assets/cultural/drinking.jpg',
      category: 'Etiquette'
    },
    {
      title: 'Meeting Greeting',
      content: 'Bow slightly when meeting someone for the first time',
      image: 'assets/cultural/greeting.jpg',
      category: 'Business'
    }
  ];
  
  culturalTips.forEach(tip => {
    const tipCard = document.createElement('div');
    tipCard.className = 'cultural-tip-card card';
    
    const tipCategory = document.createElement('div');
    tipCategory.className = 'tip-category badge badge-accent';
    tipCategory.textContent = tip.category;
    
    const tipTitle = document.createElement('h3');
    tipTitle.className = 'tip-title';
    tipTitle.textContent = tip.title;
    
    const tipContent = document.createElement('p');
    tipContent.className = 'tip-content';
    tipContent.textContent = tip.content;
    
    const tipImage = document.createElement('div');
    tipImage.className = 'tip-image';
    tipImage.style.backgroundImage = `url(${tip.image})`;
    
    tipCard.appendChild(tipCategory);
    tipCard.appendChild(tipTitle);
    tipCard.appendChild(tipContent);
    tipCard.appendChild(tipImage);
    
    // Add click event
    tipCard.addEventListener('click', () => {
      showCulturalTipDetails(tip);
    });
    
    tipsGrid.appendChild(tipCard);
  });
  
  allTipsScreen.appendChild(tipsGrid);
  
  // Navigate to all tips screen
  window.KonnectNavigation.navigateToScreen('discover', 'discover-all-tips-screen');
}

// Create AR experience button
function createARExperienceButton(container) {
  const arContainer = document.createElement('div');
  arContainer.className = 'ar-container';
  
  const arButton = document.createElement('button');
  arButton.className = 'ar-button btn btn-primary';
  
  const arIcon = document.createElement('span');
  arIcon.className = 'ar-icon';
  arIcon.innerHTML = '📱';
  
  const arText = document.createElement('span');
  arText.className = 'ar-text';
  arText.textContent = 'Point & Learn';
  
  arButton.appendChild(arIcon);
  arButton.appendChild(arText);
  
  // Add click event
  arButton.addEventListener('click', () => {
    launchARExperience();
  });
  
  arContainer.appendChild(arButton);
  container.appendChild(arContainer);
}

// Launch AR experience
function launchARExperience() {
  // In a real app, this would launch the AR camera view
  console.log('Launching AR experience');
  
  // Create AR modal
  const arModal = document.createElement('div');
  arModal.className = 'modal ar-modal';
  
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  
  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';
  
  const headerTitle = document.createElement('h2');
  headerTitle.className = 'header-medium';
  headerTitle.textContent = 'AR Experience';
  
  const closeButton = document.createElement('button');
  closeButton.className = 'close-button';
  closeButton.innerHTML = '&times;';
  closeButton.addEventListener('click', () => {
    document.body.removeChild(arModal);
  });
  
  modalHeader.appendChild(headerTitle);
  modalHeader.appendChild(closeButton);
  
  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';
  
  // AR camera simulation
  const arCamera = document.createElement('div');
  arCamera.className = 'ar-camera';
  
  const cameraOverlay = document.createElement('div');
  cameraOverlay.className = 'camera-overlay';
  cameraOverlay.innerHTML = `
    <div class="camera-frame"></div>
    <div class="camera-instructions">Point your camera at buildings, signs, or food to learn more</div>
    <div class="camera-scanning">Scanning...</div>
  `;
  
  // Sample AR detection
  const arDetection = document.createElement('div');
  arDetection.className = 'ar-detection';
  
  const detectionMarker = document.createElement('div');
  detectionMarker.className = 'detection-marker';
  
  const detectionInfo = document.createElement('div');
  detectionInfo.className = 'detection-info';
  detectionInfo.innerHTML = `
    <h3>Gyeongbokgung Palace</h3>
    <p>Built in 1395, Gyeongbokgung Palace is the largest of the Five Grand Palaces built during the Joseon Dynasty.</p>
    <button class="btn btn-primary">Learn More</button>
  `;
  
  arDetection.appendChild(detectionMarker);
  arDetection.appendChild(detectionInfo);
  
  arCamera.appendChild(cameraOverlay);
  arCamera.appendChild(arDetection);
  
  modalBody.appendChild(arCamera);
  
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  arModal.appendChild(modalContent);
  
  document.body.appendChild(arModal);
  
  // Simulate AR detection after a delay
  setTimeout(() => {
    arDetection.style.display = 'flex';
    cameraOverlay.querySelector('.camera-scanning').style.display = 'none';
  }, 3000);
}

// Show tour details
function showTourDetails(tour) {
  // In a real app, this would fetch detailed tour information from an API
  console.log(`Showing details for tour: ${tour.title}`);
  
  // Create tour details modal
  const tourModal = document.createElement('div');
  tourModal.className = 'modal tour-modal';
  
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  
  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';
  
  const headerTitle = document.createElement('h2');
  headerTitle.className = 'header-medium';
  headerTitle.textContent = tour.title;
  
  const closeButton = document.createElement('button');
  closeButton.className = 'close-button';
  closeButton.innerHTML = '&times;';
  closeButton.addEventListener('click', () => {
    document.body.removeChild(tourModal);
  });
  
  modalHeader.appendChild(headerTitle);
  modalHeader.appendChild(closeButton);
  
  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';
  
  // Tour image
  const tourImage = document.createElement('div');
  tourImage.className = 'tour-image';
  tourImage.style.backgroundImage = `url(${tour.image})`;
  
  if (tour.discount) {
    const discountBadge = document.createElement('div');
    discountBadge.className = 'badge badge-primary discount-badge';
    discountBadge.textContent = tour.discount;
    tourImage.appendChild(discountBadge);
  }
  
  // Tour details
  const tourDetails = document.createElement('div');
  tourDetails.className = 'tour-details';
  
  const tourPrice = document.createElement('div');
  tourPrice.className = 'tour-price';
  tourPrice.innerHTML = `<strong>Price:</strong> ${tour.price}`;
  
  const tourRating = document.createElement('div');
  tourRating.className = 'tour-rating';
  tourRating.innerHTML = `<strong>Rating:</strong> ★ ${tour.rating || '4.5'}`;
  
  const tourDuration = document.createElement('div');
  tourDuration.className = 'tour-duration';
  tourDuration.innerHTML = `<strong>Duration:</strong> 4 hours`;
  
  const tourLanguages = document.createElement('div');
  tourLanguages.className = 'tour-languages';
  tourLanguages.innerHTML = `<strong>Languages:</strong> English, Korean`;
  
  tourDetails.appendChild(tourPrice);
  tourDetails.appendChild(tourRating);
  tourDetails.appendChild(tourDuration);
  tourDetails.appendChild(tourLanguages);
  
  // Tour description
  const tourDescription = document.createElement('div');
  tourDescription.className = 'tour-description';
  
  const descriptionTitle = document.createElement('h3');
  descriptionTitle.textContent = 'Description';
  
  const descriptionText = document.createElement('p');
  descriptionText.textContent = 'Experience the best of Korean culture with this amazing tour. Professional guides will take you through the most interesting spots while sharing fascinating stories and insights.';
  
  tourDescription.appendChild(descriptionTitle);
  tourDescription.appendChild(descriptionText);
  
  // Booking section
  const bookingSection = document.createElement('div');
  bookingSection.className = 'booking-section';
  
  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.className = 'date-input';
  
  const peopleSelect = document.createElement('select');
  peopleSelect.className = 'people-select';
  
  for (let i = 1; i <= 10; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${i} ${i === 1 ? 'person' : 'people'}`;
    peopleSelect.appendChild(option);
  }
  
  const bookButton = document.createElement('button');
  bookButton.className = 'btn btn-primary book-button';
  bookButton.textContent = 'Book Now';
  
  bookButton.addEventListener('click', () => {
    // In a real app, this would book the tour
    alert(`Tour booked for ${dateInput.value} with ${peopleSelect.value} people`);
    document.body.removeChild(tourModal);
  });
  
  bookingSection.appendChild(dateInput);
  bookingSection.appendChild(peopleSelect);
  bookingSection.appendChild(bookButton);
  
  modalBody.appendChild(tourImage);
  modalBody.appendChild(tourDetails);
  modalBody.appendChild(tourDescription);
  modalBody.appendChild(bookingSection);
  
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  tourModal.appendChild(modalContent);
  
  document.body.appendChild(tourModal);
}

// Show article details
function showArticleDetails(article) {
  // In a real app, this would fetch the full article from an API
  console.log(`Showing article: ${article.title}`);
  
  // Create article details screen
  const articleScreen = document.getElementById('discover-article-screen') || 
                       document.createElement('div');
  
  if (!articleScreen.id) {
    articleScreen.id = 'discover-article-screen';
    articleScreen.className = 'discover-subscreen';
    document.getElementById('main-app').appendChild(articleScreen);
  }
  
  // Clear previous content
  articleScreen.innerHTML = '';
  
  // Create screen header
  const screenHeader = document.createElement('div');
  screenHeader.className = 'screen-header';
  
  const headerTitle = document.createElement('h1');
  headerTitle.className = 'header-large';
  headerTitle.textContent = article.title;
  
  screenHeader.appendChild(headerTitle);
  articleScreen.appendChild(screenHeader);
  
  // Article content
  const articleContent = document.createElement('div');
  articleContent.className = 'article-content';
  
  const articleImage = document.createElement('div');
  articleImage.className = 'article-image';
  articleImage.style.backgroundImage = `url(${article.image})`;
  
  const articleMeta = document.createElement('div');
  articleMeta.className = 'article-meta';
  articleMeta.innerHTML = `
    <span class="article-category">${article.category}</span>
    <span class="article-read-time">${article.readTime}</span>
    <span class="article-date">May 20, 2025</span>
  `;
  
  const articleText = document.createElement('div');
  articleText.className = 'article-text';
  
  // Sample article text - in a real app, this would come from an API
  if (article.title.includes('Korean Phrases')) {
    articleText.innerHTML = `
      <p>Whether you're traveling, studying, or working in Korea, knowing a few key phrases can make your experience much smoother and more enjoyable. Here are the top 10 Korean phrases every foreigner should know:</p>
      
      <h3>1. 안녕하세요 (Annyeonghaseyo)</h3>
      <p>Meaning: Hello / Good day</p>
      <p>This is the standard greeting in Korean and can be used at any time of day. It's formal and respectful.</p>
      
      <h3>2. 감사합니다 (Kamsahamnida)</h3>
      <p>Meaning: Thank you</p>
      <p>A formal way to express gratitude. For a more casual "thanks," you can say "고마워요" (gomawoyo).</p>
      
      <h3>3. 죄송합니다 (Joesonghamnida)</h3>
      <p>Meaning: I'm sorry</p>
      <p>Use this to apologize formally. For a more casual apology, "미안해요" (mianhaeyo) works well.</p>
      
      <h3>4. 이것 주세요 (Igeot juseyo)</h3>
      <p>Meaning: Please give me this</p>
      <p>Very useful in restaurants, shops, or markets when pointing to what you want.</p>
      
      <h3>5. 얼마예요? (Eolmayeyo?)</h3>
      <p>Meaning: How much is it?</p>
      <p>Essential for shopping or when taking taxis.</p>
      
      <h3>6. 화장실이 어디예요? (Hwajangsil-i eodiyeyo?)</h3>
      <p>Meaning: Where is the bathroom?</p>
      <p>A crucial phrase for any traveler!</p>
      
      <h3>7. 영어 할 줄 아세요? (Yeong-eo hal jul aseyo?)</h3>
      <p>Meaning: Do you speak English?</p>
      <p>Helpful when you need to find someone who speaks English.</p>
      
      <h3>8. 맛있어요 (Masiss-eoyo)</h3>
      <p>Meaning: It's delicious</p>
      <p>A great compliment to give after enjoying Korean food.</p>
      
      <h3>9. 이해가 안 돼요 (Ihaega an dwaeyo)</h3>
      <p>Meaning: I don't understand</p>
      <p>Useful when you're confused or need something explained again.</p>
      
      <h3>10. 안녕히 계세요 / 안녕히 가세요 (Annyeonghi gyeseyo / Annyeonghi gaseyo)</h3>
      <p>Meaning: Goodbye (to someone staying) / Goodbye (to someone leaving)</p>
      <p>The first is used when you're leaving and the other person is staying. The second is used when you're staying and the other person is leaving.</p>
      
      <p>Practice these phrases before your trip, and you'll find Koreans appreciate your effort to speak their language, even if your pronunciation isn't perfect!</p>
    `;
  } else if (article.title.includes('Subway')) {
    articleText.innerHTML = `
      <p>Seoul's subway system is one of the most efficient and extensive public transportation networks in the world. With over 20 lines and hundreds of stations, it can seem overwhelming at first, but with these tips, you'll be navigating like a local in no time.</p>
      
      <h3>Understanding the Basics</h3>
      <p>Seoul's subway lines are color-coded and numbered, making them easy to identify. Major lines include:</p>
      <ul>
        <li>Line 1 (Dark Blue): Connects Seoul Station to major areas like Yongsan and Cheongnyangni</li>
        <li>Line 2 (Green): The circular line that loops around central Seoul</li>
        <li>Line 3 (Orange): Runs north-south through Gangnam and Jongno</li>
        <li>Line 4 (Light Blue): Connects northern and southern Seoul</li>
        <li>Line 5 (Purple): East-west line through central Seoul</li>
      </ul>
      
      <h3>Using T-Money Cards</h3>
      <p>Purchase a T-Money card at any convenience store or subway station. These rechargeable cards work on all public transportation in Seoul and many other cities. They're more convenient than single-journey tickets and give you a small discount.</p>
      
      <h3>Reading Station Signs</h3>
      <p>All stations have signs in Korean, English, Chinese, and Japanese. Stations are announced in multiple languages on the train. Look for the station numbers (e.g., 203 for Line 2, Station 3) which can be easier to remember than names.</p>
      
      <h3>Transfer Tips</h3>
      <p>Transfers between lines are free within the system. Follow the color-coded transfer signs, but be prepared for long walks in larger stations. Some major transfer stations like Gangnam, Seoul Station, and Jamsil can take up to 10 minutes to walk through.</p>
      
      <h3>Rush Hour Survival</h3>
      <p>Avoid traveling between 7:30-9:00 AM and 5:30-7:30 PM if possible. If you must travel during these times, be prepared for extremely crowded trains. Let passengers exit before attempting to board.</p>
      
      <h3>Subway Etiquette</h3>
      <p>Priority seating is reserved for the elderly, pregnant women, and disabled passengers. Eating on the train is frowned upon. Keep your voice down when talking or on the phone.</p>
      
      <h3>Useful Apps</h3>
      <p>Download Kakao Metro or Naver Maps for real-time subway information, including exact arrival times and the most efficient routes. Both have English interfaces.</p>
      
      <h3>Operating Hours</h3>
      <p>The first trains start around 5:30 AM and the last trains depart around midnight (earlier on weekends). Check the exact schedule for your line and station, as times vary.</p>
      
      <p>With these tips and a little practice, you'll be zipping around Seoul like a local in no time. The subway is not only the fastest way to get around the city but also one of the most affordable.</p>
    `;
  } else {
    articleText.innerHTML = `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p>
      
      <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p>
      
      <h3>Subheading</h3>
      
      <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p>
      
      <p>Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p>
    `;
  }
  
  // Share and save buttons
  const articleActions = document.createElement('div');
  articleActions.className = 'article-actions';
  
  const shareButton = document.createElement('button');
  shareButton.className = 'btn btn-outline';
  shareButton.innerHTML = '📤 Share';
  
  const saveButton = document.createElement('button');
  saveButton.className = 'btn btn-outline';
  saveButton.innerHTML = '🔖 Save';
  
  articleActions.appendChild(shareButton);
  articleActions.appendChild(saveButton);
  
  articleContent.appendChild(articleImage);
  articleContent.appendChild(articleMeta);
  articleContent.appendChild(articleText);
  articleContent.appendChild(articleActions);
  
  articleScreen.appendChild(articleContent);
  
  // Navigate to article screen
  window.KonnectNavigation.navigateToScreen('discover', 'discover-article-screen');
}

// Show cultural tip details
function showCulturalTipDetails(tip) {
  // In a real app, this would fetch the full tip details from an API
  console.log(`Showing cultural tip: ${tip.title}`);
  
  // Create tip details modal
  const tipModal = document.createElement('div');
  tipModal.className = 'modal tip-modal';
  
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  
  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';
  
  const headerTitle = document.createElement('h2');
  headerTitle.className = 'header-medium';
  headerTitle.textContent = tip.title;
  
  const closeButton = document.createElement('button');
  closeButton.className = 'close-button';
  closeButton.innerHTML = '&times;';
  closeButton.addEventListener('click', () => {
    document.body.removeChild(tipModal);
  });
  
  modalHeader.appendChild(headerTitle);
  modalHeader.appendChild(closeButton);
  
  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';
  
  // Tip image
  const tipImage = document.createElement('div');
  tipImage.className = 'tip-detail-image';
  tipImage.style.backgroundImage = `url(${tip.image})`;
  
  const tipCategory = document.createElement('div');
  tipCategory.className = 'tip-category badge badge-accent';
  tipCategory.textContent = tip.category;
  
  // Tip content
  const tipContent = document.createElement('div');
  tipContent.className = 'tip-detail-content';
  
  // Extended content based on the tip
  let extendedContent = '';
  
  if (tip.title === 'Slang of the Day') {
    extendedContent = `
      <p><strong>${tip.content}</strong></p>
      <p>This versatile Korean slang can express excitement, surprise, or approval. It's commonly used among young Koreans and in K-dramas.</p>
      <p><strong>Example usage:</strong></p>
      <p>"Wow, you got a promotion? 대박!"</p>
      <p><strong>Pronunciation tip:</strong> "Dae" is pronounced like "day" and "bak" rhymes with "rock".</p>
    `;
  } else if (tip.title === 'Dining Etiquette') {
    extendedContent = `
      <p><strong>${tip.content}</strong></p>
      <p>In Korean culture, showing respect to elders is paramount, especially during meals. Wait until the eldest person at the table picks up their utensils before you begin eating.</p>
      <p><strong>Additional dining tips:</strong></p>
      <ul>
        <li>Use both hands when receiving food or drinks from an elder</li>
        <li>Don't lift your rice bowl off the table while eating (unlike in some other Asian cultures)</li>
        <li>Cover your mouth when using a toothpick</li>
        <li>It's polite to pour drinks for others, not yourself</li>
      </ul>
    `;
  } else {
    extendedContent = `
      <p><strong>${tip.content}</strong></p>
      <p>This is an important cultural practice in Korea that shows respect and consideration for others.</p>
      <p>Understanding and following local customs will help you integrate better and show respect for Korean culture.</p>
    `;
  }
  
  tipContent.innerHTML = extendedContent;
  
  // Save button
  const saveButton = document.createElement('button');
  saveButton.className = 'btn btn-outline save-button';
  saveButton.innerHTML = '🔖 Save for Later';
  
  modalBody.appendChild(tipCategory);
  modalBody.appendChild(tipImage);
  modalBody.appendChild(tipContent);
  modalBody.appendChild(saveButton);
  
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  tipModal.appendChild(modalContent);
  
  document.body.appendChild(tipModal);
}

// Export for use in other modules
window.DiscoverScreen = {
  init: initDiscoverScreen
};
