const scale = () => {
    const width = Math.min(window.innerWidth, window.outerWidth)
    const content = document.getElementById('content')

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

const delayedAlert = async input => {
    await new Promise(r => setTimeout(r, 100))
    alert(input)
}

window.onload = async () => {
    // contact form response
    const params = new URLSearchParams(document.location.search);
    if (params.has('resp')) {
        const resp = params.get('resp')
        if (resp === 'ok')
            delayedAlert("Thank you, your message was submitted succesfully")
        else if (resp === 'err-1')
            delayedAlert("Submission failed: a link was detected")
        else if (resp === 'err-2')
            delayedAlert("Submission failed: content detected that is marked as spam")
    }
}

const checkForm = () => {
    //check if there is a url in the message
    const regex1 = new RegExp(/\w\.\w/i)
    const text = document.querySelector('textarea').value
    if (regex.test(text)) {
        alert ("Links are not permitted, please try again")
        return false
    } else {
        return true
    }
}