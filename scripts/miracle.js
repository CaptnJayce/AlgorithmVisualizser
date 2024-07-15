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

function showBars(swap){
    container.innerHTML = "";
    for(let i = 0; i < array.length; i++){
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("thiccBar");

        container.appendChild(bar);
    }
}
