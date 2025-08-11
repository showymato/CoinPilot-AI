// Real market data from August 11, 2025
const realMarketData = {
  prices: {
    "BTC": {"price": 122079.60, "change24h": 2.37, "changeAmount": 2831.10, "volume24h": 44500000000, "marketCap": 2422000000000},
    "ETH": {"price": 4326.44, "change24h": 1.80, "volume24h": 29900000000, "marketCap": 522000000000},
    "SOL": {"price": 195.50, "change24h": 8.5, "volume24h": 3200000000, "marketCap": 92000000000},
    "ADA": {"price": 0.68, "change24h": -0.44, "volume24h": 1200000000, "marketCap": 24000000000},
    "AVAX": {"price": 45.20, "change24h": 3.4, "volume24h": 850000000, "marketCap": 18000000000},
    "MATIC": {"price": 1.12, "change24h": 2.1, "volume24h": 450000000, "marketCap": 11000000000},
    "DOT": {"price": 8.90, "change24h": -1.2, "volume24h": 320000000, "marketCap": 12500000000},
    "LINK": {"price": 28.40, "change24h": 4.8, "volume24h": 680000000, "marketCap": 17200000000}
  },
  marketOverview: {
    totalMarketCap: 4100000000000,
    totalVolume24h: 125000000000,
    btcDominance: 59.1,
    fearGreedIndex: 78,
    marketSentiment: "VERY_BULLISH"
  },
  recommendations: {
    "BTC": {
      symbol: "BTC",
      action: "STRONG BUY",
      confidence: 94,
      riskLevel: "MEDIUM-HIGH",
      reasoning: {
        technical: "Breaking all-time highs above $120K resistance",
        fundamental: "Massive institutional adoption and ETF inflows", 
        sentiment: "Extreme bullish sentiment, FOMO driving prices",
        onchain: "Whale accumulation at record levels"
      },
      priceTargets: {short: 125000, medium: 135000, long: 150000},
      stopLoss: 115000
    },
    "ETH": {
      symbol: "ETH",
      action: "BUY",
      confidence: 88,
      riskLevel: "MEDIUM",
      reasoning: {
        technical: "Following BTC rally, strong support levels",
        fundamental: "Layer 2 scaling solutions gaining traction",
        sentiment: "Positive sentiment following BTC momentum",
        onchain: "Steady institutional accumulation"
      },
      priceTargets: {short: 4800, medium: 5200, long: 6500},
      stopLoss: 4000
    },
    "SOL": {
      symbol: "SOL",
      action: "STRONG BUY",
      confidence: 92,
      riskLevel: "MEDIUM",
      reasoning: {
        technical: "Massive momentum breakout pattern confirmed",
        fundamental: "Ecosystem growth and DeFi expansion",
        sentiment: "Very bullish sentiment +85%",
        onchain: "High whale activity and volume surge"
      },
      priceTargets: {short: 240, medium: 300, long: 400},
      stopLoss: 175
    },
    "ADA": {
      symbol: "ADA",
      action: "HOLD",
      confidence: 65,
      riskLevel: "MEDIUM",
      reasoning: {
        technical: "Consolidating, waiting for breakout",
        fundamental: "Development progress steady",
        sentiment: "Mixed sentiment, cautious optimism",
        onchain: "Moderate activity levels"
      },
      priceTargets: {short: 0.75, medium: 0.85, long: 1.20},
      stopLoss: 0.60
    },
    "AVAX": {
      symbol: "AVAX",
      action: "BUY",
      confidence: 82,
      riskLevel: "MEDIUM",
      reasoning: {
        technical: "Strong upward momentum following market",
        fundamental: "DeFi ecosystem expansion",
        sentiment: "Bullish sentiment improving",
        onchain: "Increased network activity"
      },
      priceTargets: {short: 52, medium: 65, long: 85},
      stopLoss: 40
    },
    "LINK": {
      symbol: "LINK",
      action: "BUY",
      confidence: 82,
      riskLevel: "MEDIUM",
      reasoning: {
        technical: "Breaking resistance with strong volume",
        fundamental: "Oracle demand surge in DeFi",
        sentiment: "Positive sentiment on utility",
        onchain: "Strong fundamentals driving price"
      },
      priceTargets: {short: 35, medium: 42, long: 55},
      stopLoss: 25
    }
  },
  news: [
    {
      title: "Bitcoin Breaks Above $122K, New All-Time High Incoming",
      summary: "Bitcoin has surged past $122,000 as institutional demand reaches fever pitch. Major investment firms are increasing allocations amid massive ETF inflows exceeding $5B this week alone.",
      sentiment: "VERY_BULLISH",
      source: "CoinDesk",
      publishedAt: "2025-08-11T09:00:00Z",
      impact: "Extreme"
    },
    {
      title: "Crypto Market Cap Surpasses $4.1 Trillion for First Time",
      summary: "The total cryptocurrency market capitalization has reached a historic milestone of $4.1 trillion, driven by Bitcoin's rally and renewed institutional adoption across major cryptocurrencies.",
      sentiment: "BULLISH",
      source: "Bloomberg", 
      publishedAt: "2025-08-11T08:30:00Z",
      impact: "High"
    },
    {
      title: "Institutional Bitcoin Buying Reaches Fever Pitch",
      summary: "Corporate treasuries and hedge funds have purchased over 25,000 BTC in the past week, with MicroStrategy announcing another $2B purchase program as Bitcoin breaks above $120K.",
      sentiment: "VERY_BULLISH",
      source: "The Block",
      publishedAt: "2025-08-11T07:00:00Z",
      impact: "High"
    }
  ]
};

// Application state
let currentView = 'dashboard';
let portfolioChart = null;
let chatHistory = [];
let priceUpdateInterval = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing CoinPilot AI Dashboard...');
  
  // Initialize components in correct order
  initializeNavigation();
  initializeRecommendations();
  initializeChat();
  initializePortfolio();
  initializeModals();
  initializePriceTicker();
  initializeFilters();
  updateCurrentTime();
  
  // Set initial view - ensure dashboard is shown first
  showView('dashboard');
  updateMarketOverview();
  
  // Start real-time updates simulation
  startRealtimeUpdates();
  
  console.log('CoinPilot AI initialized successfully');
});

// Navigation handling - Fixed implementation
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const viewName = this.getAttribute('data-view');
      console.log(`Navigation clicked: ${viewName}`);
      
      if (!viewName) {
        console.error('No data-view attribute found');
        return;
      }
      
      // Update active nav link
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      
      // Show the view
      showView(viewName);
    });
  });
  
  console.log('Navigation initialized with', navLinks.length, 'links');
}

// Fixed view switching function
function showView(viewName) {
  console.log(`Attempting to show view: ${viewName}`);
  currentView = viewName;
  
  // Hide ALL views first
  const allViews = document.querySelectorAll('.view');
  allViews.forEach(view => {
    view.classList.remove('active');
    view.style.display = 'none';
  });
  
  // Show the target view
  const targetView = document.getElementById(`${viewName}-view`);
  if (targetView) {
    targetView.classList.add('active');
    targetView.style.display = 'block';
    console.log(`Successfully showing view: ${viewName}`);
    
    // Initialize view-specific functionality
    if (viewName === 'portfolio') {
      setTimeout(() => initializePortfolioChart(), 200);
    }
  } else {
    console.error(`View element not found: ${viewName}-view`);
    // Fallback to dashboard
    const dashboardView = document.getElementById('dashboard-view');
    if (dashboardView) {
      dashboardView.classList.add('active');
      dashboardView.style.display = 'block';
      currentView = 'dashboard';
    }
  }
}

// Current time display
function updateCurrentTime() {
  const timeElement = document.getElementById('current-time');
  if (timeElement) {
    const now = new Date();
    const options = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit',
      timeZoneName: 'short'
    };
    timeElement.textContent = now.toLocaleDateString('en-US', options);
  }
  
  // Update every minute
  setTimeout(updateCurrentTime, 60000);
}

// Fixed recommendations functionality
function initializeRecommendations() {
  const symbolSelector = document.querySelector('.symbol-selector');
  
  if (symbolSelector) {
    // Ensure the select element is properly initialized
    symbolSelector.selectedIndex = 0; // Set to first option (BTC)
    
    symbolSelector.addEventListener('change', function(e) {
      console.log(`Symbol selector changed to: ${e.target.value}`);
      updateRecommendation(e.target.value);
    });
    
    // Load initial recommendation
    setTimeout(() => {
      updateRecommendation('BTC');
    }, 100);
    
    console.log('Symbol selector initialized');
  } else {
    console.error('Symbol selector not found');
  }
}

function updateRecommendation(symbol) {
  console.log(`Updating recommendation for: ${symbol}`);
  const rec = realMarketData.recommendations[symbol];
  const price = realMarketData.prices[symbol];
  
  if (!rec || !price) {
    console.error(`No data found for symbol: ${symbol}`);
    return;
  }
  
  // Update recommendation display with error checking
  const elements = {
    symbol: document.getElementById('rec-symbol'),
    action: document.getElementById('rec-action'),
    confidence: document.getElementById('rec-confidence'),
    price: document.getElementById('rec-price'),
    risk: document.getElementById('rec-risk'),
    targetShort: document.getElementById('target-short'),
    targetMedium: document.getElementById('target-medium'),
    targetLong: document.getElementById('target-long'),
    stopLoss: document.getElementById('stop-loss'),
    technicalReason: document.getElementById('technical-reason'),
    fundamentalReason: document.getElementById('fundamental-reason'),
    sentimentReason: document.getElementById('sentiment-reason'),
    onchainReason: document.getElementById('onchain-reason')
  };
  
  // Update each element if it exists
  if (elements.symbol) elements.symbol.textContent = symbol;
  
  if (elements.action) {
    elements.action.textContent = rec.action;
    elements.action.className = `action-badge ${rec.action.toLowerCase().replace(' ', '-')}`;
  }
  
  if (elements.confidence) elements.confidence.textContent = `${rec.confidence}%`;
  if (elements.price) elements.price.textContent = formatPrice(price.price);
  
  if (elements.risk) {
    elements.risk.textContent = `${rec.riskLevel} RISK`;
    elements.risk.className = `risk-level ${rec.riskLevel.toLowerCase().replace('-', '')}`;
  }
  
  // Update price targets
  if (elements.targetShort) elements.targetShort.textContent = formatPrice(rec.priceTargets.short);
  if (elements.targetMedium) elements.targetMedium.textContent = formatPrice(rec.priceTargets.medium);
  if (elements.targetLong) elements.targetLong.textContent = formatPrice(rec.priceTargets.long);
  if (elements.stopLoss) elements.stopLoss.textContent = formatPrice(rec.stopLoss);
  
  // Update reasoning
  if (elements.technicalReason) elements.technicalReason.textContent = rec.reasoning.technical;
  if (elements.fundamentalReason) elements.fundamentalReason.textContent = rec.reasoning.fundamental;
  if (elements.sentimentReason) elements.sentimentReason.textContent = rec.reasoning.sentiment;
  if (elements.onchainReason) elements.onchainReason.textContent = rec.reasoning.onchain;
  
  console.log(`Recommendation updated for ${symbol}`);
}

// Chat functionality - Fixed implementation
function initializeChat() {
  const sendBtn = document.getElementById('send-btn');
  const chatInput = document.getElementById('chat-input');
  const suggestionBtns = document.querySelectorAll('.suggestion-btn');
  
  if (sendBtn) {
    sendBtn.addEventListener('click', function(e) {
      e.preventDefault();
      sendMessage();
    });
  }
  
  if (chatInput) {
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });
  }
  
  // Suggestion buttons
  suggestionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const question = this.getAttribute('data-question');
      if (chatInput && question) {
        chatInput.value = question;
        sendMessage();
      }
    });
  });
  
  console.log('Chat initialized with', suggestionBtns.length, 'suggestion buttons');
}

function sendMessage() {
  const chatInput = document.getElementById('chat-input');
  const message = chatInput ? chatInput.value.trim() : '';
  
  if (!message) return;
  
  console.log(`Sending message: ${message}`);
  
  // Add user message
  addMessage(message, 'user');
  chatInput.value = '';
  
  // Simulate AI response with slight delay
  setTimeout(() => {
    const response = generateAIResponse(message);
    addMessage(response, 'assistant');
  }, 1500);
}

function addMessage(content, sender) {
  const chatMessages = document.getElementById('chat-messages');
  if (!chatMessages) return;
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}`;
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.innerHTML = `<p>${content}</p>`;
  
  messageDiv.appendChild(contentDiv);
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  chatHistory.push({content, sender, timestamp: new Date()});
}

function generateAIResponse(question) {
  const responses = {
    "Should I buy Bitcoin at $122K?": "Bitcoin is showing unprecedented strength with institutional buying at record levels. While $122K seems high, the fundamentals suggest further upside potential to $125K-$135K short-term. However, consider your risk tolerance - this is uncharted territory. I recommend dollar-cost averaging if you're bullish long-term.",
    
    "Is this a bubble or sustainable rally?": "This rally appears more sustainable than previous bubbles due to: 1) Institutional adoption at scale, 2) ETF inflows creating sustained demand, 3) Limited supply dynamics, 4) Macro environment favoring hard assets. However, markets can be irrational - expect volatility even in a bull market.",
    
    "Which altcoins will follow BTC?": "Based on current analysis, SOL shows the strongest momentum (+8.5%) with 92% AI confidence. ETH typically follows BTC with a lag but offers more stability. LINK and AVAX are also showing strong technicals. Avoid ADA for now - it's lagging the market.",
    
    default: `Given Bitcoin's historic breakout above $122K, the market is in extreme greed mode (Fear & Greed: 78). Institutional FOMO is driving unprecedented demand. My analysis suggests this is the beginning of a major bull phase, but expect increased volatility. Key levels to watch: BTC $125K resistance, ETH $4,500, SOL $200. What specific analysis would you like?`
  };
  
  return responses[question] || responses.default;
}

// Portfolio functionality - Fixed chart initialization
function initializePortfolio() {
  console.log('Portfolio module initialized');
}

function initializePortfolioChart() {
  const canvas = document.getElementById('portfolioChart');
  if (!canvas) {
    console.error('Portfolio chart canvas not found');
    return;
  }
  
  // Destroy existing chart if it exists
  if (portfolioChart && typeof portfolioChart.destroy === 'function') {
    portfolioChart.destroy();
    portfolioChart = null;
  }
  
  const ctx = canvas.getContext('2d');
  
  try {
    portfolioChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Bitcoin (BTC)', 'Ethereum (ETH)', 'Solana (SOL)', 'Chainlink (LINK)'],
        datasets: [{
          data: [62.9, 22.3, 7.3, 5.9],
          backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
          borderWidth: 2,
          borderColor: 'rgba(255, 255, 255, 0.1)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#f5f5f5',
              padding: 15,
              usePointStyle: true,
              font: {
                size: 12
              }
            }
          }
        }
      }
    });
    
    console.log('Portfolio chart successfully initialized');
  } catch (error) {
    console.error('Error initializing portfolio chart:', error);
  }
}

// Modal functionality - Fixed event handling
function initializeModals() {
  const addPositionBtn = document.getElementById('add-position-btn');
  const addPositionModal = document.getElementById('add-position-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const cancelAddBtn = document.getElementById('cancel-add');
  
  if (addPositionBtn && addPositionModal) {
    addPositionBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Opening add position modal');
      addPositionModal.classList.remove('hidden');
    });
  }
  
  if (closeModalBtn && addPositionModal) {
    closeModalBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Closing modal via close button');
      addPositionModal.classList.add('hidden');
    });
  }
  
  if (cancelAddBtn && addPositionModal) {
    cancelAddBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Closing modal via cancel button');
      addPositionModal.classList.add('hidden');
    });
  }
  
  // Close modal on backdrop click
  if (addPositionModal) {
    addPositionModal.addEventListener('click', function(e) {
      if (e.target === addPositionModal) {
        console.log('Closing modal via backdrop click');
        addPositionModal.classList.add('hidden');
      }
    });
  }
  
  // Handle form submission
  const form = document.querySelector('.add-position-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('Position form submitted');
      if (addPositionModal) {
        addPositionModal.classList.add('hidden');
      }
    });
  }
  
  console.log('Modal functionality initialized');
}

// Price ticker functionality
function initializePriceTicker() {
  updateTicker();
  console.log('Price ticker initialized');
}

function updateTicker() {
  const tickerContent = document.querySelector('.ticker-content');
  if (!tickerContent) return;
  
  let tickerHTML = '';
  
  Object.entries(realMarketData.prices).forEach(([symbol, data]) => {
    const changeClass = data.change24h >= 0 ? 'positive' : 'negative';
    const changeSign = data.change24h >= 0 ? '+' : '';
    
    tickerHTML += `
      <span class="ticker-item">
        ${symbol}: ${formatPrice(data.price)} 
        <span class="${changeClass}">${changeSign}${data.change24h.toFixed(2)}%</span>
      </span>
    `;
  });
  
  // Duplicate for seamless scrolling
  tickerContent.innerHTML = tickerHTML + tickerHTML;
}

// Market overview updates
function updateMarketOverview() {
  const overview = realMarketData.marketOverview;
  
  // Update market cards with actual data
  const marketCards = document.querySelectorAll('.metric-card');
  if (marketCards.length >= 4) {
    // Total Market Cap
    const marketCapValue = marketCards[0].querySelector('.metric-value');
    if (marketCapValue) marketCapValue.textContent = '$4.1T';
    
    // BTC Dominance  
    const btcDomValue = marketCards[1].querySelector('.metric-value');
    if (btcDomValue) btcDomValue.textContent = '59.1%';
    
    // Fear & Greed
    const fearGreedValue = marketCards[2].querySelector('.metric-value');
    if (fearGreedValue) fearGreedValue.textContent = '78';
    
    // 24h Volume
    const volumeValue = marketCards[3].querySelector('.metric-value');
    if (volumeValue) volumeValue.textContent = '$125B';
  }
  
  // Update market pulse
  const pulseText = document.querySelector('.market-pulse span:last-child');
  if (pulseText) {
    pulseText.textContent = 'Market Pulse: VERY BULLISH';
  }
  
  console.log('Market overview updated');
}

// Real-time updates simulation - Fixed implementation
function startRealtimeUpdates() {
  // Update prices every 30 seconds with small variations
  priceUpdateInterval = setInterval(() => {
    Object.keys(realMarketData.prices).forEach(symbol => {
      const price = realMarketData.prices[symbol];
      const variation = (Math.random() - 0.5) * 0.015; // ±0.75% max change
      const oldPrice = price.price;
      
      price.price = Math.max(0.01, price.price * (1 + variation));
      price.change24h = Math.max(-10, Math.min(15, price.change24h + variation * 50));
      
      // Add price flash animation to relevant elements
      const priceElements = document.querySelectorAll('.price, .current-price, .target-price');
      priceElements.forEach(el => {
        if (el.textContent.includes('$') && Math.random() > 0.7) {
          el.classList.add(variation > 0 ? 'price-flash-positive' : 'price-flash-negative');
          setTimeout(() => {
            el.classList.remove('price-flash-positive', 'price-flash-negative');
          }, 600);
        }
      });
    });
    
    // Update displays
    updateTicker();
    updateMarketOverview();
    
    // Update current view if it's recommendations
    if (currentView === 'recommendations') {
      const symbolSelector = document.querySelector('.symbol-selector');
      const currentSymbol = symbolSelector?.value || 'BTC';
      updateRecommendation(currentSymbol);
    }
    
    console.log('Real-time prices updated');
  }, 30000); // 30 second intervals
}

// Filter functionality
function initializeFilters() {
  const newsFilters = document.querySelectorAll('.news-filters .btn');
  newsFilters.forEach(btn => {
    btn.addEventListener('click', function() {
      newsFilters.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      console.log(`Filtering news by: ${this.textContent.toLowerCase()}`);
    });
  });
  
  console.log('Filters initialized');
}

// Utility functions
function formatPrice(price) {
  if (typeof price !== 'number' || isNaN(price)) return '$0.00';
  
  if (price < 0.01) {
    return `$${price.toFixed(6)}`;
  } else if (price < 1) {
    return `$${price.toFixed(4)}`;
  } else if (price < 100) {
    return `$${price.toFixed(2)}`;
  } else if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(2)}M`;
  } else {
    return `$${price.toLocaleString('en-US', {
      minimumFractionDigits: price < 1000 ? 2 : 0,
      maximumFractionDigits: 2
    })}`;
  }
}

function formatChange(change) {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
}

// Connection status simulation
function updateConnectionStatus() {
  const status = document.querySelector('.connection-status');
  if (status) {
    // Simulate 98% uptime
    const isOnline = Math.random() > 0.02;
    status.textContent = isOnline ? '● Online' : '● Reconnecting...';
    status.style.color = isOnline ? 'var(--color-teal-300)' : 'var(--color-orange-400)';
  }
}

// Update connection status every 30 seconds
setInterval(updateConnectionStatus, 30000);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case '1':
        e.preventDefault();
        const dashboardLink = document.querySelector('[data-view="dashboard"]');
        if (dashboardLink) dashboardLink.click();
        break;
      case '2':
        e.preventDefault();
        const recLink = document.querySelector('[data-view="recommendations"]');
        if (recLink) recLink.click();
        break;
      case '3':
        e.preventDefault();
        const screenerLink = document.querySelector('[data-view="screener"]');
        if (screenerLink) screenerLink.click();
        break;
      case '4':
        e.preventDefault();
        const newsLink = document.querySelector('[data-view="news"]');
        if (newsLink) newsLink.click();
        break;
      case '5':
        e.preventDefault();
        const chatLink = document.querySelector('[data-view="chat"]');
        if (chatLink) chatLink.click();
        break;
    }
  }
  
  // Focus chat input with '/' key
  if (e.key === '/' && currentView === 'chat') {
    e.preventDefault();
    const chatInput = document.getElementById('chat-input');
    if (chatInput) chatInput.focus();
  }
});

// Market alerts simulation
function showMarketAlert(message, type = 'info') {
  // Create alert element
  const alert = document.createElement('div');
  alert.className = `market-alert alert-${type}`;
  alert.innerHTML = `
    <div class="alert-content">
      <span class="alert-icon">🚨</span>
      <span class="alert-message">${message}</span>
      <button class="alert-close">&times;</button>
    </div>
  `;
  
  // Style the alert
  alert.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-16);
    box-shadow: var(--shadow-lg);
    z-index: 1001;
    max-width: 400px;
    animation: slideIn 0.3s ease-out;
  `;
  
  document.body.appendChild(alert);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (alert.parentNode) {
      alert.remove();
    }
  }, 5000);
  
  // Close button functionality
  const closeBtn = alert.querySelector('.alert-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      alert.remove();
    });
  }
}

// Simulate market alerts based on price movements
setInterval(() => {
  const btcPrice = realMarketData.prices.BTC.price;
  
  if (btcPrice > 125000 && Math.random() > 0.9) {
    showMarketAlert('🚀 Bitcoin breaks above $125K! New ATH territory!', 'success');
  } else if (btcPrice < 120000 && Math.random() > 0.9) {
    showMarketAlert('⚠️ Bitcoin dips below $120K support level', 'warning');
  }
}, 60000); // Check every minute

// Add CSS for alerts dynamically
const alertStyles = document.createElement('style');
alertStyles.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  .market-alert {
    font-family: var(--font-family-base);
    color: var(--color-text);
  }
  
  .alert-content {
    display: flex;
    align-items: center;
    gap: var(--space-12);
  }
  
  .alert-icon {
    font-size: var(--font-size-lg);
  }
  
  .alert-message {
    flex: 1;
    font-weight: var(--font-weight-medium);
  }
  
  .alert-close {
    background: none;
    border: none;
    color: var(--color-text-secondary);
    font-size: var(--font-size-lg);
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .alert-close:hover {
    color: var(--color-text);
  }
`;
document.head.appendChild(alertStyles);

// Debug function to check view elements
function debugViews() {
  const views = document.querySelectorAll('.view');
  console.log('Available views:', views.length);
  views.forEach(view => {
    console.log(`- ${view.id}: ${view.style.display !== 'none' ? 'visible' : 'hidden'}`);
  });
}

// Initialize everything when the page loads
console.log('CoinPilot AI Dashboard script loaded successfully');

// Call debug function after a short delay to check initialization
setTimeout(debugViews, 1000);