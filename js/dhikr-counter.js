// দোয়া কাউন্টার এবং জিকির ট্র্যাকার ফাংশনালিটি

// কাউন্টার ট্র্যাকিং অবজেক্ট
const dhikrTracker = {
  counters: {},
  
  // কাউন্টার বাড়ানো
  increment: function(id) {
    if (!this.counters[id]) {
      this.counters[id] = 0;
    }
    this.counters[id]++;
    this.updateDisplay(id);
    this.saveCounters();
  },
  
  // কাউন্টার রিসেট করা
  reset: function(id) {
    this.counters[id] = 0;
    this.updateDisplay(id);
    this.saveCounters();
  },
  
  // সেট টার্গেট ভ্যালু
  setTarget: function(id, target) {
    if (!this.counters[id]) {
      this.counters[id] = 0;
    }
    this.counters[`${id}_target`] = target;
    this.updateDisplay(id);
    this.saveCounters();
  },
  
  // ডিসপ্লে আপডেট করা
  updateDisplay: function(id) {
    const counterElement = document.getElementById(`counter-${id}`);
    if (counterElement) {
      counterElement.textContent = this.counters[id] || 0;
    }
    
    const targetElement = document.getElementById(`target-${id}`);
    const progressElement = document.getElementById(`progress-${id}`);
    if (targetElement && progressElement && this.counters[`${id}_target`]) {
      const target = this.counters[`${id}_target`];
      const current = this.counters[id] || 0;
      targetElement.textContent = target;
      
      // প্রোগ্রেস বার আপডেট
      const percentage = Math.min((current / target) * 100, 100);
      progressElement.style.width = `${percentage}%`;
      
      if (percentage >= 100) {
        progressElement.classList.add("complete");
      } else {
        progressElement.classList.remove("complete");
      }
    }
  },
  
  // লোকাল স্টোরেজে কাউন্টার সংরক্ষণ করা
  saveCounters: function() {
    localStorage.setItem('dhikrTracker', JSON.stringify(this.counters));
  },
  
  // সংরক্ষিত কাউন্টার লোড করা
  loadCounters: function() {
    const saved = localStorage.getItem('dhikrTracker');
    if (saved) {
      this.counters = JSON.parse(saved);
    }
  },
  
  // সমস্ত কাউন্টার আপডেট করা
  updateAllDisplays: function() {
    for (const id in this.counters) {
      if (!id.includes('_target')) {
        this.updateDisplay(id);
      }
    }
  }
};

// পৃষ্ঠা লোড হলে সংরক্ষিত কাউন্টার লোড করা
document.addEventListener('DOMContentLoaded', () => {
  dhikrTracker.loadCounters();
  dhikrTracker.updateAllDisplays();
  
  // কাউন্টার বাটনে ক্লিক ইভেন্ট লিসেনার যোগ করা
  document.querySelectorAll('.dhikr-counter-btn').forEach(button => {
    const id = button.dataset.dhikrId;
    button.addEventListener('click', () => {
      dhikrTracker.increment(id);
    });
  });
  
  // রিসেট বাটনে ক্লিক ইভেন্ট লিসেনার যোগ করা
  document.querySelectorAll('.dhikr-reset-btn').forEach(button => {
    const id = button.dataset.dhikrId;
    button.addEventListener('click', () => {
      dhikrTracker.reset(id);
    });
  });
  
  // টার্গেট সেট ফর্মে সাবমিট ইভেন্ট লিসেনার যোগ করা
  document.querySelectorAll('.dhikr-target-form').forEach(form => {
    const id = form.dataset.dhikrId;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const targetInput = form.querySelector('.dhikr-target-input');
      const target = parseInt(targetInput.value);
      if (target > 0) {
        dhikrTracker.setTarget(id, target);
      }
    });
  });
});

// ডার্ক মোড টগল ফাংশন
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
}

// ডার্ক মোড সেটিং চেক
document.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
  }
  
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'true') {
    document.body.classList.add('dark-mode');
  }
});
