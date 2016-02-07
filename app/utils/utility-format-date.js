// Take a date object and return a string in ISO format of the local date
export default function (dateObj) {
  const date = dateObj.toLocaleDateString().split('/');
  const month = date[0].length < 2 ? `0${date[0]}` : date[0];
  const day = date[1].length < 2 ? `0${date[1]}` : date[1];
  return `${date[2]}-${month}-${day}`;
}
