'use strict'

const slider = document.getElementById('imgCnt1')
let img = 1

let timer = setInterval(slideImgs, 4000)

function slideImgs() {
    slider.style.transform = 'translateX(' + (-300 * img) + 'px)'

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

function goTo(toImg) {
    clearInterval(timer)

    slider.style.transform = 'translateX(' + (-300 * toImg) + 'px)'

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