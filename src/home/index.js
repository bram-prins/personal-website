//scaling
const scale = () => {
    const width = Math.min(window.innerWidth, window.outerWidth)
    const content = document.getElementById('content')
    
    if (width < 652 && width > 617) {
        scaler(652)
    } else if (width < 368) {
        scaler(368)
    } else if (content.hasAttribute('style')) {
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