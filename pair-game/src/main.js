import './scss/style.scss';

// DOM ELEMENTS 
const cardListElement = document.querySelector('#game')

let cardsCount = 4
const cardsNumberArray = []
const openedCards = []
// Cоздание массива чисел 
for (let i = 1; i <= cardsCount; i++) {
  cardsNumberArray.push(i, i)
}

// Перемешивание массива чисел
for (let i = 0; i < cardsNumberArray.length; i++) {
  let randomIndex = Math.floor(Math.random() * cardsNumberArray.length)

  let temp = cardsNumberArray[i]
  cardsNumberArray[i] = cardsNumberArray[randomIndex]
  cardsNumberArray[randomIndex] = temp
}

//INIT
render(cardsNumberArray)

cardListElement.addEventListener('click', handleClickCard)




//Helpers
function buildTemplateCard(number) {
  return `
     <div class="game-card" data-role="button" tabindex="0">
        <span class="game-card__number">
          ${number}
        </span>
    </div>
  `
}

function render(cardsNumberArray = []) {
  cardListElement.innerHTML = ''
  const html = cardsNumberArray.reduce((acc, card) => acc + buildTemplateCard(card), '')
  cardListElement.innerHTML = html
}

//Handlers 
function handleClickCard(event) {
  const target = event.target;
  const card = target.closest('.game-card')

  if (!card || openedCards.includes(card)) return

  const numberElement = card.querySelector('.game-card__number')
  if (!numberElement) return

  numberElement.style.opacity = '1'
  card.classList.add('game-card__opened')
  openedCards.push(card)

  if (openedCards.length === 2) {
    const [firstCard, secondCard] = openedCards

 
    if (!firstCard || !secondCard) return

    const firstNumber = firstCard.querySelector('.game-card__number').textContent.trim()
    const secondNumber = secondCard.querySelector('.game-card__number').textContent.trim()

    if (firstNumber === secondNumber) {
      [firstCard, secondCard].forEach(card => {
        if (card) {
          card.classList.replace('game-card__opened', 'game-card__success')
        }
      })
      openedCards.length = 0
      setTimeout(() => {
        if (document.querySelectorAll('.game-card__success').length === cardsNumberArray.length) {
          alert('Победа! 🎉')
        }
      }, 300)
    } else {
      setTimeout(() => {
        [firstCard, secondCard].forEach(card => {
          if (card) {
            const numberElem = card.querySelector('.game-card__number')
            if (numberElem) {
              numberElem.style.opacity = '0'
            }
            card.classList.remove('game-card__opened')
          }
        })
        openedCards.length = 0
      }, 700)
    }
  }
}
