const Page1 = document.getElementById("form-page1")
const Page2 = document.getElementById("form-page2")
const Page3 = document.getElementById("form-page3")





function showPage(pageNumber){
switch(pageNumber){
case 1: 
    formPage1.style.display ="block";
    formPage2.style.display ="none";
    formPage3.style.display ="none";
    progressBar.value=10;
    break;
case 2: 
    formPage1.style.display ="none";
    formPage2.style.display ="block";
    formPage3.style.display ="none";
    progressBar.value=50;
    break;
case 3: 
    formPage1.style.display ="none";
    formPage2.style.display ="none";
    formPage3.style.display ="block";
    progressBar.value=100;
    updateSummary();
    break;
default: break;
}
}

function getFormData(){
    const FName = document.getElementById("name-first").value;
    const LName = document.getElementById("name-last").value;

    const vType = formPage2.querySelector("input[name=vehicle]:checked").value;
    const vMake = formPage2.querySelector("select").value;

    return data ={
        name: FName+ " " +LName,
        vehicile : vMake + " "+ vType
    };
}

function submitData(){
    const dataRow = document.createElement("Tr");
    const cellName = document.createElement("td");
    const cellVehicle = document.createElement("td");

    dataRow.appendChild(cellName);
    dataRow.appendChild(cellVehicle);

    cellName.innerHTML=data.name;
    cellVehicle.innerHTML=data.vehicile;

    FormData.appendChild(dataRow);
}