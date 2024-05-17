document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('createUserForm');

    // Add click event listener to the create employee button
    document.getElementById('createEmployeeBtn').addEventListener('click', function() {
        submitForm('/admin/dashboard/create-employee');
    });

    // Add click event listener to the create veterinarian button
    document.getElementById('createVeterinarianBtn').addEventListener('click', function() {
        submitForm('/admin/dashboard/create-veterinarian');
    });

    // Function to set the form action and submit the form
    function submitForm(action) {
        form.action = action;
        form.submit();
    }
});
