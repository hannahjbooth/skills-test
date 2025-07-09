const dobInput = document.getElementById("dob");
const form = document.querySelector("form");
const submit = document.getElementById('submit');
const nameInput = document.getElementById('name');
const surnameInput = document.getElementById("surname");
const textarea = document.querySelector('textarea');

const inputs = Array.from(document.querySelectorAll('input'));
const inputsWithoutSubmit = inputs.pop();
const requiredFields = [ ...inputs, textarea];

form.addEventListener('submit', (event) => {
    event.preventDefault();
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


function returnsFieldRequiredSpan(field) {
    return document.getElementById(`${field.id}-required`);
}

function activateRequiredMessage(field) {
    returnsFieldRequiredSpan(field).textContent = 'Required';
}

function returnsSubmissionMessageSpan() {
    return document.getElementById('submission-message');
}

function activateSubmissionMessage() {
    returnsSubmissionMessageSpan().textContent = 'Your form has been submitted'
}

function deactivateRequiredMessage(field) {
    if (field.value) {
        returnsFieldRequiredSpan(field).textContent = '';
    }
}

function fieldIsCorrectlyFilled(field) {
    if (field.validity.valid) {
        if (textFieldHasLetters(field)) {
            return true;
        }
    } else {
        console.log('either not valid or no letters', field)
        return false;
    }
}

function textFieldHasLetters(field) {
    if (field.type === "text" || field.tagName === "TEXTAREA" ) {
        return field.value.trim() !== "";
    }
    return true;
}



