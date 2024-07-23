
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
	const moves = selectionSort(copy);
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

function selectionSort(array) {
  const moves = [];
  for (let i = 0; i < array.length - 1; i++) {
    let lowest = i;
    for (let j = i + 1; j < array.length; j++) {
      moves.push({indices:[i, j], type:"comp"});
      if (array[j] < array[lowest]) {
        lowest = j;
      }     
    }
    if (lowest !== i) {
      [array[i], array[lowest]] = [array[lowest], array[i]];
      moves.push({indices:[i, lowest], type:"swap"});
    }
  }
  return moves;
}

function showBars(swap){
  container.innerHTML = "";
  for(let i = 0; i < array.length; i++){
    const bar = document.createElement("div");
    bar.style.height = array[i] * 100 + "%";
    bar.classList.add("bar");

    if(swap && swap.indices.includes(i)){
      bar.style.backgroundColor = "red";
    }
    container.appendChild(bar);
  }
}
