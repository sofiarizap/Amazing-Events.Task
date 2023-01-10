const cardSpace = document.getElementById("secc-cards")
const searchSpace = document.getElementById("searchSpace")
const checkSpace = document.getElementById("checkCategory")

let apiInfo;
fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(res=> res.json() )
  .then(res => {
    apiInfo = res.events.filter(item => item.date < res.currentDate)
    let checkbox= document.querySelectorAll('input[type="checkbox"]')
    const searchCategories =apiInfo.map( res =>res.category)
    const sinRepetir = Array.from(new Set( searchCategories))
    checkSpace.innerHTML=crearCheckbox(sinRepetir)
    searchSpace.addEventListener('input', filtroCruzado )
    checkSpace.addEventListener( 'change',filtroCruzado)
    filtroCruzado()
  }).catch(err=>console.log(err))

// Barra de Busqueda

function searchName(inputSearch, listNames){
  let filteredEvents =listNames.filter(events =>events.name.toLowerCase().includes(inputSearch.value.toLowerCase()))
  return filteredEvents
}

// checkbox de categorias 


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

function  searchCategory ( listEvents){
  let checkbox= document.querySelectorAll('input[type="checkbox"]')
  let listCategories= []
  for ( let change of checkbox){
    if(change.checked){
      listCategories.push(change.value)
    }
  }
  let filteredCategories= listEvents.filter(event => listCategories.includes(event.category))
  if (listCategories.length===0){
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
  let searchFilter= searchName(searchSpace,apiInfo)
  let checkFilter = searchCategory(searchFilter)
  if(checkFilter.length=== 0){
    cardSpace.innerHTML= ""
    let message = document.createElement("p")
    message.className= "alert"
    message.textContent= "Event not found, adjust search filter"
    cardSpace.appendChild(message) 
  }else{
    renderizar(crearTemplate(checkFilter),cardSpace)
  }
}
filtroCruzado()
//crear el template de las cards
let pastEvents1 = filtrarPast( apiInfo)
function filtrarPast (data){
    let past = []
    for (let elements of apiInfo.events){
        if(elements.date < data.currentDate){
            past.push(elements)
          }
        }
      return past
}
function crearTemplate(pastEvents1){
    let pastEvents = ""
    for (let elements of pastEvents1){
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
    pastEvents += template
    } 
    return  pastEvents
}
