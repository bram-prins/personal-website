//scaler
const scale = () => {
    const video = document.querySelector('iframe')
    video.style.height = (video.offsetWidth / 2) + 'px'

    const width = Math.min(screen.width, window.innerWidth)
    const content = document.getElementById('content')
    const game = document.querySelector('.game-window.active')

    if (width < 368) {
        const scl = width / 368
        content.style.width = 368 + "px"
        content.style.transform = "scale(" + scl + ")"
        content.style.transformOrigin = "left top"
        document.body.style.height = (content.offsetHeight * scl) + "px"
        game.style.zIndex = "2"
    } else {
        content.removeAttribute('style')
        document.body.removeAttribute('style')
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
    const frame = document.querySelector('.game-body iframe')

    switch(no) {
        case 1: 
            title.innerHTML = 'Memory'
            frame.setAttribute('src', 'src/mywork/games/memory.html')
            break
        /*
        case 2: 
            gTitle.innerHTML = 'Hangman'
            gBody.innerHTML = '<object type="text/html" data="src/mywork/games/memory.html"></object>'
            break
        */
    }
}

const closeWin = () => {
    wind.classList.remove('active')
    overlay.classList.remove('active')
}


