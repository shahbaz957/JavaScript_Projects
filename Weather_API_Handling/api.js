document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const displayCity = document.getElementById("city-name");
  const displayTemp = document.getElementById("temprature");
  const displayDesc = document.getElementById("description");
  const displayErr = document.getElementById("error");

  const API_Key = "fcb9dc1027a961aeb8d7c8530de613a8";
  // Server may throw an error
  // Server is in other continent so be patient
  getBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    cityInput.value = "";
    if (!city) return;
    try {
      const weatherData = await fetchWeatherData(city);

      // this is asynchronous request means it wait in the queue for its term and registered in call-back register

      // Unlock Display

      weatherInfo.classList.remove("hidden");
      displayErr.classList.add("hidden");

      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  // Fetching Weather Data

  async function fetchWeatherData(city) {
    // Fetch the data

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_Key}`;
    const response = await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE", response);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return data;
    // Function are usually used for performing one task
  }

  // Display the weather Data

  function displayWeatherData(data) {
    // Display the weather data by rendering on HtML page

    console.log(data);
    const { name, main, weather } = data;
    displayCity.innerText = name;
    displayTemp.textContent = `Temprature : ${main.temp} °C`
    displayDesc.textContent = `Weather Description : ${weather[0].description}`
  }

  // Showing the Error
  function showError() {
    weatherInfo.classList.add("hidden");
    displayErr.classList.remove("hidden");
  }
});
