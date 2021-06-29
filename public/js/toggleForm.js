function toggleForm(toggle) {
    console.log(toggle)
    let form = document.querySelector(toggle)
    if(form.classList.contains('d-none')){
        form.classList.remove('d-none')
    } else {    
        form.classList.add('d-none')
    }
}