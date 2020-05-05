const scale = () => {
    const width = Math.min(screen.width, window.innerWidth)
    const content = document.getElementById('content')

    if (width < 368) {
        const scl = width / 368
        content.style.width = 368 + "px"
        content.style.transform = "scale(" + scl + ")"
        content.style.transformOrigin = "left top"
        console.log(content.offsetHeight)
        document.body.style.height = (843 * scl) + "px"
    } else {
        content.style.transform = "none"
        content.style.transformOrigin = "50% 50% 0"
        content.style.width = "100%"
        document.body.style.height = "fit-content"
    }
}

scale()
window.onresize = scale