// Profile Screen Implementation for Konnect App

document.addEventListener("DOMContentLoaded", () => {
  // Initialize profile screen if it's visible
  if (document.getElementById("profile-screen") && 
      document.getElementById("profile-screen").style.display === "block") {
    initProfileScreen();
  }
});

// Initialize profile screen
function initProfileScreen() {
  // Create main container
  const profileScreen = document.getElementById("profile-screen");
  profileScreen.innerHTML = "";
  
  // Add screen components
  createUserInfoSection(profileScreen);
  createKonnectPassportSection(profileScreen);
  createLoyaltyPointsSection(profileScreen);
  createSettingsSection(profileScreen);
  
  // Add back button container (initially hidden)
  const backButtonContainer = document.createElement("div");
  backButtonContainer.className = "back-button-container";
  backButtonContainer.id = "profile-back-button";
  backButtonContainer.style.display = "none";
  
  const backButton = document.createElement("button");
  backButton.className = "back-button";
  backButton.innerHTML = "&larr; Back";
  
  backButtonContainer.appendChild(backButton);
  profileScreen.prepend(backButtonContainer);
}

// Create user info section
function createUserInfoSection(container) {
  const userInfoSection = document.createElement("div");
  userInfoSection.className = "user-info-section card";
  
  // Sample user data - in a real app, this would come from user profile
  const userData = {
    name: "Alex Kim",
    avatar: "assets/avatars/user1.jpg",
    visaType: "E-7",
    visaExpiry: "2026-08-15",
    languageLevel: "Intermediate Korean",
    memberSince: "2025-01-10",
    isPremium: localStorage.getItem("isPremium") === "true"
  };
  
  const avatarContainer = document.createElement("div");
  avatarContainer.className = "avatar-container";
  
  const userAvatar = document.createElement("div");
  userAvatar.className = "user-avatar large";
  userAvatar.style.backgroundImage = `url(${userData.avatar})`;
  
  const editAvatarButton = document.createElement("button");
  editAvatarButton.className = "edit-avatar-button";
  editAvatarButton.innerHTML = "✏️";
  editAvatarButton.setAttribute("aria-label", "Edit avatar");
  
  avatarContainer.appendChild(userAvatar);
  avatarContainer.appendChild(editAvatarButton);
  
  const userInfoDetails = document.createElement("div");
  userInfoDetails.className = "user-info-details";
  
  const userName = document.createElement("h2");
  userName.className = "user-name header-large";
  userName.textContent = userData.name;
  
  const visaBadge = document.createElement("div");
  visaBadge.className = "visa-badge badge badge-primary";
  visaBadge.textContent = `Visa: ${userData.visaType} (Expires: ${userData.visaExpiry})`;
  
  const languageLevel = document.createElement("div");
  languageLevel.className = "language-level";
  languageLevel.textContent = `Language: ${userData.languageLevel}`;
  
  const memberSince = document.createElement("div");
  memberSince.className = "member-since";
  memberSince.textContent = `Member since: ${userData.memberSince}`;
  
  const premiumStatus = document.createElement("div");
  premiumStatus.className = "premium-status";
  premiumStatus.innerHTML = userData.isPremium ? "⭐ Premium Member" : "";
  
  userInfoDetails.appendChild(userName);
  userInfoDetails.appendChild(visaBadge);
  userInfoDetails.appendChild(languageLevel);
  userInfoDetails.appendChild(memberSince);
  userInfoDetails.appendChild(premiumStatus);
  
  userInfoSection.appendChild(avatarContainer);
  userInfoSection.appendChild(userInfoDetails);
  
  container.appendChild(userInfoSection);
}

// Create Konnect Passport section
function createKonnectPassportSection(container) {
  const passportSection = document.createElement("div");
  passportSection.className = "passport-section card";
  
  const sectionHeader = document.createElement("div");
  sectionHeader.className = "section-header";
  
  const headerTitle = document.createElement("h2");
  headerTitle.className = "subheader-large";
  headerTitle.textContent = "Konnect Passport";
  
  sectionHeader.appendChild(headerTitle);
  passportSection.appendChild(sectionHeader);
  
  // Sample passport progress - in a real app, this would be based on user activity
  const passportProgress = {
    visaTasks: 75,
    housingBooked: 100,
    firstMeetup: 50,
    languageMilestone: 25,
    totalProgress: 62.5 // Average of the above
  };
  
  // Create overall progress bar
  const overallProgressContainer = document.createElement("div");
  overallProgressContainer.className = "progress-container overall-progress";
  
  const overallProgressBar = document.createElement("div");
  overallProgressBar.className = "progress-bar";
  overallProgressBar.style.width = `${passportProgress.totalProgress}%`;
  
  const progressLabel = document.createElement("div");
  progressLabel.className = "progress-label";
  progressLabel.textContent = `Overall Progress: ${passportProgress.totalProgress}%`;
  
  overallProgressContainer.appendChild(overallProgressBar);
  passportSection.appendChild(progressLabel);
  passportSection.appendChild(overallProgressContainer);
  
  // Create badges section
  const badgesContainer = document.createElement("div");
  badgesContainer.className = "badges-container";
  
  const badges = [
    {
      title: "Visa Tasks",
      icon: "🛂",
      progress: passportProgress.visaTasks,
      achieved: passportProgress.visaTasks === 100
    },
    {
      title: "Housing Booked",
      icon: "🏠",
      progress: passportProgress.housingBooked,
      achieved: passportProgress.housingBooked === 100
    },
    {
      title: "First Meetup",
      icon: "🤝",
      progress: passportProgress.firstMeetup,
      achieved: passportProgress.firstMeetup === 100
    },
    {
      title: "Language Milestone",
      icon: "📚",
      progress: passportProgress.languageMilestone,
      achieved: passportProgress.languageMilestone === 100
    },
    {
      title: "Community Contributor",
      icon: "💬",
      progress: 0,
      achieved: false
    },
    {
      title: "Explorer Badge",
      icon: "🗺️",
      progress: 0,
      achieved: false
    }
  ];
  
  badges.forEach(badge => {
    const badgeItem = document.createElement("div");
    badgeItem.className = badge.achieved ? "badge-item achieved" : "badge-item";
    
    const badgeIcon = document.createElement("div");
    badgeIcon.className = "badge-icon";
    badgeIcon.textContent = badge.icon;
    
    const badgeTitle = document.createElement("div");
    badgeTitle.className = "badge-title";
    badgeTitle.textContent = badge.title;
    
    const badgeProgressContainer = document.createElement("div");
    badgeProgressContainer.className = "progress-container badge-progress";
    
    const badgeProgressBar = document.createElement("div");
    badgeProgressBar.className = "progress-bar";
    badgeProgressBar.style.width = `${badge.progress}%`;
    
    badgeProgressContainer.appendChild(badgeProgressBar);
    
    badgeItem.appendChild(badgeIcon);
    badgeItem.appendChild(badgeTitle);
    
    if (!badge.achieved) {
      badgeItem.appendChild(badgeProgressContainer);
    }
    
    // Add animation on achievement
    if (badge.achieved) {
      badgeItem.classList.add("pop-in");
    }
    
    badgesContainer.appendChild(badgeItem);
  });
  
  passportSection.appendChild(badgesContainer);
  container.appendChild(passportSection);
}

// Create loyalty points section
function createLoyaltyPointsSection(container) {
  const loyaltySection = document.createElement("div");
  loyaltySection.className = "loyalty-section card";
  
  const sectionHeader = document.createElement("div");
  sectionHeader.className = "section-header";
  
  const headerTitle = document.createElement("h2");
  headerTitle.className = "subheader-large";
  headerTitle.textContent = "Loyalty Points";
  
  sectionHeader.appendChild(headerTitle);
  loyaltySection.appendChild(sectionHeader);
  
  // Sample loyalty points - in a real app, this would come from user data
  const loyaltyPoints = 1250;
  
  const pointsDisplay = document.createElement("div");
  pointsDisplay.className = "points-display";
  
  const pointsIcon = document.createElement("span");
  pointsIcon.className = "points-icon";
  pointsIcon.textContent = "💰";
  
  const pointsValue = document.createElement("span");
  pointsValue.className = "points-value";
  pointsValue.textContent = `${loyaltyPoints} Points`;
  
  pointsDisplay.appendChild(pointsIcon);
  pointsDisplay.appendChild(pointsValue);
  
  const redeemButton = document.createElement("button");
  redeemButton.className = "btn btn-primary redeem-button";
  redeemButton.textContent = "Redeem Now";
  
  redeemButton.addEventListener("click", () => {
    showRedeemOptions();
  });
  
  loyaltySection.appendChild(pointsDisplay);
  loyaltySection.appendChild(redeemButton);
  
  container.appendChild(loyaltySection);
}

// Create settings section
function createSettingsSection(container) {
  const settingsSection = document.createElement("div");
  settingsSection.className = "settings-section card";
  
  const sectionHeader = document.createElement("div");
  sectionHeader.className = "section-header";
  
  const headerTitle = document.createElement("h2");
  headerTitle.className = "subheader-large";
  headerTitle.textContent = "Settings & More";
  
  sectionHeader.appendChild(headerTitle);
  settingsSection.appendChild(sectionHeader);
  
  // Create settings list
  const settingsList = document.createElement("ul");
  settingsList.className = "settings-list";
  
  // Sample settings items
  const settingsItems = [
    {
      title: "Account Information",
      icon: "👤",
      action: () => showAccountInfo()
    },
    {
      title: "Notifications",
      icon: "🔔",
      action: () => showNotificationSettings()
    },
    {
      title: "Premium Membership",
      icon: "⭐",
      action: () => showPremiumSettings()
    },
    {
      title: "Referral Program",
      icon: "🎁",
      action: () => showReferralDashboard()
    },
    {
      title: "Language Preferences",
      icon: "🌐",
      action: () => showLanguagePreferences()
    },
    {
      title: "Help & Support",
      icon: "❓",
      action: () => showHelpSupport()
    },
    {
      title: "Logout",
      icon: "🚪",
      action: () => logoutUser()
    }
  ];
  
  settingsItems.forEach(item => {
    const listItem = document.createElement("li");
    listItem.className = "settings-item";
    
    const itemIcon = document.createElement("span");
    itemIcon.className = "item-icon";
    itemIcon.textContent = item.icon;
    
    const itemTitle = document.createElement("span");
    itemTitle.className = "item-title";
    itemTitle.textContent = item.title;
    
    const itemArrow = document.createElement("span");
    itemArrow.className = "item-arrow";
    itemArrow.textContent = "›";
    
    listItem.appendChild(itemIcon);
    listItem.appendChild(itemTitle);
    listItem.appendChild(itemArrow);
    
    // Add click event
    listItem.addEventListener("click", item.action);
    
    settingsList.appendChild(listItem);
  });
  
  settingsSection.appendChild(settingsList);
  container.appendChild(settingsSection);
}

// Placeholder functions for settings actions
function showAccountInfo() {
  console.log("Showing Account Information");
  // In a real app, navigate to account info screen
  alert("Navigate to Account Information screen (not implemented)");
}

function showNotificationSettings() {
  console.log("Showing Notification Settings");
  // In a real app, navigate to notification settings screen
  alert("Navigate to Notification Settings screen (not implemented)");
}

function showPremiumSettings() {
  console.log("Showing Premium Settings");
  // In a real app, navigate to premium settings screen
  alert("Navigate to Premium Settings screen (not implemented)");
}

function showReferralDashboard() {
  console.log("Showing Referral Dashboard");
  // In a real app, navigate to referral dashboard screen
  alert("Navigate to Referral Dashboard screen (not implemented)");
}

function showLanguagePreferences() {
  console.log("Showing Language Preferences");
  // In a real app, navigate to language preferences screen
  alert("Navigate to Language Preferences screen (not implemented)");
}

function showHelpSupport() {
  console.log("Showing Help & Support");
  // In a real app, navigate to help & support screen
  alert("Navigate to Help & Support screen (not implemented)");
}

function logoutUser() {
  console.log("Logging out user");
  // In a real app, clear user session and navigate to login screen
  alert("Logging out... (not implemented)");
}

// Show redeem options modal
function showRedeemOptions() {
  const modal = document.createElement("div");
  modal.className = "modal redeem-modal";
  
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  
  const headerTitle = document.createElement("h2");
  headerTitle.className = "header-medium";
  headerTitle.textContent = "Redeem Points";
  
  const closeButton = document.createElement("button");
  closeButton.className = "close-button";
  closeButton.innerHTML = "&times;";
  closeButton.addEventListener("click", () => {
    document.body.removeChild(modal);
  });
  
  modalHeader.appendChild(headerTitle);
  modalHeader.appendChild(closeButton);
  
  const modalBody = document.createElement("div");
  modalBody.className = "modal-body";
  
  const currentPoints = document.createElement("div");
  currentPoints.className = "current-points";
  currentPoints.textContent = `Your Points: 1250`;
  
  // Sample redeem options - in a real app, these would come from an API
  const redeemOptions = [
    {
      title: "Coffee Coupon",
      points: 500,
      icon: "☕"
    },
    {
      title: "Convenience Store Voucher (₩5,000)",
      points: 1000,
      icon: "🏪"
    },
    {
      title: "Movie Ticket Discount (₩3,000)",
      points: 750,
      icon: "🎬"
    },
    {
      title: "Transportation Card Top-up (₩1,000)",
      points: 250,
      icon: "🚇"
    }
  ];
  
  const optionsList = document.createElement("ul");
  optionsList.className = "redeem-options-list";
  
  redeemOptions.forEach(option => {
    const optionItem = document.createElement("li");
    optionItem.className = "redeem-option-item";
    
    const optionIcon = document.createElement("span");
    optionIcon.className = "option-icon";
    optionIcon.textContent = option.icon;
    
    const optionTitle = document.createElement("span");
    optionTitle.className = "option-title";
    optionTitle.textContent = option.title;
    
    const optionPoints = document.createElement("span");
    optionPoints.className = "option-points";
    optionPoints.textContent = `${option.points} Points`;
    
    const redeemButton = document.createElement("button");
    redeemButton.className = "btn btn-primary redeem-item-button";
    redeemButton.textContent = "Redeem";
    redeemButton.disabled = 1250 < option.points; // Disable if not enough points
    
    redeemButton.addEventListener("click", () => {
      // In a real app, this would process the redemption
      alert(`Redeemed ${option.title} for ${option.points} points!`);
      document.body.removeChild(modal);
    });
    
    optionItem.appendChild(optionIcon);
    optionItem.appendChild(optionTitle);
    optionItem.appendChild(optionPoints);
    optionItem.appendChild(redeemButton);
    
    optionsList.appendChild(optionItem);
  });
  
  modalBody.appendChild(currentPoints);
  modalBody.appendChild(optionsList);
  
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modal.appendChild(modalContent);
  
  document.body.appendChild(modal);
}

// Export for use in other modules
window.ProfileScreen = {
  init: initProfileScreen
};
