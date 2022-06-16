// fonction de rétrécissement NavBar (BoostRap)

window.addEventListener('DOMContentLoaded', event => {

    //  fonction de rétrécissement NavBar
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#MenuBtn');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // rétrécissement NavBar 
    navbarShrink();

    // Réduire la barre de navigation lorsque la page défile
    document.addEventListener('scroll', navbarShrink);

    // (Bootstrap) scrollspy sur l'élément de navigation principal
    const MenuBtn = document.body.querySelector('#MenuBtn');
    if (MenuBtn) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#MenuBtn',
            offset: 74,
        });
    };

    //Réduire la barre de navigation réactive lorsque le basculeur est visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
