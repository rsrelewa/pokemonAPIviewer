const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const display = document.querySelector('.display');

let previousUrl = null;
let nextUrl = null;

nextButton.onclick = () => {
    if (!nextUrl){
        return 
    }
    fetch(nextUrl)
        .then(res => res.json())
        .then(render)
}

previousButton.onclick = () => {
    if (!previousUrl){
        return 
    }
    fetch(previousUrl)
        .then(res => res.json())
        .then(render)
}

const render = (data) => {
    const pokeArr = data.results;
    nextUrl = data.next;
    previousUrl = data.previous;

    display.innerHTML = pokeArr.reduce((acc,e)=>{
        return acc + `
        <div class="pokeContainer"
            <h1 class="pokeName">${e.name}</h1>
            <div class="pokeContainerImage">
            </div>
        </div>
        `
    },'')

    const imageContainers = document.querySelectorAll('.pokeContainerImage')

    imageContainers.forEach((container,index)=>{
        fetch(pokeArr[index].url)
            .then(res => res.json())
            .then((e)=>{
                container.innerHTML = `<img src=${e.sprites.front_default} />`
            })
    })
}


fetch('https://pokeapi.co/api/v2/pokemon/')
    .then(response=>response.json())
    .then(render)