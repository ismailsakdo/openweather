var SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1XCY7Znlro9c1UAtyjg1MTMrChdOLS-8Xt1rIe8YMNLs/edit#gid=0';

function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate();
}

function insertComment(date, time, email, comment) {
  try {
    var sheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL).getSheetByName('Sheet1');
    
    if (!sheet) {
      throw new Error('Sheet not found');
    }
    
    var dateTime = new Date(date + ' ' + time);
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1).setValue(dateTime);
    sheet.getRange(lastRow + 1, 2).setValue(email);
    sheet.getRange(lastRow + 1, 3).setValue(comment);

  
    var translatedComment = LanguageApp.translate(comment, 'ms', 'en');
    sheet.getRange(lastRow + 1, 4).setValue(translatedComment);
    
    return true;
  } catch (error) {
    console.error('Error inserting comment:', error);
    return false;
  }
}
