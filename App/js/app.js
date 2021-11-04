// Display current date, time & location (est vs pst etc)
const d = new Date();
document.getElementById("date").innerHTML = d;

//global variables
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?';
let apiKey = '&appid=f39afc0e7211a79d6b404b457dc3633a';
const metric = "&units=metric";

//get selectors
const submit = document.querySelector("#generate");
const hum = document.querySelector("#humidity");
const feelsLike = document.querySelector("#feelslike");
const temp = document.querySelector("#temp");
const place = document.querySelector("#city");

const performAction = async (e) => {
  const zipCodeInput = document.getElementById("zip").value;
  // This getForecastData is an async function 
  const data = await getForecastData(baseURL, zipCodeInput, apiKey);
  weatherData(data);
};

document.getElementById("generate").addEventListener("click", performAction);

const getForecastData = async (baseURL, zip, key) => {
  const url = baseURL + "zip=" + zip + key;
  console.log("url", url);
  

  const res = await fetch(url);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

//Post request in async format - received from udacity course 
const postData = async (url = "/addAPI", data = {}) => {
  console.log(data);
  const options = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch('/addAPI', options);
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};


//interact with the forecast data to show weather data
let weatherData = (data) => {
  const errorMsg = document.querySelector("#errormsg");
  errorMsg.innerHTML = "";
  console.log("main", data.main);
  console.log("sys", data.sys);
  place.innerHTML = `${data?.name}, ${data?.sys?.country}`;
  hum.innerHTML = `${data?.main?.humidity} %`;
  temp.innerHTML = `${Math.floor(data?.main?.temp - 273)} °C`;
  feelsLike.innerHTML = `${Math.floor(data?.main?.feels_like - 273)}°C`;
};

//Implement error message
const getForecastError = async (url, zip, key) => {
  const errorMsg = document.querySelector("#errormsg"); 
  try {
    const response = await fetch(baseURL + zip + apiKey);
    const data = await response.json();
    console.log(data);
    if (data.cod === "404") {
      errorMsg.innerHTML = "Enter a valid zip code";
    } else {
      weatherData(data);
      usersLocation = data.name;
      return data;
    } 
  } catch (error) {
    console.log("errormsg", error);
    errorMsg.innerHTML = "Enter a valid zip-code";
  }
}; 


//Update User UI
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("humidity").innerHTML = allData[0].hum;
    document.getElementById("city").innerHTML = allData[0].place;
    document.getElementById("temp").innerHTML = allData[0].temp;
    document.getElementById("feelslike").innerHTML = allData[0].feelslike;
  } catch (error) {
    console.log("error", error);
  }
  postData('/addAPI')
      .then(function(allData){  
        retrieveData('/all')
      })
      updateUI();

};




// Find users location & asks permission to locate
const locationFinder = () => {
  return new Promise(function (resolve, error) {
  window.addEventListener('load', function() {
    if (!navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getLocation);
    } else {
      navigator.innerHTML = error("Location information is unavailable.");
    }
  });
  function getLocation(position) {
    locationFinder.innerHTML =
      "Latitude: " +
      position.coords.latitude +
      "<br>Longitude: " +
      position.coords.longitude;
    resolve(`worked`);
  }

  })

};

locationFinder()
  .then(function(value){
    return getForecastError(baseURL, metric, apiKey);
  })

  .then(function(value){
    return getForecastData(baseURL, metric, apiKey);
  })

  .then(function(value){
    return weatherData(data);
  }) 


