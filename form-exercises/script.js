const form = document.querySelector("form");
const requiredFields = Array.from(document.querySelectorAll('[required]'));



handleFocussingOutValidation(requiredFields);
handleSubmissionEventValidation(form);

function handleSubmissionEventValidation(form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        handleUnansweredQuestions(requiredFields);
        handleSubmissionMessage(requiredFields);
    });
}

function handleFocussingOutValidation(requiredFields) {
    for (const field of requiredFields) {
        field.addEventListener('focusout', (event) => {
            handleAnswerValidityMessagesByFieldType(field);
        });  
    }    
}

function handleUnansweredQuestions(requiredFields) {
    requiredFields.forEach(field => {
        handleAnswerValidityMessagesByFieldType(field);
    });
    focusFirstUnansweredQuestion(requiredFields);
}


/*

PSEUDOCODE
FOR each required input field
    IF user focusses out of a field
        LET field value validity be checked by field type
            IF field type is "text"
                LET text field validity message be handled
                    IF text input has no value
                        LET 'required' message be displayed
                    IF text input has a value
                        IF any message is displayed
                            LET message be deactivated
            IF field type is "email"
                LET email field validity message be handled
                    FOR primary email field
                        IF email value has no value
                            LET 'required' message be displayed
                        IF email value does not match regexp pattern
                            LET 'incorrect email' message be displayed
                        IF email value matches regexp pattern
                            IF any message is displayed
                                LET message be deactivated
                    FOR confirmation email field
                        IF confirmation email value has no value
                            LET 'required' message be displayed
                        IF confirmation email value does not match primary email value
                            LET 'mismatch' message be displayed

LET email field
LET associated email confirmation field                         
    IF user fills both associated email fields
        IF both values are correctly formatted
        IF both values aren't identical
            LET required-message element take message '

IF user clicks submit
    LET default event be prevented
        IF any required question is unanswered OR incorrectly answered
            LET user be notified of any required unanswered question
            LET first answered question be focussed
        IF all questions are answered
            LET form submit
            LET form submission message appear
*/



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

function returnMessageElement(field) {
    return document.getElementById(`${field.id}-required`);
}

function activateRequiredMessage(field) {
    returnMessageElement(field).textContent = 'Required';
}

function activateIncorrectEmailMessage(field) {
    returnMessageElement(field).textContent = 'Incorrect email address';
}

function activateMismatchedEmailsMessage(field) {
    returnMessageElement(field).textContent = 'Email adresses do not match';
}

function returnSubmissionMessageSpan() {
    return document.getElementById('submission-message');
}

function activateSubmissionMessage() {
    returnSubmissionMessageSpan().textContent = 'Your form has been submitted';
}

function deactivateMessage(field) {
    returnMessageElement(field).textContent = '';
}


function handleAnswerValidityMessagesByFieldType(field) {
    if (field.type === "text") {
        handleTextFieldValidityMessage(field);
    } else if (field.type === "email") {
        handleEmailValidityMessage(field);
    }        
}

function handleTextFieldValidityMessage(field) {
    if (!textFieldIsCorrectlyFilled(field)) {
        activateRequiredMessage(field);
    } else deactivateMessage(field);
}

function textFieldIsCorrectlyFilled(field) {
    if (!field.validity.valid) {
        return false;
    }
    return true;
}

// function handleEmailValidityMessage(field) {
//     const primaryEmailField = document.getElementById("email");
//     const confirmationEmailField = document.getElementById("confirm-email");
//     if (field === primaryEmailField) {
//         if (emailFieldIsCorrectlyFilled(field)) {
//             deactivateMessage(field);
//         } else if (!field.value) {
//             activateRequiredMessage(field);
//         } else {
//             activateIncorrectEmailMessage(field);
//         }
//     } else if (field === confirmationEmailField) {
//         if (emailFieldIsCorrectlyFilled(field)) {
//             if (field.value === primaryEmailField.value) {
//                 deactivateMessage(field);            
//             } else {
//                 activateMismatchedEmailsMessage(field);
//             }
//         } else if (!field.value) {
//             activateRequiredMessage(field);
//         } else {
//             activateIncorrectEmailMessage(field);
//         }
//     }
// }

function handleEmailValidityMessage(field) {

    const primaryEmailField = document.getElementById("email");
    const confirmationEmailField = document.getElementById("confirm-email");

    if (emailFieldIsCorrectlyFilled(field)) {
        if (field === primaryEmailField) {
            deactivateMessage(field);
        } else if (field === confirmationEmailField) {
            if (field.value === primaryEmailField.value) {
            deactivateMessage(field);    
            } else {
            activateMismatchedEmailsMessage(field);
            }
        }
    } else if (!field.value) {
        activateRequiredMessage(field);
    } else {
        activateIncorrectEmailMessage(field);
    }
}

function emailFieldIsCorrectlyFilled(field) {
    if (field.value) {
        if (/\w+@\w+\.\w+/.test(field.value)) {
            return true;
        }
        else {
            return false;
        }
    }
}

function fieldIsCorrectlyFilled(field) {
    if (field.type === "text") {
        if (textFieldIsCorrectlyFilled(field)) {
            return true;
        }
    } else if (field.type = "email") {
        if (emailFieldIsCorrectlyFilled(field)) {
            return true;
        }
    } else return false;       
}

// function textFieldHasLetters(field) {
//     if (field.type === "text" || field.type === "email" || field.tagName === "TEXTAREA" ) {
//         return field.value.trim() !== "";
//     }
//     return true;
// }






