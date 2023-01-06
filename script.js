// take data in randomData
let randomData = [];
for (let i = 0; i < 6; i++) {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((data) => randomData.push(data.meals[0]));
}

// for (let i = 0; i < 6; i++) {
//     async function getData(){

//     let response = fetch("https://www.themealdb.com/api/json/v1/1/random.php")
//         // .then((response) => response.json())
//     let data = response.json()
//         // .then((data) => randomData.push(data.meals[0]))
//     return data

//     }

// }

setTimeout(() => {
  buildeCard(randomData);
}, 1000);
// function build
function buildeCard(array) {
  console.log(array);
  let CardsContainer = document.querySelector("#CardsContainer");
  CardsContainer.innerHTML = "";
  let row;

  // if(array.length === null){
  //     console.log("hahahah");
  //     return;
  // }

  for (let i = 0; i < array.length; i++) {
    row = `<div class=" card m-3"  style="width: 20rem;">
                        <img src="${array[i].strMealThumb}" class="card-img-top" alt="CuisinMarccaine">
                        <div class="card-body">
                            <h5 class="card-title">${array[i].strMeal}</h5>
                            <p class="card-text">...</p>
                            <a href="#" onclick="showModal(${array[i].idMeal})" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">more details</a>
                        </div>
                    </div> `;
    CardsContainer.innerHTML += row;
  }
}
// function for modal
async function showModal(id) {
  const response = await fetch(
    "https://themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );

  const data = await response.json();
  console.log(data);
  console.log(id);
  let mealInfo = document.querySelector("#mealInfo");
  let Ingredients;
  let Measures;
  Ingredients = "";
  Measures = "";
  // for loop for Ingredient && Measure
  for (i = 1; i <= 20; i++) {
    if (
      data.meals[0]["strIngredient" + i] !== null &&
      data.meals[0]["strIngredient" + i].length > 0 &&
      data.meals[0]["strIngredient" + i] != " "
    ) {
      Ingredients += ` <li> ${data.meals[0]["strIngredient" + i]}</li>`;
    }
    if (
      data.meals[0]["strMeasure" + i] !== null &&
      data.meals[0]["strMeasure" + i].length > 0 &&
      data.meals[0]["strMeasure" + i] != " "
    ) {
      Measures += ` <li> ${data.meals[0]["strMeasure" + i]} </li> `;
    }
  }
  mealInfo.innerHTML = `
    <div class="d-flex ">
        <div>
            <img src="${data.meals[0].strMealThumb}"
            class="card-img-top imgDetail img-fluid" alt="CuisinMarccaine">
            <iframe width="320" height="200" class="mt-2" src="${data.meals[0].strYoutube.replace(
              "https://www.youtube.com/watch?v=",
              "https://www.youtube.com/embed/"
            )}
            "title="Tips For Using Async/Await in JavaScript" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="border ms-5 w-100">
            <p class="card-title p-2">Nom: ${data.meals[0].strMeal}</p>
            <p class="card-title p-2">Categorie: ${
              data.meals[0].strCategory
            }</p>
            <p class="card-title p-2">Region: ${data.meals[0].strArea}</p>
            <p class="card-title p-2 border">${
              data.meals[0].strInstructions
            }</p>
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
    </div>`;
  console.log(Ingredients);
}
// function onkeyup search
$("#SearchInput").on("keyup", function () {
  let value = $(this).val();
  console.log("value:", value);
  async function search(value) {
    const res = await fetch(
      "https://themealdb.com/api/json/v1/1/search.php?s=" + value
    );
    const dataSearch = await res.json();
    console.log(dataSearch.meals);
    buildeCard(dataSearch.meals);
  }
  search(value);
});

// add a variable to storing data
let Categories = [];
let Countries = [];
// add a categories
async function getCartegories() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  Categories = await response.json();
  console.log(Categories);
  addCategories(Categories.categories);
}
getCartegories();
// add categorie in html
function addCategories(data) {
  for (let i = 0; i < data.length; i++) {
    let meals = `<option value="${data[i].strCategory}">${data[i].strCategory}</option>`;
    document.querySelector("#selectCategory").innerHTML += meals;
  }
  console.log(data);
}
// function to get countries
async function getCountries() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  Countries = await response.json();
  console.log(Countries);
  addCountries(Countries.meals);
}
getCountries();
// add countries in html
function addCountries(data) {
  for (let i = 0; i < data.length; i++) {
    let meals = `<option value="${data[i].strArea}">${data[i].strArea}</option>`;
    document.querySelector("#selectCountry").innerHTML += meals;
  }
  console.log(data);
}

document.getElementById("search").onclick = async function () {
    let selectedCategory = document.getElementById("selectCategory").value;
    let selectedCountry = document.getElementById("selectCountry").value;
    let dataCountry, dataCategory;
    let contryAndCategoryId = [];

  // console.log(selectedCategory, selectedCountry)

    const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + selectedCategory
    );
    dataCategory = await response.json();
  // console.log(dataCategory);

    const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + selectedCountry
    );
    dataCountry = await res.json();
  // console.log(dataCountry);
    console.log(dataCountry, dataCategory);

    for (let i = 0; i < dataCategory.meals.length; i++) {
    for (let j = 0; j < dataCountry.meals.length; j++) {
        if (dataCategory.meals[i].idMeal == dataCountry.meals[j].idMeal)
        contryAndCategoryId.push(dataCategory.meals[i]);
        }
    }

    console.log(contryAndCategoryId);
};























// $("html").niceScroll({
//   cursorcolor: "#fd7e14", // change cursor color in hex
//   cursoropacitymin: 0, // change opacity when cursor is inactive (scrollabar "hidden" state), range from 1 to 0
//   cursoropacitymax: 1, // change opacity when cursor is active (scrollabar "visible" state), range from 1 to 0
//   cursorwidth: "12px", // cursor width in pixel (you can also write "5px")
//   cursorborder: "0px solid #fff", // css definition for cursor border
//   cursorborderradius: "5px", // border radius in pixel for cursor
//   zindex: 99999, // change z-index for scrollbar div
//   scrollspeed: 60, // scrolling speed
//   mousescrollstep: 40, // scrolling speed with mouse wheel (pixel)
//   autohidemode: false, // how hide the scrollbar works, possible values:
//   background: "#fff", // change css for rail background
// });
