export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export function convertToDesiredFormat(inputString) {
  // Replace spaces with '%20'
  let formattedString = inputString.replace(/ /g, '%20');
  // Replace apostrophes with '%27'
  formattedString = formattedString.replace(/'/g, '%27');
  return formattedString;
}


