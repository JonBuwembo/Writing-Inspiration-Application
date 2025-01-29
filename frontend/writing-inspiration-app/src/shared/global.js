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

function adjustHeight() {
    const mainContent = document.querySelector('.main-content-2');
    if (!mainContent) {
      console.error('Element with class .main-content-2 not found.');
      return;
    }
    const viewportHeight = window.innerHeight;
    const topNavHeight = 60; // Ensure this matches your actual top-nav height
    const newHeight = viewportHeight - topNavHeight;
    console.log(`Viewport Height: ${viewportHeight}`);
    console.log(`New Height: ${newHeight}`);
    mainContent.style.height = `${newHeight}px`;
  }
  

document.addEventListener('DOMContentLoaded', () => {
    adjustHeight();
    window.addEventListener('resize', adjustHeight);
});