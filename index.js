
const reactionArea = document.querySelector(".reaction-area");
const textArea = document.querySelector(".text-area");
let appearTime = 0;
let reactionTime = 0;
let startDate;
let waitingForClick = false;
let localUserName = "Samarth";
let localReactionTimeArray = [];
let localMinReactionTime = 10000;
let localAvgReactionTime = 0;
let currentUser = "";
let x=0;
let globalReactionTimeDataset = JSON.parse(localStorage.getItem("globalReactionTimeDataset"));
if (!globalReactionTimeDataset){
    globalReactionTimeDataset = [{
    userName : "Samarth",
    reactionTimeArray : [],
    minReactionTime : 10000,
    avgReactionTime : 0,
}];
}
console.log(globalReactionTimeDataset);

const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

function play(){
    appearTime = Math.floor(Math.random() * 4000) + 1000;

    reactionArea.style.backgroundColor = "red";
    document.querySelector(".upper-text").innerHTML = "...";
    document.querySelector(".lower-text").innerHTML = "Wait for It!"
    document.querySelector(".instruct-text").innerHTML = "";


    setTimeout(() => {
        reactionArea.style.backgroundColor = "green";
        document.querySelector(".upper-text").innerHTML = "...";
        document.querySelector(".lower-text").innerHTML = "CLICK!";
        document.querySelector(".instruct-text").innerHTML = "";
        waitingForClick = true;
        startDate = Date.now();
    }, appearTime)
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
    } else {
        play();
    }
});

document.querySelector(".submit-button").addEventListener('click',() => {
    currentUser = document.querySelector(".current-user").value;
    console.log(currentUser);
    let j=0;
    x = 0;
    //let globalReactionTimeDataset = JSON.parse(localStorage["globalReactionTimeDataset"]);
    globalReactionTimeDataset.forEach(session => {
        j = j+1;
        if(session.userName === currentUser){
            x = j;
        }
    })
    if(x === 0){
        globalReactionTimeDataset.push({
            userName : currentUser,
            reactionTimeArray :localReactionTimeArray,
            minReactionTime : localMinReactionTime,
            avgReactionTime : localAvgReactionTime,
        });
        console.log(globalReactionTimeDataset);
        localReactionTimeArray = [];
        localAvgReactionTime = 0;
        localMinReactionTime = 10000;
        localAvgReactionTime = 0;
    } else {
        globalReactionTimeDataset[x-1].reactionTimeArray = globalReactionTimeDataset[x-1].reactionTimeArray.concat(localReactionTimeArray);
        globalReactionTimeDataset[x-1].avgReactionTime = Math.round(localAvgReactionTime * 100) / 100;
        globalReactionTimeDataset[x-1].minReactionTime = localMinReactionTime;
        globalReactionTimeDataset[x-1].avgReactionTime = average(globalReactionTimeDataset[x-1].reactionTimeArray);
        console.log(globalReactionTimeDataset);
        localReactionTimeArray = [];
        localAvgReactionTime = 0;
        localMinReactionTime = 10000;
        localAvgReactionTime = 0;
    }
    localStorage["globalReactionTimeDataset"] = JSON.stringify(globalReactionTimeDataset);
    populateAverageTimeLeaderboard();
    populateMinTimeLeaderboard();
});

function populateAverageTimeLeaderboard(){
    let globalReactionTimeDataset = JSON.parse(localStorage["globalReactionTimeDataset"]);
    let tempArray = globalReactionTimeDataset.map(v => ({ userName: v.userName, avgReactionTime: v.avgReactionTime }));
    let sortedTempArray = tempArray.sort(function soryArray(a, b) {
        return b.avgReactionTime < a.avgReactionTime ?  1
             : b.avgReactionTime > a.avgReactionTime ? -1
             : 0;
    });
    document.querySelector(".averageOL").innerHTML = ""
    for(let k=0;k<sortedTempArray.length;k++){
        if(sortedTempArray[k].userName === "Samarth"){
            continue;
        }
        const listItem = document.createElement('li');
        const itemText = document.createTextNode(`${sortedTempArray[k].userName} : ${sortedTempArray[k].avgReactionTime}`);
        listItem.appendChild(itemText);
        document.querySelector(".averageOL").appendChild(listItem);
    }
}

function populateMinTimeLeaderboard(){
    let globalReactionTimeDataset = JSON.parse(localStorage["globalReactionTimeDataset"]);
    let tempArray = globalReactionTimeDataset.map(v => ({ userName: v.userName, minReactionTime: v.minReactionTime }));
    let sortedTempArray = tempArray.sort(function soryArray(a, b) {
        return b.minReactionTime < a.minReactionTime ?  1
             : b.minReactionTime > a.minReactionTime ? -1
             : 0;
    });    
    document.querySelector(".minOL").innerHTML = ""
    for(let k=0;k<sortedTempArray.length;k++){
        if(sortedTempArray[k].userName === "Samarth"){
            continue;
        }
        const listItem = document.createElement('li');
        const itemText = document.createTextNode(`${sortedTempArray[k].userName} : ${sortedTempArray[k].minReactionTime}`);
        listItem.appendChild(itemText);
        document.querySelector(".minOL").appendChild(listItem);
    }
}