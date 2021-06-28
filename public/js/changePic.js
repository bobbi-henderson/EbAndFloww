let arrowRight = document.querySelector('.arrowRight')
let arrowLeft = document.querySelector('.arrowLeft')

arrowRight.addEventListener('click', nextPicture)
arrowLeft.addEventListener('click', lastPicture)

function nextPicture() {
    let images = document.querySelector('.artPics').children

    for (let i=0; i<images.length; i++){
        let image = images[i].children[0]
        if(!image.classList.contains('d-none') && i!==images.length-1 && images.length !==2){
            image.classList.add('d-none')
            nextImage.classList.remove('d-none')
            break
        } else if (!image.classList.contains('d-none') && images.length===2){
            console.log('worked')
            image.classList.add('d-none')
            if(i==0){
                let nextImage = images[i+1].children[0]
                nextImage.classList.remove('d-none')
            } else {
                let lastImage = images[i-1].children[0]
                lastImage.classList.remove('d-none')
            }
            break
        } else if (!image.classList.contains('d-none')){
            let lastImage = images[i-1].children[0]
            image.classList.add('d-none')
            lastImage.classList.remove('d-none')
            break
        } 
    }
}

function lastPicture() {
    let images = document.querySelector('.artPics').children

    
    for (let i=0; i<images.length; i++){
        let image = images[i].children[0]
        if(!image.classList.contains('d-none') && i!==images.length-1 && images.length !==2){
            image.classList.add('d-none')
            nextImage.classList.remove('d-none')
            break
        } else if (!image.classList.contains('d-none') && images.length===2){
            console.log('worked')
            image.classList.add('d-none')
            if(i==0){
                let nextImage = images[i+1].children[0]
                nextImage.classList.remove('d-none')
            } else {
                let lastImage = images[i-1].children[0]
                lastImage.classList.remove('d-none')
            }
            break
        } else if (!image.classList.contains('d-none')){
            let lastImage = images[i+1].children[0]
            image.classList.add('d-none')
            lastImage.classList.remove('d-none')
            break
        } 
    }

}