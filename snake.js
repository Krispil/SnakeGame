import { getInputDirection } from "./input.js"

export const SNAKE_SPEED = 20 //מהירות המשחק 
export const snakeBody = [{ x: 11, y: 11 }] //נקודת התחלת משחק כרגע באמצע  
let newSegments = 0

export function update() {
    addSegments()//הוספת חוליה לנחש לאחר אכילה 



    //אנו נקבע כאן את כיוון הנחש על ידי לחיצה על אחד החצים
    //ואז הנחש ימשיך לכיוון הנבחר וכל שאר גוף הנחש ימשיך בכיוון הנבחר 
    const inputDirection = getInputDirection()
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }
    //הוספת x או y 
    //לפני לחיצת משתמש 
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y

}

export function draw(gameBoard) { //הצגה ויזואלית על לוח המסך הנמצא ב html
    snakeBody.forEach(segment => {
        //אנו ניצור אלמנט חדש שייצג את הנחש שלנו
        // האלמנט שייצג את הנחש יהיה דייב רגיל
        //נגדיר לו מיקום
        //נוסיף לו עיצוב של הנחש על ידי הוספת קלאסלייסט של הנחש
        //ואז נדאג שלוח המשחק יכייל את האלמנט שיצרנו שהוא בעצם הנחש 
        const snakeElement = document.createElement('div')//יצירת דיב
        snakeElement.style.gridRowStart = segment.y//מיקום ראשוני בעזרת הגריד 
        snakeElement.style.gridColumnStart = segment.x//מיקום ראשוני בעזרת הגריד 
        snakeElement.classList.add('snake')//הוספת עיצוב הנחש לאלמנט
        gameBoard.appendChild(snakeElement)
    })
}

function equalPositions(pos1, pos2) { //השוואה בין נקודות 
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() { //הגדלת הנחש
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
    }
    newSegments = 0
}


export function getSnakeHead() {
    return snakeBody[0]
}

export function expandSnake(amount) {
    newSegments += amount
}


export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true })
}

export function onSnake(position, { ignoreHead = false } = {}) {

    return snakeBody.some((segment, index) => {

        if (ignoreHead && index === 0) return false

        return equalPositions(segment, position)
    })
}


