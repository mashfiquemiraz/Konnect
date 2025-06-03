// Main JavaScript file for Konnect App

document.addEventListener('DOMContentLoaded', () => {
  // Initialize app
  initApp();
});

// Initialize app
function initApp() {
  console.log("Initializing Konnect App");
  
  // Create main app container if it doesn't exist
  if (!document.getElementById('main-app')) {
    const mainApp = document.createElement('div');
    mainApp.id = 'main-app';
    document.body.appendChild(mainApp);
  }
  
  // Initialize navigation
  initNavigation();
  
  // Start with opening animation
  showOpeningAnimation();
}

// Initialize navigation
function initNavigation() {
  // Create navigation object
  window.KonnectNavigation = {
    // Current tab
    currentTab: null,
    
    // Current screen within tab
    currentScreen: null,
    
    // Switch to tab
    switchToTab: function(tabId) {
      console.log(`Switching to tab: ${tabId}`);
      
      // Hide all screens
      document.querySelectorAll('[id$="-screen"]').forEach(screen => {
        screen.style.display = 'none';
      });
      
      // Show selected tab screen
      const tabScreen = document.getElementById(`${tabId}-screen`);
      if (tabScreen) {
        tabScreen.style.display = 'block';
        
        // Initialize screen if needed
        if (window[`${capitalizeFirstLetter(tabId)}Screen`] && 
            typeof window[`${capitalizeFirstLetter(tabId)}Screen`].init === 'function') {
          window[`${capitalizeFirstLetter(tabId)}Screen`].init();
        }
      }
      
      // Update active tab
      document.querySelectorAll('.tab-item').forEach(tab => {
        tab.classList.remove('active');
      });
      
      const tabElement = document.getElementById(`tab-${tabId}`);
      if (tabElement) {
        tabElement.classList.add('active');
      }
      
      // Update current tab
      this.currentTab = tabId;
      this.currentScreen = `${tabId}-screen`;
    },
    
    // Navigate to screen within tab
    navigateToScreen: function(tabId, screenId, data) {
      console.log(`Navigating to screen: ${screenId} in tab: ${tabId}`);
      
      // Switch to tab first if needed
      if (this.currentTab !== tabId) {
        this.switchToTab(tabId);
      }
      
      // Hide all screens in this tab
      document.querySelectorAll(`[id^="${tabId}-"][id$="-screen"]`).forEach(screen => {
        screen.style.display = 'none';
      });
      
      // Show selected screen
      const screen = document.getElementById(screenId);
      if (screen) {
        screen.style.display = 'block';
        
        // Show back button
        const backButton = document.getElementById(`${tabId}-back-button`);
        if (backButton) {
          backButton.style.display = 'block';
          
          // Set back button action
          const backButtonElement = backButton.querySelector('.back-button');
          if (backButtonElement) {
            backButtonElement.onclick = () => {
              this.goBack(tabId);
            };
          }
        }
      }
      
      // Update current screen
      this.currentScreen = screenId;
    },
    
    // Go back to main tab screen
    goBack: function(tabId) {
      console.log(`Going back in tab: ${tabId}`);
      
      // Hide all screens in this tab
      document.querySelectorAll(`[id^="${tabId}-"][id$="-screen"]`).forEach(screen => {
        screen.style.display = 'none';
      });
      
      // Show main tab screen
      const tabScreen = document.getElementById(`${tabId}-screen`);
      if (tabScreen) {
        tabScreen.style.display = 'block';
      }
      
      // Hide back button
      const backButton = document.getElementById(`${tabId}-back-button`);
      if (backButton) {
        backButton.style.display = 'none';
      }
      
      // Update current screen
      this.currentScreen = `${tabId}-screen`;
    }
  };
  
  // Create tab bar
  createTabBar();
}

// Create tab bar
function createTabBar() {
  // Create tab bar container
  const tabBar = document.createElement('div');
  tabBar.className = 'tab-bar';
  
  // Define tabs
  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'services', label: 'Services', icon: '🛠️' },
    { id: 'discover', label: 'Discover', icon: '🔍' },
    { id: 'community', label: 'Community', icon: '👥' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];
  
  // Create tab items
  tabs.forEach(tab => {
    const tabItem = document.createElement('div');
    tabItem.className = 'tab-item';
    tabItem.id = `tab-${tab.id}`;
    
    const tabIcon = document.createElement('div');
    tabIcon.className = 'tab-icon';
    tabIcon.textContent = tab.icon;
    
    const tabLabel = document.createElement('div');
    tabLabel.className = 'tab-label';
    tabLabel.textContent = tab.label;
    
    tabItem.appendChild(tabIcon);
    tabItem.appendChild(tabLabel);
    
    // Add click event
    tabItem.addEventListener('click', () => {
      window.KonnectNavigation.switchToTab(tab.id);
    });
    
    tabBar.appendChild(tabItem);
    
    // Create screen for this tab if it doesn't exist
    if (!document.getElementById(`${tab.id}-screen`)) {
      const screen = document.createElement('div');
      screen.id = `${tab.id}-screen`;
      screen.className = 'screen';
      screen.style.display = 'none';
      document.getElementById('main-app').appendChild(screen);
    }
  });
  
  // Add tab bar to app
  document.getElementById('main-app').appendChild(tabBar);
}

// Show opening animation
function showOpeningAnimation() {
  console.log("Showing opening animation");
  
  // Create animation container
  const animationContainer = document.createElement('div');
  animationContainer.id = 'opening-animation';
  animationContainer.className = 'opening-animation';
  
  // Add animation elements
  const globe = document.createElement('div');
  globe.className = 'globe';
  
  const korea = document.createElement('div');
  korea.className = 'korea';
  
  const lines = document.createElement('div');
  lines.className = 'lines';
  
  // Create 5 arcing lines
  for (let i = 0; i < 5; i++) {
    const line = document.createElement('div');
    line.className = `line line-${i + 1}`;
    lines.appendChild(line);
  }
  
  const logo = document.createElement('div');
  logo.className = 'logo';
  logo.textContent = 'Konnect';
  
  const tagline = document.createElement('div');
  tagline.className = 'tagline';
  tagline.textContent = 'Your Home Away From Home';
  
  const swipeIndicator = document.createElement('div');
  swipeIndicator.className = 'swipe-indicator';
  swipeIndicator.innerHTML = '⬆️ Swipe Up';
  
  // Add elements to container
  globe.appendChild(korea);
  animationContainer.appendChild(globe);
  animationContainer.appendChild(lines);
  animationContainer.appendChild(logo);
  animationContainer.appendChild(tagline);
  animationContainer.appendChild(swipeIndicator);
  
  // Add container to app
  document.getElementById('main-app').appendChild(animationContainer);
  
  // Add swipe event
  animationContainer.addEventListener('click', () => {
    // Remove animation container
    document.getElementById('main-app').removeChild(animationContainer);
    
    // Show onboarding
    showOnboarding();
  });
  
  // Auto-advance after 5 seconds
  setTimeout(() => {
    if (document.getElementById('opening-animation')) {
      // Remove animation container
      document.getElementById('main-app').removeChild(animationContainer);
      
      // Show onboarding
      showOnboarding();
    }
  }, 5000);
}

// Show onboarding
function showOnboarding() {
  console.log("Showing onboarding");
  
  // Check if user has completed onboarding
  if (localStorage.getItem('onboarding_completed') === 'true') {
    // Skip to home screen
    showHomeScreen();
    return;
  }
  
  // Create onboarding container
  const onboardingContainer = document.createElement('div');
  onboardingContainer.id = 'onboarding-container';
  onboardingContainer.className = 'onboarding-container';
  
  // Create language selection screen
  const languageScreen = document.createElement('div');
  languageScreen.className = 'onboarding-screen language-screen';
  
  const languageTitle = document.createElement('h1');
  languageTitle.className = 'header-large';
  languageTitle.textContent = 'Choose Your Language';
  
  const languageGrid = document.createElement('div');
  languageGrid.className = 'language-grid';
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' }
  ];
  
  languages.forEach(language => {
    const languageButton = document.createElement('div');
    languageButton.className = 'language-button';
    
    const languageFlag = document.createElement('div');
    languageFlag.className = 'language-flag';
    languageFlag.textContent = language.flag;
    
    const languageName = document.createElement('div');
    languageName.className = 'language-name';
    languageName.textContent = language.name;
    
    languageButton.appendChild(languageFlag);
    languageButton.appendChild(languageName);
    
    // Add click event
    languageButton.addEventListener('click', () => {
      // Save selected language
      localStorage.setItem('selected_language', language.code);
      
      // Show quiz screen
      showQuizScreen(onboardingContainer);
    });
    
    languageGrid.appendChild(languageButton);
  });
  
  languageScreen.appendChild(languageTitle);
  languageScreen.appendChild(languageGrid);
  
  onboardingContainer.appendChild(languageScreen);
  document.getElementById('main-app').appendChild(onboardingContainer);
}

// Show quiz screen
function showQuizScreen(container) {
  console.log("Showing quiz screen");
  
  // Clear container
  container.innerHTML = '';
  
  // Create quiz screen
  const quizScreen = document.createElement('div');
  quizScreen.className = 'onboarding-screen quiz-screen';
  
  // Define quiz questions
  const quizQuestions = [
    {
      id: 'purpose',
      question: 'What brings you to Korea?',
      options: [
        { value: 'work', label: 'Work', icon: '💼' },
        { value: 'study', label: 'Study', icon: '🎓' },
        { value: 'travel', label: 'Travel', icon: '✈️' },
        { value: 'living', label: 'Living', icon: '🏠' }
      ]
    },
    {
      id: 'needs',
      question: 'What are your top 3 needs?',
      options: [
        { value: 'visa', label: 'Visa Help', icon: '🛂' },
        { value: 'housing', label: 'Housing', icon: '🏢' },
        { value: 'language', label: 'Language', icon: '💬' },
        { value: 'banking', label: 'Banking', icon: '💰' },
        { value: 'healthcare', label: 'Healthcare', icon: '🏥' },
        { value: 'community', label: 'Community', icon: '👥' }
      ],
      multiSelect: true,
      maxSelections: 3
    },
    {
      id: 'city',
      question: 'Where are you currently?',
      options: [
        { value: 'seoul', label: 'Seoul', icon: '🌆' },
        { value: 'busan', label: 'Busan', icon: '🌊' },
        { value: 'incheon', label: 'Incheon', icon: '✈️' },
        { value: 'daegu', label: 'Daegu', icon: '🏙️' },
        { value: 'other', label: 'Other', icon: '📍' }
      ]
    },
    {
      id: 'tech',
      question: 'How comfortable are you with technology?',
      options: [
        { value: 'beginner', label: 'Beginner', icon: '🐣' },
        { value: 'intermediate', label: 'Intermediate', icon: '👍' },
        { value: 'advanced', label: 'Advanced', icon: '💻' },
        { value: 'expert', label: 'Tech Expert', icon: '🚀' }
      ]
    },
    {
      id: 'premium',
      question: 'Would you like to try Premium?',
      options: [
        { value: 'premium', label: 'Try Premium', icon: '⭐' },
        { value: 'basic', label: 'Stay Basic', icon: '👌' },
        { value: 'later', label: 'Decide Later', icon: '⏱️' }
      ]
    }
  ];
  
  // Current question index
  let currentQuestionIndex = 0;
  
  // User answers
  const userAnswers = {};
  
  // Show question
  function showQuestion(index) {
    // Clear quiz screen
    quizScreen.innerHTML = '';
    
    const question = quizQuestions[index];
    
    const questionTitle = document.createElement('h2');
    questionTitle.className = 'header-large';
    questionTitle.textContent = question.question;
    
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-container';
    
    // Create progress indicator
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.width = `${(index + 1) / quizQuestions.length * 100}%`;
    
    const progressText = document.createElement('div');
    progressText.className = 'progress-text';
    progressText.textContent = `${index + 1}/${quizQuestions.length}`;
    
    progressContainer.appendChild(progressBar);
    progressContainer.appendChild(progressText);
    
    // Create options
    question.options.forEach(option => {
      const optionButton = document.createElement('div');
      optionButton.className = 'option-button';
      optionButton.dataset.value = option.value;
      
      const optionIcon = document.createElement('div');
      optionIcon.className = 'option-icon';
      optionIcon.textContent = option.icon;
      
      const optionLabel = document.createElement('div');
      optionLabel.className = 'option-label';
      optionLabel.textContent = option.label;
      
      optionButton.appendChild(optionIcon);
      optionButton.appendChild(optionLabel);
      
      // Add click event
      optionButton.addEventListener('click', () => {
        if (question.multiSelect) {
          // Toggle selection
          optionButton.classList.toggle('selected');
          
          // Limit selections
          const selectedOptions = optionsContainer.querySelectorAll('.option-button.selected');
          if (selectedOptions.length > question.maxSelections) {
            // Remove selection from first selected option
            selectedOptions[0].classList.remove('selected');
          }
        } else {
          // Remove selection from all options
          optionsContainer.querySelectorAll('.option-button').forEach(button => {
            button.classList.remove('selected');
          });
          
          // Add selection to clicked option
          optionButton.classList.add('selected');
        }
      });
      
      optionsContainer.appendChild(optionButton);
    });
    
    // Create next button
    const nextButton = document.createElement('button');
    nextButton.className = 'btn btn-primary next-button';
    nextButton.textContent = index < quizQuestions.length - 1 ? 'Next' : 'Finish';
    
    nextButton.addEventListener('click', () => {
      // Get selected options
      const selectedOptions = optionsContainer.querySelectorAll('.option-button.selected');
      
      if (selectedOptions.length === 0) {
        // No option selected
        alert('Please select an option');
        return;
      }
      
      // Save answers
      if (question.multiSelect) {
        userAnswers[question.id] = Array.from(selectedOptions).map(option => option.dataset.value);
      } else {
        userAnswers[question.id] = selectedOptions[0].dataset.value;
      }
      
      // Move to next question or finish
      if (index < quizQuestions.length - 1) {
        showQuestion(index + 1);
      } else {
        // Save answers
        localStorage.setItem('onboarding_answers', JSON.stringify(userAnswers));
        localStorage.setItem('onboarding_completed', 'true');
        
        // Set premium status
        if (userAnswers.premium === 'premium') {
          localStorage.setItem('isPremium', 'true');
        } else {
          localStorage.setItem('isPremium', 'false');
        }
        
        // Show home screen
        document.getElementById('main-app').removeChild(container);
        showHomeScreen();
      }
    });
    
    quizScreen.appendChild(progressContainer);
    quizScreen.appendChild(questionTitle);
    quizScreen.appendChild(optionsContainer);
    quizScreen.appendChild(nextButton);
  }
  
  // Show first question
  showQuestion(currentQuestionIndex);
  
  container.appendChild(quizScreen);
}

// Show home screen
function showHomeScreen() {
  console.log("Showing home screen");
  
  // Initialize all screens
  initializeAllScreens();
  
  // Switch to home tab
  window.KonnectNavigation.switchToTab('home');
}

// Initialize all screens
function initializeAllScreens() {
  // Create screens if they don't exist
  const screens = ['home', 'services', 'discover', 'community', 'profile'];
  
  screens.forEach(screen => {
    if (!document.getElementById(`${screen}-screen`)) {
      const screenElement = document.createElement('div');
      screenElement.id = `${screen}-screen`;
      screenElement.className = 'screen';
      screenElement.style.display = 'none';
      document.getElementById('main-app').appendChild(screenElement);
    }
  });
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Export for use in other modules
window.KonnectApp = {
  init: initApp
};
// main.js

console.log("Konnect App: main.js loaded.");

// This file can be used for global config or initial checks.
// Since most logic is inside modular files, this stays lightweight.
