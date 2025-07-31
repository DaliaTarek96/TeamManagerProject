let header = document.getElementsByClassName('header')[0],
    items = document.getElementsByClassName('menu--link'),
    profile = document.getElementsByClassName('profile')[0],
    newTask = document.getElementsByClassName('newTask')[0],
    toDo = document.getElementsByClassName('toDo')[0],
    tasksDone = document.getElementsByClassName('tasksDone')[0];

header.onclick= function(){
    profile.style.display = "none";
    newTask.style.display = "none";
    toDo.style.display = "none";
    tasksDone.style.display = "none";
};

items[0].onclick= function(){
    profile.style.display = "block";
     newTask.style.display = "none";
    toDo.style.display = "none";
    tasksDone.style.display = "none";
}
items[1].onclick= function(){
    profile.style.display = "none";
     newTask.style.display = "block";
    toDo.style.display = "none";
    tasksDone.style.display = "none";
}
items[2].onclick= function(){
    profile.style.display = "none";
     newTask.style.display = "none";
    toDo.style.display = "block";
    tasksDone.style.display = "none";
}
items[3].onclick= function(){
    profile.style.display = "none";
     newTask.style.display = "none";
    toDo.style.display = "none";
    tasksDone.style.display = "block";
}