var SPREADSHEET_URL = 'URL_GOOGLE_SHEET';

function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate();
}

function insertComment(date, time, comment) {
  try {
    var sheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL).getSheetByName('Sheet1');
    
    if (!sheet) {
      throw new Error('Sheet not found');
    }
    
    var dateTime = new Date(date + ' ' + time);
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1).setValue(dateTime);
    sheet.getRange(lastRow + 1, 2).setValue(comment);
  
    var translatedComment = LanguageApp.translate(comment, 'ms', 'en');
    sheet.getRange(lastRow + 1, 3).setValue(translatedComment);
    
    return true;
  } catch (error) {
    console.error('Error inserting comment:', error);
    return false;
  }
}
