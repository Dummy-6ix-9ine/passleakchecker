document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('passwordInput');
  const checkButton = document.getElementById('checkButton');
  const resultSection = document.getElementById('resultSection');

  checkButton.disabled = true;

  passwordInput.addEventListener('input', () => {
    checkButton.disabled = !passwordInput.value;
  });

  checkButton.addEventListener('click', async () => {
    const password = passwordInput.value.trim();

    if (!password) {
      alert('Please enter a password.');
      return;
    }

    resultSection.classList.add('hidden');

    const hashedPassword = await hashPassword(password);
    const prefix = hashedPassword.slice(0, 5).toUpperCase();

    try {
      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      const data = await response.text();

      const suffix = hashedPassword.slice(5).toUpperCase();
      const lines = data.split('\n');
      const matches = lines.filter(line => line.startsWith(suffix));

      resultSection.classList.remove('hidden');

      if (matches.length > 0) {
        document.querySelector('.result-safe').innerHTML = `
          <i class="fas fa-exclamation-triangle"></i>
          <h2>Your password has been leaked!</h2>
          <h3>Found ${matches[0].split(':')[1]} occurrences in the breach.</h3>
        `;
      } else {
        document.querySelector('.result-safe').innerHTML = `
          <i class="fas fa-check-circle"></i>
          <h2>You are safe for now</h2>
        `;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred. Please try again later.');
    }
  });
});

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const buffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(buffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
