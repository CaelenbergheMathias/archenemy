let cards:object[];
let graveyard:object[] = [];

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

function shuffle(cards:object[])
{
    let shuffledCards:object[]= [];

    while(cards.length>0)
    {
        let index = Math.floor((Math.random() * cards.length) );
        shuffledCards.push(cards.splice(index,1)[0]);
    }

    return shuffledCards;
}

function addCardToScreen(card)
{
    console.log(card);
    if(card.type_line === "Scheme")
    {
        document.getElementById("scheme").innerHTML="";
        let img = document.createElement("img");
        img.alt = card.name;
        img.src = card.image_uris.normal;
        img.addEventListener("click",function () {
            let card = cards.shift();
            addCardToScreen(card);
        });
        document.getElementById("scheme").appendChild(img);
        let figcaption = document.createElement("figcaption");
        let h
        figcaption.innerText = `${card.name} - ${card.oracle_text}`;
        document.getElementById("scheme").appendChild(figcaption);
    }else
    {
        let li = document.createElement("li");
        let figure = document.createElement('figure');
        li.appendChild(figure);
        let img = document.createElement("img");
        img.alt = card.name;
        img.src = card.image_uris.normal;
        figure.appendChild(img);
        let figcaption = document.createElement("figcaption");
        figcaption.innerText = `${card.name} - ${card.oracle_text}`;
        figure.appendChild(figcaption);
        document.getElementById("ongoing").appendChild(li);
        li.addEventListener('click',function () {
            this.remove();
        })

    }
    graveyard.push(card);
    if(cards.length<=0) {
        cards = shuffle(graveyard);
        graveyard = [];
    }

}


function fetchSchemes()
{
    fetch("https://api.scryfall.com/cards/search?q=t:scheme",{method:"Get"}).then(function (data) {
        return data.json();
    }).then(function (json) {
        cards = shuffle(json.data);

        console.log(cards)
    }).then(function () {
        document.getElementById("next").addEventListener("click",function () {
            let card = cards.shift();
            addCardToScreen(card);
        });
    }).catch(function (err) {
        let p = document.createElement("p");
        p.innerText = "Could Not Fetch The Cards Scryfall Could be Offline ATM";
        document.getElementById("scheme").appendChild(p);

    })
}

document.addEventListener('DOMContentLoaded', function () {
    // registerSW();
    console.log('loaded');

    fetchSchemes();

});