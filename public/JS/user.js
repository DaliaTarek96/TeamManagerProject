let header = document.getElementsByClassName('header')[0],
    items = document.getElementsByClassName('menu--link'),
    profile = document.getElementsByClassName('profile')[0],
    newTask = document.getElementsByClassName('newTask')[0],
    toDo = document.getElementsByClassName('toDo')[0],
    tasksDone = document.getElementsByClassName('tasksDone')[0];
    // Edit user profile
let password = document.getElementsByClassName('password'),
    save = document.getElementsByClassName('save')[0],
    edit = document.getElementsByClassName('edit')[0];
    returnback = document.getElementsByClassName('returnback')[0];
function setData(x,y, z){
     if (x.length !== 0 || !y  || !z){
        save.style.display='block';
        edit.style.display='none';
        returnback.style.display='block';
        password[0].style.display='block';
        password[1].style.display='block';
        password[2].style.display='block';
        profile.style.display = "block";
        newTask.style.display = "none";
        toDo.style.display = "none";
        tasksDone.style.display = "none";
     }
     else{
    profile.style.display = "none";

     }

}

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



edit.onclick=function(){
    save.style.display='block';
    edit.style.display='none';
    returnback.style.display='block';
    password[0].style.display='block';
    password[1].style.display='block';
    password[2].style.display='block';
    
}
