const cardSpace = document.getElementById("secc-cards")
const searchSpace = document.getElementById("searchSpace")
const checkSpace = document.getElementById("checkCategory")


// Barra de Busqueda

searchSpace.addEventListener('input',filtroCruzado )

function searchName(inputSearch){
  let filteredEvents =data.events.filter(events =>events.name.toLowerCase().includes(inputSearch.value.toLowerCase()))
  if(inputSearch === undefined || inputSearch === null){
    let message = document.createElement("p2")
    message.innerHTML= `<p2 class="alert">Event not found, adjust search filter</p2> `
    cardSpace.appendChild(message) 
  }
  return(filteredEvents)
}

// checkbox de categorias 


const searchCategories = data.events.map( elemnt => elemnt.category)
const sinRepetir = Array.from(new Set(searchCategories))

function crearCheckbox(categories){
  let template = ""
  categories.forEach(category => {
    template += 
    `
    <div class="form-check form-check-inline ">
      <input class="form-check-input" type="checkbox"  value="${category}">
      <label class="form-check-label text-light" for="${category}">${category}</label>
    </div>
    `
  })
  return(template)
}
checkCategory.innerHTML=crearCheckbox(sinRepetir)

checkSpace.addEventListener( 'change',filtroCruzado)

let checkbox= document.querySelectorAll('input[type="checkbox"]')

function  searchCategory (changeCheckBox, listEvents){
  let listCategories= []
  for ( let change of changeCheckBox){
    if(change.checked){
      listCategories.push(change.value)
    }
  }
  let filteredCategories= listEvents.filter(event => listCategories.includes(event.category))
  if (filteredCategories.length===0){
    return listEvents
  }else{
    return(filteredCategories); 
  }
}

function renderizar (templete, location ){
  location.innerHTML=templete
}
// función de cruce 
function filtroCruzado(){
  let searchFilter= searchName(searchSpace)
  let checkFilter = searchCategory(checkbox,searchFilter)
  console.log(checkFilter)
  if(checkFilter=== 0||checkFilter === undefined ||checkFilter ==null ){
    let message = document.createElement("p2")
    message.innerHTML= `<p2 class="alert">Event not found, adjust search filter</p2> `
    cardSpace.appendChild(message) 
  }else{
    renderizar(crearTemplate(checkFilter),cardSpace)
  }
}
filtroCruzado()

// crear el template de las cards

function crearTemplate(dataEvents){
    let homeEvents = ""
    for (let elements of dataEvents){
    let template = `
    <div class="secc-cards">
      <div class="card border border-2 border-white  bg-dark bg-success p-2 text-white bg-opacity-50 m-3 d-flex flex-column" style="width: 19rem;">
        <div class="card.top " > 
          <img src="${elements.image}" class="card-img-top" alt="Collectivities Party">
          <div class="card-body" style="height: 24vh;">
            <h5 class="card-title"><stong>${elements.name}</stong></h5>
            <p class="card-text">${elements.description} </p>
          </div>
          <div class="card.botton d-flex justify-content-around">
            <p class="card-text "> Price : $ ${elements.price}</p>
            <a href="./details.html?id=${elements._id}" class="btn btn-dark ">See More</a>
          </div>
        </div>
      </div>
    </div>
    `
    homeEvents += template
    } 
    return homeEvents
}
crearTemplate(data.events)










