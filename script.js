
for (let i = 0; i < 6; i++) {
fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((data) => buildeCard(data.meals[0]))
}

function buildeCard(data) {
let CardsContainer = document.querySelector("#CardsContainer");
let div = document.createElement("div");
div.setAttribute("class", "card m-3");
div.setAttribute("style", "width: 20rem");

    div.innerHTML = `<div class="shadow   bg-body rounded">
                        <img src="${data.strMealThumb}" class="card-img-top" alt="CuisinMarccaine">
                        <div class="card-body">
                            <h5 class="card-title">${data.strMeal}</h5>
                            <p class="card-text">...</p>
                            <a href="#" onclick="showModal(${data.idMeal})" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">more details</a>
                        </div>
                    </div> `;
CardsContainer.appendChild(div);
}

async function showModal(id){
    const response = await fetch("https://themealdb.com/api/json/v1/1/lookup.php?i="+id)
    const data = await response.json()
    console.log(data)
    console.log(id);

    let mealInfo = document.querySelector("#mealInfo");
    let Ingredients ;
    let Measures;
    Ingredients = "";
    Measures = "" ;
    for (i=1; i<=20; i++) {
        if(data.meals[0]["strIngredient"+i] !== null && data.meals[0]['strIngredient'+i].length > 0 && data.meals[0]['strIngredient'+i] != " " ) {
            Ingredients += ` <li> ${data.meals[0]['strIngredient'+i]}</li>`;
        }
        if(data.meals[0]['strMeasure'+i] !== null && data.meals[0]['strMeasure'+i].length > 0 && data.meals[0]['strMeasure'+i] != " " ){
            Measures += ` <li> ${data.meals[0]['strMeasure'+i]} </li> `;
        }
    }


    mealInfo.innerHTML = `
    <div class="d-flex ">
        <div>
            <img src="${data.meals[0].strMealThumb}" class="card-img-top imgDetail img-fluid" alt="CuisinMarccaine">
            <iframe width="320" height="200" class="mt-2" src="${data.meals[0].strYoutube.replace("https://www.youtube.com/watch?v=","https://www.youtube.com/embed/")}" title="Tips For Using Async/Await in JavaScript" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    <div class="border ms-5 w-100">
        <p class="card-title p-2">Nom: ${data.meals[0].strMeal}</p>
        <p class="card-title p-2">Categorie: ${data.meals[0].strCategory}</p>
        <p class="card-title p-2">Region: ${data.meals[0].strArea}</p>
        <p class="card-title p-2 border">${data.meals[0].strInstructions}</p>
            <div class="border w-100 d-flex">
                <div>
                    <h5>Ingredients</h5>
                    <ol>${Ingredients}</ol></div>
                <div>
                    <h5>Measures</h5>
                    <ol>${Measures}</ol>
                </div>
            </div>
        </div>
    </div>
    `
    console.log(Ingredients)

}






$("html").niceScroll({
    cursorcolor: "#fd7e14", // change cursor color in hex
    cursoropacitymin: 0, // change opacity when cursor is inactive (scrollabar "hidden" state), range from 1 to 0
    cursoropacitymax: 1, // change opacity when cursor is active (scrollabar "visible" state), range from 1 to 0
    cursorwidth: "12px", // cursor width in pixel (you can also write "5px")
    cursorborder: "0px solid #fff", // css definition for cursor border
    cursorborderradius: "5px", // border radius in pixel for cursor
    zindex: 99999 , // change z-index for scrollbar div
    scrollspeed: 60, // scrolling speed
    mousescrollstep: 40, // scrolling speed with mouse wheel (pixel)
    autohidemode: false, // how hide the scrollbar works, possible values: 
    background: "#fff", // change css for rail background

});










