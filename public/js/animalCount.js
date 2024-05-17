// Attach event handlers to "Discover" buttons after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.dropDown-id-card');

    // Add click event listener to each "Discover" button
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const animalName = event.currentTarget.getAttribute('data-animal-name');
            visitAnimal(animalName);
        });
    });

    const closeButtons = document.querySelectorAll('.closeDropDown-card-id');

    // Add click event listener to each close button
    closeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.currentTarget.closest('.card-id');
            card.classList.add('hidden');
        });
    });
});

// Function to send a GET request to visit an animal
async function visitAnimal(name) {
    try {
        const response = await fetch(`/api/v1/animalCount/${name}`, {
            method: 'GET'
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
