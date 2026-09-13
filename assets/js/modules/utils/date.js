export const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning!";
  }

  if (hour < 18) {
    return "Good afternoon!";
  }

  return "Good evening!";
};

export const getFormattedDate = () => {
  return new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
