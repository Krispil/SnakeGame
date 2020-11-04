import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let dead = new Audio();
dead.src = "audio/dead.mp3";

let lastRenderTime = 0 // איפוס זמן פריים
let gameOver = false //משתנה עזר לפסילה 
const gameBoard = document.getElementById('game-board') //קישוריות ל html

function main(currentTime) {  //מקבל את הזמן העדכני תמיד 

    if (gameOver) { //בדיקת סוף משחק
        dead.play()
        if (confirm('You lost. Press ok to restart.')) {
            window.location = '/'
        }
        return
    }
    window.requestAnimationFrame(main) //הרצת הפונקציה הראשית בפריימים שאנו נקבע להם  את מספר הפעמיים בשניה

    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000 // חילוק ב1000 ככה שנעבוד עם שניה 
    //ונחליט עכשיו כמה פעמים בשניה  נרוץ
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return //עם מספר הפריימים עוד לא הגיע לכמות בשניה שאנו רוצים לא נמשיך קדימה לאיפוס הזמן

    lastRenderTime = currentTime //איפוס הזמן 

    update()
    draw()

}

window.requestAnimationFrame(main) //קריאה ראשונה בשביל להתחיל ריצת משחק

function update() {
    updateSnake() //  יעדכן את מיקום הנחש במטריצה 
    updateFood() //יעדכן תמיד את מיקום האכול במטריצה 
    checkDeath() //בדיקת סיום משחק
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard) //הצגה ויזואלית 
    drawFood(gameBoard)//הצגה ויזואלית 
}

function checkDeath() { //בדיקת סיום משחק 
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}