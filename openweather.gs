//API=....

function fetchWeatherData() {
  // OpenWeatherMap API endpoint and API key
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  var apiKey = "API OpeanWheather Map";
  
  // Location parameters for Kuala Lumpur, Malaysia
  var city = "Sungai Buloh";
  var countryCode = "MY";
  
  // Google Sheet
  var sheetName = "Sheet1";
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  
  // Fetching weather data from OpenWeatherMap
  var response = UrlFetchApp.fetch(apiUrl + "?q=" + city + "," + countryCode + "&appid=" + apiKey);
  var weatherData = JSON.parse(response.getContentText());
  
  // Getting the current date and time
  var currentDate = new Date();
  var formattedDateTime = Utilities.formatDate(currentDate, "GMT+0800", "dd-MM-yyyy HH:mm:ss");
  
  // Converting temperature from Kelvin to Celsius
  var temperatureKelvin = weatherData.main.temp;
  var temperatureCelsius = temperatureKelvin - 273.15;
  
  // Find the last row with data in column A
  var lastRow = sheet.getLastRow() + 1;
  
  // Updating Google Sheet
  sheet.getRange(lastRow, 1).setValue(formattedDateTime);
  sheet.getRange(lastRow, 2).setValue(temperatureCelsius);
  sheet.getRange(lastRow, 3).setValue(weatherData.main.humidity);
  sheet.getRange(lastRow, 4).setValue(weatherData.main.pressure);
}
