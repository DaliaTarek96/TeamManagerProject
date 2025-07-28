let team = document.getElementsByClassName("team")[0];
let teamMember = document.getElementsByClassName("teamMember")[0];
let Dashboard = document.getElementsByClassName("Dashboard")[0];
let details = document.getElementsByClassName("details")[0];
let project = document.getElementsByClassName("projects")[0];

// menu
Dashboard.onclick = function () {
  teamMember.style.display = "none";
  project.style.display = "none";
};
team.onclick = function () {
  teamMember.style.display = "block";
  project.style.display = "none";
};
details.onclick = function () {
  teamMember.style.display = "none";
  project.style.display = "block";
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

