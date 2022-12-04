const genders = document.querySelector('.switcher');
const age = document.querySelector('#age');
const height = document.querySelector('#height');
const weight = document.querySelector('#weight');
const activities = document.querySelector('.radios-group');
const resetButton = document.querySelector('.form__reset-button');
const submitButton = document.querySelector('.form__submit-button');
const normalCalories = document.querySelector("#calories-norm");
const minimalCalories = document.querySelector("#calories-minimal");
const maximalCalories = document.querySelector("#calories-maximal");
const resultTab = document.querySelector('.counter__result');
let gender = 'male';
let activity = 'min';

genders.addEventListener('change', (event) => {
    gender = event.target.value;
})


const keepNumbers = (event, state) => {
    if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
		(event.keyCode == 65 && event.ctrlKey === true) ||
		(event.keyCode >= 35 && event.keyCode <= 39)) {
		
		return;
	} else {
		if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
            event.preventDefault();
        } else {
            event.preventDefault();
            state.value += event.key;
        }
    }
    activateReset();
    activateSubmit();
}

age.addEventListener('keydown', (event) => {
    keepNumbers(event, age);
});

height.addEventListener('keydown', (event) => {
    keepNumbers(event, height);
});

weight.addEventListener('keydown', (event) => {
    keepNumbers(event, weight);
});

activities.addEventListener('change', (event) => {
    activity = event.target.value;
})


const activateReset = () => {
    resetButton.disabled = false;
}

resetButton.addEventListener('click', () => {
    resetButton.disabled = true;
    submitButton.disabled = true;
    resultTab.classList.add("counter__result--hidden");
    HTMLFormElement.prototype.reset.call(resetButton.form);
    gender = 'male';
    activity = 'min';
})

const activateSubmit = () => {
    if (age.value  && height.value && weight.value) {
        submitButton.disabled = false;
    }
    
}

const getActivityRatio = (activity) => {
    switch(activity) {
        case 'low':
            return 1.375;
        case 'medium':
            return 1.55;
        case 'high':
            return 1.725;
        case 'max':
            return 1.9;
        default:
            return 1.2;
    }
}

const getNormalCalories = (gender, age, height, weight, activityRatio) => {
    switch(gender) {
        case 'female':
            return activityRatio * ((10 * weight) + (6.25 * height) - (5 * age) - 161);
        default:
            return activityRatio * ((10 * weight) + (6.25 * height) - (5 * age) + 5);
    }
}

const setCalories = (normCal) => {
    normalCalories.textContent = Math.round(normCal);
    minimalCalories.textContent = Math.round(normCal * 0.85);
    maximalCalories.textContent = Math.round(normCal * 1.15);
}

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    setCalories(getNormalCalories(gender, age.value, height.value, weight.value, getActivityRatio(activity)));
    resultTab.classList.remove("counter__result--hidden");
})