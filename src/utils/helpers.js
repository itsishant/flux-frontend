export const getSentimentColor = (sentiment) => {
  const colors = {
    Positive: "#10b981",
    Negative: "#ef4444",
    Neutral: "#6b7280",
  };
  return colors[sentiment] || "#6b7280";
};

export const getSentimentBgColor = (sentiment) => {
  const colors = {
    Positive: "bg-emerald-500/20",
    Negative: "bg-red-500/20",
    Neutral: "bg-gray-500/20",
  };
  return colors[sentiment] || "bg-gray-500/20";
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getRatingStars = (rating) => {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
};
