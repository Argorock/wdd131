// the local storage save function was done by ai, because i wanted to implement it, but i didn't really want it
// to be part of the assignment, but i thought you'd still probably enjoy it.

// function saveCharacterSheetToLocal() {
//     const characterData = {
//         name: document.getElementById('character-name').value,
//         classLevel: document.getElementById('class-level').value,
//         background: document.getElementById('background').value,
//         race: document.getElementById('race').value,
//         alignment: document.getElementById('alignment').value,
//         experiencePoints: document.getElementById('experience-points').value,
//         stats: Array.from(document.querySelectorAll('.stat-input')).map(input => input.value),
//         modifiers: Array.from(document.querySelectorAll('.modifier-input')).map(input => input.value),
//         skills: Array.from(document.querySelectorAll('.skill-input')).map(input => input.value),
//         savingThrows: Array.from(document.querySelectorAll('.saving-throw-input')).map(input => input.value),
//     };

//     localStorage.setItem('characterSheet', JSON.stringify(characterData));
//     alert('Character sheet saved to Local Storage!');
// }

// function loadCharacterSheetFromLocal() {
//     const characterData = JSON.parse(localStorage.getItem('characterSheet'));
//     if (!characterData) {
//         alert('No saved character sheet found in Local Storage!');
//         return;
//     }

//     document.getElementById('character-name').value = characterData.name;
//     document.getElementById('class-level').value = characterData.classLevel;
//     document.getElementById('background').value = characterData.background;
//     document.getElementById('race').value = characterData.race;
//     document.getElementById('alignment').value = characterData.alignment;
//     document.getElementById('experience-points').value = characterData.experiencePoints;

//     const statInputs = document.querySelectorAll('.stat-input');
//     characterData.stats.forEach((value, index) => {
//         statInputs[index].value = value;
//     });

//     const modifierInputs = document.querySelectorAll('.modifier-input');
//     characterData.modifiers.forEach((value, index) => {
//         modifierInputs[index].value = value;
//     });

//     const skillInputs = document.querySelectorAll('.skill-input');
//     characterData.skills.forEach((value, index) => {
//         skillInputs[index].value = value;
//     });

//     const savingThrowInputs = document.querySelectorAll('.saving-throw-input');
//     characterData.savingThrows.forEach((value, index) => {
//         savingThrowInputs[index].value = value;
//     });

  
//     statInputs.forEach((statInput, index) => {
//         const statValue = parseInt(statInput.value) || 0;
//         const modifierValue = Math.floor((statValue - 10) / 2);
//         modifierInputs[index].value = modifierValue;
//     });

 
//     calculateProficiencyBonus(); 
//     updateSavingThrows(); 
//     updateSkills();
//     updatePassivePerception(); 

//     alert('Character sheet loaded from Local Storage!');
// }


// document.getElementById('save-character-sheet').addEventListener('click', saveCharacterSheetToLocal);
// document.getElementById('load-character-sheet').addEventListener('click', loadCharacterSheetFromLocal);


// End of pure AI generated code, the rest is pretty much mine, with ai recommendations and help


//however, using the save functions breaks part of the actual part i did, so use at your own risk, you'll also have to
// uncomment the css parts, its the commented bits at the end of the css file, and the start of the html file



// switching the image src when hovering over the image
document.querySelectorAll('.dice-button').forEach(button => {
    const img = button.querySelector('img');
    const originalSrc = img.src;
    const hoverSrc = originalSrc.replace('.png', '-gold.png');

    button.addEventListener('mouseover', () => {
        img.src = hoverSrc;
    });

    button.addEventListener('mouseout', () => {
        img.src = originalSrc;
    });
});








// dice rolling functionality

const buttons = document.querySelectorAll('.dice-button');
const popover = document.getElementById('dice-popover');
const popoverContent = document.getElementById('popover-dice-content');
const closePopoverButton = document.getElementById('close-popover');

let rollingInterval;
let currentDicetype = null;
let currentRotation = 0;

document.querySelectorAll('.dice-button').forEach(button => {
    button.addEventListener('click', () => {
        currentDicetype = button.getAttribute('data-dicetype');
        const diceImage = document.querySelector('#dice-popover-img'); 
        diceImage.src = 'images/dice-1/icons/roll-dice-1.png'; 
        const rollResult = document.querySelector('.roll-result');
        rollResult.textContent = '';

        if (currentDicetype === 'Custom') {
            const popoverContent = document.querySelector('.popover-content');
            popoverContent.innerHTML = `
            <div>
                <button popovertarget="dice-popover">Close</button>
                <img src="images/dice-1/icons/roll-dice-1.png" alt="rolling dice animation" id="dice-popover-img">
                <button class="roll">Roll</button>
                <label for="custom-min">Min:</label>
                <input type="number" id="custom-min" placeholder="Enter min value">
                <label for="custom-max">Max:</label>
                <input type="number" id="custom-max" placeholder="Enter max value">
                <p class="roll-result"></p>
                </div>
            `;
        } else {
            diceImage.src = 'images/dice-1/icons/roll-dice-1.png';
            const popoverContent = document.querySelector('.popover-content');
            popoverContent.innerHTML = `
            <div>
                <button popovertarget="dice-popover">Close</button>
                <img src="images/dice-1/icons/roll-dice-1.png" alt="rolling dice animation" id="dice-popover-img">
                <button class="roll">Roll</button>
                <p class="roll-result"></p>
                </div>
            `;
        }
    });
});

function rollDice() {
    if (rollingInterval) {
        clearInterval(rollingInterval);
    }

    const diceImage = document.querySelector('#dice-popover-img');

    if (currentDicetype === 'Custom') {

        const minInput = document.getElementById('custom-min');
        const maxInput = document.getElementById('custom-max');

        if (!minInput || !maxInput) {
            console.error('Custom dice inputs not found.');
            return;
        }

        const min = parseInt(minInput.value);
        const max = parseInt(maxInput.value);

        if (isNaN(min) || isNaN(max) || min >= max) {
            alert('Please enter valid min and max values where min < max.');
            return;
        }

        // Starts the rolling animation
        const diceImages = [
            'images/dice-1/icons/roll-dice-1.png',
            'images/dice-1/icons/roll-dice-2.png',
            'images/dice-1/icons/roll-dice-3.png',
            'images/dice-1/icons/roll-dice-4.png',
            'images/dice-1/icons/roll-dice-5.png',
            'images/dice-1/icons/roll-dice-6.png'
        ];

        rollingInterval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * diceImages.length);
            const randomRotation = Math.floor(Math.random() * 360);
            diceImage.src = diceImages[randomIndex];
            currentRotation = randomRotation;
            diceImage.style.transform = `rotate(${currentRotation}deg)`;
            diceImage.style.transform = `rotate(${randomRotation}deg)`;
        }, 60);

        // Stops the rolling animation
        setTimeout(() => {
            clearInterval(rollingInterval); 
            currentRotation = 0;
            diceImage.style.transform = `rotate(${currentRotation}deg)`;
            const rollValue = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xFFFFFFFF + 1) * (max - min + 1)) + min;
            const rollResult = document.querySelector('.roll-result');
            rollResult.textContent = `${rollValue}`;
        }, 3000); 
    } else {
        
        const maxRoll = parseInt(currentDicetype.replace('D', ''));
        const diceImages = [
            'images/dice-1/icons/roll-dice-1.png',
            'images/dice-1/icons/roll-dice-2.png',
            'images/dice-1/icons/roll-dice-3.png',
            'images/dice-1/icons/roll-dice-4.png',
            'images/dice-1/icons/roll-dice-5.png',
            'images/dice-1/icons/roll-dice-6.png'
        ];

        rollingInterval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * diceImages.length);
            const randomRotation = Math.floor(Math.random() * 360);
            diceImage.src = diceImages[randomIndex];
            currentRotation = randomRotation;
            diceImage.style.transform = `rotate(${currentRotation}deg)`;
        }, 60);

        setTimeout(() => {
            clearInterval(rollingInterval);
            currentRotation = 0;
            diceImage.style.transform = `rotate(${currentRotation}deg)`;
            const rollValue = Math.floor((crypto.getRandomValues(new Uint32Array(1))[0] / (0xFFFFFFFF + 1)) * maxRoll) + 1;
            const rollResult = document.querySelector('.roll-result');
            rollResult.textContent = `${rollValue}`;
        }, 3000);
    }
}


document.addEventListener('click', (event) => {
    if (event.target.classList.contains('roll')) {
        rollDice();
    }
});



// main functionality



const statInputs = document.querySelectorAll('.stat-input');
const modifierInputs = document.querySelectorAll('.modifier-input');
const proficiencyBonus = parseInt(document.getElementById('proficiency-bonus').value) || 2;

const savingThrowMap = {
    'strength-save': 'strength',
    'dexterity-save': 'dexterity',
    'constitution-save': 'constitution',
    'intelligence-save': 'intelligence',
    'wisdom-save': 'wisdom',
    'charisma-save': 'charisma'
};

const skillMap = {
    'acrobatics': 'dexterity',
    'animal-handling': 'wisdom',
    'arcana': 'intelligence',
    'athletics': 'strength',
    'deception': 'charisma',
    'history': 'intelligence',
    'insight': 'wisdom',
    'intimidation': 'charisma',
    'investigation': 'intelligence',
    'medicine': 'wisdom',
    'nature': 'intelligence',
    'perception': 'wisdom',
    'performance': 'charisma',
    'persuasion': 'charisma',
    'religion': 'intelligence',
    'sleight-of-hand': 'dexterity',
    'stealth': 'dexterity',
    'survival': 'wisdom'
};

const xpToLevel = [
    { xp: 0, level: 1 },
    { xp: 300, level: 2 },
    { xp: 900, level: 3 },
    { xp: 2700, level: 4 },
    { xp: 6500, level: 5 },
    { xp: 14000, level: 6 },
    { xp: 23000, level: 7 },
    { xp: 34000, level: 8 },
    { xp: 48000, level: 9 },
    { xp: 64000, level: 10 },
    { xp: 85000, level: 11 },
    { xp: 100000, level: 12 },
    { xp: 120000, level: 13 },
    { xp: 140000, level: 14 },
    { xp: 165000, level: 15 },
    { xp: 195000, level: 16 },
    { xp: 225000, level: 17 },
    { xp: 265000, level: 18 },
    { xp: 305000, level: 19 },
    { xp: 355000, level: 20 }
];


// updating player level from experience points


function calculateLevelFromXP() {
    const xpInput = parseInt(document.getElementById('experience-points').value) || 0;
    let level = 1;
    for (let i = xpToLevel.length - 1; i >= 0; i--) {
        if (xpInput >= xpToLevel[i].xp) {
            level = xpToLevel[i].level;
            break;
        }
    }

    const classLevelInput = document.getElementById('class-level');
    const className = classLevelInput.value.replace(/\d+/g, '').trim(); // also got this from ai, because i didn't know this before
    classLevelInput.value = `${className} ${level}`;

    calculateProficiencyBonus();
}

document.getElementById('experience-points').addEventListener('input', calculateLevelFromXP);

statInputs.forEach((statInput, index) => {
    statInput.addEventListener('input', () => {
        const statValue = parseInt(statInput.value) || 0;
        const modifierValue = Math.floor((statValue - 10) / 2);
        modifierInputs[index].value = modifierValue;
        updateSavingThrows();
        updateSkills();
        updatePassivePerception();
    });
});

// calculating prof bns from class-level
function calculateProficiencyBonus() {
    const classLevelInput = document.getElementById('class-level').value;
    const LevelMatch = classLevelInput.match(/\d+/); // got this from AI because i had no idea how to get only a number from a string
    const level = LevelMatch ? parseInt(LevelMatch[0]) : 1;
    let proficiencyBonus = 2;
    if (level >= 5 && level <= 8) proficiencyBonus = 3;
    else if (level >= 9 && level <= 12) proficiencyBonus = 4;
    else if (level >= 13 && level <= 16) proficiencyBonus = 5;
    else if (level >= 17) proficiencyBonus = 6;

    document.getElementById('proficiency-bonus').value = proficiencyBonus;
    updateSavingThrows();
    updateSkills();
    updatePassivePerception();
};

document.getElementById('class-level').addEventListener('input', calculateProficiencyBonus);
calculateProficiencyBonus();

function getProficiencyBonus() {
    return parseInt(document.getElementById('proficiency-bonus').value) || 2; // Default to 2 if empty
}


// updating the saving throws


function updateSavingThrows() {
    Object.keys(savingThrowMap).forEach((saveId) => {
        const abilityId = savingThrowMap[saveId];
        const abilityModifier = parseInt(document.getElementById(`${abilityId}-modifier`).value) || 0;
        const isProficient = document.getElementById(`${saveId}-proficient`).checked;
        const proficiencyBonus = getProficiencyBonus();
        const savingThrow = abilityModifier + (isProficient ? proficiencyBonus : 0);
        document.getElementById(saveId).value = savingThrow;
    });
}


document.querySelectorAll('modifier-input').forEach((modifierInput) => {
    modifierInput.addEventListener('input', updateSavingThrows);
});
document.querySelectorAll('.proficiency-checkbox').forEach((checkbox) => {
    checkbox.addEventListener('change', updateSavingThrows);
});

document.getElementById('proficiency-bonus').addEventListener('input', updateSavingThrows);
updateSavingThrows();


// updating the skills


function updateSkills() {
    Object.keys(skillMap).forEach((skillId) => {
        const abilityId = skillMap[skillId];
        const abilityModifier = parseInt(document.getElementById(`${abilityId}-modifier`).value) || 0;
        const isProficient = document.getElementById(`${skillId}-proficient`).checked;
        const proficiencyBonus = getProficiencyBonus();
        const skillModifier = abilityModifier + (isProficient ? proficiencyBonus : 0);
        document.getElementById(skillId).value = skillModifier;
    });
}

document.querySelectorAll('.modifier-input').forEach((modifierInput) => {
    modifierInput.addEventListener('input', updateSkills);
});
document.querySelectorAll('.proficiency-checkbox').forEach((checkbox) => {
    checkbox.addEventListener('change', updateSkills);
});
document.getElementById('proficiency-bonus').addEventListener('input', updateSkills);

updateSkills();


// updating passive perception


function updatePassivePerception() {
    const wisdomModifier = parseInt(document.getElementById('wisdom-modifier').value) || 0;
    const isProficientInPerception = document.getElementById('perception-proficient').checked;
    const proficiencyBonus = getProficiencyBonus();
    const perceptionModifier = wisdomModifier + (isProficientInPerception ? proficiencyBonus : 0);
    const passivePerception = 10 + perceptionModifier;
    document.getElementById('passive-perception').value = passivePerception;

}

document.getElementById('wisdom-modifier').addEventListener('input', updatePassivePerception);
document.getElementById('perception-proficient').addEventListener('change', updatePassivePerception);
document.getElementById('proficiency-bonus').addEventListener('input', updatePassivePerception);

updatePassivePerception();


// so the way i use AI in any project is i first take a crack at it myself, and then ill take what i have,
// if its not working, and ill ask AI what's wrong here, how can i make this work
// so if you have any questions about anything, let me know, and i can explain things, and how i got to
// that point. because certain things definetley required the help of an AI for me,
// like doing a task for a certain amount of time, replacing numbers in a string input box, and a few other things
// hope you enjoyed this website and the fun things it includes
