export const formatDate = (rawDate: Date) => {
  const dateObject = new Date(rawDate);
  const options = {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  return dateObject.toLocaleDateString("no-NO", options);
};
