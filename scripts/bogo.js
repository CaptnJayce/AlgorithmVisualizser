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
    bogoSort().then(sortedArray => {
        console.log("Sorted array:", sortedArray);
    });
}

function bogoSort(){
    return new Promise((resolve) => {
        var isSorted = function(array){
            for(var i = 1; i < array.length; i++){
                if (array[i-1] > array[i]) {
                    console.log("not sorted!");
                    return false;
                }
            }
            console.log("sorted!");
            return true;
        };

        function shuffle(){
            var count = array.length;
            var temp;
            var index;

            while(count > 0){
                index = Math.floor(Math.random() * count);
                count--;

                temp = array[count];
                array[count] = array[index];
                array[index] = temp;
                console.log(array);
                showBars();
            }

            if (!isSorted(array)) {
                setTimeout(shuffle, s);
            } else {
                resolve(array);
            }
        }
        shuffle();
    });
}

function showBars(swap){
    container.innerHTML = "";
    for(let i = 0; i < array.length; i++){
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("bar");

        if(swap && swap.indices.includes(i)){
            bar.style.backgroundColor =
                swap.type == "swap" ? "red" : "purple";
        }
        container.appendChild(bar);
    }
}
