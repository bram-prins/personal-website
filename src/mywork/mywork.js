//scaler
const content = document.getElementById('content')
const scale = () => {
    const video = document.querySelector('iframe')
    video.style.height = (video.offsetWidth / 2) + 'px'

    const width = Math.min(window.innerWidth, window.outerWidth)

    if (width < 368) {
        const scl = width / 368
        content.style.width = 368 + "px"
        content.style.transform = "scale(" + scl + ")"
        content.style.transformOrigin = "left top"
        document.body.style.height = (content.offsetHeight * scl) + "px"
    } else if (content.hasAttribute('style')) {
        content.removeAttribute('style')
        document.body.removeAttribute('style')
    }
}

scale()
window.onresize = scale

//load game-window
const wind = document.querySelector(".game-window")

const loadGameWindow = (no) => {
    wind.classList.add('active')
    content.classList.add('background')
    const title = document.getElementById('game-title')
    const frame = document.querySelector('.game-body iframe')

    switch(no) {
        case 1: 
            title.innerHTML = 'Memory'
            frame.setAttribute('src', 'src/mywork/memory/memory.html')
            break
        case 2: 
            title.innerHTML = 'Mastermind'
            frame.setAttribute('src', 'src/mywork/mastermind/mastermind.html')
            break
        case 3:
            title.innerHTML = 'Weather'
            frame.setAttribute('src', 'src/mywork/weatherForecast/weatherForecast.html')
            break
        default: break
    }
}

const closeWin = () => {
    wind.classList.remove('active')
    content.classList.remove('background')
}


