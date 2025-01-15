// MY JAVASCRIPT


document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul li a');
    const currentPath = window.location.pathname; //current webpage

    links.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath) {
            link.classList.add('activate'); //trigger active styling
        }
    });
});

