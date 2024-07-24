let array = [];
let s = 150;
let n = 20;

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
    quickSort(copy, 0, copy.length - 1, moves);
    animate(moves);
}

function animate(moves){
    if(moves.length == 0){
        showBars();
        return;
    }
    const move = moves.shift();
    const [i, j] = move.indices;

    if(move.type === "swap"){
        [array[i], array[j]] = [array[j], array[i]];
    }

    showBars(move);
    setTimeout(function() {
        animate(moves);
    }, s);
}

function partition(array, low, high, moves){
    let pivot = array[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) { 
        moves.push({indices: [j, high], type: "comp"});
        if (array[j] < pivot) { 
            i++;
            moves.push({indices: [i, j], type: "swap"});
            [array[i], array[j]] = [array[j], array[i]];
        } 
    } 
    moves.push({indices: [i + 1, high], type: "swap"});
    [array[i + 1], array[high]] = [array[high], array[i + 1]];  
    return i + 1; 
}

function quickSort(array, low, high, moves) { 
    if (low < high) {
        let pi = partition(array, low, high, moves); 
        moves.push({indices: [pi], type: "pivot"});
        quickSort(array, low, pi - 1, moves); 
        quickSort(array, pi + 1, high, moves); 
    }
}

function showBars(move){
    container.innerHTML = "";
    for(let i = 0; i < array.length; i++){
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("bar");

        if(move && move.indices.includes(i)){
            if(move.type === "swap"){
                bar.style.backgroundColor = "red";
            } else if(move.type === "comp"){
                bar.style.backgroundColor = "purple";
            } else if(move.type === "pivot"){
                bar.style.backgroundColor = "blue";
            }
        }
        container.appendChild(bar);
    }
}
