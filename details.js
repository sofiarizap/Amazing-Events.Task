let urlParameter = location.search
let parameter = new URLSearchParams(urlParameter)
let id = parameter.get("id")
let dataEvents = data.events

let seccDetails = document.getElementById("secc-details")
let detailCard = data.events.find(event => event._id == id )
console.log(detailCard)

function crearTemplate( detailCard){
  seccDetails.innerHTML=""
  let div = document.createElement("div")
  div.className= "card col-11"
  div.innerHTML= `
  <div class="row g-0 border  border-2 border-white rounded bg-dark bg-success p-2 text-white bg-opacity-50 m-3 d-flex justify-content-center flex-wrap"  style="width: 96%;">
  <div class="col-md-7 text-center"  >
    <img src="${ detailCard.image}" class="card-img-top border border-white  rounded" alt="Collectivities Party">
  </div>
  <div class="col-md-5 ">
    <div class="card-body m-3"  >
      <h5 class="card-title m-2">${  detailCard.name}</h5>
      <p class="card-text">${  detailCard.description}</p>
      <p class="card-text"><strong>Date:</strong> ${ detailCard.date}</p>
      <p class="card-text"> <strong>Category:</strong> ${ detailCard.category}</p>
      <p class="card-text"> <strong>Place:</strong>  ${ detailCard.place}</p>
      <p class="card-text"> <strong>Capacity:</strong> ${ detailCard.capacity} people</p>
      <p class="card-text"><strong>${ detailCard.assistance?`Assistance`: `Estimate assistance`}: </strong> ${ detailCard.assistance|| detailCard.estimate} people </p>
      <p class="card-text"><strong>Price: $ </strong>${ detailCard.price}</p>
    </div>
  </div>
</div>`
seccDetails.appendChild(div)
}
crearTemplate( detailCard)
