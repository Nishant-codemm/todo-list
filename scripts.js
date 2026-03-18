const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// ADD TASK
function addTask(){
  if(inputBox.value === ""){
    alert("Write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;

    // default pending
    li.setAttribute("data-status", "pending");

    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "❌";
    li.appendChild(span);
  }

  inputBox.value = "";
  saveData();
}

// CLICK EVENTS (complete + delete)
listContainer.addEventListener("click", function(e){
  if(e.target.tagName === "LI"){
    
    // toggle complete
    e.target.classList.toggle("checked");

    if(e.target.classList.contains("checked")){
      e.target.setAttribute("data-status", "completed");
    } else {
      e.target.setAttribute("data-status", "pending");
    }

    saveData();
  }
  else if(e.target.tagName === "SPAN"){
    e.target.parentElement.remove();
    saveData();
  }
});

// SAVE
function saveData(){
  localStorage.setItem("data", listContainer.innerHTML);
}

// LOAD
function showTask(){
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();


// ENTER KEY
inputBox.addEventListener("keypress", function(e){
  if(e.key === "Enter"){
    addTask();
  }
});


// 🔥 FILTER FUNCTIONS
function showAll(){
  let items = document.querySelectorAll("#list-container li");
  items.forEach(item => item.style.display = "flex");
}

function showCompleted(){
  let items = document.querySelectorAll("#list-container li");
  items.forEach(item => {
    if(item.getAttribute("data-status") === "completed"){
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function showPending(){
  let items = document.querySelectorAll("#list-container li");
  items.forEach(item => {
    if(item.getAttribute("data-status") === "pending"){
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}