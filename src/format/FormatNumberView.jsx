export default function formatNumberView(value) {

  if (typeof value !== 'number') {
    return "Invalid value";
  }
  const units = ["", "K", "M", "M", "M", "B"];
  let i = 0;
  while (value >= 1000 && i < units.length) {
    value /= 1000;
    i++;
  }
  const formattedValue = value % 1 === 0 ? value : value.toFixed(1);
  return `${formattedValue} ${units[i]}`;
}
