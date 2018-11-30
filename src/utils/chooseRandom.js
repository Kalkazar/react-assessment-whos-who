export const chooseRandom = (array = [], numItems) => {
    let randomIndex = Math.floor(Math.random() * array.length)
    let randomIndices = new Array()
    let randomArray = new Array()
    if(array.length <= 1) {
        return array
    }
    if(numItems > array.length || !numItems) {
        numItems = randomIndex + 1
    }
    for(let i = 0; i < numItems; i++) {
        while(randomIndices.includes(randomIndex)) {
            randomIndex = Math.floor(Math.random() * array.length)
        }
        randomIndices.push(randomIndex)
        randomArray.push(array[randomIndices[i]])
    }
    return randomArray
}