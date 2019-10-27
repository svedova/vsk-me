export const formatDate = d => {
  const date = new Date(d);

  return date.toLocaleDateString("de-CH", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
};
