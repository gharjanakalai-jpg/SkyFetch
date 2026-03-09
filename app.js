class WeatherApp {

constructor(){

this.apiKey = "YOUR_API_KEY"

this.cityInput = document.getElementById("cityInput")
this.searchBtn = document.getElementById("searchBtn")

this.weatherResult = document.getElementById("weatherResult")
this.forecast = document.getElementById("forecast")

this.recentContainer = document.getElementById("recentSearches")
this.clearBtn = document.getElementById("clearBtn")

this.recentSearches = []

this.init()

}

init(){

this.loadRecentSearches()
this.displayRecentSearches()
this.loadLastCity()

this.searchBtn.addEventListener("click",()=>{
let city = this.cityInput.value
this.getWeather(city)
})

this.clearBtn.addEventListener("click",()=>{
this.clearHistory()
})

}

async getWeather(city){

if(!city) return

let url =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`

let res = await fetch(url)
let data = await res.json()

this.displayWeather(data)

this.saveRecentSearch(city)
localStorage.setItem("lastCity",city)

this.getForecast(city)

}

displayWeather(data){

this.weatherResult.innerHTML = `
<h2>${data.name}</h2>
<h3>${data.main.temp}°C</h3>
<p>${data.weather[0].description}</p>
`

}

async getForecast(city){

let url =
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric`

let res = await fetch(url)
let data = await res.json()

this.forecast.innerHTML = ""

for(let i=0;i<5;i++){

let day = data.list[i*8]

let card = document.createElement("div")
card.className="forecast-card"

card.innerHTML = `
<p>${day.dt_txt.split(" ")[0]}</p>
<p>${day.main.temp}°C</p>
<p>${day.weather[0].main}</p>
`

this.forecast.appendChild(card)

}

}

saveRecentSearch(city){

city = city.charAt(0).toUpperCase()+city.slice(1).toLowerCase()

this.recentSearches = this.recentSearches.filter(c=>c!==city)

this.recentSearches.unshift(city)

if(this.recentSearches.length>5){
this.recentSearches.pop()
}

localStorage.setItem("recentSearches",JSON.stringify(this.recentSearches))

this.displayRecentSearches()

}

loadRecentSearches(){

let data = localStorage.getItem("recentSearches")

if(data){
this.recentSearches = JSON.parse(data)
}

}

displayRecentSearches(){

this.recentContainer.innerHTML=""

this.recentSearches.forEach(city=>{

let btn = document.createElement("button")
btn.textContent = city

btn.addEventListener("click",()=>{
this.getWeather(city)
})

this.recentContainer.appendChild(btn)

})

}

loadLastCity(){

let city = localStorage.getItem("lastCity")

if(city){
this.getWeather(city)
}

}

clearHistory(){

localStorage.removeItem("recentSearches")
this.recentSearches=[]
this.displayRecentSearches()

}

}

new WeatherApp()
