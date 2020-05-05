//scaler
const scale = () => {
    const video = document.querySelector('iframe')
    video.style.height = (video.offsetWidth / 2) + 'px'

    const width = Math.min(screen.width, window.innerWidth)
    const content = document.getElementById('content')

    if (width < 368) {
        const scl = width / 368
        content.style.width = 368 + "px"
        content.style.transform = "scale(" + scl + ")"
        content.style.transformOrigin = "left top"
        console.log(content.offsetHeight)
        document.body.style.height = (2326 * scl) + "px"
    } else {
        content.style.transform = "none"
        content.style.transformOrigin = "50% 50% 0"
        content.style.width = "100%"
        document.body.style.height = "fit-content"
    }
}

scale()
window.onresize = scale

//load game-window
const wind = document.querySelector(".game-window")
const overlay = document.querySelector(".overlay")

const loadGame = (no) => {
    wind.classList.add('active')
    overlay.classList.add('active')
    const title = document.getElementById('game-title')
    const body = document.querySelector('.game-body')

    switch(no) {
        case 1: 
            title.innerHTML = 'Memory'
            body.innerHTML = '<object type="text/html" data="games/memory.html"></object>'
            break
        case 2: 
            title.innerHTML = 'Hangman'
            body.innerHTML = '<object type="text/html" data="games/memory.html"></object>'
            break
        default: break
    }
}

const closeWin = () => {
    wind.classList.remove('active')
    overlay.classList.remove('active')
}


