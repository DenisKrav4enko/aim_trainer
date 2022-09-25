const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#83F03C', '#CF5FD3', '#FF5F00', '#F43D6B', '#58E000', '#A101A6', '#FF8740', '#AE2C4C']
let score = 0
let time = 0

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        randomCircles()
    }
})

const setTime = value => {
    timeEl.innerHTML = `00:${value}`
}

function getRandomNum(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

const getRandomColor = () => {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

const randomCircles = () => {
    const circle = document.createElement('div')
    const size = getRandomNum(10, 45)
    const color = getRandomColor()
    const {
        width,
        height,
    } = board.getBoundingClientRect()
    const x = getRandomNum(0, width - size - 15)
    const y = getRandomNum(0, height - size - 15)
    circle.style.background = color
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    board.append(circle)
}

const finishGame = () => {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`
}

const decreaseTime = () => {
    if (time === 0) {
        finishGame()
    } else {
        let currentTime = --time
        if (currentTime < 10) {
            currentTime = `0${currentTime}`
        }
        setTime(currentTime)
    }
}

const startGame = () => {
    setInterval(decreaseTime, 1000)
    randomCircles()
    setTime(time)
}

startBtn.addEventListener('click', event => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = Number(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})