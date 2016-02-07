// take 2 date objects and return the number of days between between them
// if the first date is more recent, the number returned will be negative
export default function (dateObj1, dateObj2) {
  return Math.round((dateObj2 - dateObj1) / (1000 * 60 * 60 * 24));
}
