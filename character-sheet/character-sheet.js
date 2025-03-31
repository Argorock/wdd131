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

    const diceImage = document.querySelector('#dice-popover-img'); // Reference the dice image

    if (currentDicetype === 'Custom') {
        // Handle custom dice roll
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

        // Start the rolling animation
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
            diceImage.src = diceImages[randomIndex]; // Update the dice image with a random one
        }, 60);

        // Stop the rolling animation after 2 seconds and display the result
        setTimeout(() => {
            clearInterval(rollingInterval); // Stop the animation
            const rollValue = Math.floor(Math.random() * (max - min + 1)) + min; // Generate random roll
            const rollResult = document.querySelector('.roll-result');
            rollResult.textContent = `${rollValue}`;
        }, 2000); // Run for 2 seconds
    } else {
        // Handle standard dice roll
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
            diceImage.src = diceImages[randomIndex];
        }, 60);

        setTimeout(() => {
            clearInterval(rollingInterval);
            const rollValue = Math.floor(Math.random() * maxRoll) + 1;
            const rollResult = document.querySelector('.roll-result');
            rollResult.textContent = `${rollValue}`;
        }, 2000);
    }
}


document.addEventListener('click', (event) => {
    if (event.target.classList.contains('roll')) {
        rollDice();
    }
});










// main functionality
