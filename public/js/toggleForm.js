function toggleForm() {
    let form = document.querySelector('.editForm')
    if(form.classList.contains('d-none')){
        form.classList.remove('d-none')
    } else {    
        form.classList.add('d-none')
    }
}