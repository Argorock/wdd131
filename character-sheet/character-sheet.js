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
                popoverContent.innerHTML = `
                <div>
                    <label for="custom-min">Min:</label>
                    <input type="number" id="custom-min" placeholder="Enter min value">
                    <label for="custom-max">Max:</label>
                    <input type="number" id="custom-max" placeholder="Enter max value">
                    <button class="roll">Roll</button>
                    <p class="roll-result"></p>
                </div>
            `;
        } else {
            diceImage.src = 'images/dice-1/icons/roll-dice-1.png';
        }
    });
});

function rollDice() {
    if (rollingInterval) {
        clearInterval(rollingInterval);
    }
    if (currentDicetype == 'Custom') {
        // Handle custom dice roll
        const minInput = document.getElementById('custom-min');
        const maxInput = document.getElementById('custom-max');
        const min = parseInt(minInput.value);
        const max = parseInt(maxInput.value);

        if (isNaN(min) || isNaN(max) || min >= max) {
            alert('Please enter valid min and max values where min < max.');
            return;
        }

        const rollValue = Math.floor(Math.random() * (max - min + 1)) + min; // Generate random roll
        const rollResult = document.querySelector('.roll-result');
        rollResult.textContent = `You rolled a ${rollValue} (Custom Dice: ${min}-${max})`;
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

        const diceImage = document.querySelector('#dice-popover-img'); 

        rollingInterval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * diceImages.length); 
            diceImage.src = diceImages[randomIndex];
        }, 60);

        setTimeout(() => {
            clearInterval(rollingInterval);
            const rollValue = Math.floor(Math.random() * maxRoll) + 1;
            const rollResult = document.querySelector('.roll-result');
            rollResult.textContent = `You rolled a ${rollValue}`;
        }, 2000); 
    }
}


document.addEventListener('click', (event) => {
    if (event.target.classList.contains('roll')) {
        rollDice();
    }
});
