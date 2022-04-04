const elList = document.querySelector(".list");
const newList = document.querySelector(".new-list");
const search = document.querySelector(".search");
const modalBox = document.querySelector(".box");


const localSpliced = JSON.parse(window.localStorage.getItem("list"));
const splicedList = localSpliced || [];
renderNames(splicedList, newList);
const modals = [];

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

function renderTitle(arr , element){

  const renderTitles = [];

  arr.forEach((titles) => {

    titles.title.forEach(titl => {
      if(!renderTitles.includes(titl)){
        renderTitles.push(titl)
      }
    })
  })
}

// function renderYear(arr, element){

// }

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
    moreBtn.dataset.btnId = film.id;
 
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
  element.textContent = "Movies catalog "

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


function renderModal(arr, element){
  element.innerHTML = "";

  arr.forEach(modal => {
    const modalList = document.createElement("ul");
    const modalItem = document.createElement("li");
    const modalBox = document.createElement("div");
    const modalTitle = document.createElement("h3");
    const modalImg = document.createElement("img");
    const modalText = document.createElement("p");
    const modalTime = document.createElement("time");
    const modalSubList = document.createElement("ul");
    const modalDelete = document.createElement("button");

    modalList.classList.add("modal-list");
    modalItem.classList.add("modal-item");
    modalBox.classList.add("boxx");
    modalImg.classList.add("modal-item__img");
    modalTitle.classList.add("modal-item__title");
    modalText.classList.add("modal-item__text");
    modalTime.classList.add("modal-item__time");
    modalSubList.classList.add("modal-item__sublist");
    modalDelete.classList.add("modal-delete")

    modalTitle.textContent = modal.title;
    modalImg.setAttribute("src", modal.poster);
    modalText.textContent = modal.overview;
    modalTime.textContent = dateFormat(modal.release_date);
    modalDelete.dataset.deleteId = modal.id;
    modalDelete.textContent = "Close";

    arr.forEach(film => {

      film.genres.forEach(genre => {
        const modalSubItem = document.createElement("li");
        modalSubItem.textContent = genre;
        modalSubItem.classList.add("modal-item__sublist__item");
        modalSubList.appendChild(modalSubItem);
      })
    })

    modalBox.appendChild(modalImg);
    modalBox.appendChild(modalTitle);
    modalBox.appendChild(modalText);
    modalBox.appendChild(modalTime);
    modalBox.appendChild(modalSubList);
    modalBox.appendChild(modalDelete);
    modalItem.appendChild(modalBox);
    modalList.appendChild(modalItem);
    element.appendChild(modalList);

  })
}

  elList.addEventListener("click", evt =>{
    if(evt.target.matches(".list__btn")){

      let btnId = evt.target.dataset.btnId;
  
      let findIndexArr = films.find(film => film.id == btnId);

      if(!splicedList.includes(findIndexArr)){
        splicedList.push(findIndexArr);
        window.localStorage.setItem("list", JSON.stringify(splicedList));
      }
    }
    if(evt.target.matches(".list__btn2")){

      let btnId = evt.target.dataset.btnId;
  
      let findIndexArr = films.find(film => film.id == btnId);
      
      if(!modals.includes(findIndexArr)){
        modals.push(findIndexArr);
        window.localStorage.setItem("list", JSON.stringify(splicedList));
      }

      renderModal(modals, modalBox);
    }
    renderNames(splicedList, newList);
  });
  

  newList.addEventListener("click", evt =>{
    if(evt.target.matches(".new-btn")){

      const btnId = evt.target.dataset.removeId;
  
      const findIndexArr = splicedList.findIndex(n => n.id == btnId);
  
      splicedList.splice(findIndexArr, 1);

      window.localStorage.setItem("list", JSON.stringify(splicedList));

      renderNames(splicedList, newList);
    }
  });


  modalBox.addEventListener("click", evt =>{
    if(evt.target.matches(".modal-delete")){

      const deleteID = evt.target.dataset.deleteId;
  
      const findIndexArr = modals.findIndex(n => n.id == deleteID);
  
      modals.splice(findIndexArr, 1);

      window.localStorage.setItem("list", JSON.stringify(modals));

      renderModal(modals, modalBox);
    }
  })
  

form.addEventListener("submit", evt =>{
  evt.preventDefault();

  const selectVal = select.value;

  let filterFilms = selectVal == "all" ? films : films.filter(element => element.genres.includes(selectVal))  ;

  // const searchVal = search.value;

  // let filterSearch = searchVal == "all" ? films : films.filter(element => element.title.includes(searchtVal))  ;

  window.localStorage.setItem("list", JSON.stringify(splicedList));

  renderFilms(filterFilms, elList);
})

renderFilms(films, elList);
renderGenes(films , select);