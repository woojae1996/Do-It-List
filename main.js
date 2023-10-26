//유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다
//delete 버튼을 누르면 할일이 삭제된다.
//check버튼을 누르면 할일이 끝나면서 밑줄이 간다
//진행중 끝남 탭을 누르면, 언더바가 이동한다
//1.check 버튼을 클릭하는 순간 true false
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
//전체탭을 누르면 다시 전체아이템으로 돌아옴


let taskinput = document.getElementById("task-input");
let addbutton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let tasklist = [];
let mode = "all";
let filterlist = [];
addbutton.addEventListener("click",addtask);

for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){
        filter(event)});
};

console.log(tabs)


function addtask(){
    let task = {
        id:randomidgenerate(),
        taskcontent:taskinput.value,
        iscomplete:false,
    };
    tasklist.push(task);
    console.log(tasklist);
    render();
}

function render() {
    let list = []
    if(mode == "all"){
        list = tasklist;
    }else if(mode == "not done" || mode =="end"){
        list = filterlist;
    }
    let resulthtml = '';
    for(let i = 0; i<list.length;i++){
        if(list[i].iscomplete == true){
            resulthtml+=`<div class="task">
            <div class="task-done">${list[i].taskcontent} </div>
            <div>
                <button onclick="togglecomplete('${list[i].id}')">Check</button>
                <button onclick="deletetask('${list[i].id}')">Delete</button>
            </div>
        
        </div>`;
        }else{
            resulthtml += `<div class="task">
        <div>${list[i].taskcontent} </div>
        <div>
            <button onclick="togglecomplete('${list[i].id}')">Check</button>
            <button onclick="deletetask('${list[i].id}')">Delete</button>
        </div>
    
    </div>`;
            

        }

        
    }

    document.getElementById("task-board").innerHTML = resulthtml;

}

function togglecomplete(id) {
    for(let i = 0;i<tasklist.length;i++){
        if(tasklist[i].id == id){
            tasklist[i].iscomplete = !tasklist[i].iscomplete;
            break;
        }
    }
    render();
    console.log(tasklist);
}

function randomidgenerate(){
    return Math.random().toString(36).substr(2, 16);
}

function deletetask(id) {
    for(let i = 0;i<tasklist.length;i++){
      if(tasklist[i].id == id) {
        tasklist.splice(i, 1);
        break;
      }
    }
    render();

}

function filter(event){
    mode = event.target.id;
    filterlist = [];
    if(mode == "all"){
        render();
    }else if(mode =="not done"){
        for(let i=0;i<tasklist.length;i++){
            if(tasklist[i].iscomplete == false){
                filterlist.push(tasklist[i]);
            }
        }
        
        render();   
    }else if(mode == "end"){
        for(let i=0;i<tasklist.length;i++){
            if(tasklist[i].iscomplete == true){
                filterlist.push(tasklist[i]);
            }
        }
        render();
    }

    console.log(filterlist);
}


