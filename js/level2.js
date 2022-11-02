const overlay = document.querySelector("#overlay");
const overlay2 = document.getElementById("overlay2");
document.getElementById("menu").addEventListener('click',menuFunction);
const time_el = document.querySelector('.time');
const timer_el = document.querySelector('.timer');
//images in array doen zodat ze makkelijk te loopen zijn in de image functies.
const imgArray = [
    document.getElementById("img1"),
    document.getElementById("img2"),
    document.getElementById("img3"),
    document.getElementById("img4"),
    document.getElementById("img5"),
    document.getElementById("img6")
];

let seconds = 0;
let interval = null;
// Event Listeners

//Update the timer
function timer() {
    seconds++;

    //format our time
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    

    if (secs < 10) secs = '0' + secs;
    if ( mins < 10) mins = '0' + mins;

    time_el.innerText = `${mins}:${secs}`;
    timer_el.innerText = `${mins}:${secs}`;

}
//start de timer
function start () {
    if (interval) {
        return
    }

    interval = setInterval(timer, 1000) ;
}
start();

//stopt de timer
function stop() {
    clearInterval(interval);
    interval = null;
}

function menuFunction(){
    overlay.style.display = "block";
    stop();
}

document.querySelector("#return-btn").addEventListener("click", () =>{
    overlay.style.display = "none"
    start();
    
})
//functie om alle imageborders op none te zetten
function imageBorderNone(){
    for(let i = 0; i < imgArray.length; i++ ){
        imgArray[i].style.border = "none";
    }
}
//functie om alle image waardes op false te zetten
function imageValueNone(){
    for(let i = 0; i < imgArray.length; i++ ){
        imgArray[i].dataset.value = "false";
    }

}

//6 images functies onder elkaar
imgArray[0].addEventListener('click', ()=>{
    console.log(img1.dataset);
    img1.dataset.value = "true";  
    imageBorderNone()
    //laat zien dat het goed is
    img1.style.border = "solid green";
    
    console.log(img1.dataset);
})

imgArray[1].addEventListener('click', ()=>{
    console.log(img2.dataset);

    //check of de volgorde goed wordt uitgevoerd
    if(img1.dataset.value == "true"){
        img2.dataset.value = "true";
        img2.style.border = "solid green";
        console.log(img2.dataset);
    } else{ 
        imageBorderNone();
        img2.style.border = "solid red";
        
    }
   
})
imgArray[2].addEventListener('click', ()=>{
    console.log(img3.dataset);

    //check of de volgorde goed wordt uitgevoerd
    if(img2.dataset.value == "true"){
        img3.dataset.value = "true";
        img3.style.border = "solid green";
    }
    //zet alle waardes weer op false als de volgorde fout is
     else{
        imageValueNone();
        imageBorderNone();
        img3.style.border = "solid red";
    }
    console.log(img3.dataset);

})
imgArray[3].addEventListener('click', ()=>{
    console.log(img4.dataset);

    //check of de volgorde goed wordt uitgevoerd
    if(img3.dataset.value == "true"){
        img4.dataset.value = "true";
        img4.style.border = "solid green";
    }
    //zet alle waardes weer op false als de volgorde fout is 
    else{
        imageValueNone();
        imageBorderNone();
        img4.style.border = "solid red";
    }
    console.log(img4.dataset);

})
imgArray[4].addEventListener('click', ()=>{
    console.log(img5.dataset);

    //check of de volgorde goed wordt uitgevoerd
    if(img4.dataset.value == "true"){
        img5.dataset.value = "true";
        img5.style.border = "solid green";
    }
    //zet alle waardes weer op false als de volgorde fout is
     else{
        imageValueNone();
        imageBorderNone();
        img5.style.border = "solid red";
    }
    console.log(img5.dataset);
})
imgArray[5].addEventListener('click', ()=>{
    console.log(img6.dataset);

    //check of de volgorde goed wordt uitgevoerd
    if(img5.dataset.value == "true"){
        img6.dataset.value = "true";
        img6.style.border = "solid green";

        //laat het scherm zien waarmee je naar de volgende pagina kan
        overlay2.style.display = "block";

        //stop de timer
        stop();
    }
    //zet alle waardes weer op false als de volgorde fout is
    else{
        imageValueNone();
        imageBorderNone();
        img6.style.border = "solid red";
    }
    console.log(img6.dataset);

})
function openForm(){
    document.getElementById("Myform").style.display = "block";
    stop();
}

function closeform(){
    document.getElementById("Myform").style.display = "none";
    start();
}



