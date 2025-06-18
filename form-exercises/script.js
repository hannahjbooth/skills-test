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
    for (const field of requiredFields) {
        if (!fieldsAreCorrectlyFilled(field)) {
            activateErrorMessage(field);
        } else {
            deactivateErrorMessage(field);
            activateSubmissionMessage();
        }
    }
});

function showErrorMessage(field) {
    field.setCustomValidity('This value is missing');
}

function returnsFieldErrorSpan(field) {
    return document.getElementById(`${field.id}-error`);
}

function activateErrorMessage(field) {
    returnsFieldErrorSpan(field).textContent = 'Required';
}

function returnsSubmissionMessageSpan() {
    return document.getElementById('submission-message');
}

function activateSubmissionMessage() {
    returnsSubmissionMessageSpan().textContent = 'Your form has been submitted'
}

function deactivateErrorMessage(field) {
    if (field.value) {
        returnsFieldErrorSpan(field).textContent = '';
    }
}

function fieldsAreCorrectlyFilled(field) {
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



