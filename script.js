// ====specify variables based on css classes====
const selectBox=document.querySelector(".select-box"),
selectBtnX=selectBox.querySelector(".options .playerX"),
selectBtnO=selectBox.querySelector(".options .playerO"),
playBoard =document.querySelector(".play-board"),
players=document.querySelector(".players"),
allBox=document.querySelectorAll("section span"),

resultBox=document.querySelector(".result-box"),
wonText=resultBox.querySelector(".won-text"),
replayBtn=resultBox.querySelector(".btn");

window.onload = () => {
    //make sure that all the boxes in the board are clickable
    for(let i=0; i<allBox.length; i++)
    {
        allBox[i].setAttribute("onclick","clickedBox(this)");
    }
}

selectBtnX.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
} 

selectBtnO.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.setAttribute("class", "players active player");
} 

let playerXIcon="fa-solid fa-x",playerOIcon="far fa-circle",playerSign="X",runBot=true;

// user interactions with the board
function clickedBox(element){
    if(players.classList.contains("player")){
        playerSign="O";
        element.innerHTML= `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        element.setAttribute("id",playerSign);
    }

    else{
        element.innerHTML= `<i class="${playerXIcon}"></i>`;
        element.setAttribute("id",playerSign);
        players.classList.add("active");
    }

    selectWinner();
    element.style.pointerEvents="none";
    playBoard.style.pointerEvents="none";

    // ====buffer time====
    let randomTimeDelay=((Math.random()*1000)+200).toFixed();
    setTimeout(()=>{
        bot(runBot);
    },randomTimeDelay);
    
}

// ====computer interactions with bot=====

function bot(){
    let array=[];
    if(runBot){
        playerSign="O"
        for(let i=0; i<allBox.length; i++)
        {
            if(allBox[i].childElementCount==0){
                array.push(i);
            }
        }
        let randomBox=array[Math.floor(Math.random()*array.length)];
        if(array.length>0){
            if(players.classList.contains("player")){
                playerSign="X";
                allBox[randomBox].innerHTML=`<i class="${playerXIcon}"></i>`;
                allBox[randomBox].setAttribute("id",playerSign);
                players.classList.add("active");
            }
            else
            {
                
                allBox[randomBox].innerHTML=`<i class="${playerOIcon}"></i>`;
                players.classList.add("active");
                allBox[randomBox].setAttribute("id",playerSign);
            }
            selectWinner();

        }

        allBox[randomBox].style.pointerEvents="none";
        playBoard.style.pointerEvents="auto";
        playerSign="X";
    }
}
    // get a sign of certain box
    function getIdVal(classname)
    {
        return document.querySelector(".box"+classname).id;
    }

    // check 3 titles to see if they are the same sign

    function checkIdSign(val1,val2,val3,sign){
        if(getIdVal(val1)==sign && getIdVal(val2)==sign && getIdVal(val3)==sign){
            return true;
        }
        return false;
    }

    // check winner
    function selectWinner(){
        if(checkIdSign(1,2,3,playerSign) || checkIdSign(4,5,6,playerSign) || checkIdSign(7,8,9,playerSign) ||  checkIdSign(1,4,7,playerSign) ||  checkIdSign(2,5,8,playerSign) || checkIdSign(3,6,9,playerSign) || checkIdSign(1,5,9,playerSign) || checkIdSign(3,5,7,playerSign)){
            runBot=false;
            bot(runBot);

            setTimeout(()=>{
                resultBox.classList.add("show");
                playBoard.classList.remove("show");

            },700);
            wonText.innerHTML=`player ${playerSign} <br> has won the game`;
        }
        else{
            if(getIdVal(1)!= "" && getIdVal(2) !="" && getIdVal(3) !="" && getIdVal(4) !="" && getIdVal(5) !="" && getIdVal(6)!="" && getIdVal(7) !="" && getIdVal(8) !="" && getIdVal(9)!=""){
               runBot=false;
               bot(runBot);
            
            setTimeout(()=>{
                resultBox.classList.add("show");
                playBoard.classList.remove("show");

            },700);
            wonText.textContent="The match has been drawn!!";
        }
        }
    }


    // reload when replay button is clicked

    replayBtn.onclick=()=>{
        window.location.reload();
    }