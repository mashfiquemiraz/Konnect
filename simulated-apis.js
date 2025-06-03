// Simulated API Integration for Konnect App

// This file contains simulated API functions for core functionalities
// In a real app, these would connect to backend services

// Real-time Chat with Translation
const ChatAPI = {
  // Initialize chat system
  init: function() {
    console.log("Initializing chat system");
    return {
      status: "connected",
      userId: "user123",
      channels: this.getChannels()
    };
  },
  
  // Get available chat channels
  getChannels: function() {
    return [
      {
        id: "general",
        name: "General Chat",
        participants: 24,
        lastMessage: {
          sender: "Min-ji Kim",
          text: "Hello everyone! Welcome to Konnect!",
          timestamp: new Date(Date.now() - 3600000).toISOString()
        }
      },
      {
        id: "housing",
        name: "Housing Help",
        participants: 18,
        lastMessage: {
          sender: "David Chen",
          text: "Does anyone know a good real estate agent in Gangnam?",
          timestamp: new Date(Date.now() - 7200000).toISOString()
        }
      },
      {
        id: "language",
        name: "Language Exchange",
        participants: 32,
        lastMessage: {
          sender: "Sarah Johnson",
          text: "I'm looking for a Korean language partner. I can help with English!",
          timestamp: new Date(Date.now() - 1800000).toISOString()
        }
      }
    ];
  },
  
  // Get messages for a specific channel
  getMessages: function(channelId) {
    const messagesByChannel = {
      "general": [
        {
          id: "msg1",
          sender: {
            id: "user456",
            name: "Min-ji Kim",
            avatar: "assets/avatars/user1.jpg"
          },
          text: "Hello everyone! Welcome to Konnect!",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          translated: false
        },
        {
          id: "msg2",
          sender: {
            id: "user789",
            name: "John Smith",
            avatar: "assets/avatars/user3.jpg"
          },
          text: "Thanks! I just moved to Seoul last week.",
          timestamp: new Date(Date.now() - 3540000).toISOString(),
          translated: false
        },
        {
          id: "msg3",
          sender: {
            id: "user456",
            name: "Min-ji Kim",
            avatar: "assets/avatars/user1.jpg"
          },
          text: "서울에 오신 것을 환영합니다!",
          originalText: "서울에 오신 것을 환영합니다!",
          translatedText: "Welcome to Seoul!",
          timestamp: new Date(Date.now() - 3480000).toISOString(),
          translated: true
        }
      ],
      "housing": [
        {
          id: "msg1",
          sender: {
            id: "user234",
            name: "David Chen",
            avatar: "assets/avatars/user5.jpg"
          },
          text: "Does anyone know a good real estate agent in Gangnam?",
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          translated: false
        },
        {
          id: "msg2",
          sender: {
            id: "user567",
            name: "Yuna Park",
            avatar: "assets/avatars/user6.jpg"
          },
          text: "I used 'Seoul Stays' agency last month. They have English-speaking agents.",
          timestamp: new Date(Date.now() - 7140000).toISOString(),
          translated: false
        }
      ],
      "language": [
        {
          id: "msg1",
          sender: {
            id: "user890",
            name: "Sarah Johnson",
            avatar: "assets/avatars/user2.jpg"
          },
          text: "I'm looking for a Korean language partner. I can help with English!",
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          translated: false
        },
        {
          id: "msg2",
          sender: {
            id: "user123",
            name: "Ji-hoon Park",
            avatar: "assets/avatars/partner5.jpg"
          },
          text: "안녕하세요! 저는 영어를 배우고 있어요. 언제 만날 수 있을까요?",
          originalText: "안녕하세요! 저는 영어를 배우고 있어요. 언제 만날 수 있을까요?",
          translatedText: "Hello! I'm learning English. When can we meet?",
          timestamp: new Date(Date.now() - 1740000).toISOString(),
          translated: true
        }
      ]
    };
    
    return messagesByChannel[channelId] || [];
  },
  
  // Send a message to a channel
  sendMessage: function(channelId, message) {
    console.log(`Sending message to ${channelId}: ${message}`);
    
    // Simulate message sending
    return {
      id: `msg${Date.now()}`,
      sender: {
        id: "user123",
        name: "Alex Kim",
        avatar: "assets/avatars/user1.jpg"
      },
      text: message,
      timestamp: new Date().toISOString(),
      translated: false,
      status: "sent"
    };
  },
  
  // Translate a message
  translateMessage: function(text, targetLanguage) {
    console.log(`Translating message to ${targetLanguage}: ${text}`);
    
    // Simulate translation
    const translations = {
      "Hello everyone!": {
        "ko": "안녕하세요 여러분!",
        "zh": "大家好！",
        "es": "¡Hola a todos!"
      },
      "I need help with my visa application.": {
        "ko": "비자 신청에 도움이 필요합니다.",
        "zh": "我需要帮助申请签证。",
        "es": "Necesito ayuda con mi solicitud de visa."
      },
      "서울에 오신 것을 환영합니다!": {
        "en": "Welcome to Seoul!",
        "zh": "欢迎来到首尔！",
        "es": "¡Bienvenido a Seúl!"
      },
      "안녕하세요! 저는 영어를 배우고 있어요.": {
        "en": "Hello! I'm learning English.",
        "zh": "你好！我在学英语。",
        "es": "¡Hola! Estoy aprendiendo inglés."
      }
    };
    
    // Check if we have a translation for this text
    if (translations[text] && translations[text][targetLanguage]) {
      return {
        originalText: text,
        translatedText: translations[text][targetLanguage],
        targetLanguage: targetLanguage
      };
    }
    
    // Fallback for texts we don't have translations for
    return {
      originalText: text,
      translatedText: `[Translated to ${targetLanguage}] ${text}`,
      targetLanguage: targetLanguage
    };
  }
};

// Mapping & Geolocation API
const MapAPI = {
  // Initialize map
  init: function(containerId, options = {}) {
    console.log(`Initializing map in container ${containerId}`);
    
    return {
      status: "initialized",
      center: options.center || { lat: 37.5665, lng: 126.9780 }, // Seoul by default
      zoom: options.zoom || 12
    };
  },
  
  // Get current location
  getCurrentLocation: function() {
    console.log("Getting current location");
    
    // Simulate geolocation
    return {
      lat: 37.5665,
      lng: 126.9780,
      accuracy: 10,
      timestamp: Date.now()
    };
  },
  
  // Search for locations
  searchLocations: function(query) {
    console.log(`Searching for locations: ${query}`);
    
    // Simulate location search results
    const searchResults = {
      "restaurant": [
        {
          id: "place1",
          name: "Seoul BBQ House",
          address: "123 Gangnam-daero, Gangnam-gu, Seoul",
          lat: 37.5172,
          lng: 127.0473,
          rating: 4.5,
          type: "restaurant"
        },
        {
          id: "place2",
          name: "Kimchi Paradise",
          address: "456 Teheran-ro, Gangnam-gu, Seoul",
          lat: 37.5087,
          lng: 127.0632,
          rating: 4.2,
          type: "restaurant"
        }
      ],
      "cafe": [
        {
          id: "place3",
          name: "Star Coffee",
          address: "789 Yeoksam-dong, Gangnam-gu, Seoul",
          lat: 37.5016,
          lng: 127.0394,
          rating: 4.3,
          type: "cafe"
        },
        {
          id: "place4",
          name: "Seoul Roasters",
          address: "101 Samseong-dong, Gangnam-gu, Seoul",
          lat: 37.5140,
          lng: 127.0565,
          rating: 4.7,
          type: "cafe"
        }
      ],
      "hospital": [
        {
          id: "place5",
          name: "International Medical Center",
          address: "202 Apgujeong-dong, Gangnam-gu, Seoul",
          lat: 37.5270,
          lng: 127.0350,
          rating: 4.8,
          type: "hospital"
        }
      ]
    };
    
    // Return results based on query
    for (const category in searchResults) {
      if (query.toLowerCase().includes(category)) {
        return searchResults[category];
      }
    }
    
    // Default return all places
    return [].concat(...Object.values(searchResults));
  },
  
  // Get directions
  getDirections: function(origin, destination) {
    console.log(`Getting directions from ${origin} to ${destination}`);
    
    // Simulate directions
    return {
      distance: "5.2 km",
      duration: "15 minutes",
      steps: [
        {
          instruction: "Head north on Gangnam-daero",
          distance: "0.5 km",
          duration: "2 minutes"
        },
        {
          instruction: "Turn right onto Teheran-ro",
          distance: "2.3 km",
          duration: "6 minutes"
        },
        {
          instruction: "Turn left onto Samseong-ro",
          distance: "1.8 km",
          duration: "5 minutes"
        },
        {
          instruction: "Arrive at destination",
          distance: "0.6 km",
          duration: "2 minutes"
        }
      ]
    };
  },
  
  // Add marker to map
  addMarker: function(position, title) {
    console.log(`Adding marker at ${position.lat},${position.lng} with title ${title}`);
    
    return {
      id: `marker${Date.now()}`,
      position: position,
      title: title
    };
  }
};

// Payments & Subscriptions API
const PaymentAPI = {
  // Initialize payment system
  init: function() {
    console.log("Initializing payment system");
    
    return {
      status: "ready",
      availableMethods: ["credit_card", "bank_transfer", "mobile_payment"]
    };
  },
  
  // Get subscription plans
  getSubscriptionPlans: function() {
    return [
      {
        id: "basic",
        name: "Basic",
        price: 0,
        currency: "KRW",
        features: [
          "Access to community forums",
          "Basic visa information",
          "Limited service provider listings"
        ],
        recommended: false
      },
      {
        id: "premium",
        name: "Premium",
        price: 9900,
        currency: "KRW",
        features: [
          "Priority visa appointment booking",
          "Exclusive housing deals",
          "Language learning resources",
          "Community event invitations",
          "Personalized assistance"
        ],
        recommended: true
      },
      {
        id: "family",
        name: "Family",
        price: 19900,
        currency: "KRW",
        features: [
          "All Premium features",
          "Up to 4 family members",
          "Family event invitations",
          "School application assistance",
          "Family healthcare guidance"
        ],
        recommended: false
      }
    ];
  },
  
  // Process payment
  processPayment: function(amount, method, details) {
    console.log(`Processing payment of ${amount} via ${method}`);
    
    // Simulate payment processing
    return {
      transactionId: `txn${Date.now()}`,
      amount: amount,
      currency: "KRW",
      method: method,
      status: "completed",
      timestamp: new Date().toISOString()
    };
  },
  
  // Subscribe to plan
  subscribeToPlan: function(planId, paymentMethod) {
    console.log(`Subscribing to plan ${planId} using ${paymentMethod}`);
    
    // Simulate subscription
    return {
      subscriptionId: `sub${Date.now()}`,
      planId: planId,
      status: "active",
      startDate: new Date().toISOString(),
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days later
    };
  }
};

// Push Notifications API
const NotificationAPI = {
  // Initialize notifications
  init: function() {
    console.log("Initializing notification system");
    
    return {
      status: "initialized",
      permission: "granted"
    };
  },
  
  // Request permission
  requestPermission: function() {
    console.log("Requesting notification permission");
    
    return {
      status: "granted"
    };
  },
  
  // Get notification settings
  getSettings: function() {
    return {
      visaReminders: true,
      eventAlerts: true,
      communityMessages: true,
      referralUpdates: true
    };
  },
  
  // Update notification settings
  updateSettings: function(settings) {
    console.log(`Updating notification settings: ${JSON.stringify(settings)}`);
    
    return {
      status: "updated",
      settings: settings
    };
  },
  
  // Get recent notifications
  getRecentNotifications: function() {
    return [
      {
        id: "notif1",
        type: "visa",
        title: "Visa Expiry Reminder",
        message: "Your visa expires in 30 days. Start the renewal process now.",
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        read: false
      },
      {
        id: "notif2",
        type: "event",
        title: "New Event Near You",
        message: "Language Exchange Meetup tomorrow at 7 PM in Hongdae.",
        timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        read: true
      },
      {
        id: "notif3",
        type: "community",
        title: "Question Answered",
        message: "David Chen answered your question about housing contracts.",
        timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        read: true
      }
    ];
  },
  
  // Send test notification
  sendTestNotification: function() {
    console.log("Sending test notification");
    
    return {
      id: `notif${Date.now()}`,
      type: "test",
      title: "Test Notification",
      message: "This is a test notification from Konnect.",
      timestamp: new Date().toISOString(),
      read: false
    };
  }
};

// Authentication API
const AuthAPI = {
  // Initialize authentication
  init: function() {
    console.log("Initializing authentication system");
    
    return {
      status: "initialized",
      isLoggedIn: this.isLoggedIn()
    };
  },
  
  // Check if user is logged in
  isLoggedIn: function() {
    // Simulate login check
    return localStorage.getItem("konnect_user") !== null;
  },
  
  // Get current user
  getCurrentUser: function() {
    if (!this.isLoggedIn()) {
      return null;
    }
    
    // Simulate getting user data
    return {
      id: "user123",
      name: "Alex Kim",
      email: "alex.kim@example.com",
      avatar: "assets/avatars/user1.jpg",
      isPremium: localStorage.getItem("isPremium") === "true"
    };
  },
  
  // Login with email and password
  login: function(email, password) {
    console.log(`Logging in user ${email}`);
    
    // Simulate login
    if (email && password) {
      const userData = {
        id: "user123",
        name: "Alex Kim",
        email: email,
        avatar: "assets/avatars/user1.jpg",
        isPremium: false
      };
      
      localStorage.setItem("konnect_user", JSON.stringify(userData));
      
      return {
        status: "success",
        user: userData
      };
    }
    
    return {
      status: "error",
      message: "Invalid email or password"
    };
  },
  
  // Login with social provider
  socialLogin: function(provider) {
    console.log(`Logging in with ${provider}`);
    
    // Simulate social login
    const userData = {
      id: "user123",
      name: "Alex Kim",
      email: `alex.kim@${provider.toLowerCase()}.com`,
      avatar: "assets/avatars/user1.jpg",
      isPremium: false,
      provider: provider
    };
    
    localStorage.setItem("konnect_user", JSON.stringify(userData));
    
    return {
      status: "success",
      user: userData
    };
  },
  
  // Register new user
  register: function(name, email, password) {
    console.log(`Registering new user ${name} with email ${email}`);
    
    // Simulate registration
    if (name && email && password) {
      const userData = {
        id: "user123",
        name: name,
        email: email,
        avatar: "assets/avatars/default.jpg",
        isPremium: false
      };
      
      localStorage.setItem("konnect_user", JSON.stringify(userData));
      
      return {
        status: "success",
        user: userData
      };
    }
    
    return {
      status: "error",
      message: "Invalid registration data"
    };
  },
  
  // Logout
  logout: function() {
    console.log("Logging out user");
    
    // Simulate logout
    localStorage.removeItem("konnect_user");
    
    return {
      status: "success"
    };
  }
};

// Data Sync API
const DataSyncAPI = {
  // Initialize data sync
  init: function() {
    console.log("Initializing data sync");
    
    return {
      status: "initialized",
      lastSync: localStorage.getItem("konnect_last_sync") || null
    };
  },
  
  // Sync user data
  syncUserData: function() {
    console.log("Syncing user data");
    
    // Simulate data sync
    const now = new Date().toISOString();
    localStorage.setItem("konnect_last_sync", now);
    
    return {
      status: "success",
      timestamp: now,
      syncedItems: 12
    };
  },
  
  // Get user preferences
  getUserPreferences: function() {
    // Simulate getting preferences
    return {
      language: localStorage.getItem("language") || "en",
      theme: localStorage.getItem("theme") || "light",
      notifications: localStorage.getItem("notifications") !== "false",
      dataUsage: localStorage.getItem("dataUsage") || "normal"
    };
  },
  
  // Update user preferences
  updateUserPreferences: function(preferences) {
    console.log(`Updating user preferences: ${JSON.stringify(preferences)}`);
    
    // Simulate updating preferences
    for (const [key, value] of Object.entries(preferences)) {
      localStorage.setItem(key, value);
    }
    
    return {
      status: "success",
      preferences: this.getUserPreferences()
    };
  },
  
  // Backup user data
  backupUserData: function() {
    console.log("Backing up user data");
    
    // Simulate backup
    return {
      status: "success",
      timestamp: new Date().toISOString(),
      size: "2.4 MB"
    };
  },
  
  // Restore user data
  restoreUserData: function(backupId) {
    console.log(`Restoring user data from backup ${backupId}`);
    
    // Simulate restore
    return {
      status: "success",
      timestamp: new Date().toISOString(),
      restoredItems: 15
    };
  }
};

// Export all APIs
window.KonnectAPI = {
  Chat: ChatAPI,
  Map: MapAPI,
  Payment: PaymentAPI,
  Notification: NotificationAPI,
  Auth: AuthAPI,
  DataSync: DataSyncAPI
};
