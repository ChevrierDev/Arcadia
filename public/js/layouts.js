document.addEventListener('DOMContentLoaded', function() {
    const dropDownLoginBtn = document.querySelector('.drop-login');
    const dropDownLoginMenu = document.querySelector('.drop-login-menu');
    
    const dropDownMobileLoginBtn = document.querySelector('.drop-mobile-login');
    const mobileLoginMenu = document.querySelector('.mobile-login-menu');

    const openNavMenu = document.querySelector('.open-hamburger');
    const closeNavMenu = document.querySelector('.close-menu');
    const mobileNavMenu = document.querySelector('.navigation-mobile-menu');

   //look to see if menus opened
    function closeAllMenus(exceptMenu) {
        [dropDownLoginMenu, mobileLoginMenu, mobileNavMenu].forEach(menu => {
            if (menu !== exceptMenu) {
                menu.classList.add('hidden');
            }
        });

        if (exceptMenu !== mobileNavMenu) {
            openNavMenu.classList.remove('hidden');
            closeNavMenu.classList.add('hidden');
        }
    }

    //handle desktop login btn
    if (dropDownLoginBtn) {
        dropDownLoginBtn.addEventListener('click', function() {
            closeAllMenus(dropDownLoginMenu);
            dropDownLoginMenu.classList.toggle('hidden');
        });
    }

    //handle mobile login btn
    if (dropDownMobileLoginBtn) {
        dropDownMobileLoginBtn.addEventListener('click', function() {
            closeAllMenus(mobileLoginMenu);
            mobileLoginMenu.classList.toggle('hidden');
        });
    }

    //handle mobile nav btn
    if (openNavMenu) {
        openNavMenu.addEventListener('click', function() {
            closeAllMenus(mobileNavMenu);
            mobileNavMenu.classList.toggle('hidden');
            openNavMenu.classList.add('hidden');
            closeNavMenu.classList.remove('hidden');
        });
    }

    //handle mobile nav btn
    if (closeNavMenu) {
        closeNavMenu.addEventListener('click', function() {
            mobileNavMenu.classList.add('hidden');
            openNavMenu.classList.remove('hidden');
            closeNavMenu.classList.add('hidden');
        });
    }

    //close menu if the size switch
    function handleResize() {
        if (window.innerWidth < 768 || window.innerWidth > 768) {
            closeAllMenus();
        }
    }

    window.addEventListener('resize', handleResize);
});
