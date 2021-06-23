let arrowRight = document.querySelector('.arrowRight')
let arrowLeft = document.querySelector('.arrowLeft')

arrowRight.addEventListener('click', nextPicture)
arrowLeft.addEventListener('click', lastPicture)

function nextPicture() {
    let images = document.querySelector('.artPics').children

    for (let i=0; i<images.length; i++){
        if(!images[i].classList.contains('d-none') && i!==images.length-1 && images.length !==2){
            images[i].classList.add('d-none')
            images[i+1].classList.remove('d-none')
            break
        } else if (!images[i].classList.contains('d-none') && images.length===2){
            console.log('worked')
            images[i].classList.add('d-none')
            if(i==0){
                images[1].classList.remove('d-none')
            } else {
                images[0].classList.remove('d-none')
            }
            break
        } else if (!images[i].classList.contains('d-none')){
            images[i].classList.add('d-none')
            images[0].classList.remove('d-none')
            break
        } 
    }

}

function lastPicture() {
    let images = document.querySelector('.artPics').children

    for (let i=0; i<images.length; i++){
        if(!images[i].classList.contains('d-none') && i!==0 && images.length !==2){
            images[i].classList.add('d-none')
            images[i-1].classList.remove('d-none')
            break
        } else if (!images[i].classList.contains('d-none') && images.length===2){
            console.log('worked')
            images[i].classList.add('d-none')
            if(i==0){
                images[1].classList.remove('d-none')
            } else {
                images[0].classList.remove('d-none')
            }
            break
        } else if (!images[i].classList.contains('d-none')){
            images[i].classList.add('d-none')
            images[i.length-1].classList.remove('d-none')
            break
        } 
    }

}