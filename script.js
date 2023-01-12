// take data in randomData
let randomData = [];
// get IPA random max 6
for (let i = 0; i < 6; i++) {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((data) => randomData.push(data.meals[0]));
}
// time out for response data random 
setTimeout(() => {
  buildeCard(randomData);
}, 1000);
// function build les card meals
let CardsContainer = document.querySelector("#CardsContainer");
function buildeCard(array) {
  let row;
  CardsContainer.innerHTML = "";
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
// get id from IPA Lookup full meal details by id 
async function showModal(id) {
  const response = await fetch
  ("https://themealdb.com/api/json/v1/1/lookup.php?i=" + id);
  const data = await response.json();
// add variables
  let mealInfo = document.querySelector("#mealInfo");
  let Ingredients;
  let Measures;
  Ingredients = "";
  Measures = "";
  // for loop to build Ingredient && Measure
  // display Ingredient1++ ;
  for (i = 1; i <= 20; i++) {
    if (
      data.meals[0]["strIngredient" + i] !== null &&
      data.meals[0]["strIngredient" + i].length > 0 &&
      data.meals[0]["strIngredient" + i] != " "
    ) {
      Ingredients += ` <li> ${data.meals[0]["strIngredient" + i]}</li>`;
    }
  // display Ingredient1++ ;
    if (
      data.meals[0]["strMeasure" + i] !== null &&
      data.meals[0]["strMeasure" + i].length > 0 &&
      data.meals[0]["strMeasure" + i] != " "
    ) {
      Measures += ` <li> ${data.meals[0]["strMeasure" + i]} </li> `;
    }
  }
  // build a modale content 
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
}
// get the value from input and add in IPA "List all meals by first letter"
$("#SearchInput").on("keyup", function () {
  let value = $(this).val();
  console.log("value:", value);
  async function search(value) {
    const res = await fetch
    ("https://themealdb.com/api/json/v1/1/search.php?s=" + value);    
    const dataSearch = await res.json();
    // affiche the result with pagination 
    if (dataSearch.meals) {
      getPageList(dataSearch.meals, CardsContainer, rows_per_page, currentPage);
      SetupPagination(dataSearch.meals, paginationElement, rows_per_page);
    } else {
      alert("There's no meal with this name");
    }
  }
  search(value);
});
// add a variable to response data JSON
let Categories = [];
let Countries = [];
// add a categories
async function getCartegories() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  Categories = await response.json();
  addCategories(Categories.categories);
}
getCartegories();
// build categorie in html
function addCategories(data) {
  for (let i = 0; i < data.length; i++) {
    let meals = `<option value="${data[i].strCategory}">${data[i].strCategory}</option>`;
    document.querySelector("#selectCategory").innerHTML += meals;
  }
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
// build countries in html
function addCountries(data) {
  for (let i = 0; i < data.length; i++) {
    let meals = `<option value="${data[i].strArea}">${data[i].strArea}</option>`;
    document.querySelector("#selectCountry").innerHTML += meals;
  }
}
// add variables to storage data country and category and All 
let dataCountry, dataCategory;
let allCategoriesAndCountries = []
document.getElementById("search").onclick = async function () {
  // get value from the select options 
  let selectedCategory = document.getElementById("selectCategory").value;
  let selectedCountry = document.getElementById("selectCountry").value;
    const response = await fetch
    ("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + selectedCategory);
    dataCategory = await response.json();
    const res = await fetch
    ("https://www.themealdb.com/api/json/v1/1/filter.php?a=" + selectedCountry);
    dataCountry = await res.json();
  // condition for affichage  data country and category and all 
  // condition 1 if he's selected country but not select any category (display all meals in this country)
  if (selectedCountry !== "all" && selectedCategory == "all") {
    let allCountries = [];
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=" +  selectedCountry);
    allCountries = await res.json();
    // add a pagination list and build data 
    getPageList(allCountries.meals, CardsContainer, rows_per_page, currentPage);
    SetupPagination(allCountries.meals, paginationElement, rows_per_page);
  // condition 2 if he's selected category but not select any country (display all meals in this category)
  } else if (selectedCountry == "all" && selectedCategory !== "all") {
    let allCategories = [];
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + selectedCategory);
    allCategories = await response.json();
    // add a pagination list and build data 
    getPageList(allCategories.meals, CardsContainer, rows_per_page, currentPage);
    SetupPagination(allCategories.meals, paginationElement, rows_per_page);
  // condition 3 if he's selected category and country (display all meals )
  } else if (selectedCategory == "all" && selectedCountry == "all") {
    let dataAll = [];
    // for loop to loop in all categories and push in the variable global  
    for (let i = 0; i < Categories.categories.length; i++){
      const result = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + Categories.categories[i].strCategory);
      dataAll = await result.json();
      allCategoriesAndCountries.push(dataAll.meals)
    }
    console.log(allCategoriesAndCountries.flat(1))
    // add a pagination list and build data 
    getPageList(allCategoriesAndCountries.flat(1), CardsContainer, rows_per_page, currentPage);
    SetupPagination(allCategoriesAndCountries.flat(1), paginationElement, rows_per_page);
  // else he's selecte a category and country 
  } else {
    BuildCardById()
    // getPageList(contryAndCategoryId, CardsContainer, rows_per_page, currentPage);
    // SetupPagination(contryAndCategoryId, paginationElement, rows_per_page);
  }
};
// this variable global for storage all data meals who have same id
let contryAndCategoryId = [];
// and this function for build it
function BuildCardById() {
  for (let i = 0; i < dataCategory.meals.length; i++) {
    for (let j = 0; j < dataCountry.meals.length; j++) {
        if (dataCategory.meals[i].idMeal == dataCountry.meals[j].idMeal)
        contryAndCategoryId.push(dataCategory.meals[i]);
        }
    }
    buildeCard(contryAndCategoryId)
}
// add varible globale 
const listElement = document.getElementById('indicators')
const paginationElement = document.getElementById('pagination')
// and variable global "currentPage" is list of the pagination (1,2...)
// and "rows_per_page" is max for display in page 
let currentPage = 1;
let rows_per_page = 6;

let searchedMeal = "";
// add a function getPageList for build pagination list 
function getPageList (items, wrapper, rows_per_page, page) {
    wrapper.innerHTML = "";
    page--;
    let start = rows_per_page * page;
    let end = start + rows_per_page;
    let paginationItems = items.slice(start, end);
    for (let i = 0; i < paginationItems.length; i++) {
      let item = paginationItems[i]
      searchedMeal += 
      `<div class=" card m-3"  style="width: 20rem;">
        <img src="${item.strMealThumb}" class="card-img-top" alt="CuisinMarccaine">
          <div class="card-body">
            <h5 class="card-title">${item.strMeal}</h5>
            <p class="card-text">...</p>
            <a href="#" onclick="showModal(${item.idMeal})" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">more details</a>
          </div>
        </div> `;
}
CardsContainer.innerHTML = searchedMeal;
searchedMeal = ''
}
// calculate how many pages button will be displayed and adding the buttons with the paginationButton function
function SetupPagination(items, wrapper, rows_per_page) {
    wrapper.innerHTML = ""
    let page_count = Math.ceil(items.length / rows_per_page)
    for (let i = 1; i < page_count + 1; i++) {
        let btn = PagginationButton(i, items)
        wrapper.appendChild(btn)
    }
}
// adding a class "active" in botton clicked  
function PagginationButton(page, items){
    let button = document.createElement('button')
    button.innerText = page
    if (currentPage == page) button.classList.add('active');
    button.addEventListener('click', function() {
        currentPage = page;
        getPageList(items, CardsContainer, rows_per_page, currentPage);
        let current_btn = document.querySelector("#pagination button.active");
        current_btn.classList.remove("active");
        button.classList.add("active");
    })
    return button
}



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
