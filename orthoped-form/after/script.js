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
        console.log('screen is smaller than 530px')
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
        console.log('screen is smaller than 530px')
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
console.log(dropdownButton);
console.log(dropdownContent);

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

// Handling 'required' feature on checkbox based question

    let allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    let allCheckboxesArray = Array.from(allCheckboxes);

    function returnsAllAssociatedCheckboxes(checkbox) {
        let checkboxParent = checkbox.parentElement;
        let checkboxes = Array.from(checkboxParent.querySelectorAll('input[type="checkbox"]'));
        return checkboxes;
    }

    function removeRequiredFromAssociatedCheckboxes(checkbox) {
        let checkboxes = returnsAllAssociatedCheckboxes(checkbox);
        for (let checkbox of checkboxes) {
            if (checkbox.hasAttribute("required")) {
                checkbox.removeAttribute("required");
            }
        }          
    }

    allCheckboxesArray.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            removeRequiredFromAssociatedCheckboxes(checkbox);
        })
    })

// Handling the 'Other' checkbox's text input, so that it becomes required when the checkbox is selected

    let otherCheckbox = document.getElementById("q8-a7");
    let otherTextInput = document.getElementById("q8-a7-text");

    function handleRequiredOnTextInput(checkbox) {
        if (checkbox.checked) {
            otherTextInput.setAttribute("required", "");
        } else {
            otherTextInput.removeAttribute("required");
        }
    }

    otherCheckbox.addEventListener("change", function() {
        handleRequiredOnTextInput(otherCheckbox);
    });


// Handling steps navigation

    const back = document.getElementById("back");
    const next = document.getElementById("next");
    const submit = document.getElementById("submit");
    const formButtons = [back, next, submit];

    const formSteps = Array.from(document.getElementsByClassName("step"));
    const firstStep = formSteps[0];
    const lastStep = formSteps[formSteps.length - 1];

    function displayButton(button) {
        button.classList.remove("hidden");
    }

    function hideAllButtons(buttons) {
        for (let button of buttons) {
            button.classList.add("hidden");
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
    
    let currentStep = getCurrentStep(formSteps);

    function handleButtonsDisplay(currentStep, buttons, back, next, submit) {
        hideAllButtons(buttons);
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
    
    handleButtonsDisplay(currentStep, formButtons, back, next, submit, formSteps);

    next.addEventListener("click", function(event) {

        let currentStepIndex = getCurrentStepIndex(formSteps, currentStep);
        let nextStep = formSteps[currentStepIndex + 1];
        let requiredElements = returnArrayOfInputsFromCurrentRequiredQuestions(); // I moved this from inside the below if statement

        if (nextStep) {

            hidesAllRequiredMessages();

            if (checksIfRequiredInputIsMissing(requiredElements) === true) {
                handleRequiredMessages(requiredElements);
            } else {
                currentStep.classList.add("hidden");
                nextStep.classList.remove("hidden");
                currentStep = nextStep;
                handleButtonsDisplay(currentStep, formButtons, back, next, submit, formSteps);
            }
        }
    });

    back.addEventListener("click", function(event) {
        
        let currentStepIndex = getCurrentStepIndex(formSteps, currentStep);
        let previousStep = formSteps[currentStepIndex - 1];
        let requiredElements = returnArrayOfInputsFromCurrentRequiredQuestions(); 

        if (previousStep) {

            currentStep.classList.add("hidden");
            previousStep.classList.remove("hidden");
            currentStep = previousStep;
            // Call the function to get required questions for the new current step
            returnsObjectOfRequiredElementsGroupedByType(requiredElements);
            checksIfRequiredInputIsMissing(requiredElements); // Validate the new current step

            handleButtonsDisplay(currentStep, formButtons, back, next, submit, formSteps);
        }
    })

// Handle manual validation

    function handleRequiredMessages(requiredElements) {
        returnsArrayOfUnansweredRequiredInputs(requiredElements);
        console.log("updated unanswered questions", returnsArrayOfUnansweredRequiredInputs(requiredElements));
        displaysRequiredMessageOnUnansweredQuestions(requiredElements);
    }
    

    function returnArrayOfInputsFromCurrentRequiredQuestions() {
        let currentStep = getCurrentStep(formSteps);
        let requiredElements = Array.from(currentStep.querySelectorAll("[required]"));

        
        return requiredElements;
    }

    let requiredElements = returnArrayOfInputsFromCurrentRequiredQuestions();
   
    function returnsObjectOfRequiredElementsGroupedByType(requiredElements) {
        let requiredElementsGroupedByType = {
            select: [],
            radio: [],
            checkbox: [],
            text: [],
            textarea: []
        };
        
        requiredElements.forEach(element => {
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
        console.log('testing requiredElementsGroupedByType', requiredElementsGroupedByType);
        return requiredElementsGroupedByType;
    }

    function checksIfRequiredInputIsMissing(requiredElements) {

        let object = returnsObjectOfRequiredElementsGroupedByType(requiredElements);
        
        let missingInput = false;

        for (const [key, values] of Object.entries(object)) {
            if (values.length > 0) {
                if (key === "select") {
                    for (let value of values) {
                        if (checksOptionIsSelected(value) === false) {
                            missingInput = true;
                        }
                    }                
                } else if (key === "radio") {
                    for (let value of values) {
                        if (checksRadioIsClicked(value) === false) {
                            missingInput = true;
                        }
                    }
                } else if (key === "checkbox") {
                    for (let value of values) {
                        if (checksCheckboxIsClicked(value) === false) {
                            missingInput = true;
                        }
                    }
                } else if (key === "text") {
                    for (let value of values) {
                        if (checksTextInputIsFilled(value) === false) {
                            missingInput = true;
                        }
                    }
                } else if (key === "textarea") {
                    for (let value of values) {
                        if (checksTextareaIsFilled(value) === false) {
                            missingInput = true;
                        }
                    }
                }
            }
        };
        return missingInput;
    }

    function returnsArrayOfUnansweredRequiredInputs(requiredElements) {
        let object = returnsObjectOfRequiredElementsGroupedByType(requiredElements);
        console.log('testing object', object);
        
        let unansweredRequiredInputs = [];

        for (const [key, values] of Object.entries(object)) {
            if (values.length > 0) {
                if (key === "select") {
                    for (let value of values) {
                        if (checksOptionIsSelected(value) === false) {
                            unansweredRequiredInputs.push(value);
                        }
                    }                
                } else if (key === "radio") {
                    for (let value of values) {
                        if (checksRadioIsClicked(value) === false) {
                            unansweredRequiredInputs.push(value);
                        }
                    }
                } else if (key === "checkbox") {
                    for (let value of values) {
                        if (checksCheckboxIsClicked(value) === false) {
                            unansweredRequiredInputs.push(value);
                        }
                    }
                } else if (key === "text") {
                    for (let value of values) {
                        if (checksTextInputIsFilled(value) === false) {
                            unansweredRequiredInputs.push(value);
                        }
                    }
                } else if (key === "textarea") {
                    for (let value of values) {
                        if (checksTextareaIsFilled(value) === false) {
                            unansweredRequiredInputs.push(value);
                        }
                    }
                }
            }
        };
        
        return unansweredRequiredInputs;
    }

    function displaysRequiredMessageOnUnansweredQuestions(requiredElements) {
        let unansweredRequiredInputs = returnsArrayOfUnansweredRequiredInputs(requiredElements);
        console.log("unansweredRequiredInputs:", unansweredRequiredInputs);

        for (let input of unansweredRequiredInputs) {
            let questionContainer = input.closest(".question");
            let requiredMessage = questionContainer.querySelector(".required-message");
            requiredMessage.classList.remove("hidden");
        }
    }

    function hidesAllRequiredMessages() {
        let allRequiredMessages = Array.from(document.querySelectorAll(".required-message"));
        console.log("testing all required message", allRequiredMessages);

        for (let message of allRequiredMessages) {
            message.classList.add("hidden");
        }
    }

    function returnsArrayOfAllAssociatedRadios(value) {      
        let valueQuestion = value.closest('.question');
        let allRadiosOfQuestion = Array.from(valueQuestion.querySelectorAll(`input[name="${CSS.escape(value.name)}"]`));
        console.log(allRadiosOfQuestion);
        return allRadiosOfQuestion;
    }

    function returnsArrayOfAllAssociatedCheckboxes(value) {    
        let valueQuestion = value.closest('.question');
        let allCheckboxesOfQuestion = Array.from(valueQuestion.querySelectorAll(`input[name="${CSS.escape(value.name)}"]`));
        console.log(allCheckboxesOfQuestion);
        return allCheckboxesOfQuestion;
    }

    function checksRadioIsClicked(value) {       
        let allRadios = returnsArrayOfAllAssociatedRadios(value);
        for (let radio of allRadios) {
            if (radio.checked) {
                return true;
            }            
        }
        return false;
    }

    function checksCheckboxIsClicked(value) {  
        let allCheckboxes = returnsArrayOfAllAssociatedCheckboxes(value);
        for (let checkbox of allCheckboxes) {
            if (checkbox.checked) {
                return true;
            }
        }
        return false;
    }

    function checksOptionIsSelected(value) {
        if (value.value !== "") {
            return true;
        }       
        return false;
    }

    function checksTextInputIsFilled(value) {
            if (value.value !== "") {
                return true;
            }
        return false;
    }

    function checksTextareaIsFilled(value) {
            if (value.value !== "") {
                return true;
            }
        return false;
    }

