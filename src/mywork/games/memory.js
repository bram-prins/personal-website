//Shuffle cards in random order
const getShuffledCards = () => {
    let arr = []
    for (let i = 1; i < 11; i ++) {
        arr.push(i)
        arr.push(i)
    }

    return arr.sort(() => Math.random() - 0.5)
}

let shuffledCards

//Load board
const memory = document.querySelector('.memory')

const loadBoard = () => {
    memory.innerHTML = ''
    memory.classList.remove('done')

    for (let i = 0; i < 20; i ++) {
        let button = document.createElement('button')
        button.id = 'c' + i
        button.className = 'card'
        button.addEventListener('click', () => turnCard(i))
    
        memory.appendChild(button)
    }

    shuffledCards = getShuffledCards()
}
loadBoard()

//Play game
let progress = 0
let turnedCards = []

const turnCard = (i) => {
    let card = document.getElementById('c' + i)
    card.style.backgroundImage = 'url(\"../../images/memory-images/card' + shuffledCards[i] + '.png\")'
    card.style.backgroundColor = 'white'
    card.style.backgroundSize = 'contain'
    
    turnedCards.push(i)
    
    if (turnedCards.length === 2) {
        memory.style.pointerEvents = 'none'

        const correct = Boolean(shuffledCards[turnedCards[0]] === shuffledCards[turnedCards[1]])
        const prevCard = document.getElementById('c' + turnedCards[0])
        
        if (correct) {
            progress ++
        }

        setTimeout(() => {
            memory.removeAttribute('style')
            prevCard.removeAttribute('style')
            card.removeAttribute('style')

            if (correct) {
                prevCard.style.visibility = 'hidden'
                card.style.visibility = 'hidden'
            }

            if (progress === 10) {
                memory.innerHTML = ''
                memory.classList.add('done')

                let gg = document.createElement('p')
                gg.innerHTML = 'gg'

                let playAgain = document.createElement('button')
                playAgain.className='generalButton'
                playAgain.innerHTML = 'Play Again'
                playAgain.onclick = loadBoard

                memory.appendChild(gg)
                memory.appendChild(playAgain)

                progress = 0
            }
        }, 1650)

        turnedCards = []
    }
}