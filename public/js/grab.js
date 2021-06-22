const sold = document.querySelector('.sold')
const avail = document.querySelector('.avail')

let isDown = false;
let startX;
let scrollLeft;

sold.addEventListener('mousedown', mouseDownHandler);
sold.addEventListener('mouseleave', mouseLeaveHandler);
sold.addEventListener('mouseup', mouseUpHandler);
sold.addEventListener('mousemove', mouseMoveHandler);

avail.addEventListener('mousedown', mouseDownHandler);
avail.addEventListener('mouseleave', mouseLeaveHandler);
avail.addEventListener('mouseup', mouseUpHandler);
avail.addEventListener('mousemove', mouseMoveHandler);

function mouseDownHandler(e){
    isDown = true;
    this.classList.add('active');
    startX = e.pageX - this.offsetLeft;
    scrollLeft = this.scrollLeft;
}

function mouseLeaveHandler(){
    isDown = false;
    this.classList.remove('active');
}

function mouseUpHandler(){
    isDown = false;
    this.classList.remove('active');
}

function mouseMoveHandler(e){
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - this.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    this.scrollLeft = scrollLeft - walk;
}

