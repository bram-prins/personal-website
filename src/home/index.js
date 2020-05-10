//scaling
const scale = () => {
    const width = Math.min(window.innerWidth, window.outerWidth)
    const content = document.getElementById('content')
    
    if (width < 792 && width > 711) {
        scaler(792)
    } else if (width < 368) {
        scaler(368)
    } else {
        content.removeAttribute('style')
        document.body.removeAttribute('style')
    }

    function scaler(contentWidth) {
        const scl = width / contentWidth
        content.style.width = contentWidth + "px"
        content.style.transform = "scale(" + scl + ")"
        content.style.transformOrigin = "left top"
        document.body.style.height = (content.offsetHeight * scl) + "px"
    }
}

scale()
window.onresize = scale


//age
let age = ((new Date() - new Date("18 February 1996")) / 31536000000).toFixed(0);  //31536000000 = seconds in a year
document.getElementById('age').innerHTML = age


//image slider
const slider = document.getElementById('imgCnt1')
let img = 1

const slideImgs = () => {
    slider.style.transform = 'translateX(' + (-288 * img) + 'px)'

    for (let a of document.getElementById('sliderBtnContainer').querySelectorAll('.active')) {
        a.className = ''
    }
    document.getElementById('sliderBtn' + img).className = 'active'

    if (img < 2) {
        img++
    } else { // img === 2
        img = 0
    }
}

let timer = setInterval(slideImgs, 4000)

const goTo = (toImg) => {
    clearInterval(timer)

    slider.style.transform = 'translateX(' + (-288 * toImg) + 'px)'

    for (let a of document.getElementById('sliderBtnContainer').querySelectorAll('.active')) {
        a.className = ''
    }
    document.getElementById('sliderBtn' + toImg).className = 'active'

    if (toImg < 2) {
        img = toImg + 1
    } else { // toImg === 2
        img = 0
    }

    timer = setInterval(slideImgs, 4000) 
}