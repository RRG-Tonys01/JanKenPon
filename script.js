let skorAqua = 0;
let skorPlayer = 0;
let timeOut = "";

let aqua = document.getElementById("dewi-aqua");

let splashScreen = document.getElementsByClassName("splash")[0];
let startGame = document.getElementsByClassName("start")[0];
let displaySkorAqua = document.getElementsByClassName("skor-aqua")[0];
let displaySkorPlayer = document.getElementsByClassName("skor-player")[0];

let reset = document.getElementById("reset");
let batu = document.getElementById("batu");
let gunting = document.getElementById("gunting");
let kertas = document.getElementById("kertas");


if(localStorage.getItem("skorAqua")){
    skorAqua = localStorage.getItem("skorAqua");
    displaySkorAqua.innerHTML = skorAqua;
}

if(localStorage.getItem("skorPlayer")){
    skorPlayer = localStorage.getItem("skorPlayer");
    displaySkorPlayer.innerHTML = skorPlayer;
}

startGame.addEventListener("click",()=>{
    splashScreen.style.top = "-120vh";
    splashScreen.style.transition = ".75s";
})

batu.addEventListener("click", ()=>{
    janken(0);
});

gunting.addEventListener("click", ()=>{
    janken(1);
});

kertas.addEventListener("click", ()=>{
    janken(2);
});

reset.addEventListener("click", ()=>{
    if(confirm("Ini akan memulai ulang permainan, Anda Yakin?")){
        skorAqua = 0;
        skorPlayer = 0;
        displaySkorAqua.innerHTML = skorAqua;
        displaySkorPlayer.innerHTML = skorPlayer;
        localStorage.clear();
    }
})

function janken(tangan){
    let jariaqua = Math.floor(Math.random()*3);

    switch(jariaqua){
        case 0:
            aqua.style.backgroundImage = "url('images/aqua-batu.png')";
            break;
        case 1:
            aqua.style.backgroundImage = "url('images/aqua-gunting.png')";
            break;
        default:
            aqua.style.backgroundImage = "url('images/aqua-kertas.png')";
            break;
    }

    aqua.classList.remove("goyang");

    switch(tangan){
        case 0:
            if(jariaqua == 0){
                result("draw");
            }else if(jariaqua == 1){
                result("player");
            }else{
                result("aqua");
            }
            break;
        case 1:
            if(jariaqua == 0){
                result("aqua");
            }else if(jariaqua == 1){
                result("draw");
            }else{
                result("player");
            }
            break;
        default:
            if(jariaqua == 0){
                result("player");
            }else if(jariaqua == 1){
                result("aqua");
            }else{
                result("draw");
            }
            break;
    }
}

function result(who){
    clearTimeout(timeOut);
    switch(who){
        case "aqua":
            skorAqua++;
            localStorage.setItem("skorAqua", skorAqua);
            displaySkorAqua.innerHTML = skorAqua;
            console.log("Dewi Aqua Menang");
            break;
        case "player":
            skorPlayer++;
            localStorage.setItem("skorPlayer", skorPlayer);
            displaySkorPlayer.innerHTML = skorPlayer;
            console.log("Anda Menang");
            break;
        default:
            console.log("Hasil Seri");
            break;
        
    }

    timeOut = setTimeout(()=>{
        aqua.style.removeProperty("background-image");
        aqua.classList.add("goyang");
    },3000);
}

