const GRID_SIZE = 21 //מותאם כמובן להגדרת הגודל המקורית ב css

export function randomGridPosition() { //יצירץ מיקום רנדומלי 
    //נשתמש בזה ביצרית אוכל
    return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
}

export function outsideGrid(position) { //בדיקת  יציאה מתחומי משחק 
    return (
        position.x < 1 || position.x > GRID_SIZE ||
        position.y < 1 || position.y > GRID_SIZE
    )
}