let team = document.getElementsByClassName("team")[0];
let teamMember = document.getElementsByClassName("teamMember");
let Dashboard = document.getElementsByClassName("Dashboard")[0];
let details = document.getElementsByClassName("details")[0];
let project = document.getElementsByClassName("projects");

// menu
Dashboard.onclick = function () {
  for (let i =0; i< teamMember.length; i++){
    teamMember[i].style.display = "none";
  }
  for (let i =0; i< teamMember.length; i++){
    project[i].style.display = "none";
  }
};
team.onclick = function () {
  for (let i =0; i< teamMember.length; i++){
    teamMember[i].style.display = "block";
  }
   for (let i =0; i< teamMember.length; i++){
    project[i].style.display = "none";
  }
};
details.onclick = function () {
  for (let i =0; i< teamMember.length; i++){
    teamMember[i].style.display = "none";
  }
   for (let i =0; i< teamMember.length; i++){
    project[i].style.display = "block";
  }
};

// change user to admin

function makeAdmin(name,email, data){
  let confirmAdd = confirm('Are u sure to make '+name+' as admin?')
  if(confirmAdd){
    $.ajax({
      url:"http://localhost:8080/admin/role",
      method:'post',
      dataType:'text',
      contentType:"application/json",
      data:JSON.stringify({Email:email}),
      success:function(){ $(data).parents(".teamMember").remove();},
           
    })
  }
}


