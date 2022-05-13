"use strict"

const URL = 'https://randomuser.me/api/';
const btns = [...document.querySelectorAll(".contact-list button")]
const randomUSer = document.querySelector(".random-user")
const getUser = async () => {

    const response = await fetch(URL);
    const {results} = await response.json();
    const user = results[0];
    const {dob : {age}} = user;
    const {first,last} = user.name;
    const {email} = user;
    const {location :{street}} = user;
    const {number,name} = street ;
    const {phone}= user;
    const {login :{password}} = user;
    const {picture:{large}} = user
    return {
        large,
        phone,
        email,
        password,
        age,
        street: `${number} ${name}`,
        name: `${first} ${last}`,
      };
}
const displayUser = async (user) => {
    
    
   
const userTitle = document.querySelector(".user-title");
const userValue = document.querySelector(".user-value");
const img = document.querySelector(".user-container img")
removeClassActive(btns);
img.setAttribute("src",user.large)
userTitle.innerHTML = `Hi, My Name Is`;
userValue.innerHTML = user.name;

btns.forEach((btn)=>{
    const label = btn.dataset.label;
    btn.addEventListener("click",function(){
        userTitle.innerHTML = `My ${label} is`;
        userValue.innerHTML = user[label];
        removeClassActive(btns);
        btn.classList.add('active');

    })

})

}
const removeClassActive = (items)=>
{
    items.forEach((btn)=> btn.classList.remove("active"))
}
const startApp = async () => {
    const data = await getUser();
     await displayUser(data)
}
window.addEventListener("DOMContentLoaded",function(){
    startApp();
})
randomUSer.addEventListener("click",function(){
    startApp();
})