import axiosInstance from "./api";

export const authService = {
  signup: async (name, email, password, confirmPassword) => {
    const response = await axiosInstance.post("/auth/signup", {
      name,
      email,
      password,
      confirmPassword,
    });
    return response.data;
  },

  login: async (email, password) => {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  },
};

export const reviewService = {
  createReview: async (productName, reviewText, rating) => {
    const response = await axiosInstance.post("/reviews/create", {
      productName,
      reviewText,
      rating,
    });
    return response.data;
  },

  getAllReviews: async () => {
    const response = await axiosInstance.get("/reviews/all");
    return response.data;
  },

  getUserReviews: async () => {
    const response = await axiosInstance.get("/reviews/user-reviews");
    return response.data;
  },

  getReviewById: async (reviewId) => {
    const response = await axiosInstance.get(`/reviews/${reviewId}`);
    return response.data;
  },

  updateReview: async (reviewId, productName, reviewText, rating) => {
    const response = await axiosInstance.put(`/reviews/update/${reviewId}`, {
      productName,
      reviewText,
      rating,
    });
    return response.data;
  },

  deleteReview: async (reviewId) => {
    const response = await axiosInstance.delete(`/reviews/delete/${reviewId}`);
    return response.data;
  },

  getSentimentStats: async () => {
    const response = await axiosInstance.get("/reviews/stats/sentiment");
    return response.data;
  },
};
