const feedbackTextarea = document.querySelector('textarea');
const submitButton = document.querySelector('button');

function validateFeedback() {
    let valid = true;

    if (feedbackTextarea.value.trim() === '') {
        valid = false;
        alert('Feedback cannot be empty. Please provide your feedback.');
    }

    return valid;
}

submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (validateFeedback()) {
        alert('Thank you for your feedback!');
        feedbackTextarea.value = '';
    }
});
