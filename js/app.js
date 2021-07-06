'use strict';


function Movie(name,img,release){

      this.name=name;
      this.img=img;
      this.release=release;
      Movie.all.push(this);
}
Movie.all=[];
function saveData(){
localStorage.setItem('Movie',JSON.stringify(Movie.all));

}


let form =document.getElementById('form');
form.addEventListener('submit',handelSubmit);
function handelSubmit(e){
e.preventDefault();
let name=e.target.name.value;
let img=e.target.category.value;
let release=e.target.release.value;
new Movie(name,img,release)
saveData();
render();
}
function getData(){
      let data = JSON.parse(localStorage.getItem('Movie')) || [];
      if(data){
            Movie.all=[];
      for (let i = 0; i < data.length; i++) {
           new Movie(data[i].name,data[i].img,data[i].release)
      }

}render();

}


let table =document.getElementById('table');
let tHead =document.querySelector('thead');
let tBody =document.querySelector('tbody');


let arr = ['#' , 'Image','Name','Release'];
function headTable(){
      tHead.innerHTML='';
      for (let i = 0; i < arr.length; i++) {
            let th =document.createElement('th');
            tHead.appendChild(th);
            th.textContent=arr[i];
            
      }
}
headTable()

function render(){
   
while(table.rows.length > 0){
      table.deleteRow(0);
}

for (let i = 0; i < Movie.all.length; i++) {
     let tr =document.createElement('tr');
     tBody.appendChild(tr);

     let removeTD =document.createElement('td');
     tr.appendChild(removeTD);
     removeTD.innerHTML=`<a onclick="deleteRow=(${i})">X</a>`
     let imageTd =document.createElement('td');
     tr.appendChild(imageTd);
     imageTd.innerHTML=`<img src='./img/${Movie.all[i].img}' style="width=30px;">`
     let nameTd=document.createElement('td');
     tr.appendChild(nameTd);
     nameTd.textContent=Movie.all[i].name;
     let releaseTd=document.createElement('td');
     tr.appendChild(releaseTd);
     releaseTd.textContent=Movie.all[i].release;

      
}

}

function deleteRow(index){
      Movie.all.splice(index,1);
      saveData();
      getData();
}


let clearData=document.getElementById('clear')
clearData.addEventListener('click',clear)
function clear(e){
e.preventDefault();
localStorage.removeItem('Movie');
Movie.all=[];
table.innerHTML="";
window.location.reload();

}




getData();