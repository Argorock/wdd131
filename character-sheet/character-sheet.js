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