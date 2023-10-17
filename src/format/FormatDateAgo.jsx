export default function formatDateAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = now - date;

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (minutes < 1) {
    return `1 min ago`;
  }
  if (minutes < 60) {
    return `${minutes} min ago`;
  }


  if (hours < 24) {
    return `${hours} hours ago`;
  }


  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} days ago`;
  }


  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} months ago`;
  }


  const years = Math.floor(months / 12);
  return `${years} years ago`;
}
