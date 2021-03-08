const linkUrl = window.location.pathname;
const navbarLinks = document.querySelectorAll(`.navbar-dark .navbar-nav .nav-link`);
const activeLink = document.querySelector(`.navbar-dark .navbar-nav .nav-link[href='${linkUrl}']`);


if (activeLink) {
    window.addEventListener('load', () => {
        navbarLinks.forEach(link => link.classList.remove('active'));
        if (!activeLink.className.includes('active')) {
            activeLink.classList.add('active');
        }
    });
}