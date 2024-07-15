let array = [];
let s = 100;
let n = 5;

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
    const moves = bogoSort(copy);
    animate(moves);
}

function animate(moves){
    if(moves.length == 0){
        showBars();
        return;
    }
    const swap = moves.shift();
    const [i, j] = swap.indices;

    if(swap.type == "swap"){
        [array[i], array[j]] = [array[j], array[i]];
    }

    showBars(swap);
    setTimeout(function() {
        animate(moves);
    }, s);
}

function bogoSort(array){
    const moves = [];
    while (!isSorted(array)) {
        shuffle(array, moves);
    }
    return moves;
}

function isSorted(array){
    for (let i = 1; i < array.length; i++) {
        if (array[i - 1] > array[i]) {
            return false;
        }
    }
    return true;
}

function shuffle(array, moves){
    let count = array.length;
    while(count > 0){
        let index = Math.floor(Math.random() * count);
        count--;

        moves.push({indices: [count, index], type: "swap"});
        [array[count], array[index]] = [array[index], array[count]];
    }
}

function showBars(swap){
    container.innerHTML = "";
    for(let i = 0; i < array.length; i++){
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("thiccBar");

        if(swap && swap.indices.includes(i)){
            bar.style.backgroundColor = "red"
        }
        container.appendChild(bar);
    }
}
