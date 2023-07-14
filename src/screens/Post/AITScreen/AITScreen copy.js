const date = new Date();
const monthNames = [
  "ene.",
  "feb.",
  "mar.",
  "abr.",
  "may.",
  "jun.",
  "jul.",
  "ago.",
  "sep.",
  "oct.",
  "nov.",
  "dic.",
];
const day = date.getDate();
const month = monthNames[date.getMonth()];
const year = date.getFullYear();
const hour = date.getHours();
const minute = date.getMinutes();
const formattedDate = `${day} ${month} ${year}  ${hour}:${minute} Hrs`;

console.log(formattedDate);
