// Personal API Key for OpenWeatherMap API
const apiKey = '130ed56455ecea2e71298610442f8915&units=imperial';

let d = new Date();
let currentDate = `${d.getMonth()}-${d.getDate()}-${d.getFullYear()}`;

/* Function called by event listener */
const handleButtonClick = (e) => {
    e.preventDefault();
    const zipCode = document.querySelector('#zip').value;
    const feelings = document.querySelector('#feelings').value;
    pullWeatherData(zipCode)
    .then(data => {
        postData("/saveData", {'temp': data.main.temp, 'feel': feelings, 'date': currentDate });
    })
    .then(() => {
        retrieveData();
    });
}

// Event listener to add function to existing HTML DOM element
document.querySelector('#generate').addEventListener('click', handleButtonClick);


/* Function to GET Web API Data*/
const pullWeatherData =  async (zip) => {
    const baseUrl =  'https://api.openweathermap.org/data/2.5/weather';
    const response = await fetch(`${baseUrl}?zip=${zip}&appid=${apiKey}`); 
    try{
        result = await response.json();
        return result;
    }catch(error){
        console.log(error);
    }
}

/* Function to POST data */

const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try{
        const result = await response.json();
        return result;
    }catch(error){
        console.log("error: ", error);
    }
}

/* Function to GET Project Data */
const retrieveData = async () => {
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData)
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
        document.getElementById('content').innerHTML = allData.feel;
        document.getElementById('date').innerHTML = allData.date;
    }
    catch(error) {
      console.log('error', error);
      // appropriately handle the error
    }
}