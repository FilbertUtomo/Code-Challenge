
// Select element
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
// Class names
const CHECK ="fa-check-circle";
const UNCHECK ="fa-circle-thin";
const Line_Through ="lineThrough";

// Show today date
const options ={weekday:"long", month:"short", day:"numeric"}; 
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

let LIST,id;

let data = localStorage.getItem("TODO");

if (data){
	LIST =JSON.parse(data);
	loadToDo(LIST);
	id = LIST.length;
}else{
	LIST=[];
	id = 0;
}
function loadList(array){
	array.forEach(function(item){
		addToDo(item.name, item.id, item.done, item.trash);
	});
}


function addToDo(toDo, id, done, trash){

	if(trash){return; }

	const DONE = done ? CHECK: UNCHECK;
	const LINE = done ? Line_Through: "";


	const item= `<li class="item">
					<i class="fa ${DONE} co" job="complete" id="${id}" ></i>
					<p class="text ${LINE}"> ${toDo} </p>
					<i class="de fa fa-trash-o" job="delete" id="${id}"></i>
				 </li>
				 `;
	const position ="beforeend";
	list.insertAdjacentHTML(position,item);
}
addToDo("Running",1,true,false);

function completeToDo (element){
	element.classList.toogle(CHECK);
	element.classList.toogle(UNCHECK);
	element.parentNode.querySelector(".text").classList.toogle(Line_Through);
	LIST[element.id].done = LIST[element.id]. done ? false : true;
}  
function removeToDo(element){
	element.parentNode.parentNode.removeChild(element.parentNode);
	LIST[element.id].trash= true;
}

clear.addEventListener('click',function(){
	localStorage.clear();
	location.reload();
});


list.addEventListener("click", function(event){
	const element = event.target; 
	const elementJOB = event.target.attributes.job.value;
	if (elementJOB == "complete") {
		completeToDo(element);
	}else if (elementJOB =="delete"){
		removeToDo(element);
	}
	localStorage.setItem("TODO",JSON.stringify(LIST));
});

// add item to list 
document.addEventListener("keyup", function(event){
	if (event.keyCode == 13) {
		const toDo = input.value;
		if(toDo){
			addToDo(toDo,id,false,false);
			LIST.push({
					name : toDo,
					id : id,
					done : false,
					trash : false
			});
			localStorage.setItem("TODO",JSON.stringify(LIST));
			id++;
		}	
		input.value =" ";
	}
});

//			
