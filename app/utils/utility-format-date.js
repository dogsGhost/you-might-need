// Take a date object and return a string in ISO format of the local date
// TODO: there must be a better way to do this...
export default function formatDate(dateObj) {
  let date = dateObj.toLocaleDateString();
  let month, day;
  // If locale format is with slashes
  if (/\//.test(date)) {
    date = date.split('/');
    month = date[0].length < 2 ? `0${date[0]}` : date[0];
    day = date[1].length < 2 ? `0${date[1]}` : date[1];
    date = `${date[2]}-${month}-${day}`;
  } else {
    const monthKey = {
      'January': '01',
      'February': '02',
      'March': '03',
      'April': '04',
      'May': '05',
      'June': '06',
      'July': '07',
      'August': '08',
      'September': '09',
      'October': '10',
      'November': '11',
      'December': '12'
    };
    // The date parsing behavior in JavaScript is implementation-dependent
    // so slashes are not guaranteed
    date = date.split(' ');
    // see if day is one or two digits, remove comma
    day = date[1].length < 3 ? `0${date[1].charAt(0)}` : date[1].slice(0, -1);
    date = `${date[2]}-${monthKey[date[0]]}-${day}`;
  }

  return date;
}
