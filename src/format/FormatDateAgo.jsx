export default function formatDateAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = now - date;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
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
