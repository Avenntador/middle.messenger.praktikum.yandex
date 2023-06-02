export default function date(time: string) {
  const hours = new Date(time).getHours();
  const minutes = new Date(time).getMinutes();

  let computedMinutes = minutes.toString();
  if (minutes < 10) {
    computedMinutes = `0${minutes}`;
  }

  return `${hours}:${computedMinutes}`;
}
