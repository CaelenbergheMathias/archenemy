var cards;
var graveyard = [];
// function selectXRandomCards(x:number)
// {
//     let chosenCards:object[]= [];
//
//     for(let i:number = 0; i<x; i++)
//     {
//         let index = Math.floor((Math.random() * cards.length) );
//         console.log(cards.length);
//         if(chosenCards.indexOf(cards[index])<0)
//         {
//             chosenCards.push(cards[index]);
//         }
//         else{
//             i--;
//         }
//
//     }
//
//     return chosenCards;
// }
function shuffle(cards) {
    var shuffledCards = [];
    while (cards.length > 0) {
        var index = Math.floor((Math.random() * cards.length));
        shuffledCards.push(cards.splice(index, 1)[0]);
    }
    return shuffledCards;
}
function addCardToScreen(card) {
    console.log(card);
    if (card.type_line === "Scheme") {
        document.getElementById("scheme").innerHTML = "";
        var img = document.createElement("img");
        img.alt = card.name;
        img.src = card.image_uris.normal;
        img.addEventListener("click", function () {
            var card = cards.shift();
            addCardToScreen(card);
        });
        document.getElementById("scheme").appendChild(img);
        var figcaption = document.createElement("figcaption");
        figcaption.innerText = card.name + " - " + card.oracle_text;
        document.getElementById("scheme").appendChild(figcaption);
    }
    else {
        var li = document.createElement("li");
        var figure = document.createElement('figure');
        li.appendChild(figure);
        var img = document.createElement("img");
        img.alt = card.name;
        img.src = card.image_uris.normal;
        figure.appendChild(img);
        var figcaption = document.createElement("figcaption");
        figcaption.innerText = card.name + " - " + card.oracle_text;
        figure.appendChild(figcaption);
        document.getElementById("ongoing").appendChild(li);
        li.addEventListener('click', function () {
            this.remove();
        });
    }
    graveyard.push(card);
    if (cards.length <= 0) {
        cards = shuffle(graveyard);
        graveyard = [];
    }
}
function fetchSchemes() {
    fetch("https://api.scryfall.com/cards/search?q=t:scheme", { method: "Get" }).then(function (data) {
        return data.json();
    }).then(function (json) {
        cards = shuffle(json.data);
        console.log(cards);
    }).then(function () {
        document.getElementById("next").addEventListener("click", function () {
            var card = cards.shift();
            addCardToScreen(card);
        });
    }).catch(function (err) {
        var p = document.createElement("p");
        p.innerText = "Could Not Fetch The Cards Scryfall Could be Offline ATM";
        document.getElementById("scheme").appendChild(p);
    });
}
document.addEventListener('DOMContentLoaded', function () {
    // registerSW();
    console.log('loaded');
    fetchSchemes();
});
