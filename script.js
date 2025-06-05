const API_URL = 'http://localhost:5000';  // Backend URL

function showSection(id) {
  document.querySelectorAll('section').forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

async function login() {
  const phone = document.getElementById('phone').value.trim();
  const pass = document.getElementById('password').value.trim();

  if (!phone || !pass) {
    alert('Please enter phone number and password.');
    return;
  }

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({phone, password: pass})
    });
    const data = await res.json();
    if (data.success) {
      alert('Login successful! Balance: ' + data.balance);
      showSection('games-section');
    } else {
      alert(data.msg);
    }
  } catch (err) {
    alert('Server error.');
  }
}

async function register() {
  const phone = document.getElementById('reg-phone').value.trim();
  const pass = document.getElementById('reg-password').value.trim();
  const pass2 = document.getElementById('reg-password2').value.trim();

  if (!phone || !pass || !pass2) {
    alert('Please fill all fields.');
    return;
  }

  if (pass !== pass2) {
    alert('Passwords do not match.');
    return;
  }

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({phone, password: pass})
    });
    const data = await res.json();
    if (data.success) {
      alert('Registration successful! You can now login.');
      showSection('login-section');
    } else {
      alert(data.msg);
    }
  } catch (err) {
    alert('Server error.');
  }
}

function logout() {
  alert('Logged out.');
  showSection('login-section');
}

showSection('login-section');
