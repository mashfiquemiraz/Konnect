// Onboarding Flow for Konnect App

document.addEventListener('DOMContentLoaded', () => {
  // Initialize onboarding variables
  let currentStep = 0;
  const totalSteps = 6; // Language selection + 5 quiz questions
  
  // User data to be collected during onboarding
  const userData = {
    language: '',
    purpose: '',
    needs: [],
    city: '',
    techComfort: '',
    premium: false
  };
});

// Show language selection screen
function showLanguageSelection() {
  const onboardingContent = document.getElementById('onboarding-content');
  
  // Clear previous content
  onboardingContent.innerHTML = '';
  
  // Create language selection header
  const header = document.createElement('h1');
  header.className = 'header-large fade-in';
  header.textContent = 'Choose Your Language';
  onboardingContent.appendChild(header);
  
  // Create language options container
  const languageContainer = document.createElement('div');
  languageContainer.className = 'language-container slide-up';
  languageContainer.style.animationDelay = '0.2s';
  
  // Define languages with flags
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];
  
  // Create language option buttons
  languages.forEach(lang => {
    const langButton = document.createElement('button');
    langButton.className = 'language-button';
    
    const flagSpan = document.createElement('span');
    flagSpan.className = 'language-flag';
    flagSpan.textContent = lang.flag;
    
    const nameSpan = document.createElement('span');
    nameSpan.className = 'language-name';
    nameSpan.textContent = lang.name;
    
    langButton.appendChild(flagSpan);
    langButton.appendChild(nameSpan);
    
    // Add click event
    langButton.addEventListener('click', () => {
      selectLanguage(lang.code);
    });
    
    languageContainer.appendChild(langButton);
  });
  
  onboardingContent.appendChild(languageContainer);
  
  // Add progress indicator
  addProgressIndicator(0, totalSteps);
}

// Handle language selection
function selectLanguage(languageCode) {
  // Save selected language
  userData.language = languageCode;
  
  // Proceed to first quiz question
  showQuizQuestion(1);
}

// Show quiz questions
function showQuizQuestion(questionNumber) {
  const onboardingContent = document.getElementById('onboarding-content');
  
  // Clear previous content with fade-out effect
  fadeOutContent(onboardingContent, () => {
    // Clear after fade out
    onboardingContent.innerHTML = '';
    
    // Create question based on number
    switch(questionNumber) {
      case 1:
        showPurposeQuestion(onboardingContent);
        break;
      case 2:
        showNeedsQuestion(onboardingContent);
        break;
      case 3:
        showCityQuestion(onboardingContent);
        break;
      case 4:
        showTechComfortQuestion(onboardingContent);
        break;
      case 5:
        showPremiumQuestion(onboardingContent);
        break;
      default:
        finishOnboarding();
        break;
    }
    
    // Update progress indicator
    addProgressIndicator(questionNumber, totalSteps);
  });
}

// Question 1: Purpose in Korea
function showPurposeQuestion(container) {
  // Create question header
  const header = document.createElement('h1');
  header.className = 'header-large fade-in';
  header.textContent = 'What brings you to Korea?';
  container.appendChild(header);
  
  // Create options
  const options = ['Study', 'Work', 'Travel', 'Business', 'Other'];
  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'options-container slide-up';
  optionsContainer.style.animationDelay = '0.2s';
  
  options.forEach(option => {
    const optionButton = document.createElement('button');
    optionButton.className = 'option-button';
    optionButton.textContent = option;
    
    // Add click event
    optionButton.addEventListener('click', () => {
      userData.purpose = option;
      showQuizQuestion(2);
    });
    
    optionsContainer.appendChild(optionButton);
  });
  
  container.appendChild(optionsContainer);
}

// Question 2: Top 3 Needs
function showNeedsQuestion(container) {
  // Create question header
  const header = document.createElement('h1');
  header.className = 'header-large fade-in';
  header.textContent = 'Select your top 3 needs';
  container.appendChild(header);
  
  // Create options
  const options = ['Visa', 'Housing', 'Jobs', 'Language', 'Community', 'Transportation', 'Healthcare', 'Food'];
  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'options-grid slide-up';
  optionsContainer.style.animationDelay = '0.2s';
  
  // Selected needs counter
  let selectedCount = 0;
  
  options.forEach(option => {
    const optionButton = document.createElement('button');
    optionButton.className = 'option-button';
    optionButton.textContent = option;
    
    // Add click event
    optionButton.addEventListener('click', () => {
      // Toggle selection
      if (optionButton.classList.contains('selected')) {
        optionButton.classList.remove('selected');
        userData.needs = userData.needs.filter(need => need !== option);
        selectedCount--;
      } else {
        // Only allow selecting up to 3 options
        if (selectedCount < 3) {
          optionButton.classList.add('selected');
          userData.needs.push(option);
          selectedCount++;
        }
      }
      
      // Enable continue button when 3 options are selected
      continueButton.disabled = selectedCount !== 3;
    });
    
    optionsContainer.appendChild(optionButton);
  });
  
  container.appendChild(optionsContainer);
  
  // Add continue button
  const continueButton = document.createElement('button');
  continueButton.className = 'btn btn-primary continue-button fade-in';
  continueButton.textContent = 'Continue';
  continueButton.disabled = true;
  continueButton.style.animationDelay = '0.4s';
  
  continueButton.addEventListener('click', () => {
    showQuizQuestion(3);
  });
  
  container.appendChild(continueButton);
}

// Question 3: Current City
function showCityQuestion(container) {
  // Create question header
  const header = document.createElement('h1');
  header.className = 'header-large fade-in';
  header.textContent = 'Which city are you in?';
  container.appendChild(header);
  
  // Create dropdown for cities
  const formGroup = document.createElement('div');
  formGroup.className = 'form-group slide-up';
  formGroup.style.animationDelay = '0.2s';
  
  const citySelect = document.createElement('select');
  citySelect.className = 'city-select';
  
  // Add cities
  const cities = ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Suwon', 'Ulsan', 'Jeju', 'Other'];
  
  // Add default option
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Select a city';
  defaultOption.disabled = true;
  defaultOption.selected = true;
  citySelect.appendChild(defaultOption);
  
  cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });
  
  formGroup.appendChild(citySelect);
  container.appendChild(formGroup);
  
  // Add continue button
  const continueButton = document.createElement('button');
  continueButton.className = 'btn btn-primary continue-button fade-in';
  continueButton.textContent = 'Continue';
  continueButton.disabled = true;
  continueButton.style.animationDelay = '0.4s';
  
  // Enable button when city is selected
  citySelect.addEventListener('change', () => {
    userData.city = citySelect.value;
    continueButton.disabled = !citySelect.value;
  });
  
  continueButton.addEventListener('click', () => {
    showQuizQuestion(4);
  });
  
  container.appendChild(continueButton);
}

// Question 4: Comfort with Tech
function showTechComfortQuestion(container) {
  // Create question header
  const header = document.createElement('h1');
  header.className = 'header-large fade-in';
  header.textContent = 'How comfortable are you with technology?';
  container.appendChild(header);
  
  // Create options
  const options = [
    { value: 'Low', description: 'I need step-by-step guidance' },
    { value: 'Medium', description: 'I can figure things out with some help' },
    { value: 'High', description: 'I\'m very tech-savvy' }
  ];
  
  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'comfort-options-container slide-up';
  optionsContainer.style.animationDelay = '0.2s';
  
  options.forEach(option => {
    const optionCard = document.createElement('div');
    optionCard.className = 'comfort-option-card';
    
    const optionTitle = document.createElement('h3');
    optionTitle.className = 'comfort-option-title';
    optionTitle.textContent = option.value;
    
    const optionDesc = document.createElement('p');
    optionDesc.className = 'comfort-option-desc';
    optionDesc.textContent = option.description;
    
    optionCard.appendChild(optionTitle);
    optionCard.appendChild(optionDesc);
    
    // Add click event
    optionCard.addEventListener('click', () => {
      // Remove selected class from all options
      document.querySelectorAll('.comfort-option-card').forEach(card => {
        card.classList.remove('selected');
      });
      
      // Add selected class to clicked option
      optionCard.classList.add('selected');
      userData.techComfort = option.value;
      
      // Enable continue button
      continueButton.disabled = false;
    });
    
    optionsContainer.appendChild(optionCard);
  });
  
  container.appendChild(optionsContainer);
  
  // Add continue button
  const continueButton = document.createElement('button');
  continueButton.className = 'btn btn-primary continue-button fade-in';
  continueButton.textContent = 'Continue';
  continueButton.disabled = true;
  continueButton.style.animationDelay = '0.4s';
  
  continueButton.addEventListener('click', () => {
    showQuizQuestion(5);
  });
  
  container.appendChild(continueButton);
}

// Question 5: Premium/Newsletter
function showPremiumQuestion(container) {
  // Create question header
  const header = document.createElement('h1');
  header.className = 'header-large fade-in';
  header.textContent = 'Would you like to subscribe?';
  container.appendChild(header);
  
  // Create subscription card
  const subscriptionCard = document.createElement('div');
  subscriptionCard.className = 'subscription-card slide-up';
  subscriptionCard.style.animationDelay = '0.2s';
  
  const premiumTitle = document.createElement('h2');
  premiumTitle.className = 'premium-title';
  premiumTitle.textContent = 'Konnect Premium';
  
  const premiumFeatures = document.createElement('ul');
  premiumFeatures.className = 'premium-features';
  
  const features = [
    'Priority visa appointment booking',
    'Exclusive housing deals',
    'Language learning resources',
    'Community event invitations',
    'Personalized assistance'
  ];
  
  features.forEach(feature => {
    const featureItem = document.createElement('li');
    featureItem.textContent = feature;
    premiumFeatures.appendChild(featureItem);
  });
  
  const toggleContainer = document.createElement('div');
  toggleContainer.className = 'toggle-container';
  
  const toggleLabel = document.createElement('label');
  toggleLabel.className = 'toggle-switch';
  
  const toggleInput = document.createElement('input');
  toggleInput.type = 'checkbox';
  toggleInput.className = 'toggle-input';
  
  const toggleSlider = document.createElement('span');
  toggleSlider.className = 'toggle-slider';
  
  toggleLabel.appendChild(toggleInput);
  toggleLabel.appendChild(toggleSlider);
  
  const toggleText = document.createElement('span');
  toggleText.className = 'toggle-text';
  toggleText.textContent = 'Subscribe to Premium';
  
  toggleContainer.appendChild(toggleLabel);
  toggleContainer.appendChild(toggleText);
  
  // Add toggle event
  toggleInput.addEventListener('change', () => {
    userData.premium = toggleInput.checked;
  });
  
  subscriptionCard.appendChild(premiumTitle);
  subscriptionCard.appendChild(premiumFeatures);
  subscriptionCard.appendChild(toggleContainer);
  
  container.appendChild(subscriptionCard);
  
  // Add finish button
  const finishButton = document.createElement('button');
  finishButton.className = 'btn btn-primary finish-button fade-in';
  finishButton.textContent = 'Get Started';
  finishButton.style.animationDelay = '0.4s';
  
  finishButton.addEventListener('click', () => {
    finishOnboarding();
  });
  
  container.appendChild(finishButton);
}

// Finish onboarding and transition to main app
function finishOnboarding() {
  const onboardingScreen = document.getElementById('onboarding-screen');
  const mainAppScreen = document.getElementById('main-app');
  
  // Animate onboarding out
  onboardingScreen.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
  onboardingScreen.style.transform = 'translateY(-100%)';
  onboardingScreen.style.opacity = '0';
  
  // Customize main app based on user preferences
  customizeMainApp(userData);
  
  // Show main app
  setTimeout(() => {
    onboardingScreen.style.display = 'none';
    mainAppScreen.style.display = 'block';
    
    // Initialize main app with animation
    initMainApp();
  }, 500);
}

// Customize main app based on user data
function customizeMainApp(userData) {
  // Prioritize tabs based on user needs
  const tabOrder = determineTabOrder(userData.needs);
  
  // Set default city for location-based services
  localStorage.setItem('userCity', userData.city);
  
  // Adjust UI complexity based on tech comfort
  const uiComplexity = userData.techComfort === 'Low' ? 'simple' : 
                      (userData.techComfort === 'Medium' ? 'standard' : 'advanced');
  localStorage.setItem('uiComplexity', uiComplexity);
  
  // Set premium status
  localStorage.setItem('isPremium', userData.premium);
  
  // Set language preference
  localStorage.setItem('language', userData.language);
  
  // Set purpose for personalized content
  localStorage.setItem('purpose', userData.purpose);
}

// Determine tab order based on user needs
function determineTabOrder(needs) {
  const defaultOrder = ['home', 'services', 'discover', 'community', 'profile'];
  let customOrder = [...defaultOrder];
  
  // If visa is a priority, ensure services tab is prominent
  if (needs.includes('Visa')) {
    // Move services to second position if not already
    const servicesIndex = customOrder.indexOf('services');
    if (servicesIndex > 1) {
      customOrder.splice(servicesIndex, 1);
      customOrder.splice(1, 0, 'services');
    }
  }
  
  // If community is a priority, move it up
  if (needs.includes('Community')) {
    const communityIndex = customOrder.indexOf('community');
    customOrder.splice(communityIndex, 1);
    customOrder.splice(1, 0, 'community');
  }
  
  // If language is a priority, ensure discover tab is prominent
  if (needs.includes('Language')) {
    const discoverIndex = customOrder.indexOf('discover');
    if (discoverIndex > 2) {
      customOrder.splice(discoverIndex, 1);
      customOrder.splice(2, 0, 'discover');
    }
  }
  
  return customOrder;
}

// Helper function to add progress indicator
function addProgressIndicator(currentStep, totalSteps) {
  const onboardingContent = document.getElementById('onboarding-content');
  
  // Create progress container
  const progressContainer = document.createElement('div');
  progressContainer.className = 'progress-container fade-in';
  progressContainer.style.animationDelay = '0.6s';
  
  // Create progress dots
  for (let i = 0; i < totalSteps; i++) {
    const dot = document.createElement('div');
    dot.className = i <= currentStep ? 'progress-dot active' : 'progress-dot';
    progressContainer.appendChild(dot);
  }
  
  onboardingContent.appendChild(progressContainer);
}

// Helper function to fade out content
function fadeOutContent(container, callback) {
  container.style.transition = 'opacity 0.3s ease';
  container.style.opacity = '0';
  
  setTimeout(() => {
    callback();
    container.style.opacity = '1';
  }, 300);
}

// Initialize main app
function initMainApp() {
  // This function will be implemented in navigation.js
  console.log('Main app initialized with user data:', userData);
}
