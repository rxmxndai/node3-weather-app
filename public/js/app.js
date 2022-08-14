console.log("Client side js is loaded")



const weatherForm = document.querySelector("form")
const msgA = document.querySelector("#aText")
const msgB = document.querySelector("#bText")



weatherForm.addEventListener("submit", (e) => {

    const search = document.querySelector('input')

    e.preventDefault()
    
    const location = search.value
    
    fetch("http://localhost:3000/weather?address=" + location).then( (response) => {
    response.json().then( (data) => {
        msgA.textContent = ""
        msgB.textContent = ""
        if (data.error) {
            msgA.textContent = data.error
        }
        else {
            msgA.textContent = data.location
            msgB.textContent = data.forecastData
        }
        
    })
})
})