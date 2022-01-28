const tab1_content = document.getElementById('tab_1');
const tab2_content = document.getElementById('tab_2');
const tab3_content = document.getElementById('tab_3');
const tab1 = document.getElementById('link_1');
const tab2 = document.getElementById('link_2');
const tab3 = document.getElementById('link_3');
const search = document.getElementById('imgSearch');
const input = document.getElementById('inputForSearch');
const heart = document.getElementById('heart');
const cityNameInDoc = document.getElementById('city_1');
const listOfCities = document.getElementById('listOfLocations');
const mainTemp = document.getElementById('degree_p');
const degreeIMG = document.getElementById('degree_img');
const detailTemp = document.getElementById('detail_temperature');
const detailFeels = document.getElementById('detail_feels');
const detailWeather = document.getElementById('detail_weather');
const detailSunrise = document.getElementById('detail_sunrise');
const detailSunset = document.getElementById('detail_sunset');
const weatherIMG = document.getElementById('cloud');
const removeButton = document.querySelector('.remove');



/*const cityName = 'boston';*/



function getTemperature(cityName){
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f&units=metric';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
    
    

    return fetch(url)
        .then(response => {
            const responseJSON = response.json();
            return responseJSON;
        }).then(data => {
            
            mainTemp.innerHTML = data.main.temp;
            cityNameInDoc.innerHTML = data.name;
            degreeIMG.style.display = 'block';
            detailTemp.innerHTML = 'Temperature:   ' + data.main.temp;
            detailFeels.innerHTML = 'Feels like:   ' + data.main.feels_like;
            detailWeather.innerHTML = 'Weather:   ' + data.weather[0].main;
            detailSunrise.innerHTML = 'Sunrise:   ' + data.sys.sunrise;
            detailSunset.innerHTML = 'Sunset:   ' + data.sys.sunset;
            let iconIMG = data.weather[0].icon;
            weatherIMG.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
            console.log(data);
            

        }).catch(err => alert('что-то пошло не так'));
}

function makeTabVisibleTab1() {
    tab2_content.style.display = "none";
    tab3_content.style.display = "none";
    tab1_content.style.display = 'block';
}

function makeTabVisibleTab2() {
    tab1_content.style.display = "none";
    tab3_content.style.display = "none";
    tab2_content.style.display = 'block';
}

function makeTabVisibleTab3() {
    tab1_content.style.display = "none";
    tab2_content.style.display = "none";
    tab3_content.style.display = 'block';
}



function changeColorOfHeart() {
    heart.classList.toggle('heart_selected');
}

function appendCityName() {
    if (!input.value) {
        alert('Where is city?');
    } else {
        cityNameInDoc.innerHTML = input.value;
        
    }

}

function addLocations() {
    if (cityNameInDoc.innerHTML) {
        let cityDiv = document.createElement('div');
        let removeIMG = document.createElement('img');
        /*let cityDivName = document.createElement('div');*/

        removeIMG.src = 'remove.png';
        removeIMG.classList.add('remove');
        cityDiv.classList.add('loc');
        cityDiv.innerHTML = cityNameInDoc.innerHTML;
        
        cityDiv.prepend(removeIMG);
        listOfLocations.append(cityDiv);

        removeIMG.addEventListener('click', deleteCity)
        
    } else{
        alert('Where is city?');
    }
}


function deleteCity () {
    let task = this.parentElement;
    task.remove();
  }
  

tab1.addEventListener("click", makeTabVisibleTab1);
tab2.addEventListener("click", makeTabVisibleTab2);
tab3.addEventListener("click", makeTabVisibleTab3);
heart.addEventListener('click', changeColorOfHeart);
search.addEventListener('click', appendCityName);
heart.addEventListener('click', addLocations);

 search.addEventListener('click', () => getTemperature(input.value));
