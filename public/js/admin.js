document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('createUserForm');
    
    document.getElementById('createEmployeeBtn').addEventListener('click', function() {
        submitForm('/admin/dashboard/create-employee');
    });

    document.getElementById('createVeterinarianBtn').addEventListener('click', function() {
        submitForm('/admin/dashboard/create-veterinarian');
    });

    function submitForm(action) {
        form.action = action;
        form.submit();
    }
});
