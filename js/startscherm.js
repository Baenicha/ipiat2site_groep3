const overlay = document.querySelector("#overlay");
const overlay2 = document.getElementById("overlay2");
const overlay3 = document.getElementById("overlay3");
const overlay4 = document.getElementById("overlay4");
const overlay5 = document.getElementById("overlay5");
const overlay6 = document.getElementById("overlay6");
document.getElementById("menu").addEventListener('click',menuFunction);

function menuFunction(){
    overlay.style.display = "block";
}
document.querySelector("#return-btn").addEventListener("click", () =>{
    overlay.style.display = "none";
    
})
document.getElementById("fakkel").addEventListener("click", () =>{
    overlay2.style.display = "block";
})
document.getElementById("next-btn").addEventListener("click", () =>{
    overlay2.style.display = "none";
})
document.getElementById("schilderij").addEventListener("click", () =>{
    overlay3.style.display = "block";
})
document.getElementById("next-btn2").addEventListener("click", () =>{
    overlay3.style.display = "none";
})
document.getElementById("begin-btn").addEventListener("click", () =>{
    overlay4.style.display = "block";
})
document.getElementById("Volgende-btn").addEventListener("click", () =>{
    overlay4.style.display = "none";
    overlay5.style.display = "block";
})
document.getElementById("bronnen-btn").addEventListener("click", () =>{
    overlay6.style.display = "block";
    overlay.style.display = "none";
})

document.getElementById("Volgende-btn2").addEventListener("click", () =>{
    overlay6.style.display = "none";
    overlay7.style.display = "block";
})
document.getElementById("next-btn3").addEventListener("click", () =>{
    overlay7.style.display = "none";
})


