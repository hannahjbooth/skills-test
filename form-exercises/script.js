const form = document.querySelector("form");
const requiredFields = Array.from(document.querySelectorAll('[required]'));

form.addEventListener('submit', (event) => {
    event.preventDefault();

    checkEmailFormatIsCorrect(emailInputsArray);

    handleUnansweredQuestions(requiredFields);
    handleSubmissionMessage(requiredFields);
});

function handleUnansweredQuestions(requiredFields) {
    handleRequiredMessage(requiredFields);
    focusFirstUnansweredQuestion(requiredFields);
}

function handleRequiredMessage(requiredFields) {
    for (const field of requiredFields) {
        if (!fieldIsCorrectlyFilled(field)) {
            activateRequiredMessage(field);
        } else {
            deactivateRequiredMessage(field);
        }
    }
}

function focusFirstUnansweredQuestion(requiredFields) {
    for (const field of requiredFields) {
        if (!fieldIsCorrectlyFilled(field)) {
            field.focus();
            return;
        }
    }
}

function handleSubmissionMessage(requiredFields) {
    let allFilled = true;

    for (const field of requiredFields) {
        if (!fieldIsCorrectlyFilled(field)) {
            allFilled = false;
            return;
        }
    }

    if (allFilled === true) {
        activateSubmissionMessage();
    }
}


function returnsFieldRequiredMessage(field) {
    return document.getElementById(`${field.id}-required`);
}

function activateRequiredMessage(field) {
    returnsFieldRequiredMessage(field).textContent = 'Required';
}

function returnsSubmissionMessageSpan() {
    return document.getElementById('submission-message');
}

function activateSubmissionMessage() {
    returnsSubmissionMessageSpan().textContent = 'Your form has been submitted'
}

function deactivateRequiredMessage(field) {
    if (field.value) {
        returnsFieldRequiredMessage(field).textContent = '';
    }
}

function fieldIsCorrectlyFilled(field) {
    if (field.validity.valid) {
        if (textFieldHasLetters(field)) {
            return true;
        }
    } else {
        return false;
    }
}

function textFieldHasLetters(field) {
    if (field.type === "text" || field.tagName === "TEXTAREA" ) {
        return field.value.trim() !== "";
    }
    return true;
}

// Email validation

let emailInputsArray = Array.from(document.querySelectorAll('[type="email"]'));
console.log(emailInputsArray);

function checkEmailFormatIsCorrect(emailInputsArray) {
    for (const input of emailInputsArray) {
        if (!input.value) {
            console.log(input, 'email input has no value');
        } else if (/\w+@\w+\.\w+/.test(input.value)) {
            console.log(input, 'email is correct');
        } else {
            console.log(input, 'email is incorrect');
        }
    }
}

// checkEmailFormatIsCorrect(emailInputsArray);



