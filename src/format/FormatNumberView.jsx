export default function formatNumberView(value) {
  const units = ["", "N", "Tr", "Tr", "Tr", "Tỉ"];
  let i = 0;
  while (value >= 1000 && i < units.length) {
    value /= 1000;
    i++;
  }
  const formattedValue = value % 1 === 0 ? value : value.toFixed(1);
  return `${formattedValue} ${units[i]}`;
}
