let array = [];
let s = 150
let n = 20

init();

function init(){
    array = [];
    for(let i = 0; i < n; i++){
        array[i] = Math.random();
    }
    showBars();
}   

function play(){
    const copy = [...array];
    const moves = [];
    mergeSort(copy, moves, 0);
    animate(moves);
}

/*
function mergeSort(array){
    if(array.length < 2){
        return array
    }

    const middle = Math.floor(array.length / 2)
    const leftArray = array.slice(0, middle)
    const rightArray = array.slice(middle)
    return merge(mergeSort(leftArray), mergeSort(rightArray))
}

function merge(leftArray, rightArray){
    const sortedArray = []
    if (leftArray[0] <= rightArray[0]){
        sortedArray.push(leftArray.shift())
    } else {
        sortedArray.push(rightArray.shift())
    }
    return [...sortedArray, ...leftArray, ...rightArray]
}
*/

function animate(moves){
    if(moves.length == 0){
        showBars();
        return;
    }
    const move = moves.shift();
    const [i, j] = move.indices;

    if(move.type == "insert"){
        array[i] = move.value;
    }

    showBars(move);
    setTimeout(function() {
        animate(moves);
    }, s);
}

function mergeSort(array, moves, startIndex){
    if (array.length <= 1){
        return array;
    }

    const middle = Math.floor(array.length / 2);
    const leftArray = mergeSort(array.slice(0, middle), moves, startIndex);
    const rightArray = mergeSort(array.slice(middle), moves, startIndex + middle);
    return merge(leftArray, rightArray, moves, startIndex);
}

function merge(leftArray, rightArray, moves, startIndex){
    const sortedArray = [];
    let i = 0, j = 0;
    
    while (i < leftArray.length && j < rightArray.length){
        if(leftArray[i] <= rightArray[j]){
            sortedArray.push(leftArray[i]);
            moves.push({indices: [startIndex + sortedArray.length - 1], type: "insert", value: leftArray[i]});
            i++;
        } else {
            sortedArray.push(rightArray[j]);
            moves.push({indices: [startIndex + sortedArray.length - 1], type: "insert", value: rightArray[j]});
            j++;
        }
    }

    while (i < leftArray.length){
        sortedArray.push(leftArray[i]);
        moves.push({indices: [startIndex + sortedArray.length - 1], type: "insert", value: leftArray[i]});
        i++;
    }

    while (j < rightArray.length){
        sortedArray.push(rightArray[j]);
        moves.push({indices: [startIndex + sortedArray.length - 1], type: "insert", value: rightArray[j]});
        j++;
    }

    return sortedArray;
}

function showBars(move){
    container.innerHTML = "";
    for(let i = 0; i < array.length; i++){
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("bar");

        if(move && move.indices.includes(i)){
            bar.style.backgroundColor = "red";
        }
        container.appendChild(bar);
    }
}

console.log(mergeSort(array, [], 0));
