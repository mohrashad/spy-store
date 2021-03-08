const productP = document.querySelector('.addProductMsg');

window.addEventListener('load', () => {
    if (productP) {
        productP.style.transform = 'translateX(0px)';
        setTimeout(() => {
            productP.style.display = 'none';
        }, 1500);
    }
})