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

function rollDice() {
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
    }, 100);

   
    setTimeout(() => {
        clearInterval(rollingInterval);
    }, 2000); 
}


document.querySelector('.roll').addEventListener('click', rollDice);
