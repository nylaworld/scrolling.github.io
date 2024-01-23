const slider = document.querySelector('.circular-carousel-slider');
let currentRotation = 0;
const rotationIncrement = 1; // Adjust this value for a smaller rotation angle
let totalRotation = 0;
let animationFrameId = null;

// Detect scroll events on the document
document.addEventListener('wheel', (e) => {
    // Cancel any ongoing animation frame
    if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
    }
    
    // Calculate the number of scroll steps
    const scrollSteps = e.deltaY / 100; // Adjust the divisor for scroll sensitivity
    
    // Update the total rotation based on the scroll steps and rotation increment
    totalRotation += rotationIncrement * scrollSteps;

    // Apply the rotation to the slider immediately
    slider.style.transition = 'none';
    slider.style.transform = `rotate(${totalRotation}deg)`;

    // Prevent the default scroll behavior
    e.preventDefault();

    // Request an animation frame to smooth out the final rotation
    function animate() {
        if (Math.abs(totalRotation - currentRotation) > 0.01) {
            currentRotation += (totalRotation - currentRotation) * 0.1;
            slider.style.transform = `rotate(${currentRotation}deg)`;
            animationFrameId = requestAnimationFrame(animate);
        }
    }
    animate();
});
