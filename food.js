import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'
let eat = new Audio(); eat.src = "audio/eat.mp3";
let food = getRandomFoodPosition() //יצירת אוכל 
const EXPANSION_RATE = 1 //כמות גדילה של הנחש 

export function update() {  //אנו נבדוק כאן אם הנחש עבר על האוכל 
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE)//מגדיל את הנחש בגודל הרצוי במקרה והנחש עבר על נקודת האוכל 
        food = getRandomFoodPosition() //יצירת אוכל חדש 
        eat.play()
    }
}

export function draw(gameBoard) { //הצגת האוכל בלוח המשחק 
    const foodElement = document.createElement('div') //יצירת אלמנט להצגת האוכל 
    foodElement.style.gridRowStart = food.y///הצגה לפי מיקום במטריצה שיצרנו עם גריד 
    foodElement.style.gridColumnStart = food.x //הצגה לפי מיקום במטריצה שיצרנו עם גריד 
    foodElement.classList.add('food') //הוספת עיצוב של האוכל לאלמנט שיצרנו 
    gameBoard.appendChild(foodElement) //הוספה של האלמנט 
}

function getRandomFoodPosition() { //יצירת מיקום רנדומלי 
    let newFoodPosition
    while (newFoodPosition == null || onSnake(newFoodPosition)) { //האם המיקום ריק או
        //האם הנחש נמצא על הנקודה שבא אנו רוצים להגדיר אוכל חדש 
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}