let age = function(pesel) {
  let peselString = pesel.toString();
  let year = 1900 + parseInt(peselString[0]) * 10 + parseInt(peselString[1]);
  if (parseInt(peselString[2]) >= 2 && parseInt(peselString[2]) < 8)
    year += Math.floor(parseInt(peselString[2]) / 2) * 100;
  if (parseInt(peselString[2]) >= 8) year -= 100;
  let now = new Date().getFullYear();
  return now - year;
};
let noPreviewMimeTypes = ["xlsx", "docx", "zip", "xls", "doc"];
export { age };
export { noPreviewMimeTypes };
