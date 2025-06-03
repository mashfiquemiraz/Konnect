// Navigation Structure for Konnect App

document.addEventListener('DOMContentLoaded', () => {
  // Initialize navigation after main app is loaded
  if (document.getElementById('main-app').style.display === 'block') {
    initNavigation();
  }
});

// Global navigation state
const navigationState = {
  currentTab: 'home',
  tabOrder: ['home', 'services', 'discover', 'community', 'profile'],
  history: {
    home: [],
    services: [],
    discover: [],
    community: [],
    profile: []
  }
};

// Initialize navigation
function initNavigation() {
  // Get tab order from local storage if available (set during onboarding)
  const storedTabOrder = localStorage.getItem('tabOrder');
  if (storedTabOrder) {
    navigationState.tabOrder = JSON.parse(storedTabOrder);
  }
  
  // Create bottom tab bar
  createTabBar();
  
  // Set initial tab
  switchToTab('home');
  
  // Add event listeners for back buttons
  setupBackButtonListeners();
}

// Create bottom tab bar with emoji-style icons
function createTabBar() {
  const tabBar = document.getElementById('tab-bar');
  
  // Clear any existing content
  tabBar.innerHTML = '';
  
  // Tab configurations with emoji icons
  const tabConfigs = {
    home: { icon: '🏠', label: 'Home' },
    services: { icon: '🛎️', label: 'Services' },
    discover: { icon: '🔍', label: 'Discover' },
    community: { icon: '💬', label: 'Community' },
    profile: { icon: '👤', label: 'Profile' }
  };
  
  // Create tabs in the order specified in navigationState
  navigationState.tabOrder.forEach(tabId => {
    const config = tabConfigs[tabId];
    
    const tabItem = document.createElement('div');
    tabItem.className = 'tab-item';
    tabItem.id = `tab-${tabId}`;
    tabItem.setAttribute('role', 'button');
    tabItem.setAttribute('aria-label', config.label);
    
    const tabIcon = document.createElement('div');
    tabIcon.className = 'tab-icon';
    tabIcon.textContent = config.icon;
    
    const tabLabel = document.createElement('div');
    tabLabel.className = 'tab-label';
    tabLabel.textContent = config.label;
    
    tabItem.appendChild(tabIcon);
    tabItem.appendChild(tabLabel);
    
    // Add click event
    tabItem.addEventListener('click', () => {
      switchToTab(tabId);
    });
    
    tabBar.appendChild(tabItem);
  });
}

// Switch to specified tab
function switchToTab(tabId) {
  // Don't switch if already on this tab
  if (tabId === navigationState.currentTab) return;
  
  // Hide all content screens
  document.querySelectorAll('.content-screen').forEach(screen => {
    screen.style.display = 'none';
  });
  
  // Show selected content screen
  const selectedScreen = document.getElementById(`${tabId}-screen`);
  if (selectedScreen) {
    selectedScreen.style.display = 'block';
    
    // Add entrance animation
    selectedScreen.classList.add('screen-enter');
    setTimeout(() => {
      selectedScreen.classList.remove('screen-enter');
    }, 500);
  }
  
  // Update tab bar UI
  document.querySelectorAll('.tab-item').forEach(tab => {
    tab.classList.remove('active');
  });
  
  const activeTab = document.getElementById(`tab-${tabId}`);
  if (activeTab) {
    activeTab.classList.add('active');
    
    // Add pop animation to icon
    const tabIcon = activeTab.querySelector('.tab-icon');
    tabIcon.classList.add('pop-animation');
    setTimeout(() => {
      tabIcon.classList.remove('pop-animation');
    }, 500);
  }
  
  // Update current tab in state
  navigationState.currentTab = tabId;
  
  // Load content for the tab if needed
  loadTabContent(tabId);
}

// Load content for specific tab
function loadTabContent(tabId) {
  switch(tabId) {
    case 'home':
      loadHomeContent();
      break;
    case 'services':
      loadServicesContent();
      break;
    case 'discover':
      loadDiscoverContent();
      break;
    case 'community':
      loadCommunityContent();
      break;
    case 'profile':
      loadProfileContent();
      break;
  }
}

// Navigate to a specific screen within a tab
function navigateToScreen(tabId, screenId, data = {}) {
  // Switch to the tab first if not already there
  if (navigationState.currentTab !== tabId) {
    switchToTab(tabId);
  }
  
  // Hide the main tab screen
  const mainScreen = document.getElementById(`${tabId}-screen`);
  if (mainScreen) {
    mainScreen.style.display = 'none';
  }
  
  // Show the specific screen
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    // Pass data to the screen if needed
    if (targetScreen.setupScreen && typeof targetScreen.setupScreen === 'function') {
      targetScreen.setupScreen(data);
    }
    
    targetScreen.style.display = 'block';
    
    // Add to navigation history
    navigationState.history[tabId].push({
      screenId,
      data
    });
    
    // Show back button
    showBackButton(tabId);
  }
}

// Go back to previous screen
function goBack() {
  const currentTab = navigationState.currentTab;
  const history = navigationState.history[currentTab];
  
  // If there's history, go back
  if (history.length > 0) {
    // Remove current screen from history
    history.pop();
    
    // If history is empty, go back to main tab screen
    if (history.length === 0) {
      // Hide all screens in this tab
      document.querySelectorAll(`.${currentTab}-subscreen`).forEach(screen => {
        screen.style.display = 'none';
      });
      
      // Show main tab screen
      const mainScreen = document.getElementById(`${currentTab}-screen`);
      if (mainScreen) {
        mainScreen.style.display = 'block';
      }
      
      // Hide back button
      hideBackButton(currentTab);
    } else {
      // Go to previous screen in history
      const prevScreen = history[history.length - 1];
      
      // Hide all screens in this tab
      document.querySelectorAll(`.${currentTab}-subscreen`).forEach(screen => {
        screen.style.display = 'none';
      });
      
      // Show previous screen
      const targetScreen = document.getElementById(prevScreen.screenId);
      if (targetScreen) {
        // Pass data to the screen if needed
        if (targetScreen.setupScreen && typeof targetScreen.setupScreen === 'function') {
          targetScreen.setupScreen(prevScreen.data);
        }
        
        targetScreen.style.display = 'block';
      }
    }
  }
}

// Show back button for a tab
function showBackButton(tabId) {
  const backButton = document.getElementById(`${tabId}-back-button`);
  if (backButton) {
    backButton.style.display = 'flex';
  }
}

// Hide back button for a tab
function hideBackButton(tabId) {
  const backButton = document.getElementById(`${tabId}-back-button`);
  if (backButton) {
    backButton.style.display = 'none';
  }
}

// Setup back button listeners
function setupBackButtonListeners() {
  // Add listeners for each tab's back button
  ['home', 'services', 'discover', 'community', 'profile'].forEach(tabId => {
    const backButton = document.getElementById(`${tabId}-back-button`);
    if (backButton) {
      backButton.addEventListener('click', goBack);
    }
  });
}

// Create contextual back button
function createBackButton(container, tabId) {
  const backButton = document.createElement('button');
  backButton.className = 'back-button';
  backButton.id = `${tabId}-back-button`;
  backButton.setAttribute('aria-label', 'Go back');
  
  const backIcon = document.createElement('span');
  backIcon.className = 'back-icon';
  backIcon.innerHTML = '&#8592;'; // Left arrow
  
  backButton.appendChild(backIcon);
  
  // Initially hidden
  backButton.style.display = 'none';
  
  // Add click event
  backButton.addEventListener('click', goBack);
  
  container.appendChild(backButton);
}

// Placeholder functions for loading tab content
// These will be implemented in screen-specific JS files
function loadHomeContent() {
  console.log('Loading Home content');
  // Implementation will be in home-screen.js
}

function loadServicesContent() {
  console.log('Loading Services content');
  // Implementation will be in services-screen.js
}

function loadDiscoverContent() {
  console.log('Loading Discover content');
  // Implementation will be in discover-screen.js
}

function loadCommunityContent() {
  console.log('Loading Community content');
  // Implementation will be in community-screen.js
}

function loadProfileContent() {
  console.log('Loading Profile content');
  // Implementation will be in profile-screen.js
}

// Export navigation functions for use in other modules
window.KonnectNavigation = {
  switchToTab,
  navigateToScreen,
  goBack
};
