const form = document.querySelector("form");
const requiredFields = Array.from(document.querySelectorAll('[required]'));
const fieldUserMessages = Array.from(document.getElementsByClassName('message'));
console.log(fieldUserMessages);

handleFocussingOutValidation(requiredFields);
handleSubmissionValidation(form);

function handleSubmissionValidation(form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        handleUnansweredQuestionsOnSubmission(requiredFields);
        handleSubmissionMessage(requiredFields);
    });
}

function handleFocussingOutValidation(requiredFields) {
    for (const field of requiredFields) {
        field.addEventListener('focusout', (event) => {
            handleAnswerValidationMessagesByFieldType(field);
        });  
    }    
}

function handleUnansweredQuestionsOnSubmission(requiredFields) {
    requiredFields.forEach(field => {
        handleAnswerValidationMessagesByFieldType(field);
    });
    focusFirstUnansweredQuestion(requiredFields);
}



// function handleValidationWhileTyping(requiredFields) {
//     for (const field of requiredFields) {
//         field.addEventListener('input', (event) => {
//             handleAnswerValidationMessagesByFieldType(field);
//         });  
//     }    
// }


function focusFirstUnansweredQuestion(requiredFields) {
    for (const field of requiredFields) {
        if (!isFieldCorrectlyFilled(field)) {
            field.focus();
            return;
        }
    }
}

// User message functions

function handleSubmissionMessage(requiredFields) {
    let allFilled = true;

    for (const field of requiredFields) {
        if (!isFieldCorrectlyFilled(field)) {
            allFilled = false;
            return;
        }
    }

    if (allFilled === true) {
        activateSubmissionMessage();
    }
}

function handleAnswerValidationMessagesByFieldType(field) {
    // console.log(field);
    if (field.type === "text" && !isTextFieldForPassword(field)) {
        handleTextFieldValidationMessage(field);
    } else if (field.type === "text" && isTextFieldForPassword(field)) {
        //console.log('password field recognised');
        handlePasswordFieldValidationMessage(field);
    } else if (field.type === "email") {
        handleEmailValidationMessage(field);
    }
}

function handleTextFieldValidationMessage(field) {
    if (!isTextFieldCorrectlyFilled(field)) {
        activateRequiredMessage(field);
    } else deactivateMessage(field);
}

function handlePasswordFieldValidationMessage(field) {
    if (!isPasswordFieldCorrectlyFilled(field)) {
        const fieldValueArray = field.value.split("");

        if (fieldValueArray.length < 8) {
            activateMessageByRequirement(field, 'length');
        } else deactivateMessageByRequirement(field, 'length');

        if (!doesArrayContainOneDigit(fieldValueArray)) {
            activateMessageByRequirement(field, 'digit');
        } else deactivateMessageByRequirement(field, 'digit');

        if (!doesArrayContainOneSpecialChar(fieldValueArray)) {
            activateMessageByRequirement(field, 'special-char');
        } else deactivateMessageByRequirement(field, 'special-char');
    }
}

function handleEmailValidationMessage(field) {

    const primaryEmailField = document.getElementById("email");
    const confirmationEmailField = document.getElementById("confirm-email");

    if (!field.value) {
        activateRequiredMessage(field);

    } else if (field === primaryEmailField) {
        if (isEmailFieldCorrectlyFilled(field)) {
            deactivateMessage(field);
        } else {
            activateIncorrectEmailMessage(field);
        }
    } else if (field === confirmationEmailField) {
        if (field.value === primaryEmailField.value) {
            deactivateMessage(field);    
        } else {
            activateMismatchedEmailsMessage(field);
        }
    }
}

function returnMessageElement(field) {
    return document.getElementById(`${field.id}-message`);
}

function returnMessageElementByRequirement(field, requirementString) {
    return document.getElementById(`${field.id}-${requirementString}`);
}

function returnSubmissionMessageElement() {
    return document.getElementById('submission-message');
}

function activateMismatchedEmailsMessage(field) {
    returnMessageElement(field).textContent = 'Email adresses do not match';
}

function activateMessageByRequirement(field, requirementString) {
    const messageElement = returnMessageElementByRequirement(field, requirementString);
    console.log(messageElement);
    if (requirementString === 'length') {
        messageElement.textContent = 'Requires at least 8 characters';
        console.log(messageElement);
    } else if (requirementString === 'digit') {
        messageElement.textContent = 'Requires at least 1 digit';
        console.log(messageElement);
    } else if (requirementString === 'special-char') {
        messageElement.textContent = 'Requires at least 1 special character';
        console.log(messageElement);
    }
}

function deactivateMessageByRequirement(field, requirementString) {
    const messageElement = returnMessageElementByRequirement(field, requirementString);
    return messageElement.textContent = '';
}

function activateRequiredMessage(field) {
    returnMessageElement(field).textContent = 'Required';
}

function activateIncorrectEmailMessage(field) {
    returnMessageElement(field).textContent = 'Incorrect email address';
}

function activateSubmissionMessage() {
    returnSubmissionMessageElement().textContent = 'Your form has been submitted';
}

function deactivateMessage(field) {
    returnMessageElement(field).textContent = '';
}

// Boolean checks

function doesArrayContainOneDigit(array) {
    const doesArrayContainOneDigit = array.some(char => /\d/.test(char));
    return doesArrayContainOneDigit;
}

function doesArrayContainOneSpecialChar(array) {
    const doesArrayContainOneSpecialChar = array.some(char => /[\W_]/.test(char));
    return doesArrayContainOneSpecialChar;
}

function isPasswordFieldCorrectlyFilled(field) {

    field.addEventListener('input', event => {
        const fieldValueArray = field.value.split("");

        const isCorrectlyFilled = (
            fieldValueArray.length >=8 &&
            doesArrayContainOneDigit(fieldValueArray) &&
            doesArrayContainOneSpecialChar(fieldValueArray)
        );

        return isCorrectlyFilled;
    });
}
    /*
    IF password field has a value
        IF value doesn't include 8 characters
            LET user message show 'requires at least 8 characters'
        IF value doesn't include 1 number
            LET user message show 'requires at least 1 number'
        IF value doesn't include 1 special character
            LET user message 'requires at least 1 special character'

                   // function that handles message to display according to field value
        //if (field.value.split("")[i])


            // FOR each input event on a password field
                // CHECK if field.value is 8 characters long
                // CHECK if a number exists among the characters
                // CHECK if a special character exists among the characters
                // IF all 3 are true,
                    // LET validation message be deactivated
                // ELSE IF any are untrue,
                    // LET respective validation message be activated
    */


const testPasswordField = document.getElementById("password");
console.log(testPasswordField);

isPasswordFieldCorrectlyFilled(testPasswordField);

function isTextFieldCorrectlyFilled(field) {
    if (!field.validity.valid) {
        return false;
    }
    return true;
}

function isEmailFieldCorrectlyFilled(field) {
    if (field.value) {
        if (/\w+@\w+\.\w+/.test(field.value)) {
            return true;
        }
        else {
            return false;
        }
    }
}

function isFieldCorrectlyFilled(field) {
    if (field.type === "text") {
        if (isTextFieldCorrectlyFilled(field)) {
            return true;
        }
    } else if (field.type = "email") {
        if (isEmailFieldCorrectlyFilled(field)) {
            return true;
        }
    } else return false;       
}

function isTextFieldForPassword(field) {
    // console.log(field);
    if (field.id.includes("password")) {
        return true;
    }
    else return false;
}


// requiredFields.forEach(field => {
//     isTextFieldForPassword(field);
//     })

// function textFieldHasLetters(field) {
//     if (field.type === "text" || field.type === "email" || field.tagName === "TEXTAREA" ) {
//         return field.value.trim() !== "";
//     }
//     return true;
// }


function isFieldOneOfPair(field) {
    if (field.classList.contains('pair')) {
        return true;
    }
}

function returnFieldPair(field) {
    return Array.from(document.getElementsByClassName(`${field.id}-pair`));
}


