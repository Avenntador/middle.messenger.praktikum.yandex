import Handlebars from 'handlebars';

Handlebars.registerHelper('date', (time: string) => {
  const hours = new Date(time).getHours();
  const minutes = new Date(time).getMinutes();

  let computedMinutes = minutes.toString();
  if (minutes < 10) {
    computedMinutes = `0${minutes}`;
  }

  return `${hours}:${computedMinutes}`;
});

Handlebars.registerHelper('fullDate', (time: string) => {
  const temp = new Date(time);
  const date = temp.getDate();
  const month = temp.getMonth();
  const year = temp.getFullYear();

  let computedDate = date.toString();
  let computedMonth = month.toLocaleString();

  if (date < 10) {
    computedDate = `0${date}`;
  }

  if (month < 10) {
    computedMonth = `0${month}`;
  }

  return `${computedDate}.${computedMonth}.${year}`;
});
