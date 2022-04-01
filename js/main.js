const elList = document.querySelector(".list");
const newList = document.querySelector(".new-list");
const search = document.querySelector(".search");


const splicedList = [];


function renderGenes(arr , element){

  var renderGeners = [];

  arr.forEach((film) => {

    film.genres.forEach(genre => {
      if(!renderGeners.includes(genre)){
        renderGeners.push(genre)
      }
    })
  })

  renderGeners.forEach(genre => {
    const newOption = document.createElement("option");
    newOption.value = genre;
    newOption.textContent = genre;
    element.appendChild(newOption);
  })

}


function renderFilms(arr, element){
  element.innerHTML = "";

  arr.forEach(film =>{
    var newItem = document.createElement("li");
    var newImg = document.createElement("img");
    var newBox = document.createElement("div");
    var newHeading = document.createElement("h3");
    var newText = document.createElement("p");
    var newBtn = document.createElement("button");


    newHeading.textContent = film.title;
    newText.textContent = film.overview.split(" ").slice(0 ,10).join(" ") + "...";

    newItem.setAttribute("class", "list__item");
    newImg.setAttribute("src", film.poster);
    newBox.setAttribute("class", "item__box")
    newImg.setAttribute("class", "list__img");
    newHeading.setAttribute("class", "list__title")
    newHeading.dataset.btnId = film.id;
    newText.setAttribute("class", "list__text");
    newBtn.setAttribute("class", "list__btn");
    newBtn.textContent = "favorite"
    newBtn.dataset.btnId = film.id;

    
    newItem.appendChild(newImg);
    newItem.appendChild(newBox);
    newBox.appendChild(newHeading);
    newBox.appendChild(newText);
    newBox.appendChild(newBtn);

    element.appendChild(newItem);

  })

}


function renderNames(arr, element){
  element.innerHTML = ""

  arr.forEach(name => {

    var newItem = document.createElement("li");
    var newHeading = document.createElement("h3");
    var newBtn = document.createElement("button");

    newItem.setAttribute("class", "new-item");
    newHeading.textContent = name.title;
    newHeading.setAttribute("class", "new-title");
    newHeading.dataset.btnId = name.id;
    newBtn.setAttribute("class", "new-btn");
    newBtn.textContent = "remove";
    newBtn.dataset.btnId = name.id;

    newItem.appendChild(newHeading);
    newItem.appendChild(newBtn);
    element.appendChild(newItem);
  })
}


  elList.addEventListener("click", evt =>{
    if(evt.target.matches(".list__btn")){

      const btnId = evt.target.dataset.btnId;
  
      const findIndexArr = films.findIndex(film => film.id == btnId);

      const findd = btnId === !findIndexArr
  
      splicedList.push(findd)
    }
    
    renderNames(splicedList, newList);
    
  });
  

  newList.addEventListener("click", evt =>{
    if(evt.target.matches(".new-btn")){

      const btnId = evt.target.dataset.btnId;
  
      const findIndexArr = films.findIndex(name => name.id == btnId);
  
      splicedList.splice(findIndexArr, 1);

      renderNames(splicedList, newList);
      
    }
    renderFilms(films, elList);
  });

form.addEventListener("submit", evt =>{
  evt.preventDefault();

  const selectVal = select.value;

  let filterFilms = selectVal == "all" ? films : films.filter(element => element.genres.includes(selectVal))  ;

  // if(selectVal === "all"){
  //   filterFilms = films;
  // }else{
  //   filterFilms = films.filter(element => element.genres.includes(selectVal));
  // }

  renderFilms(filterFilms, elList);

  
  // const searchVal = search.value;

  // let filterSearchs = searchVal == "all" ? films : films.filter(element => element.title.includes(searchVal))  ;

  // renderFilms(filterSearchs, elList)

})

renderFilms(films, elList);
renderGenes(films , select);