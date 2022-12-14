var selected_filters = []
var favs = []
var showing_favs = false
var song=document.getElementById("song");

song.controlsList = "noplaybackrate";


function arrayRemove(arr, value) {

    return arr.filter(function(ele){
        return ele != value;
    });
}

function setCookie(cname, cvalue, exdays) {
  // https://www.w3schools.com/js/js_cookies.asp
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  var json_str = JSON.stringify(cvalue);
  console.log(json_str);
  document.cookie = cname + "=" + json_str + ";" + expires + ";path=/";
  console.log(document.cookie);
}

function getCookie(cname) {
  // https://www.w3schools.com/js/js_cookies.asp
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return JSON.parse(c.substring(name.length, c.length));
    }
  }
  return "";
}


window.onload = function(){
  favs = getCookie("favs")
  console.log(favs)
  if (!favs){favs = []}

  for (var i = 0; i < favs.length; i++){
    document.getElementById(favs[i]).firstElementChild.classList.add("in-fav");
    document.getElementById("fav-" + favs[i]).classList.add("showing");

  }

}

var muted = document.getElementById("muted");
var cd = document.getElementById("mutesong");


function toggle_mute(){
  if (song.muted){
    song.muted = false;
    muted.style.display = "none";
    cd.classList.remove("muted");


  } else {
    song.muted = true;
    cd.classList.add("muted");
    muted.style.display = "block";
  }
}

document.addEventListener('click', (event) => {

  song.muted = true;
  song.playsinline = true;
  song.play()
  song.muted = false;


}, {once : true});



var slider = document.getElementById("volumeslider");
var output = document.getElementById("demo");

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  song.volume = 0.01 * this.value;
}



function toggle_favs(name){
    if (favs.includes(name)){
      favs = arrayRemove(favs, name)
      document.getElementById(name).firstElementChild.classList.remove("in-fav");
      document.getElementById("fav-" + name).classList.remove("showing");
    }
    else {
      favs.push(name)
      document.getElementById(name).firstElementChild.classList.add("in-fav");
      document.getElementById("fav-" + name).classList.add("showing");

    }

    setCookie("favs", favs, 360);
}

function toggle_frog(){
  var frog = document.getElementById("frog");
  if (frog.classList.contains("showing")){
    frog.classList.remove("showing")
  }
  else frog.classList.add("showing")
}

function remove_favs(name){
  name = name.slice(4);
  console.log(name);
  favs = arrayRemove(favs, name)
  document.getElementById(name).firstElementChild.classList.remove("in-fav");
  document.getElementById("fav-" + name).classList.remove("showing");

  setCookie("favs", favs, 360);
}

function show_favs() {
  if (showing_favs){
    document.getElementById("fav-box-container").style.display = "none";
    showing_favs = false
  } else {
    document.getElementById("fav-box-container").style.display = "block";
    showing_favs = true
  }
}


function search() {
  // Declare variables
  // var input, filter, resources, a, i, txtValue;
  var input = document.getElementById('search-bar');
  var filter = input.value.toUpperCase();
  var resources = document.getElementsByClassName("resource-box");


  // Loop through all list items, and hide those who don't match the search query
  for (var i = 0; i < resources.length; i++) {
    var current = resources[i];
    var title = resources[i].getElementsByTagName("h1")[0];
    var txtValue = title.textContent || title.innerText;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      current.style.display = "";
    } else {
      current.style.display = "none";
    }
  }
}


function filter(filtername){

  var filter = filtername.toUpperCase();

  if (selected_filters.includes(filter)){
    selected_filters = arrayRemove(selected_filters, filter)
    document.getElementById(filtername).dataset.selected = 0;
  }
  else {
    selected_filters.push(filter)
    document.getElementById(filtername).dataset.selected = 1;
  }

  var resources = document.getElementsByClassName("resource-box");

  // Loop through all list items, and hide those who don't match the search query
  for (var i = 0; i < resources.length; i++) {
    var current = resources[i];
    var tags = resources[i].getElementsByClassName("tags-list")[0];
    var txtValue = tags.textContent || tags.innerText;
    var show = true;

    for (var j = 0; j < selected_filters.length; j++){
      if (txtValue.toUpperCase().indexOf(selected_filters[j]) <= -1) {
        show = false;
      }
    }
    if (show){
      current.style.display = "";
    }
    else {
      current.style.display = "none";
    }

  }
}

var res_tab_button = document.getElementById("resources-tab")
var fav_tab_button = document.getElementById("favs-tab")


function resources_tab(){
  document.getElementById("fav-box-container").style.display = "none";
  showing_favs = false
  res_tab_button.classList.add("highlighted")
  fav_tab_button.classList.remove("highlighted")
  document.getElementById("content-box").style.display = "block";


}

function favs_tab(){
  document.getElementById("fav-box-container").style.display = "block";
  showing_favs = true
  res_tab_button.classList.remove("highlighted")
  fav_tab_button.classList.add("highlighted")
  document.getElementById("content-box").style.display = "none";



}
