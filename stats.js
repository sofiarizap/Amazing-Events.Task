let eventsTable = document.getElementById("eventsTable")
let upComingEventsTable = document.getElementById("upComingEventsTable")
let pastEventsTable = document.getElementById("pastEventsTable")

fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(res=> res.json() )
  .then(res => {
    let apiInfo = res
    let dataEvents = res.events
        firstTable(eventsTable, dataEvents)
        createTableBody(statisticsCategory(pastEvents(dataEvents, res.currentDate)), pastEventsTable)
        createTableBody(statisticsCategory(upComingEvents(dataEvents, res.currentDate)), upComingEventsTable)
  }).catch(err=>console.log(err))
    
  
function percentage(capacity, assistance) { 
    return (parseFloat(assistance) * 100)/ parseFloat(capacity)
}
function morepercentage(arrayEvents) {
    let eventName;
    let max = percentage(parseFloat(arrayEvents[0].capacity), (arrayEvents[0].assistance)).toFixed(2)
    arrayEvents.forEach(event => {
        if (percentage(event.capacity, event.assistance) > max) {
            max = percentage(event.capacity, event.assistance).toFixed(2)
            eventName = event.name
        }
    })
    return { name: eventName, percentage: max }
}
function lowestpercentage(arrayEvents) {
    let eventName;
    let min = percentage(parseFloat(arrayEvents[0].capacity), (arrayEvents[0].assistance))
    arrayEvents.forEach(event => {
        if (percentage(event.capacity, event.assistance) < min) {
            min = percentage(event.capacity, event.assistance).toFixed(2)
            eventName = event.name
        }
    })
    return { name: eventName, percentage: min }
}
function moreCapacity(arrayEvents) {
    return arrayEvents.sort((a, b) => b.capacity - a.capacity)[0]
}
function firstTable(node, arrayEvents) {
    let tr = document.createElement('tr')
    tr.innerHTML = `<td>${morepercentage(arrayEvents).name} : ${morepercentage(arrayEvents).percentage}%</td>
                    <td>${lowestpercentage(arrayEvents).name} : ${lowestpercentage(arrayEvents).percentage}%</td>
                    <td>${moreCapacity(arrayEvents).name} : ${moreCapacity(arrayEvents).capacity} people</td>`
    node.appendChild(tr)
}
function upComingEvents(arrayEvents, date) {
    return arrayEvents.filter(item => item.date > date)
}
function pastEvents(arrayEvents, date) {
    return arrayEvents.filter(item => item.date < date)
}
function statisticsCategory(arrayEvents) {
    let arrayObjectStatisticsForCategory = []
    categories(arrayEvents).forEach(category => {
        let arrayFilteredForCategory = arrayEvents.filter(event => event.category == category)
        let revenuesForCategory = Math.round(revenues(arrayFilteredForCategory) / arrayFilteredForCategory.length)
        let percentageEvent = []
        arrayFilteredForCategory.forEach(event => {
            percentageEvent.push(Math.round(percentage(event.capacity, event.assistance || event.estimate)))
        })
        let percentageCategory = (percentageEvent.reduce((sum, percentage) => sum + percentage, 0) / percentageEvent.length).toFixed(2)
        let categoryStatistics = {
            category: category,
            revenues: revenuesForCategory,
            percentage: percentageCategory
        }
        arrayObjectStatisticsForCategory.push(categoryStatistics)
    })
    return arrayObjectStatisticsForCategory
}
function categories(arrayEvents) {
    let arrayCategories = []
    arrayEvents.forEach(event => {
        if (!arrayCategories.includes(event.category)) {
            arrayCategories.push(event.category)
        }
    })
    return arrayCategories
}
function revenues(arrayEventsCategory) {
    return arrayEventsCategory.reduce((sum, event) => sum + event.price * (parseInt(event.assistance) || parseInt(event.estimate)), 0)
}
function createTableBody(arrayObjects, node) {
    arrayObjects.forEach(element => {
        let tr = document.createElement('tr')
        tr.innerHTML = `
                        <td>${element.category}</td>
                        <td>$${element.revenues}</td>
                        <td>${element.percentage}%</td>
        `
        node.appendChild(tr)
    })
}