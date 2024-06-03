const summaryName = document.getElementById("summary-name");
const summaryTime= document.getElementById("sumarry-time");
const summaryPeople = document.getElementById("summary-people");
const summaryEmail = document.getElementById("summary-email");
const formData = document.getElementById("collected-data");


function getFormData(){
    const  Fname = document.getElementById("first-name").value;
    const  lname = document.getElementById("last-name").value;
    const  vEmail = document.getElementById("email").value;
    const  vpeople = document.getElementById("people").value;
    const  vtime = document.getElementById("when").value;
    console.log(vEmail);
    

    return data ={
        name: Fname + " "+ lname,
        email: vEmail ,
        time: vtime ,
        people: vpeople,
        
    };
  }


function updateSummary(){
    const data =getFormData();

    summaryName.innerHTML=data.name;
    summaryEmail.innerHTML=data.email;
    summaryPeople.innerHTML=data.people;
    summaryTime.innerHTML=data.time;

}


function submitData(){

    const data =getFormData();
    const dataRow=document.createElement("tr");
    const cellname=document.createElement("td");
    const cellEmail=document.createElement("td");
    const celltime=document.createElement("td");
    const cellpeople=document.createElement("td");
    
    dataRow.appendChild(cellname);
    dataRow.appendChild(celltime);
    dataRow.appendChild(cellEmail);
    dataRow.appendChild(cellpeople);


    cellname.innerHTML=data.name;
    celltime.innerHTML=data.time;
    cellEmail.linnerHTML=data.email;
    cellpeople.innerHTML=data.people;
    
    formData.appendChild(dataRow);room.html
    console.log(cellEmail);

}



function adReplay(){
    let ad =document.getElementById("miter10ad");
    let copy = ad.cloneNode(true);
    ad.replaceWith(copy);
}


