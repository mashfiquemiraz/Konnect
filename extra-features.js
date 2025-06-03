// Extra Engagement Features for Konnect App

document.addEventListener('DOMContentLoaded', () => {
  // Initialize extra engagement features
  initExtraEngagementFeatures();
});

// Initialize extra engagement features
function initExtraEngagementFeatures() {
  // Set up badge animations
  setupBadgeAnimations();
  
  // Create referral dashboard
  createReferralDashboard();
  
  // Set up Emergency SOS button
  setupEmergencySOS();
  
  // Set up analytics hooks
  setupAnalyticsHooks();
}

// Set up badge animations for Passport milestones
function setupBadgeAnimations() {
  console.log("Setting up badge animations");
  
  // Add animation classes to badges
  document.querySelectorAll('.badge-item.achieved').forEach(badge => {
    // Add animation class if not already present
    if (!badge.classList.contains('pop-in')) {
      badge.classList.add('pop-in');
    }
    
    // Add click event to replay animation
    badge.addEventListener('click', () => {
      badge.classList.remove('pop-in');
      setTimeout(() => {
        badge.classList.add('pop-in');
      }, 10);
    });
  });
  
  // Simulate new badge achievement
  setTimeout(() => {
    simulateNewBadgeAchievement();
  }, 10000); // Simulate after 10 seconds
}

// Simulate new badge achievement
function simulateNewBadgeAchievement() {
  // Find a non-achieved badge
  const nonAchievedBadges = document.querySelectorAll('.badge-item:not(.achieved)');
  
  if (nonAchievedBadges.length > 0) {
    const badge = nonAchievedBadges[0];
    
    // Update progress bar to 100%
    const progressBar = badge.querySelector('.progress-bar');
    if (progressBar) {
      progressBar.style.transition = 'width 1s ease-in-out';
      progressBar.style.width = '100%';
    }
    
    // Add achieved class and animation after progress bar fills
    setTimeout(() => {
      badge.classList.add('achieved');
      badge.classList.add('pop-in');
      
      // Remove progress bar
      const progressContainer = badge.querySelector('.badge-progress');
      if (progressContainer) {
        badge.removeChild(progressContainer);
      }
      
      // Show achievement notification
      showAchievementNotification(badge.querySelector('.badge-title').textContent);
    }, 1000);
  }
}

// Show achievement notification
function showAchievementNotification(badgeTitle) {
  const notification = document.createElement('div');
  notification.className = 'achievement-notification';
  
  const notificationContent = document.createElement('div');
  notificationContent.className = 'notification-content';
  
  const notificationIcon = document.createElement('div');
  notificationIcon.className = 'notification-icon';
  notificationIcon.innerHTML = '🏆';
  
  const notificationText = document.createElement('div');
  notificationText.className = 'notification-text';
  
  const notificationTitle = document.createElement('div');
  notificationTitle.className = 'notification-title';
  notificationTitle.textContent = 'Achievement Unlocked!';
  
  const notificationDesc = document.createElement('div');
  notificationDesc.className = 'notification-desc';
  notificationDesc.textContent = `You've earned the ${badgeTitle} badge!`;
  
  notificationText.appendChild(notificationTitle);
  notificationText.appendChild(notificationDesc);
  
  notificationContent.appendChild(notificationIcon);
  notificationContent.appendChild(notificationText);
  
  notification.appendChild(notificationContent);
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // Animate out after 5 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 5000);
}

// Create referral dashboard
function createReferralDashboard() {
  // Create referral dashboard screen
  const referralScreen = document.createElement('div');
  referralScreen.id = 'profile-referral-screen';
  referralScreen.className = 'profile-subscreen';
  referralScreen.style.display = 'none';
  
  // Create screen header
  const screenHeader = document.createElement('div');
  screenHeader.className = 'screen-header';
  
  const headerTitle = document.createElement('h1');
  headerTitle.className = 'header-large';
  headerTitle.textContent = 'Referral Program';
  
  screenHeader.appendChild(headerTitle);
  referralScreen.appendChild(screenHeader);
  
  // Create referral stats
  const referralStats = document.createElement('div');
  referralStats.className = 'referral-stats card';
  
  const statsTitle = document.createElement('h2');
  statsTitle.className = 'subheader-large';
  statsTitle.textContent = 'Your Referrals';
  
  const statsContent = document.createElement('div');
  statsContent.className = 'stats-content';
  
  const referralCount = document.createElement('div');
  referralCount.className = 'referral-count';
  
  const countValue = document.createElement('div');
  countValue.className = 'count-value';
  countValue.textContent = '3';
  
  const countLabel = document.createElement('div');
  countLabel.className = 'count-label';
  countLabel.textContent = 'Friends Referred';
  
  referralCount.appendChild(countValue);
  referralCount.appendChild(countLabel);
  
  const pointsEarned = document.createElement('div');
  pointsEarned.className = 'points-earned';
  
  const pointsValue = document.createElement('div');
  pointsValue.className = 'points-value';
  pointsValue.textContent = '750';
  
  const pointsLabel = document.createElement('div');
  pointsLabel.className = 'points-label';
  pointsLabel.textContent = 'Points Earned';
  
  pointsEarned.appendChild(pointsValue);
  pointsEarned.appendChild(pointsLabel);
  
  statsContent.appendChild(referralCount);
  statsContent.appendChild(pointsEarned);
  
  referralStats.appendChild(statsTitle);
  referralStats.appendChild(statsContent);
  
  // Create progress bar section
  const progressSection = document.createElement('div');
  progressSection.className = 'progress-section card';
  
  const progressTitle = document.createElement('h2');
  progressTitle.className = 'subheader-large';
  progressTitle.textContent = 'Next Reward';
  
  const progressInfo = document.createElement('div');
  progressInfo.className = 'progress-info';
  progressInfo.textContent = '2 more referrals to earn Premium Membership (1 month)';
  
  const progressContainer = document.createElement('div');
  progressContainer.className = 'progress-container referral-progress';
  
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar animated';
  progressBar.style.width = '60%';
  
  const progressMarkers = document.createElement('div');
  progressMarkers.className = 'progress-markers';
  
  // Create markers for referral milestones
  for (let i = 0; i <= 5; i++) {
    const marker = document.createElement('div');
    marker.className = i <= 3 ? 'progress-marker achieved' : 'progress-marker';
    marker.setAttribute('data-value', i);
    
    const markerLabel = document.createElement('div');
    markerLabel.className = 'marker-label';
    markerLabel.textContent = i;
    
    marker.appendChild(markerLabel);
    progressMarkers.appendChild(marker);
  }
  
  progressContainer.appendChild(progressBar);
  progressContainer.appendChild(progressMarkers);
  
  const rewardsList = document.createElement('div');
  rewardsList.className = 'rewards-list';
  
  const rewardsTitle = document.createElement('h3');
  rewardsTitle.textContent = 'Rewards Tiers';
  
  const rewardsItems = document.createElement('ul');
  
  const rewards = [
    { count: 1, reward: '250 Points' },
    { count: 3, reward: '750 Points' },
    { count: 5, reward: 'Premium Membership (1 month)' },
    { count: 10, reward: 'Premium Membership (3 months)' },
    { count: 20, reward: 'Premium Membership (1 year)' }
  ];
  
  rewards.forEach(reward => {
    const rewardItem = document.createElement('li');
    rewardItem.className = reward.count <= 3 ? 'reward-item achieved' : 'reward-item';
    rewardItem.innerHTML = `<strong>${reward.count} Referrals:</strong> ${reward.reward}`;
    rewardsItems.appendChild(rewardItem);
  });
  
  rewardsList.appendChild(rewardsTitle);
  rewardsList.appendChild(rewardsItems);
  
  progressSection.appendChild(progressTitle);
  progressSection.appendChild(progressInfo);
  progressSection.appendChild(progressContainer);
  progressSection.appendChild(rewardsList);
  
  // Create share section
  const shareSection = document.createElement('div');
  shareSection.className = 'share-section card';
  
  const shareTitle = document.createElement('h2');
  shareTitle.className = 'subheader-large';
  shareTitle.textContent = 'Invite Friends';
  
  const shareInfo = document.createElement('p');
  shareInfo.textContent = 'Share your referral code with friends and earn rewards when they join Konnect!';
  
  const referralCode = document.createElement('div');
  referralCode.className = 'referral-code';
  
  const codeLabel = document.createElement('div');
  codeLabel.className = 'code-label';
  codeLabel.textContent = 'Your Referral Code';
  
  const codeValue = document.createElement('div');
  codeValue.className = 'code-value';
  codeValue.textContent = 'ALEX2025';
  
  const copyButton = document.createElement('button');
  copyButton.className = 'btn btn-outline copy-button';
  copyButton.textContent = 'Copy';
  
  copyButton.addEventListener('click', () => {
    // Simulate copy to clipboard
    alert('Referral code copied to clipboard!');
  });
  
  referralCode.appendChild(codeLabel);
  referralCode.appendChild(codeValue);
  referralCode.appendChild(copyButton);
  
  const shareButtons = document.createElement('div');
  shareButtons.className = 'share-buttons';
  
  const shareOptions = [
    { name: 'KakaoTalk', icon: '💬' },
    { name: 'WhatsApp', icon: '📱' },
    { name: 'Email', icon: '✉️' },
    { name: 'Copy Link', icon: '🔗' }
  ];
  
  shareOptions.forEach(option => {
    const shareButton = document.createElement('button');
    shareButton.className = 'share-button';
    
    const buttonIcon = document.createElement('span');
    buttonIcon.className = 'button-icon';
    buttonIcon.textContent = option.icon;
    
    const buttonLabel = document.createElement('span');
    buttonLabel.className = 'button-label';
    buttonLabel.textContent = option.name;
    
    shareButton.appendChild(buttonIcon);
    shareButton.appendChild(buttonLabel);
    
    shareButton.addEventListener('click', () => {
      // Simulate sharing
      alert(`Sharing via ${option.name}...`);
    });
    
    shareButtons.appendChild(shareButton);
  });
  
  shareSection.appendChild(shareTitle);
  shareSection.appendChild(shareInfo);
  shareSection.appendChild(referralCode);
  shareSection.appendChild(shareButtons);
  
  // Add all sections to screen
  referralScreen.appendChild(referralStats);
  referralScreen.appendChild(progressSection);
  referralScreen.appendChild(shareSection);
  
  // Add to main app
  document.getElementById('main-app').appendChild(referralScreen);
  
  // Add function to show referral dashboard
  window.showReferralDashboard = function() {
    window.KonnectNavigation.navigateToScreen('profile', 'profile-referral-screen');
  };
}

// Set up Emergency SOS button
function setupEmergencySOS() {
  console.log("Setting up Emergency SOS");
  
  // Add SOS button to all screens if not already present
  const screens = ['home', 'services', 'discover', 'community', 'profile'];
  
  screens.forEach(screen => {
    const screenElement = document.getElementById(`${screen}-screen`);
    
    if (screenElement && !screenElement.querySelector('.sos-button')) {
      const sosButton = document.createElement('div');
      sosButton.className = 'sos-button';
      sosButton.setAttribute('aria-label', 'Emergency SOS');
      
      const sosIcon = document.createElement('span');
      sosIcon.className = 'sos-icon';
      sosIcon.textContent = 'SOS';
      
      sosButton.appendChild(sosIcon);
      
      // Add click event
      sosButton.addEventListener('click', activateSOSFeature);
      
      screenElement.appendChild(sosButton);
    }
  });
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
    
    // Simulate location sharing
    const locationStatus = document.createElement('div');
    locationStatus.className = 'location-status';
    locationStatus.innerHTML = '<span class="status-icon">📍</span> Location shared with emergency services';
    
    modalBody.appendChild(locationStatus);
    
    // Disable button after sharing
    locationButton.disabled = true;
    locationButton.textContent = 'Location Shared';
  });
  
  modalBody.appendChild(locationButton);
  
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  sosModal.appendChild(modalContent);
  
  document.body.appendChild(sosModal);
  
  // Track SOS activation in analytics
  trackAnalyticsEvent('sos_activated', {
    timestamp: new Date().toISOString()
  });
}

// Set up analytics hooks
function setupAnalyticsHooks() {
  console.log("Setting up analytics hooks");
  
  // Track screen views
  const originalSwitchToTab = window.KonnectNavigation.switchToTab;
  window.KonnectNavigation.switchToTab = function(tabId) {
    // Call original function
    originalSwitchToTab(tabId);
    
    // Track screen view
    trackAnalyticsEvent('screen_view', {
      screen_name: tabId,
      timestamp: new Date().toISOString()
    });
  };
  
  // Track navigation to screens
  const originalNavigateToScreen = window.KonnectNavigation.navigateToScreen;
  window.KonnectNavigation.navigateToScreen = function(tabId, screenId, data) {
    // Call original function
    originalNavigateToScreen(tabId, screenId, data);
    
    // Track screen view
    trackAnalyticsEvent('screen_view', {
      screen_name: screenId,
      parent_tab: tabId,
      timestamp: new Date().toISOString()
    });
  };
  
  // Add click tracking to buttons
  setTimeout(() => {
    document.querySelectorAll('.btn').forEach(button => {
      // Skip buttons that already have tracking
      if (!button.dataset.trackingAdded) {
        const originalOnClick = button.onclick;
        
        button.addEventListener('click', (e) => {
          // Call original click handler if exists
          if (originalOnClick) {
            originalOnClick(e);
          }
          
          // Track button click
          trackAnalyticsEvent('button_click', {
            button_text: button.textContent.trim(),
            button_class: button.className,
            screen: getCurrentScreen(),
            timestamp: new Date().toISOString()
          });
        });
        
        // Mark as tracking added
        button.dataset.trackingAdded = 'true';
      }
    });
  }, 1000);
}

// Track analytics event
function trackAnalyticsEvent(eventName, eventData) {
  console.log(`Analytics Event: ${eventName}`, eventData);
  
  // In a real app, this would send data to Firebase Analytics or similar
  // For the prototype, we'll just log to console and store in localStorage
  
  // Get existing events or initialize empty array
  const events = JSON.parse(localStorage.getItem('konnect_analytics_events') || '[]');
  
  // Add new event
  events.push({
    event_name: eventName,
    event_data: eventData,
    timestamp: new Date().toISOString()
  });
  
  // Store events (limit to last 100 events to avoid localStorage limits)
  localStorage.setItem('konnect_analytics_events', JSON.stringify(events.slice(-100)));
}

// Get current screen name
function getCurrentScreen() {
  // Check which screen is currently visible
  const screens = ['home', 'services', 'discover', 'community', 'profile'];
  
  for (const screen of screens) {
    const screenElement = document.getElementById(`${screen}-screen`);
    if (screenElement && screenElement.style.display === 'block') {
      return screen;
    }
  }
  
  // Check subscreens
  const visibleSubscreens = document.querySelectorAll('[id$="-screen"][style*="display: block"]');
  if (visibleSubscreens.length > 0) {
    return visibleSubscreens[0].id;
  }
  
  return 'unknown';
}

// Export for use in other modules
window.ExtraFeatures = {
  setupBadgeAnimations,
  showReferralDashboard: () => window.showReferralDashboard(),
  activateSOSFeature,
  trackAnalyticsEvent
};
