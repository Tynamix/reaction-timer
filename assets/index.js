const reactionArea = document.querySelector(".reaction-area");
const textArea = document.querySelector(".text-area");
let appearTime = 0;
let reactionTime = 0;
let startDate;
let waitingForClick = false;
let waitingforRedClick = false;
let localUserName = "Test";
let localReactionTimeArray = [];
let localMinReactionTime = 10000;
let localAvgReactionTime = 0;
let currentUser = "";
let x=0;
let timer;

const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

function play(){
    appearTime = Math.floor(Math.random() * 4000) + 1000;

    reactionArea.style.backgroundColor = "red";
    document.querySelector(".upper-text").innerHTML = "...";
    document.querySelector(".lower-text").innerHTML = "Wait for It!"
    document.querySelector(".instruct-text").innerHTML = "";


    timer = setTimeout(() => {
        reactionArea.style.backgroundColor = "green";
        document.querySelector(".upper-text").innerHTML = "...";
        document.querySelector(".lower-text").innerHTML = "CLICK!";
        document.querySelector(".instruct-text").innerHTML = "";
        waitingForClick = true;
        startDate = Date.now();
    }, appearTime)
    waitingforRedClick = true;
}

reactionArea.addEventListener('click', () => {
    if(waitingForClick){
        reactionTime = Date.now() - startDate;
        localReactionTimeArray.push(reactionTime);
        localMinReactionTime = Math.min(localMinReactionTime,reactionTime);
        localAvgReactionTime = average(localReactionTimeArray);
        console.log(localReactionTimeArray, localMinReactionTime, localAvgReactionTime);
        reactionArea.style.backgroundColor = "#2596be";
        document.querySelector(".upper-text").innerHTML = reactionTime;
        document.querySelector(".lower-text").innerHTML = "Click to keep going!";
        waitingForClick = false ;
        waitingforRedClick = false;
    } else if (waitingforRedClick){
        console.log("early");
        window.clearTimeout(timer);
        reactionArea.style.backgroundColor = "#2596be";
        document.querySelector(".upper-text").innerHTML = "BOOOOOOOO";
        document.querySelector(".lower-text").innerHTML = "You CLICKED early";
        document.querySelector(".instruct-text").innerHTML = "Click Again to keep going";
        waitingforRedClick = false;
        waitingForClick = false;
    } else {
        play();
    }
});
