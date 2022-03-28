// scale game size based on window size
const scale = () => {
    const game = document.querySelector('.mastermind')
    const width = window.innerWidth
    const height = window.innerHeight

    if (height < 493) {
        const scl = height / 493
        game.style.transform = 'scale(' + scl + ')'
        document.body.style.height = scl + 'px'
    } else if (width < 332) {
        const scl = width / 332
        game.style.transform = 'scale(' + scl + ')'
        document.body.style.width = scl + 'px'
    } else if (game.hasAttribute('style')) {
        game.removeAttribute('style')
        document.body.removeAttribute('height')
    }
}

scale()
window.onresize = scale

/*
- Two buttons:
    - backspace (to remove a the last inserted color from your attempt)
    - go (to run the attempt) 
- 8 guess rows, and:
-  7 (0-based) attempts left at the beginning of the game */
const backspace = document.getElementById('backspace');
const go = document.getElementById('go');
const gameRowBalls = document.querySelectorAll('.gameRow.guess .balls')
const gameRowSides = document.querySelectorAll('.gameRow.guess .side')
let attemptsLeft = 7
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
let attempt = []
let answer = []

//generate a random answer (with replacement, as multiple instances of the same color are possible in the game)
for (let i = 0; i < 4; i++) answer.push(colors[Math.floor(Math.random() * 6)])

//color current guess row lightgreen
const bgColor = 'rgb(225, 225, 225)'
gameRowBalls[7].style.backgroundColor = bgColor
gameRowSides[7].style.backgroundColor = bgColor

//End of the game, reveal answer and ask if they want to play again
const revealAndReset = (won) => {
    //reveal answer
    const answerRow = document.querySelector('.gameRow.answer .balls')
    for (let i = 0; i < 4; i++) {
        answerRow.children[i].innerHTML = ''
        answerRow.children[i].className = 'ball ' + answer[i]
    }

    //ask if they want to play again
    const result = won ? 'Congratulations, you won!' : 'Game over!'
    setTimeout(() => {
        if (confirm(result + '\nWould you like to play again?')) window.location.reload()
        else window.parent.document.getElementById('closeBtn').click()
    }, 300)
}

backspace.onclick = () => {
    attempt.pop()
    gameRowBalls[attemptsLeft].children[attempt.length].className = "ball empty"
}

//An attempt is filled in, and the player runs the attempt
go.onclick = async () => {
    // complete attempt?
    const ready = !gameRowBalls[attemptsLeft].children[3].classList.contains('empty')

    //check with the answer
    if (ready) {
        let right = 0
        let wrongPlace = 0
        let wrong = 0
        let bufferAnswer = answer.map(color => color)

        //First, check the ones that are correct (color + place)
        attempt.forEach((color, i) => {
            if (color === answer[i]) {
                right++
                bufferAnswer[i] = false
            }
        })

        //Second, check the right colors at the wrong place
        attempt.forEach((color, i) => {
            if (color !== answer[i] && bufferAnswer.includes(color)) {
                wrongPlace++
                bufferAnswer[bufferAnswer.findIndex(e => e === color)] = false
            }
        })

        //The rest must be wrong color + wrong place.
        wrong = 4 - right - wrongPlace

        //Fill in the result on the side of the guess row
        gameRowSides[attemptsLeft].children[1].innerHTML = right
        gameRowSides[attemptsLeft].children[3].innerHTML = wrongPlace
        gameRowSides[attemptsLeft].children[5].innerHTML = wrong

        //If they got it right, end the game (true = game is won)
        if (right === 4) {
            revealAndReset(true)
        //Out of attempts: end the game as well (false = game is not won)
        } else if (attemptsLeft === 0) {
            revealAndReset(false)
        //Else, move on to the next attempt
        } else {
            gameRowBalls[attemptsLeft].removeAttribute('style')
            gameRowSides[attemptsLeft].removeAttribute('style')

            attemptsLeft--
            attempt = []

            gameRowBalls[attemptsLeft].style.backgroundColor = bgColor
            gameRowSides[attemptsLeft].style.backgroundColor = bgColor
        } 
    } else {
        alert('Not yet ready')
    }
}

document.body.addEventListener('keyup', e => {
    if (e.key === 'Enter') go.click()
    if (e.key === 'Backspace') backspace.click()
})

//Fill in the attempts as the ploayer clicks on the color buttons
const ballButtons = document.querySelectorAll('.gameRow.panel .ball')
const ballClick = (color) => {
    if (attempt.length < 4) {
        gameRowBalls[attemptsLeft].children[attempt.length].className = "ball " + color
        attempt.push(color)
    }
    else alert('You have to run this attempt before going on the next')
}
ballButtons[0].onclick = () => ballClick(colors[0])
ballButtons[1].onclick = () => ballClick(colors[1])
ballButtons[2].onclick = () => ballClick(colors[2])
ballButtons[3].onclick = () => ballClick(colors[3])
ballButtons[4].onclick = () => ballClick(colors[4])
ballButtons[5].onclick = () => ballClick(colors[5])
