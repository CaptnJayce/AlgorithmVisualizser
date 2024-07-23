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
	const moves = insertionSort(copy);
  animate(moves);
}

function animate(moves){
	if(moves.length == 0){
		showBars();
		return;
	}
	const move = moves.shift();
	const [i, j] = move.indices;

	if(move.type == "swap"){
		[array[i], array[j]] = [array[j], array[i]];
	}

	showBars(move);
	setTimeout(function() {
		animate(moves);
	}, s);
}

function insertionSort(array) {
  const moves = [];
  for(let i = 1; i < array.length; i++){
    let j = i - 1;
    let key = array[i];
    moves.push({indices: [i, j], type: "comp"});
    while(j >= 0 && array[j] > key){
      moves.push({indices: [j, j + 1], type: "swap"});
      array[j + 1] = array[j];
      j = j - 1;
    }
    array[j + 1] = key;
  }
  return moves;
}

function showBars(swap){
  const container = document.getElementById("container");
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
