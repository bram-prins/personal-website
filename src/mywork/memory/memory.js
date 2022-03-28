//Shuffle cards in random order
const getShuffledCards = () => {
    const arr1 = shuffle([1,2,3,4,5,6,7,8,9,10])
    const arr2 = shuffle([1,2,3,4,5,6,7,8,9,10])
    const finalArray = shuffle(arr1.concat(arr2))

    //shuffle
    function shuffle (array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i)
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    
        return array
    }

    return finalArray
}

let shuffledCards

//Play game
const memory = document.querySelector('.memory')

let progress = 0
let turnedCards = []

const loadBoard = () => {
    memory.innerHTML = ''
    progress = 0

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

const turnCard = (i) => {
    let card = document.getElementById('c' + i)

    card.style.backgroundImage = 'var(--card' + shuffledCards[i] + ')'
    card.style.backgroundColor = 'white'
    card.style.backgroundSize = 'contain'
    card.disabled = true
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
            else {
                prevCard.disabled = false
                card.disabled = false
            }

            if (progress === 10) {
                memory.classList.add('done')
                memory.innerHTML = 'gg'

                setTimeout(() => {
                    if (confirm ('Well played.\nWould you like to play again?')) window.location.reload()
                    else window.parent.document.getElementById('closeBtn').click()
                    memory.classList.remove('done')
                }, 200)
            }
        }, 1650)

        turnedCards = []
    }
}