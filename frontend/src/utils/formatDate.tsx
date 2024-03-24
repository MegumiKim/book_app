export const formatDate = (rawDate: Date) => {
  const dateObject = new Date(rawDate);
  return dateObject.toLocaleDateString();
};
