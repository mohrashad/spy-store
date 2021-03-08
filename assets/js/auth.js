const inputs = document.querySelectorAll('.input_field input');
inputs.forEach((input) => {
    input.addEventListener('blur', (e) => {
        if (e.target.value !== '') {
            e.target.parentElement.classList.add('has-data')
        }else {
            e.target.parentElement.classList.remove('has-data');
        }
    })
})