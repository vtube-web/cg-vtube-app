export default function formatUserName(username) {
  const generateRandomCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const codeLength = 6;
    let randomCode = "";
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomCode += characters.charAt(randomIndex);
    }
    return randomCode;
  };

  const cleanedUsername = username
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s/g, "");
  const randomCode = generateRandomCode();
  const finalUsername = `${cleanedUsername}-${randomCode}`;

  return finalUsername;
}
