let arrowRight = document.querySelector('.arrowRight')
let arrowLeft = document.querySelector('.arrowLeft')
if(arrowRight){
    arrowRight.addEventListener('click', nextPicture)
}
if(arrowLeft){
    arrowLeft.addEventListener('click', lastPicture)
}

function nextPicture() {
    let images = document.querySelector('.artPics').children

    for (let i=0; i<images.length; i++){
        let image = images[i]
        if(!image.classList.contains('d-none') && i!==images.length-1 && images.length !==2){
            let nextImage = images[i+1]
            image.classList.add('d-none')
            nextImage.classList.remove('d-none')
            break
        } else if (!image.classList.contains('d-none') && images.length===2){
            image.classList.add('d-none')
            if(i==0){
                let nextImage = images[i+1]
                nextImage.classList.remove('d-none')
            } else {
                let lastImage = images[i-1]
                lastImage.classList.remove('d-none')
            }
            break
        } else if (!image.classList.contains('d-none')){
            image.classList.add('d-none')
            images[0].classList.remove('d-none')
            break
        } 
    }
}

function lastPicture() {
    let images = document.querySelector('.artPics').children

    
    for (let i=0; i<images.length; i++){
        let image = images[i]
        if(!image.classList.contains('d-none') && i!==0 && images.length !==2){
            let lastImage = images[i-1]
            image.classList.add('d-none')
            lastImage.classList.remove('d-none')
            break
        } else if (!image.classList.contains('d-none') && images.length===2){
            image.classList.add('d-none')
            if(i==0){
                let nextImage = images[i+1]
                nextImage.classList.remove('d-none')
            } else {
                let lastImage = images[i-1]
                lastImage.classList.remove('d-none')
            }
            break
        } else if (!image.classList.contains('d-none')){
            let lastImage = images[images.length-1]
            image.classList.add('d-none')
            lastImage.classList.remove('d-none')
            break
        } 
    }
}