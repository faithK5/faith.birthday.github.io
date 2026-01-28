// Handle RSVP form submission
document.getElementById('rsvp-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    attending: formData.get('attending'),
    message: formData.get('message'),
    timestamp: new Date().toLocaleString()
  };

  // Send to FormSubmit.co (free service that sends email)
  fetch('https://formspree.io/f/xyzpqwer', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if(response.ok) {
      alert('RSVP submitted successfully! Thank you for your response.');
      // Store in localStorage as backup
      let rsvps = JSON.parse(localStorage.getItem('rsvps') || '[]');
      rsvps.push(data);
      localStorage.setItem('rsvps', JSON.stringify(rsvps));
      document.getElementById('rsvp-form').reset();
    } else {
      throw new Error('Submission failed');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    // Fallback: store locally if server fails
    let rsvps = JSON.parse(localStorage.getItem('rsvps') || '[]');
    rsvps.push(data);
    localStorage.setItem('rsvps', JSON.stringify(rsvps));
    alert('RSVP submitted locally. We will process it soon!');
    document.getElementById('rsvp-form').reset();
  });
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
  // Animate sections on scroll
  const sections = document.querySelectorAll('section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(section);
  });

  // Countdown timer (assuming party date is Feb 6, 2026)
  const partyDate = new Date('2026-02-06T00:00:00').getTime();
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = partyDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
      countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      
      if (distance < 0) {
        countdownElement.innerHTML = "The party has started!";
      }
    }
  }
  
  setInterval(updateCountdown, 1000);
});