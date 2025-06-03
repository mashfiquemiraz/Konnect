// Community Screen Implementation for Konnect App

document.addEventListener('DOMContentLoaded', () => {
  // Initialize community screen if it's visible
  if (document.getElementById('community-screen') && 
      document.getElementById('community-screen').style.display === 'block') {
    initCommunityScreen();
  }
});

// Initialize community screen
function initCommunityScreen() {
  // Create main container
  const communityScreen = document.getElementById('community-screen');
  communityScreen.innerHTML = '';
  
  // Add screen components
  createTabbedInterface(communityScreen);
  createFloatingPostButton(communityScreen);
  
  // Add back button container (initially hidden)
  const backButtonContainer = document.createElement('div');
  backButtonContainer.className = 'back-button-container';
  backButtonContainer.id = 'community-back-button';
  backButtonContainer.style.display = 'none';
  
  const backButton = document.createElement('button');
  backButton.className = 'back-button';
  backButton.innerHTML = '&larr; Back';
  
  backButtonContainer.appendChild(backButton);
  communityScreen.prepend(backButtonContainer);
}

// Create tabbed interface
function createTabbedInterface(container) {
  const tabsContainer = document.createElement('div');
  tabsContainer.className = 'community-tabs';
  
  // Define tabs
  const tabs = [
    { id: 'qa', label: 'Q&A', icon: '❓' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'language', label: 'Language Exchange', icon: '💬' }
  ];
  
  // Create tab buttons
  tabs.forEach((tab, index) => {
    const tabButton = document.createElement('div');
    tabButton.className = index === 0 ? 'community-tab active' : 'community-tab';
    tabButton.id = `community-tab-${tab.id}`;
    
    const tabIcon = document.createElement('span');
    tabIcon.className = 'tab-icon';
    tabIcon.textContent = tab.icon;
    
    const tabLabel = document.createElement('span');
    tabLabel.className = 'tab-label';
    tabLabel.textContent = tab.label;
    
    tabButton.appendChild(tabIcon);
    tabButton.appendChild(tabLabel);
    
    // Add click event
    tabButton.addEventListener('click', () => {
      // Update active tab
      document.querySelectorAll('.community-tab').forEach(t => {
        t.classList.remove('active');
      });
      tabButton.classList.add('active');
      
      // Show corresponding content
      showTabContent(tab.id);
    });
    
    tabsContainer.appendChild(tabButton);
  });
  
  container.appendChild(tabsContainer);
  
  // Create tab content container
  const tabContentContainer = document.createElement('div');
  tabContentContainer.className = 'tab-content-container';
  tabContentContainer.id = 'community-tab-content';
  container.appendChild(tabContentContainer);
  
  // Show default tab (Q&A)
  showTabContent('qa');
}

// Show tab content
function showTabContent(tabId) {
  const tabContentContainer = document.getElementById('community-tab-content');
  
  // Clear previous content
  tabContentContainer.innerHTML = '';
  
  // Show content based on tab
  switch(tabId) {
    case 'qa':
      createQAFeed(tabContentContainer);
      break;
    case 'events':
      createEventsMap(tabContentContainer);
      break;
    case 'language':
      createLanguageExchange(tabContentContainer);
      break;
  }
}

// Create Q&A feed
function createQAFeed(container) {
  const feedContainer = document.createElement('div');
  feedContainer.className = 'qa-feed';
  
  // Sample Q&A data - in a real app, these would come from an API
  const qaItems = [
    {
      id: 1,
      user: {
        name: 'Alex Kim',
        avatar: 'assets/avatars/user1.jpg',
        location: 'Seoul'
      },
      question: 'What documents do I need for an E-7 visa application?',
      details: 'I\'m planning to apply for an E-7 visa next month. Can anyone share what documents I need to prepare?',
      category: 'Visa',
      upvotes: 24,
      replies: 8,
      timeAgo: '2 hours ago'
    },
    {
      id: 2,
      user: {
        name: 'Maria Lopez',
        avatar: 'assets/avatars/user2.jpg',
        location: 'Busan'
      },
      question: 'Best bank for foreigners with minimal Korean?',
      details: 'I just moved to Busan and need to open a bank account. My Korean is very basic. Which bank has the best English service?',
      category: 'Banking',
      upvotes: 18,
      replies: 12,
      timeAgo: '5 hours ago'
    },
    {
      id: 3,
      user: {
        name: 'John Smith',
        avatar: 'assets/avatars/user3.jpg',
        location: 'Incheon'
      },
      question: 'How to find a pet-friendly apartment in Incheon?',
      details: 'I\'m moving to Incheon next month with my dog. Any tips on finding pet-friendly housing?',
      category: 'Housing',
      upvotes: 15,
      replies: 6,
      timeAgo: '1 day ago'
    },
    {
      id: 4,
      user: {
        name: 'Priya Patel',
        avatar: 'assets/avatars/user4.jpg',
        location: 'Daegu'
      },
      question: 'Recommendations for Korean language schools in Daegu?',
      details: 'I want to start learning Korean seriously. Are there any good language schools in Daegu that you\'d recommend?',
      category: 'Language',
      upvotes: 21,
      replies: 9,
      timeAgo: '2 days ago'
    }
  ];
  
  // Create filter options
  const filterContainer = document.createElement('div');
  filterContainer.className = 'qa-filters';
  
  const filterLabel = document.createElement('span');
  filterLabel.className = 'filter-label';
  filterLabel.textContent = 'Filter by:';
  
  const filterSelect = document.createElement('select');
  filterSelect.className = 'filter-select';
  
  ['All Topics', 'Visa', 'Housing', 'Jobs', 'Language', 'Banking', 'Healthcare'].forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.toLowerCase();
    optionElement.textContent = option;
    filterSelect.appendChild(optionElement);
  });
  
  filterContainer.appendChild(filterLabel);
  filterContainer.appendChild(filterSelect);
  container.appendChild(filterContainer);
  
  // Create Q&A items
  qaItems.forEach(item => {
    const qaCard = document.createElement('div');
    qaCard.className = 'qa-card card';
    
    const cardHeader = document.createElement('div');
    cardHeader.className = 'qa-card-header';
    
    const userAvatar = document.createElement('div');
    userAvatar.className = 'user-avatar';
    userAvatar.style.backgroundImage = `url(${item.user.avatar})`;
    
    const userInfo = document.createElement('div');
    userInfo.className = 'user-info';
    
    const userName = document.createElement('div');
    userName.className = 'user-name';
    userName.textContent = item.user.name;
    
    const userLocation = document.createElement('div');
    userLocation.className = 'user-location';
    userLocation.textContent = item.user.location;
    
    const timeAgo = document.createElement('div');
    timeAgo.className = 'time-ago';
    timeAgo.textContent = item.timeAgo;
    
    userInfo.appendChild(userName);
    userInfo.appendChild(userLocation);
    
    cardHeader.appendChild(userAvatar);
    cardHeader.appendChild(userInfo);
    cardHeader.appendChild(timeAgo);
    
    const questionTitle = document.createElement('h3');
    questionTitle.className = 'question-title';
    questionTitle.textContent = item.question;
    
    const questionDetails = document.createElement('p');
    questionDetails.className = 'question-details';
    questionDetails.textContent = item.details;
    
    const cardFooter = document.createElement('div');
    cardFooter.className = 'qa-card-footer';
    
    const categoryBadge = document.createElement('div');
    categoryBadge.className = 'badge badge-accent category-badge';
    categoryBadge.textContent = item.category;
    
    const interactions = document.createElement('div');
    interactions.className = 'interactions';
    
    const upvoteButton = document.createElement('button');
    upvoteButton.className = 'upvote-button';
    upvoteButton.innerHTML = `<span class="upvote-icon">▲</span> <span class="upvote-count">${item.upvotes}</span>`;
    
    const replyButton = document.createElement('button');
    replyButton.className = 'reply-button';
    replyButton.innerHTML = `<span class="reply-icon">💬</span> <span class="reply-count">${item.replies}</span>`;
    
    interactions.appendChild(upvoteButton);
    interactions.appendChild(replyButton);
    
    cardFooter.appendChild(categoryBadge);
    cardFooter.appendChild(interactions);
    
    qaCard.appendChild(cardHeader);
    qaCard.appendChild(questionTitle);
    qaCard.appendChild(questionDetails);
    qaCard.appendChild(cardFooter);
    
    // Add click event
    qaCard.addEventListener('click', () => {
      showQuestionDetails(item);
    });
    
    feedContainer.appendChild(qaCard);
  });
  
  container.appendChild(feedContainer);
}

// Create events map
function createEventsMap(container) {
  const eventsContainer = document.createElement('div');
  eventsContainer.className = 'events-container';
  
  // Create map view toggle
  const viewToggle = document.createElement('div');
  viewToggle.className = 'view-toggle';
  
  const mapViewButton = document.createElement('button');
  mapViewButton.className = 'view-button active';
  mapViewButton.textContent = '🗺️ Map';
  
  const listViewButton = document.createElement('button');
  listViewButton.className = 'view-button';
  listViewButton.textContent = '📋 List';
  
  mapViewButton.addEventListener('click', () => {
    mapViewButton.classList.add('active');
    listViewButton.classList.remove('active');
    mapView.style.display = 'block';
    listView.style.display = 'none';
  });
  
  listViewButton.addEventListener('click', () => {
    listViewButton.classList.add('active');
    mapViewButton.classList.remove('active');
    listView.style.display = 'block';
    mapView.style.display = 'none';
  });
  
  viewToggle.appendChild(mapViewButton);
  viewToggle.appendChild(listViewButton);
  
  eventsContainer.appendChild(viewToggle);
  
  // Create map view
  const mapView = document.createElement('div');
  mapView.className = 'map-view';
  
  const mapImage = document.createElement('div');
  mapImage.className = 'map-image';
  mapImage.style.backgroundImage = 'url(assets/map-seoul.jpg)';
  
  // Sample event pins - in a real app, these would be positioned based on coordinates
  const eventPins = [
    {
      id: 1,
      title: 'Language Exchange Meetup',
      location: 'Hongdae, Seoul',
      date: 'Today, 7:00 PM',
      x: '30%',
      y: '40%'
    },
    {
      id: 2,
      title: 'International Food Festival',
      location: 'Itaewon, Seoul',
      date: 'Tomorrow, 12:00 PM',
      x: '60%',
      y: '45%'
    },
    {
      id: 3,
      title: 'K-Pop Dance Workshop',
      location: 'Gangnam, Seoul',
      date: 'Sat, 3:00 PM',
      x: '70%',
      y: '65%'
    },
    {
      id: 4,
      title: 'Hiking Group: Bukhansan',
      location: 'Bukhansan National Park',
      date: 'Sun, 9:00 AM',
      x: '40%',
      y: '20%'
    }
  ];
  
  // Create event pins on map
  eventPins.forEach(pin => {
    const eventPin = document.createElement('div');
    eventPin.className = 'event-pin';
    eventPin.style.left = pin.x;
    eventPin.style.top = pin.y;
    
    const pinIcon = document.createElement('div');
    pinIcon.className = 'pin-icon';
    pinIcon.textContent = '📍';
    
    const pinPopup = document.createElement('div');
    pinPopup.className = 'pin-popup';
    
    const popupTitle = document.createElement('div');
    popupTitle.className = 'popup-title';
    popupTitle.textContent = pin.title;
    
    const popupDetails = document.createElement('div');
    popupDetails.className = 'popup-details';
    popupDetails.innerHTML = `${pin.date}<br>${pin.location}`;
    
    pinPopup.appendChild(popupTitle);
    pinPopup.appendChild(popupDetails);
    
    eventPin.appendChild(pinIcon);
    eventPin.appendChild(pinPopup);
    
    // Add click event
    eventPin.addEventListener('click', () => {
      showEventDetails(pin);
    });
    
    mapImage.appendChild(eventPin);
  });
  
  mapView.appendChild(mapImage);
  
  // Create list view (initially hidden)
  const listView = document.createElement('div');
  listView.className = 'list-view';
  listView.style.display = 'none';
  
  // Create event list items
  eventPins.forEach(event => {
    const eventItem = document.createElement('div');
    eventItem.className = 'event-list-item card';
    
    const eventTitle = document.createElement('h3');
    eventTitle.className = 'event-title';
    eventTitle.textContent = event.title;
    
    const eventDate = document.createElement('div');
    eventDate.className = 'event-date';
    eventDate.innerHTML = `<strong>When:</strong> ${event.date}`;
    
    const eventLocation = document.createElement('div');
    eventLocation.className = 'event-location';
    eventLocation.innerHTML = `<strong>Where:</strong> ${event.location}`;
    
    const viewButton = document.createElement('button');
    viewButton.className = 'btn btn-primary';
    viewButton.textContent = 'View Details';
    
    viewButton.addEventListener('click', () => {
      showEventDetails(event);
    });
    
    eventItem.appendChild(eventTitle);
    eventItem.appendChild(eventDate);
    eventItem.appendChild(eventLocation);
    eventItem.appendChild(viewButton);
    
    listView.appendChild(eventItem);
  });
  
  eventsContainer.appendChild(mapView);
  eventsContainer.appendChild(listView);
  
  // Add filter for events
  const filterContainer = document.createElement('div');
  filterContainer.className = 'events-filter';
  
  const filterLabel = document.createElement('span');
  filterLabel.className = 'filter-label';
  filterLabel.textContent = 'Filter by:';
  
  const filterSelect = document.createElement('select');
  filterSelect.className = 'filter-select';
  
  ['All Events', 'Today', 'This Week', 'Language', 'Culture', 'Sports', 'Food'].forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.toLowerCase().replace(/\s/g, '-');
    optionElement.textContent = option;
    filterSelect.appendChild(optionElement);
  });
  
  filterContainer.appendChild(filterLabel);
  filterContainer.appendChild(filterSelect);
  
  eventsContainer.prepend(filterContainer);
  
  container.appendChild(eventsContainer);
}

// Create language exchange section
function createLanguageExchange(container) {
  const languageContainer = document.createElement('div');
  languageContainer.className = 'language-exchange-container';
  
  // Create language filter
  const filterContainer = document.createElement('div');
  filterContainer.className = 'language-filter';
  
  const filterLabel = document.createElement('span');
  filterLabel.className = 'filter-label';
  filterLabel.textContent = 'I speak:';
  
  const languageSelect = document.createElement('select');
  languageSelect.className = 'language-select';
  
  ['English', 'Korean', 'Chinese', 'Japanese', 'Spanish', 'French', 'Other'].forEach(language => {
    const option = document.createElement('option');
    option.value = language.toLowerCase();
    option.textContent = language;
    languageSelect.appendChild(option);
  });
  
  const targetLabel = document.createElement('span');
  targetLabel.className = 'filter-label';
  targetLabel.textContent = 'I want to learn:';
  
  const targetSelect = document.createElement('select');
  targetSelect.className = 'language-select';
  
  ['Korean', 'English', 'Chinese', 'Japanese', 'Spanish', 'French', 'Other'].forEach(language => {
    const option = document.createElement('option');
    option.value = language.toLowerCase();
    option.textContent = language;
    targetSelect.appendChild(option);
  });
  
  filterContainer.appendChild(filterLabel);
  filterContainer.appendChild(languageSelect);
  filterContainer.appendChild(targetLabel);
  filterContainer.appendChild(targetSelect);
  
  languageContainer.appendChild(filterContainer);
  
  // Create search button
  const searchButton = document.createElement('button');
  searchButton.className = 'btn btn-primary search-button';
  searchButton.textContent = 'Find Partners';
  
  searchButton.addEventListener('click', () => {
    // In a real app, this would search for language partners
    const speakLanguage = languageSelect.value;
    const learnLanguage = targetSelect.value;
    
    // Show results based on selection
    showLanguagePartners(speakLanguage, learnLanguage);
  });
  
  languageContainer.appendChild(searchButton);
  
  // Create featured partners section
  const featuredSection = document.createElement('div');
  featuredSection.className = 'featured-section';
  
  const sectionTitle = document.createElement('h3');
  sectionTitle.className = 'section-title';
  sectionTitle.textContent = 'Featured Language Partners';
  
  featuredSection.appendChild(sectionTitle);
  
  // Sample language partners - in a real app, these would come from an API
  const partners = [
    {
      id: 1,
      name: 'Min-ji Kim',
      avatar: 'assets/avatars/partner1.jpg',
      speaks: ['Korean', 'English'],
      learning: ['Spanish'],
      location: 'Seoul',
      bio: 'University student majoring in Spanish. Love traveling and cooking!',
      availability: 'Weekends'
    },
    {
      id: 2,
      name: 'Carlos Rodriguez',
      avatar: 'assets/avatars/partner2.jpg',
      speaks: ['Spanish', 'English'],
      learning: ['Korean'],
      location: 'Busan',
      bio: 'Spanish teacher living in Korea for 2 years. Interested in K-dramas and hiking.',
      availability: 'Evenings'
    },
    {
      id: 3,
      name: 'Yuna Park',
      avatar: 'assets/avatars/partner3.jpg',
      speaks: ['Korean', 'Japanese'],
      learning: ['English'],
      location: 'Incheon',
      bio: 'Office worker who loves music and movies. Looking for casual conversation practice.',
      availability: 'Weekdays after 7PM'
    }
  ];
  
  // Create partner cards
  partners.forEach(partner => {
    const partnerCard = document.createElement('div');
    partnerCard.className = 'partner-card card';
    
    const cardHeader = document.createElement('div');
    cardHeader.className = 'partner-card-header';
    
    const partnerAvatar = document.createElement('div');
    partnerAvatar.className = 'partner-avatar';
    partnerAvatar.style.backgroundImage = `url(${partner.avatar})`;
    
    const partnerInfo = document.createElement('div');
    partnerInfo.className = 'partner-info';
    
    const partnerName = document.createElement('div');
    partnerName.className = 'partner-name';
    partnerName.textContent = partner.name;
    
    const partnerLocation = document.createElement('div');
    partnerLocation.className = 'partner-location';
    partnerLocation.textContent = partner.location;
    
    partnerInfo.appendChild(partnerName);
    partnerInfo.appendChild(partnerLocation);
    
    cardHeader.appendChild(partnerAvatar);
    cardHeader.appendChild(partnerInfo);
    
    const languageInfo = document.createElement('div');
    languageInfo.className = 'language-info';
    
    const speaksLabel = document.createElement('div');
    speaksLabel.className = 'language-label';
    speaksLabel.textContent = 'Speaks:';
    
    const speaksLanguages = document.createElement('div');
    speaksLanguages.className = 'language-tags';
    
    partner.speaks.forEach(language => {
      const languageTag = document.createElement('span');
      languageTag.className = 'language-tag';
      languageTag.textContent = language;
      speaksLanguages.appendChild(languageTag);
    });
    
    const learningLabel = document.createElement('div');
    learningLabel.className = 'language-label';
    learningLabel.textContent = 'Learning:';
    
    const learningLanguages = document.createElement('div');
    learningLanguages.className = 'language-tags';
    
    partner.learning.forEach(language => {
      const languageTag = document.createElement('span');
      languageTag.className = 'language-tag learning';
      languageTag.textContent = language;
      learningLanguages.appendChild(languageTag);
    });
    
    languageInfo.appendChild(speaksLabel);
    languageInfo.appendChild(speaksLanguages);
    languageInfo.appendChild(learningLabel);
    languageInfo.appendChild(learningLanguages);
    
    const partnerBio = document.createElement('p');
    partnerBio.className = 'partner-bio';
    partnerBio.textContent = partner.bio;
    
    const availabilityInfo = document.createElement('div');
    availabilityInfo.className = 'availability-info';
    availabilityInfo.innerHTML = `<strong>Available:</strong> ${partner.availability}`;
    
    const contactButton = document.createElement('button');
    contactButton.className = 'btn btn-primary contact-button';
    contactButton.textContent = 'Contact';
    
    contactButton.addEventListener('click', () => {
      // In a real app, this would open a chat with the partner
      alert(`Contacting ${partner.name}...`);
    });
    
    partnerCard.appendChild(cardHeader);
    partnerCard.appendChild(languageInfo);
    partnerCard.appendChild(partnerBio);
    partnerCard.appendChild(availabilityInfo);
    partnerCard.appendChild(contactButton);
    
    featuredSection.appendChild(partnerCard);
  });
  
  languageContainer.appendChild(featuredSection);
  
  // Create upcoming language events section
  const eventsSection = document.createElement('div');
  eventsSection.className = 'language-events-section';
  
  const eventsSectionTitle = document.createElement('h3');
  eventsSectionTitle.className = 'section-title';
  eventsSectionTitle.textContent = 'Upcoming Language Exchange Events';
  
  eventsSection.appendChild(eventsSectionTitle);
  
  // Sample language events - in a real app, these would come from an API
  const events = [
    {
      title: 'English-Korean Language Cafe',
      location: 'Gangnam, Seoul',
      date: 'Tomorrow, 7:00 PM',
      participants: 12
    },
    {
      title: 'Multilingual Mixer',
      location: 'Hongdae, Seoul',
      date: 'Saturday, 6:00 PM',
      participants: 25
    }
  ];
  
  // Create event items
  events.forEach(event => {
    const eventItem = document.createElement('div');
    eventItem.className = 'language-event-item card';
    
    const eventTitle = document.createElement('h4');
    eventTitle.className = 'event-title';
    eventTitle.textContent = event.title;
    
    const eventDetails = document.createElement('div');
    eventDetails.className = 'event-details';
    
    const eventDate = document.createElement('div');
    eventDate.className = 'event-date';
    eventDate.innerHTML = `<strong>When:</strong> ${event.date}`;
    
    const eventLocation = document.createElement('div');
    eventLocation.className = 'event-location';
    eventLocation.innerHTML = `<strong>Where:</strong> ${event.location}`;
    
    const eventParticipants = document.createElement('div');
    eventParticipants.className = 'event-participants';
    eventParticipants.innerHTML = `<strong>Participants:</strong> ${event.participants} people`;
    
    eventDetails.appendChild(eventDate);
    eventDetails.appendChild(eventLocation);
    eventDetails.appendChild(eventParticipants);
    
    const joinButton = document.createElement('button');
    joinButton.className = 'btn btn-primary join-button';
    joinButton.textContent = 'Join Event';
    
    joinButton.addEventListener('click', () => {
      // In a real app, this would register the user for the event
      alert(`Joining ${event.title}...`);
    });
    
    eventItem.appendChild(eventTitle);
    eventItem.appendChild(eventDetails);
    eventItem.appendChild(joinButton);
    
    eventsSection.appendChild(eventItem);
  });
  
  languageContainer.appendChild(eventsSection);
  
  container.appendChild(languageContainer);
}

// Create floating post button
function createFloatingPostButton(container) {
  const fabButton = document.createElement('div');
  fabButton.className = 'fab';
  fabButton.setAttribute('aria-label', 'Create new post');
  
  const fabIcon = document.createElement('span');
  fabIcon.className = 'fab-icon';
  fabIcon.textContent = '+';
  
  fabButton.appendChild(fabIcon);
  
  // Add click event
  fabButton.addEventListener('click', () => {
    showCreatePostModal();
  });
  
  container.appendChild(fabButton);
}

// Show create post modal
function showCreatePostModal() {
  const modal = document.createElement('div');
  modal.className = 'modal create-post-modal';
  
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  
  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';
  
  const headerTitle = document.createElement('h2');
  headerTitle.className = 'header-medium';
  headerTitle.textContent = 'Create New Post';
  
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
  
  // Post type selection
  const postTypeContainer = document.createElement('div');
  postTypeContainer.className = 'post-type-container';
  
  const questionTypeButton = document.createElement('button');
  questionTypeButton.className = 'post-type-button active';
  questionTypeButton.innerHTML = '❓ Question';
  
  const eventTypeButton = document.createElement('button');
  eventTypeButton.className = 'post-type-button';
  eventTypeButton.innerHTML = '📅 Event';
  
  questionTypeButton.addEventListener('click', () => {
    questionTypeButton.classList.add('active');
    eventTypeButton.classList.remove('active');
    questionForm.style.display = 'block';
    eventForm.style.display = 'none';
  });
  
  eventTypeButton.addEventListener('click', () => {
    eventTypeButton.classList.add('active');
    questionTypeButton.classList.remove('active');
    eventForm.style.display = 'block';
    questionForm.style.display = 'none';
  });
  
  postTypeContainer.appendChild(questionTypeButton);
  postTypeContainer.appendChild(eventTypeButton);
  
  // Question form
  const questionForm = document.createElement('form');
  questionForm.className = 'post-form question-form';
  
  const questionTitleInput = document.createElement('input');
  questionTitleInput.type = 'text';
  questionTitleInput.className = 'input-field';
  questionTitleInput.placeholder = 'Your question title';
  questionTitleInput.required = true;
  
  const questionDetailsInput = document.createElement('textarea');
  questionDetailsInput.className = 'input-field';
  questionDetailsInput.placeholder = 'Add details to your question...';
  questionDetailsInput.rows = 5;
  
  const categorySelect = document.createElement('select');
  categorySelect.className = 'input-field';
  
  ['Select a category', 'Visa', 'Housing', 'Jobs', 'Language', 'Banking', 'Healthcare', 'Other'].forEach((category, index) => {
    const option = document.createElement('option');
    option.value = index === 0 ? '' : category.toLowerCase();
    option.textContent = category;
    option.disabled = index === 0;
    option.selected = index === 0;
    categorySelect.appendChild(option);
  });
  
  const questionSubmitButton = document.createElement('button');
  questionSubmitButton.type = 'submit';
  questionSubmitButton.className = 'btn btn-primary submit-button';
  questionSubmitButton.textContent = 'Post Question';
  
  questionForm.appendChild(questionTitleInput);
  questionForm.appendChild(questionDetailsInput);
  questionForm.appendChild(categorySelect);
  questionForm.appendChild(questionSubmitButton);
  
  questionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // In a real app, this would submit the question to the server
    alert('Question posted successfully!');
    document.body.removeChild(modal);
  });
  
  // Event form (initially hidden)
  const eventForm = document.createElement('form');
  eventForm.className = 'post-form event-form';
  eventForm.style.display = 'none';
  
  const eventTitleInput = document.createElement('input');
  eventTitleInput.type = 'text';
  eventTitleInput.className = 'input-field';
  eventTitleInput.placeholder = 'Event title';
  eventTitleInput.required = true;
  
  const eventLocationInput = document.createElement('input');
  eventLocationInput.type = 'text';
  eventLocationInput.className = 'input-field';
  eventLocationInput.placeholder = 'Location';
  eventLocationInput.required = true;
  
  const eventDateInput = document.createElement('input');
  eventDateInput.type = 'date';
  eventDateInput.className = 'input-field';
  eventDateInput.required = true;
  
  const eventTimeInput = document.createElement('input');
  eventTimeInput.type = 'time';
  eventTimeInput.className = 'input-field';
  eventTimeInput.required = true;
  
  const eventDetailsInput = document.createElement('textarea');
  eventDetailsInput.className = 'input-field';
  eventDetailsInput.placeholder = 'Event details...';
  eventDetailsInput.rows = 5;
  
  const eventSubmitButton = document.createElement('button');
  eventSubmitButton.type = 'submit';
  eventSubmitButton.className = 'btn btn-primary submit-button';
  eventSubmitButton.textContent = 'Create Event';
  
  eventForm.appendChild(eventTitleInput);
  eventForm.appendChild(eventLocationInput);
  eventForm.appendChild(eventDateInput);
  eventForm.appendChild(eventTimeInput);
  eventForm.appendChild(eventDetailsInput);
  eventForm.appendChild(eventSubmitButton);
  
  eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // In a real app, this would submit the event to the server
    alert('Event created successfully!');
    document.body.removeChild(modal);
  });
  
  modalBody.appendChild(postTypeContainer);
  modalBody.appendChild(questionForm);
  modalBody.appendChild(eventForm);
  
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modal.appendChild(modalContent);
  
  document.body.appendChild(modal);
}

// Show question details
function showQuestionDetails(question) {
  // Create question details screen
  const questionScreen = document.getElementById('community-question-details-screen') || 
                        document.createElement('div');
  
  if (!questionScreen.id) {
    questionScreen.id = 'community-question-details-screen';
    questionScreen.className = 'community-subscreen';
    document.getElementById('main-app').appendChild(questionScreen);
  }
  
  // Clear previous content
  questionScreen.innerHTML = '';
  
  // Create screen header
  const screenHeader = document.createElement('div');
  screenHeader.className = 'screen-header';
  
  const headerTitle = document.createElement('h1');
  headerTitle.className = 'header-large';
  headerTitle.textContent = 'Question Details';
  
  screenHeader.appendChild(headerTitle);
  questionScreen.appendChild(screenHeader);
  
  // Create question card
  const questionCard = document.createElement('div');
  questionCard.className = 'question-detail-card card';
  
  const cardHeader = document.createElement('div');
  cardHeader.className = 'qa-card-header';
  
  const userAvatar = document.createElement('div');
  userAvatar.className = 'user-avatar';
  userAvatar.style.backgroundImage = `url(${question.user.avatar})`;
  
  const userInfo = document.createElement('div');
  userInfo.className = 'user-info';
  
  const userName = document.createElement('div');
  userName.className = 'user-name';
  userName.textContent = question.user.name;
  
  const userLocation = document.createElement('div');
  userLocation.className = 'user-location';
  userLocation.textContent = question.user.location;
  
  const timeAgo = document.createElement('div');
  timeAgo.className = 'time-ago';
  timeAgo.textContent = question.timeAgo;
  
  userInfo.appendChild(userName);
  userInfo.appendChild(userLocation);
  
  cardHeader.appendChild(userAvatar);
  cardHeader.appendChild(userInfo);
  cardHeader.appendChild(timeAgo);
  
  const questionTitle = document.createElement('h2');
  questionTitle.className = 'question-title';
  questionTitle.textContent = question.question;
  
  const questionDetails = document.createElement('p');
  questionDetails.className = 'question-details';
  questionDetails.textContent = question.details;
  
  const cardFooter = document.createElement('div');
  cardFooter.className = 'qa-card-footer';
  
  const categoryBadge = document.createElement('div');
  categoryBadge.className = 'badge badge-accent category-badge';
  categoryBadge.textContent = question.category;
  
  const interactions = document.createElement('div');
  interactions.className = 'interactions';
  
  const upvoteButton = document.createElement('button');
  upvoteButton.className = 'upvote-button';
  upvoteButton.innerHTML = `<span class="upvote-icon">▲</span> <span class="upvote-count">${question.upvotes}</span>`;
  
  const shareButton = document.createElement('button');
  shareButton.className = 'share-button';
  shareButton.innerHTML = `<span class="share-icon">📤</span> Share`;
  
  interactions.appendChild(upvoteButton);
  interactions.appendChild(shareButton);
  
  cardFooter.appendChild(categoryBadge);
  cardFooter.appendChild(interactions);
  
  questionCard.appendChild(cardHeader);
  questionCard.appendChild(questionTitle);
  questionCard.appendChild(questionDetails);
  questionCard.appendChild(cardFooter);
  
  questionScreen.appendChild(questionCard);
  
  // Create replies section
  const repliesSection = document.createElement('div');
  repliesSection.className = 'replies-section';
  
  const repliesHeader = document.createElement('div');
  repliesHeader.className = 'replies-header';
  
  const repliesTitle = document.createElement('h3');
  repliesTitle.textContent = `Replies (${question.replies})`;
  
  const sortSelect = document.createElement('select');
  sortSelect.className = 'sort-select';
  
  ['Newest First', 'Oldest First', 'Most Upvoted'].forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.toLowerCase().replace(/\s/g, '-');
    optionElement.textContent = option;
    sortSelect.appendChild(optionElement);
  });
  
  repliesHeader.appendChild(repliesTitle);
  repliesHeader.appendChild(sortSelect);
  
  repliesSection.appendChild(repliesHeader);
  
  // Sample replies - in a real app, these would come from an API
  const replies = [
    {
      user: {
        name: 'David Chen',
        avatar: 'assets/avatars/user5.jpg'
      },
      content: 'For an E-7 visa, you\'ll need: employment contract, company registration certificate, your diploma, and passport photos. The exact requirements can vary based on your specific job category.',
      upvotes: 12,
      timeAgo: '1 hour ago'
    },
    {
      user: {
        name: 'Sarah Kim',
        avatar: 'assets/avatars/user6.jpg'
      },
      content: 'I just went through this process last month. In addition to what David mentioned, you\'ll also need your resume, a criminal background check from your home country, and sometimes reference letters. I recommend checking the Hi Korea website for the most up-to-date information.',
      upvotes: 8,
      timeAgo: '2 hours ago'
    }
  ];
  
  // Create reply cards
  replies.forEach(reply => {
    const replyCard = document.createElement('div');
    replyCard.className = 'reply-card card';
    
    const replyHeader = document.createElement('div');
    replyHeader.className = 'reply-header';
    
    const userAvatar = document.createElement('div');
    userAvatar.className = 'user-avatar small';
    userAvatar.style.backgroundImage = `url(${reply.user.avatar})`;
    
    const userName = document.createElement('div');
    userName.className = 'user-name';
    userName.textContent = reply.user.name;
    
    const timeAgo = document.createElement('div');
    timeAgo.className = 'time-ago';
    timeAgo.textContent = reply.timeAgo;
    
    replyHeader.appendChild(userAvatar);
    replyHeader.appendChild(userName);
    replyHeader.appendChild(timeAgo);
    
    const replyContent = document.createElement('p');
    replyContent.className = 'reply-content';
    replyContent.textContent = reply.content;
    
    const replyFooter = document.createElement('div');
    replyFooter.className = 'reply-footer';
    
    const upvoteButton = document.createElement('button');
    upvoteButton.className = 'upvote-button small';
    upvoteButton.innerHTML = `<span class="upvote-icon">▲</span> <span class="upvote-count">${reply.upvotes}</span>`;
    
    const replyButton = document.createElement('button');
    replyButton.className = 'reply-button small';
    replyButton.textContent = 'Reply';
    
    replyFooter.appendChild(upvoteButton);
    replyFooter.appendChild(replyButton);
    
    replyCard.appendChild(replyHeader);
    replyCard.appendChild(replyContent);
    replyCard.appendChild(replyFooter);
    
    repliesSection.appendChild(replyCard);
  });
  
  // Create reply input
  const replyInput = document.createElement('div');
  replyInput.className = 'reply-input';
  
  const textArea = document.createElement('textarea');
  textArea.className = 'input-field';
  textArea.placeholder = 'Write your reply...';
  textArea.rows = 3;
  
  const submitButton = document.createElement('button');
  submitButton.className = 'btn btn-primary submit-button';
  submitButton.textContent = 'Post Reply';
  
  submitButton.addEventListener('click', () => {
    if (textArea.value.trim()) {
      // In a real app, this would submit the reply to the server
      alert('Reply posted successfully!');
      textArea.value = '';
    }
  });
  
  replyInput.appendChild(textArea);
  replyInput.appendChild(submitButton);
  
  repliesSection.appendChild(replyInput);
  questionScreen.appendChild(repliesSection);
  
  // Navigate to question details screen
  window.KonnectNavigation.navigateToScreen('community', 'community-question-details-screen');
}

// Show event details
function showEventDetails(event) {
  // Create event details screen
  const eventScreen = document.getElementById('community-event-details-screen') || 
                     document.createElement('div');
  
  if (!eventScreen.id) {
    eventScreen.id = 'community-event-details-screen';
    eventScreen.className = 'community-subscreen';
    document.getElementById('main-app').appendChild(eventScreen);
  }
  
  // Clear previous content
  eventScreen.innerHTML = '';
  
  // Create screen header
  const screenHeader = document.createElement('div');
  screenHeader.className = 'screen-header';
  
  const headerTitle = document.createElement('h1');
  headerTitle.className = 'header-large';
  headerTitle.textContent = 'Event Details';
  
  screenHeader.appendChild(headerTitle);
  eventScreen.appendChild(screenHeader);
  
  // Create event card
  const eventCard = document.createElement('div');
  eventCard.className = 'event-detail-card card';
  
  const eventTitle = document.createElement('h2');
  eventTitle.className = 'event-title';
  eventTitle.textContent = event.title;
  
  const eventImage = document.createElement('div');
  eventImage.className = 'event-image';
  eventImage.style.backgroundImage = 'url(assets/events/event-default.jpg)';
  
  const eventDetails = document.createElement('div');
  eventDetails.className = 'event-details';
  
  const eventDate = document.createElement('div');
  eventDate.className = 'event-detail-item';
  eventDate.innerHTML = `<strong>When:</strong> ${event.date}`;
  
  const eventLocation = document.createElement('div');
  eventLocation.className = 'event-detail-item';
  eventLocation.innerHTML = `<strong>Where:</strong> ${event.location}`;
  
  const eventOrganizer = document.createElement('div');
  eventOrganizer.className = 'event-detail-item';
  eventOrganizer.innerHTML = '<strong>Organizer:</strong> Konnect Community';
  
  const eventParticipants = document.createElement('div');
  eventParticipants.className = 'event-detail-item';
  eventParticipants.innerHTML = '<strong>Participants:</strong> 15 going, 8 interested';
  
  eventDetails.appendChild(eventDate);
  eventDetails.appendChild(eventLocation);
  eventDetails.appendChild(eventOrganizer);
  eventDetails.appendChild(eventParticipants);
  
  const eventDescription = document.createElement('div');
  eventDescription.className = 'event-description';
  
  const descriptionTitle = document.createElement('h3');
  descriptionTitle.textContent = 'Description';
  
  const descriptionText = document.createElement('p');
  descriptionText.textContent = 'Join us for this community event! It\'s a great opportunity to meet new people, practice languages, and learn about different cultures. All levels are welcome, from beginners to advanced speakers.';
  
  eventDescription.appendChild(descriptionTitle);
  eventDescription.appendChild(descriptionText);
  
  const eventActions = document.createElement('div');
  eventActions.className = 'event-actions';
  
  const joinButton = document.createElement('button');
  joinButton.className = 'btn btn-primary';
  joinButton.textContent = 'Join Event';
  
  const interestedButton = document.createElement('button');
  interestedButton.className = 'btn btn-outline';
  interestedButton.textContent = 'Interested';
  
  const shareButton = document.createElement('button');
  shareButton.className = 'btn btn-outline';
  shareButton.textContent = 'Share';
  
  eventActions.appendChild(joinButton);
  eventActions.appendChild(interestedButton);
  eventActions.appendChild(shareButton);
  
  eventCard.appendChild(eventTitle);
  eventCard.appendChild(eventImage);
  eventCard.appendChild(eventDetails);
  eventCard.appendChild(eventDescription);
  eventCard.appendChild(eventActions);
  
  eventScreen.appendChild(eventCard);
  
  // Create map section
  const mapSection = document.createElement('div');
  mapSection.className = 'event-map-section';
  
  const mapTitle = document.createElement('h3');
  mapTitle.textContent = 'Location';
  
  const mapContainer = document.createElement('div');
  mapContainer.className = 'event-map-container';
  mapContainer.style.backgroundImage = 'url(assets/map-location.jpg)';
  
  mapSection.appendChild(mapTitle);
  mapSection.appendChild(mapContainer);
  
  eventScreen.appendChild(mapSection);
  
  // Create attendees section
  const attendeesSection = document.createElement('div');
  attendeesSection.className = 'attendees-section';
  
  const attendeesTitle = document.createElement('h3');
  attendeesTitle.textContent = 'Attendees';
  
  const attendeesList = document.createElement('div');
  attendeesList.className = 'attendees-list';
  
  // Sample attendees - in a real app, these would come from an API
  const attendees = [
    { name: 'Min-ji Kim', avatar: 'assets/avatars/user1.jpg' },
    { name: 'John Smith', avatar: 'assets/avatars/user3.jpg' },
    { name: 'Sarah Lee', avatar: 'assets/avatars/user6.jpg' },
    { name: 'David Chen', avatar: 'assets/avatars/user5.jpg' }
  ];
  
  attendees.forEach(attendee => {
    const attendeeItem = document.createElement('div');
    attendeeItem.className = 'attendee-item';
    
    const attendeeAvatar = document.createElement('div');
    attendeeAvatar.className = 'attendee-avatar';
    attendeeAvatar.style.backgroundImage = `url(${attendee.avatar})`;
    
    const attendeeName = document.createElement('div');
    attendeeName.className = 'attendee-name';
    attendeeName.textContent = attendee.name;
    
    attendeeItem.appendChild(attendeeAvatar);
    attendeeItem.appendChild(attendeeName);
    
    attendeesList.appendChild(attendeeItem);
  });
  
  // Add "See All" button
  const seeAllButton = document.createElement('button');
  seeAllButton.className = 'see-all-button';
  seeAllButton.textContent = 'See All Attendees';
  
  attendeesSection.appendChild(attendeesTitle);
  attendeesSection.appendChild(attendeesList);
  attendeesSection.appendChild(seeAllButton);
  
  eventScreen.appendChild(attendeesSection);
  
  // Navigate to event details screen
  window.KonnectNavigation.navigateToScreen('community', 'community-event-details-screen');
}

// Show language partners based on selection
function showLanguagePartners(speakLanguage, learnLanguage) {
  // In a real app, this would fetch partners from an API based on language preferences
  console.log(`Finding partners who speak ${learnLanguage} and want to learn ${speakLanguage}`);
  
  // Create language partners screen
  const partnersScreen = document.getElementById('community-language-partners-screen') || 
                        document.createElement('div');
  
  if (!partnersScreen.id) {
    partnersScreen.id = 'community-language-partners-screen';
    partnersScreen.className = 'community-subscreen';
    document.getElementById('main-app').appendChild(partnersScreen);
  }
  
  // Clear previous content
  partnersScreen.innerHTML = '';
  
  // Create screen header
  const screenHeader = document.createElement('div');
  screenHeader.className = 'screen-header';
  
  const headerTitle = document.createElement('h1');
  headerTitle.className = 'header-large';
  headerTitle.textContent = 'Language Partners';
  
  screenHeader.appendChild(headerTitle);
  partnersScreen.appendChild(screenHeader);
  
  // Create search results info
  const resultsInfo = document.createElement('div');
  resultsInfo.className = 'results-info';
  resultsInfo.textContent = `Showing partners who speak ${learnLanguage} and want to learn ${speakLanguage}`;
  
  partnersScreen.appendChild(resultsInfo);
  
  // Create partners list
  const partnersList = document.createElement('div');
  partnersList.className = 'partners-list';
  
  // Sample partners - in a real app, these would be filtered based on language preferences
  const partners = [
    {
      id: 1,
      name: 'Min-ji Kim',
      avatar: 'assets/avatars/partner1.jpg',
      speaks: ['Korean', 'English'],
      learning: ['Spanish'],
      location: 'Seoul',
      bio: 'University student majoring in Spanish. Love traveling and cooking!',
      availability: 'Weekends'
    },
    {
      id: 4,
      name: 'Thomas Wilson',
      avatar: 'assets/avatars/partner4.jpg',
      speaks: ['English', 'French'],
      learning: ['Korean'],
      location: 'Seoul',
      bio: 'English teacher from Canada. Been in Korea for 6 months and loving it!',
      availability: 'Weekday evenings'
    },
    {
      id: 5,
      name: 'Ji-hoon Park',
      avatar: 'assets/avatars/partner5.jpg',
      speaks: ['Korean'],
      learning: ['English', 'Chinese'],
      location: 'Daejeon',
      bio: 'Software developer interested in international cultures. Happy to help with Korean language.',
      availability: 'Flexible'
    }
  ];
  
  // Create partner cards
  partners.forEach(partner => {
    const partnerCard = document.createElement('div');
    partnerCard.className = 'partner-card card';
    
    const cardHeader = document.createElement('div');
    cardHeader.className = 'partner-card-header';
    
    const partnerAvatar = document.createElement('div');
    partnerAvatar.className = 'partner-avatar';
    partnerAvatar.style.backgroundImage = `url(${partner.avatar})`;
    
    const partnerInfo = document.createElement('div');
    partnerInfo.className = 'partner-info';
    
    const partnerName = document.createElement('div');
    partnerName.className = 'partner-name';
    partnerName.textContent = partner.name;
    
    const partnerLocation = document.createElement('div');
    partnerLocation.className = 'partner-location';
    partnerLocation.textContent = partner.location;
    
    partnerInfo.appendChild(partnerName);
    partnerInfo.appendChild(partnerLocation);
    
    cardHeader.appendChild(partnerAvatar);
    cardHeader.appendChild(partnerInfo);
    
    const languageInfo = document.createElement('div');
    languageInfo.className = 'language-info';
    
    const speaksLabel = document.createElement('div');
    speaksLabel.className = 'language-label';
    speaksLabel.textContent = 'Speaks:';
    
    const speaksLanguages = document.createElement('div');
    speaksLanguages.className = 'language-tags';
    
    partner.speaks.forEach(language => {
      const languageTag = document.createElement('span');
      languageTag.className = 'language-tag';
      languageTag.textContent = language;
      speaksLanguages.appendChild(languageTag);
    });
    
    const learningLabel = document.createElement('div');
    learningLabel.className = 'language-label';
    learningLabel.textContent = 'Learning:';
    
    const learningLanguages = document.createElement('div');
    learningLanguages.className = 'language-tags';
    
    partner.learning.forEach(language => {
      const languageTag = document.createElement('span');
      languageTag.className = 'language-tag learning';
      languageTag.textContent = language;
      learningLanguages.appendChild(languageTag);
    });
    
    languageInfo.appendChild(speaksLabel);
    languageInfo.appendChild(speaksLanguages);
    languageInfo.appendChild(learningLabel);
    languageInfo.appendChild(learningLanguages);
    
    const partnerBio = document.createElement('p');
    partnerBio.className = 'partner-bio';
    partnerBio.textContent = partner.bio;
    
    const availabilityInfo = document.createElement('div');
    availabilityInfo.className = 'availability-info';
    availabilityInfo.innerHTML = `<strong>Available:</strong> ${partner.availability}`;
    
    const contactButton = document.createElement('button');
    contactButton.className = 'btn btn-primary contact-button';
    contactButton.textContent = 'Contact';
    
    contactButton.addEventListener('click', () => {
      // In a real app, this would open a chat with the partner
      alert(`Contacting ${partner.name}...`);
    });
    
    partnerCard.appendChild(cardHeader);
    partnerCard.appendChild(languageInfo);
    partnerCard.appendChild(partnerBio);
    partnerCard.appendChild(availabilityInfo);
    partnerCard.appendChild(contactButton);
    
    partnersList.appendChild(partnerCard);
  });
  
  partnersScreen.appendChild(partnersList);
  
  // Navigate to language partners screen
  window.KonnectNavigation.navigateToScreen('community', 'community-language-partners-screen');
}

// Export for use in other modules
window.CommunityScreen = {
  init: initCommunityScreen
};
