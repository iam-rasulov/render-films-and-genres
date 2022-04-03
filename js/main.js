const elList = document.querySelector(".list");
const newList = document.querySelector(".new-list");
const search = document.querySelector(".search");


const localSpliced = JSON.parse(window.localStorage.getItem("list"));
const splicedList = localSpliced || [];
renderNames(splicedList, newList);

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
    const newItem = document.createElement("li");
    const newImg = document.createElement("img");
    const newBox = document.createElement("div");
    const newHeading = document.createElement("h3");
    const newText = document.createElement("p");
    const btnsBox = document.createElement("span");
    const newBtn = document.createElement("button");
    const moreBtn = document.createElement("button");

    newHeading.textContent = film.title;
    newText.textContent = film.overview.split(" ").slice(0 ,10).join(" ") + "...";

    newItem.setAttribute("class", "list__item");
    newImg.setAttribute("src", film.poster);
    newBox.setAttribute("class", "item__box")
    newImg.setAttribute("class", "list__img");
    newHeading.setAttribute("class", "list__title")
    newHeading.dataset.btnId = film.id;
    newText.setAttribute("class", "list__text");
    btnsBox.setAttribute("class", "btns-box")
    newBtn.setAttribute("class", "list__btn");
    moreBtn.setAttribute("class", "list__btn2");
    newBtn.textContent = "Favorite";
    moreBtn.textContent = "More"
    newBtn.dataset.btnId = film.id;
 
    newItem.appendChild(newImg);
    newItem.appendChild(newBox);
    newBox.appendChild(newHeading);
    newBox.appendChild(newText);
    newBox.appendChild(btnsBox);
    btnsBox.appendChild(newBtn);
    btnsBox.appendChild(moreBtn);

    element.appendChild(newItem);
  })

}


function renderNames(arr, element){
  element.innerHTML = ""

  arr.forEach(name => {

    let newItem = document.createElement("li");
    let newBtn = document.createElement("button");

    newItem.textContent = name.title;
    newBtn.textContent = "remove";

    newItem.setAttribute("class", "new-item");
    newBtn.setAttribute("class", "new-btn");
    newBtn.dataset.removeId = name.id;
    
    element.appendChild(newItem);
    newItem.appendChild(newBtn);
  })
}


  elList.addEventListener("click", evt =>{
    if(evt.target.matches(".list__btn")){

      let btnId = evt.target.dataset.btnId;
  
      let findIndexArr = films.find(film => film.id == btnId);

      splicedList.push.findIndexArr;

      if(!splicedList.includes(findIndexArr)){
        splicedList.push(findIndexArr);
        window.localStorage.setItem("list", JSON.stringify(splicedList));
      }
    }
    renderNames(splicedList, newList);
  });
  

  newList.addEventListener("click", evt =>{
    if(evt.target.matches(".new-btn")){

      const btnId = evt.target.dataset.removeId;
  
      const findIndexArr = films.find(n => n.id == btnId);
  
      splicedList.splice(findIndexArr, 1);

      window.localStorage.setItem("list", JSON.stringify(splicedList));

      renderNames(splicedList, newList);
    }
  });


form.addEventListener("submit", evt =>{
  evt.preventDefault();

  const selectVal = select.value;

  let filterFilms = selectVal == "all" ? films : films.filter(element => element.genres.includes(selectVal))  ;

  window.localStorage.setItem("list", JSON.stringify(splicedList));

  renderFilms(filterFilms, elList);
})

renderFilms(films, elList);
renderGenes(films , select);