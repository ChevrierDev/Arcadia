// fetch animal count to the views
async function visitAnimal(name) {
    try {
        const response = await fetch(`/test/simulate-visit/${name}`, {
            method: 'GET'
        });

        if (response.ok) {
            const animal = await response.json();
            alert(`Visits for ${animal.name} increased to ${animal.visits}`);
            location.reload(); 
        } else {
            alert('Failed to increment visit count');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
    }
}