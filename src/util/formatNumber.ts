export const formatNumber = (number: number) => {
  return number.toLocaleString();
};

export const todayFormat = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const formatDate = (date: string) => {
  const formattedDate = date.replace(/-/g, "");
  return formattedDate;
};

export const formatTime = (time: string) => {
  return time.replace(/:/g, "");
};
