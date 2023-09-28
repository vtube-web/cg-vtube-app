export default function formatDateWatched(dateString) {
  const date = new Date(dateString);

  if (isToday(date)) {
    return "Hôm nay";
  } else if (isYesterday(date)) {
    return "Hôm qua";
  }

  const months = [
    "thg 1",
    "thg 2",
    "thg 3",
    "thg 4",
    "thg 5",
    "thg 6",
    "thg 7",
    "thg 8",
    "thg 9",
    "thg 10",
    "thg 11",
    "thg 12",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${day} ${month}`;
}

const isToday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

const isYesterday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() - 1 &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};
