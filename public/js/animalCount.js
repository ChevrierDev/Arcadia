// Attacher le gestionnaire d'événements aux boutons "Découvrir" après le chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.dropDown-id-card');

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const animalName = event.currentTarget.getAttribute('data-animal-name');
            visitAnimal(animalName);
        });
    });

    const closeButtons = document.querySelectorAll('.closeDropDown-card-id');

    closeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.currentTarget.closest('.card-id');
            card.classList.add('hidden');
        });
    });
});

async function visitAnimal(name) {
    try {
        const response = await fetch(`/api/v1/animalCount/${name}`, {
            method: 'GET'
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
