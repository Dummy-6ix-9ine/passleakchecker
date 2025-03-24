const nameInput = document.querySelector('input[type="text"]');
const emailInput = document.querySelector('input[type="email"]');
const messageTextarea = document.querySelector('textarea');
const sendButton = document.querySelector('button');

function validateForm() {
    let valid = true;
    let errorMessages = [];

    if (nameInput.value.trim() === '') {
        valid = false;
        errorMessages.push('Name is required');
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        valid = false;
        errorMessages.push('Please enter a valid email address');
    }

    if (messageTextarea.value.trim() === '') {
        valid = false;
        errorMessages.push('Message cannot be empty');
    }

    if (!valid) {
        alert(errorMessages.join('\n'));
    }

    return valid;
}

sendButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (validateForm()) {
        alert('Message sent successfully!');
        nameInput.value = '';
        emailInput.value = '';
        messageTextarea.value = '';
    }
});
