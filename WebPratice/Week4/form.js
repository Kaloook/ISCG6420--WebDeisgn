
let users =[];
function submitForm(){
    console.log("hello world");
    let form =document.getElementById("user-form");
    console.log(form);
    let Fname = form["first-name"].value;
    let Lname = form["last-name"].value;
    alert("Hello"+ Fname + Lname);
    const user = {
        firstName : Fname,
        lastName:Lname

    }
    user.push(user);
    }
document.getElementById("userformsubmit").addEventListener("click", submitForm);

