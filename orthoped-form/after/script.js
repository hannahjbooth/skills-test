// Search bar

const searchLink = document.getElementById("search-link");
const searchBox = document.getElementById("search-box");
const mobileSearchBox = document.getElementById('mobile-search-box');
const mobileSearchLi = document.getElementById('mobile-search-li');
const overlay = document.getElementById("overlay");

searchLink.addEventListener("click", function(event) {
    event.preventDefault();
    toggleSearchBox();
    if (window.innerWidth > 530) {
        toggleDarkeningEffect();
    }
});

function toggleSearchBox() {
    if (window.innerWidth > 530) {
        searchBox.classList.toggle("hidden");
    } else {
        mobileSearchBox.classList.toggle("hidden");
    }
}

// Close search bar upon click elsewhere on the page

    window.addEventListener('click', function(event) {
        if (!searchBox.classList.contains('hidden')) {
            if (!searchBox.contains(event.target) && !searchLink.contains(event.target)) {
                toggleSearchBox();
                toggleDarkeningEffect();
            }
        }
    })


function toggleDarkeningEffect() {
    if (window.innerWidth > 530) {
        overlay.classList.toggle("darkening-effect");
    } else {
        overlay.classList.toggle("darkening-effect");
    }
}


    // If text is in the search input bar, keep new padding-bottom of 10px
    const searchInput = document.getElementById("query");

    searchInput.addEventListener("input", function() {
        const inputValue = searchInput.value;

        if (inputValue) {
            searchInput.classList.add("search-input-filled");
        } else {
            searchInput.classList.remove("search-input-filled");
        }
    });

// Mobile dropdown menu
let dropdownArea = document.getElementById('dropdown');
let dropdownButton = document.getElementById('dropdown-button');
let dropdownContent = document.getElementById('dropdown-content');


function toggleDropdownContent(menu) {
    if (!menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
    } else {
        menu.classList.remove('hidden');
    }
}

dropdownButton.addEventListener('click', function() {
    toggleDropdownContent(dropdownContent);
})

window.addEventListener('scroll', function() {
    dropdownContent.classList.add('hidden');
    mobileSearchBox.classList.add('hidden');
})

window.addEventListener('click', function(event) {
    if (!dropdownArea.contains(event.target)) {
        dropdownContent.classList.add('hidden');
        mobileSearchBox.classList.add('hidden');
    }
})

    // Hide search box when resizing above 530px
    let previousWidth = window.innerWidth;

    window.addEventListener('resize', function() {
        let currentWidth = window.innerWidth;
        if (previousWidth <= 530 && currentWidth > 530) {
            mobileSearchBox.classList.add('hidden');
        }
        previousWidth = currentWidth;
    });


// Page navigation dynamic highlighting

const sections = Array.from(document.querySelectorAll('section'));
const pageNav = document.querySelector(".page-nav-ul");

handlePageNav();

function returnsPageNavLinks() {
    return Array.from(pageNav.querySelectorAll('nav a'));
}

function handlePageNav() {
    if (pageNavExists()) {
        let pageNavLinks = returnsPageNavLinks();
        highlightActiveLink(pageNavLinks);
        window.addEventListener('scroll', highlightActiveLink);
    }
}  

function pageNavExists() {
    if (pageNav === null) {
        return false; 
    }
    return true;
}

function sectionIsInView(sectionPosition) {
    if (sectionPosition.top >= 0 && sectionPosition.top < window.innerHeight / 1.8) {
        return true;
    } else if (sectionPosition.top < 0 && sectionPosition.bottom > window.innerHeight) {
        return true;
    }
    return false;
}

function returnsSectionPosition(section) {
    return section.getBoundingClientRect();
}

function returnsCurrentSection() {
    for (let section of sections) {
        let sectionPosition = returnsSectionPosition(section);
        if (sectionIsInView(sectionPosition)) {
            return section;
        }
    }
    return null;
}

function highlightActiveLink(pageNavLinks) {
    let currentSection = returnsCurrentSection();
    removePreviousActiveClass(pageNavLinks);
    addActiveClassTo(currentSection);
}

function removePreviousActiveClass() {
    let pageNavLinks = returnsPageNavLinks(pageNav);
    for (link of pageNavLinks) {
        link.classList.remove("active");
    }
}

function addActiveClassTo(currentSection) {
    if (!currentSection) {
        return;
    }
    let pageNavLinks = returnsPageNavLinks(pageNav);
    for (link of pageNavLinks) {
        if (link.getAttribute("href") === `#${currentSection.id}`) {
            link.classList.add('active');
        } 
    }
}

// Accordeon

let questions = Array.from(document.getElementsByClassName('accordeon-button'));

for (let question of questions) {
    question.addEventListener('click', () => {
        let parent = question.parentElement;
        let answer = parent.querySelector('.accordeon-content');

        answer.classList.toggle('visible');
    })
}

// FEEDBACK FORM

// Variables and constants

let allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
let allCheckboxesArray = Array.from(allCheckboxes);

let otherCheckbox = document.getElementById("q8-a7");
let otherTextInput = document.getElementById("q8-a7-text");

const back = document.getElementById("back");
const next = document.getElementById("next");
const submit = document.getElementById("submit");
const formButtons = [back, next, submit];

const formSteps = Array.from(document.getElementsByClassName("step"));
const firstStep = formSteps[0];
const lastStep = formSteps[formSteps.length - 1];

let currentRequiredElements = returnArrayOfCurrentlyRequiredElements();

let currentStep = getCurrentStep(formSteps);


// Boolean functions

function isAnyCheckboxChecked(checkboxArray) {
    for (checkbox of checkboxArray) {
        if (checkbox.checked) {
            return true;
        }
    }
    return false;  
}

function isRequiredInputMissing(currentRequiredElements) {
    console.log(currentRequiredElements);
    let object = returnObjectOfRequiredElementsGroupedByType(currentRequiredElements);
    console.log('current reauired elements object', object);
    
    for (const [key, values] of Object.entries(object)) {
        if (values.length > 0) {
            if (key === "select") {
                for (let value of values) {
                    if (isOptionSelected(value) === false) return true;
                }                
            } else if (key === "radio") {
                for (let value of values) {
                    if (isRadioClicked(value) === false) return true;
                }
            } else if (key === "checkbox") {
                for (let value of values) {
                    if (isCheckboxChecked(value) === false) return true;
                }
            } else if (key === "text") {
                for (let value of values) {
                    if (isTextInputFilled(value) === false) return true;
                }
            } else if (key === "textarea") {
                for (let value of values) {
                    if (isTextareaFilled(value) === false) return true;
                }
            }
        }
    }
    return false;
}

function isRadioClicked(value) {       
    let allRadios = returnArrayOfAllAssociatedRadios(value);
    for (let radio of allRadios) {
        if (radio.checked) {
            return true;
        }            
    }
    return false;
}

function isCheckboxChecked(value) {  
    let allAssociatedCheckboxes = returnArrayOfAllAssociatedCheckboxes(value);
    for (let checkbox of allAssociatedCheckboxes) {
        if (checkbox.checked) {
            return true;
        }
    }
    return false;
}

function isOptionSelected(value) {
    if (value.value !== "") {
        return true;
    }       
    return false;
}

function isTextInputFilled(value) {
        if (value.value !== "") {
            return true;
        }
    return false;
}

function isTextareaFilled(value) {
        if (value.value !== "") {
            return true;
        }
    return false;
}


// Functions

function handleCheckboxQuestionValidation() {
    allCheckboxesArray.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            const associatedCheckboxes = returnArrayOfAllAssociatedCheckboxes(checkbox);
            handleCheckboxRequiredMessage(checkbox, associatedCheckboxes);
        });
    });
}

function handleCheckboxRequiredMessage(checkbox, associatedCheckboxes) {
    if (checkbox.checked) {
        console.log('checkbox is checked');
        associatedCheckboxes.forEach(checkbox => checkbox.required = false);                    
    } else if (!isAnyCheckboxChecked(associatedCheckboxes)) {
        associatedCheckboxes.forEach(checkbox => checkbox.required = true);                                   
    }
}

handleCheckboxQuestionValidation();





function handleRequiredOnTextInput(checkbox) {
    if (checkbox.checked) {
        otherTextInput.required = true;
    } else {
        otherTextInput.required = false;
    }
}





// Step display functions

function displayNextStep(currentStep, nextStep) {
    currentStep.classList.add("hidden");
    nextStep.classList.remove("hidden");
}

function displayPreviousStep(currentStep, previousStep) {
    currentStep.classList.add("hidden");
    previousStep.classList.remove("hidden");
}

// Button display functions

function displayButton(button) {
    button.classList.remove("hidden");
}

function hideAllButtons(buttons) {
    for (let button of buttons) {
        button.classList.add("hidden");
    }   
}

function handleButtonsDisplay(currentStep, formButtons) {
    const [back, next, submit] = formButtons;
    hideAllButtons(formButtons);
    if (currentStep === firstStep) {
        displayButton(next);
    } else if (currentStep === lastStep) {
        displayButton(back);
        displayButton(submit);
    } else {
        displayButton(next);
        displayButton(back);
    }
}



function getCurrentStep(steps) {
    for (let step of steps) {
        if (!step.classList.contains("hidden")) {
            return step;
        }
    }
}

function getCurrentStepIndex(steps) {
    for (let i = 0; i < steps.length; i++) {
        if (steps[i] === currentStep) {
            return i;
        }
    }
}



handleButtonsDisplay(currentStep, formButtons);


// Event Listeners

otherCheckbox.addEventListener("change", function() {
    handleRequiredOnTextInput(otherCheckbox);
});
    
next.addEventListener("click", function(event) {

    let currentRequiredElements = returnArrayOfCurrentlyRequiredElements();

    let currentStepIndex = getCurrentStepIndex(formSteps, currentStep);
    let nextStep = formSteps[currentStepIndex + 1];

    if (nextStep) {

        hideAllRequiredMessages();

        if (isRequiredInputMissing(currentRequiredElements) === true) {
            console.log('required input is missing')
            handleRequiredMessages(currentRequiredElements);
        } else {
            displayNextStep(currentStep, nextStep);
            currentStep = nextStep;
            handleButtonsDisplay(currentStep, formButtons);
        }
    }
});

back.addEventListener("click", function(event) {
    
    let currentStepIndex = getCurrentStepIndex(formSteps, currentStep);
    let previousStep = formSteps[currentStepIndex - 1];

    if (previousStep) {

        displayPreviousStep(currentStep, previousStep);
        currentStep = previousStep;
        handleButtonsDisplay(currentStep, formButtons);
    }
});


// 'Required' message display

function handleRequiredMessages(currentRequiredElements) {
    returnArrayOfUnansweredRequiredInputs(currentRequiredElements);
    displayRequiredMessage(currentRequiredElements);
}

function displayRequiredMessage(currentRequiredElements) {
    let unansweredRequiredInputs = returnArrayOfUnansweredRequiredInputs(currentRequiredElements);

    for (let input of unansweredRequiredInputs) {
        let questionContainer = input.closest(".question");
        let requiredMessage = questionContainer.querySelector(".required-message");
        requiredMessage.classList.remove("hidden");
    }
}

function hideAllRequiredMessages() {
    let allRequiredMessages = Array.from(document.querySelectorAll(".required-message"));

    for (let message of allRequiredMessages) {
        message.classList.add("hidden");
    }
}
    

function returnArrayOfCurrentlyRequiredElements() {
    let currentStep = getCurrentStep(formSteps);
    let currentRequiredElements = Array.from(currentStep.querySelectorAll("[required]"));
    return currentRequiredElements;
}

   
function returnObjectOfRequiredElementsGroupedByType(currentRequiredElements) {
    let requiredElementsGroupedByType = {
        select: [],
        radio: [],
        checkbox: [],
        text: [],
        textarea: []
    }; 
    
    currentRequiredElements.forEach(element => {
        if (element.tagName === "INPUT") {
            if (element.type === "radio") {
                requiredElementsGroupedByType.radio.push(element);                    
            } else if (element.type === "checkbox") {
                requiredElementsGroupedByType.checkbox.push(element);
            } else if (element.type === "text") {
                requiredElementsGroupedByType.text.push(element);
            }
        } else if (element.tagName === "SELECT") {
            requiredElementsGroupedByType.select.push(element);
        } else if (element.tagName === "TEXTAREA") {
            requiredElementsGroupedByType.textarea.push(element);
        }
    });
    return requiredElementsGroupedByType;
}



function returnArrayOfUnansweredRequiredInputs(currentRequiredElements) {
    let object = returnObjectOfRequiredElementsGroupedByType(currentRequiredElements);
    
    let unansweredRequiredInputs = [];

    for (const [key, values] of Object.entries(object)) {
        if (values.length > 0) {
            if (key === "select") {
                for (let value of values) {
                    if (isOptionSelected(value) === false) {
                        unansweredRequiredInputs.push(value);
                    }
                }                
            } else if (key === "radio") {
                for (let value of values) {
                    if (isRadioClicked(value) === false) {
                        unansweredRequiredInputs.push(value);
                    }
                }
            } else if (key === "checkbox") {
                for (let value of values) {
                    if (isCheckboxChecked(value) === false) {
                        unansweredRequiredInputs.push(value);
                    }
                }
            } else if (key === "text") {
                for (let value of values) {
                    if (isTextInputFilled(value) === false) {
                        unansweredRequiredInputs.push(value);
                    }
                }
            } else if (key === "textarea") {
                for (let value of values) {
                    if (isTextareaFilled(value) === false) {
                        unansweredRequiredInputs.push(value);
                    }
                }
            }
        }
    };
    return unansweredRequiredInputs;
}



function returnArrayOfAllAssociatedRadios(value) {      
    let valueQuestion = value.closest('.question');
    let allRadiosOfQuestion = Array.from(valueQuestion.querySelectorAll(`input[name="${CSS.escape(value.name)}"]`));
    return allRadiosOfQuestion;
}

function returnArrayOfAllAssociatedCheckboxes(value) {    
    let valueQuestion = value.closest('.question');
    let allCheckboxesOfQuestion = Array.from(valueQuestion.querySelectorAll(`input[name="${CSS.escape(value.name)}"]`));
    return allCheckboxesOfQuestion;
}


