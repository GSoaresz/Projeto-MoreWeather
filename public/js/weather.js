const apiKey = '75545c2740981400d7bada375cf86ed4';

const names = document.querySelector('.name');
let city = document.querySelector('input#tagCityName');
const formTemp = document.querySelector('form.tempT');
const country = 'Brazil';
const temp = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const description = document.querySelector('.description');

formTemp.addEventListener('submit', function (e) {
  e.preventDefault();

  const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city.value},${country}&appid=${apiKey}&units=metric"`;
  fetch(urlWeather).then(res => res.json())
    .then(data => {
      const nameValue = data['name'];
      const tempValue = Math.round(parseFloat(data['main']['temp']) - 273.15);
      const tempMinValue = Math.round(parseFloat(data['main']['temp_min']) - 273.15)
      const tempMaxValue = Math.round(parseFloat(data['main']['temp_max']) - 273.15)
      const humidityValue = data['main']['humidity'];
      const descriptionValue = data['weather'][0]['description'];
      names.innerHTML = 'Cidade: ' + nameValue;
      temp.innerHTML = 'Temperatura: ' + tempValue + 'ºC - ' + tempMinValue+'/'+tempMaxValue;
      humidity.innerHTML = 'Humidade: ' + humidityValue + '%';
      description.innerHTML = 'Descrição: ' + descriptionValue;
    }

    )
    .catch(err => name.innerHTML = ("Cidade não encontrada!"))
    .catch(err => console.log("Error! ::404::"))
})