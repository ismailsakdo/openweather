function translateCSV() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Sheet1"); // Replace "Sheet1" with the name of your sheet
  var range = sheet.getDataRange();
  var values = range.getValues();
  
  var translatedValues = [];
  
  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    var translatedRow = [];
    
    for (var j = 0; j < row.length; j++) {
      var cellValue = row[j];
      
      if (j === 1 && typeof cellValue === 'string') { // Translate only the second column (index 1)
        var translatedText = LanguageApp.translate(cellValue, 'ms', 'en'); // Translate Malay to English
        translatedRow.push(translatedText);
      } else {
        translatedRow.push(cellValue);
      }
    }
    
    translatedValues.push(translatedRow);
  }
  
  var translatedSheetName = "Translated";
  var translatedSheet = ss.getSheetByName(translatedSheetName);
  
  if (translatedSheet === null) {
    translatedSheet = ss.insertSheet(translatedSheetName);
  }
  
  translatedSheet.getRange(1, 1, translatedValues.length, translatedValues[0].length).setValues(translatedValues);
}
