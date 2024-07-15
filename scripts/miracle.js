let array = [];
let s = 150
let n = 5

init();

function init(){
    array = [];
    for(let i = 0; i < n; i++){
        array[i] = Math.random();
    }
    showBars();
}   

function miracleSort(array){
    let sorted = false
    do {
        sorted = true
        for (let i = 1; i < array.length; i++) {
            if(array[i] < array[i - 1]) {
                sorted = false
                break;
            }
        }
    }while(!sorted)
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
