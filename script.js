document.getElementById('loginForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    alert('Please enter both username and password');
    return;
  }

  alert(`Welcome back, ${username}! (Demo login successful)`);
  // Backend login logic can be implemented here later
});

document.getElementById('registerForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('regUsername').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value.trim();
  const invitationCode = document.getElementById('invitationCode').value.trim();

  if (!username || !email || !password || !invitationCode) {
    alert('Please fill all the fields');
    return;
  }

  const validCode = '1814922257846';  // Invitation code from original site

  if (invitationCode !== validCode) {
    alert('Invalid Invitation Code');
    return;
  }

  alert(`Registration successful for ${username}! (Invitation code accepted)`);
  // Backend registration logic can be implemented here later
});
