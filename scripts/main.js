// Signup
if (document.getElementById('signup-form')) {
  document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const res = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({
        username: username.value,
        password: password.value
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    message.textContent = data.message;
    if (data.success) location.href = "/login.html";
  });
}

// Login
if (document.getElementById('login-form')) {
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username.value,
        password: password.value
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    message.textContent = data.message;
    if (data.success) {
      localStorage.setItem('user', username.value);
      location.href = "/chat.html";
    }
  });
}

// Chat (polling demo)
if (document.getElementById('chat-form')) {
  const chatBox = document.getElementById('chat-box');
  document.getElementById('chat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = chatInput.value;
    await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ user: localStorage.getItem('user'), msg }),
      headers: { 'Content-Type': 'application/json' }
    });
    chatInput.value = '';
  });

  // Poll messages
  setInterval(async () => {
    const res = await fetch('/api/chat');
    const data = await res.json();
    chatBox.innerHTML = data.map(m => `<div><strong>${m.user}:</strong> ${m.msg}</div>`).join('');
  }, 1000);
}
