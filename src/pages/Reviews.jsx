import { useState, useEffect } from "react";
import { reviewService } from "../services/services";
import { ReviewCard } from "../components/ReviewCard";
import { AlertCircle, Filter, Search, Calendar, SortAsc } from "lucide-react";

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    productName: "",
    reviewText: "",
    rating: 5,
  });
  const [sentimentFilter, setSentimentFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [
    sentimentFilter,
    ratingFilter,
    searchQuery,
    sortBy,
    startDate,
    endDate,
    reviews,
  ]);

  const applyFilters = () => {
    let filtered = [...reviews];

    if (sentimentFilter !== "All") {
      filtered = filtered.filter((r) => r.sentiment === sentimentFilter);
    }

    if (ratingFilter !== "All") {
      filtered = filtered.filter((r) => r.rating === parseInt(ratingFilter));
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter((r) =>
        r.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (startDate) {
      filtered = filtered.filter(
        (r) => new Date(r.createdAt) >= new Date(startDate)
      );
    }

    if (endDate) {
      filtered = filtered.filter(
        (r) => new Date(r.createdAt) <= new Date(endDate)
      );
    }

    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "highest":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }

    setFilteredReviews(filtered);
  };

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await reviewService.getUserReviews();
      setReviews(Array.isArray(data) ? data : data.reviews || []);
    } catch (err) {
      setError("Failed to fetch reviews");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (review) => {
    setEditingId(review._id);
    setEditForm({
      productName: review.productName,
      reviewText: review.reviewText,
      rating: review.rating,
    });
  };

  const handleSaveEdit = async (reviewId) => {
    try {
      setError("");
      await reviewService.updateReview(
        reviewId,
        editForm.productName,
        editForm.reviewText,
        editForm.rating
      );
      setEditingId(null);
      await fetchReviews();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update review");
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        setError("");
        await reviewService.deleteReview(reviewId);
        await fetchReviews();
      } catch (err) {
        setError(err.response?.data?.message || "Failed to delete review");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-700 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-8 lg:mb-12">
          My Reviews
        </h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle
              size={20}
              className="text-red-400 flex-shrink-0 mt-0.5"
            />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {reviews.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-12 text-center">
            <p className="text-gray-400 text-lg mb-4">
              You haven't created any reviews yet.
            </p>
            <a
              href="/create"
              className="text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              Create your first review →
            </a>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 lg:p-8 mb-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Filter className="text-emerald-400" size={28} />
                <h2 className="text-2xl font-bold text-white">
                  Filters & Search
                </h2>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <Search
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search by product name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-gray-300 font-semibold mb-3">
                      <Calendar size={18} className="text-emerald-400" />
                      Date Range
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition"
                      />
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-300 font-semibold mb-3">
                      <SortAsc size={18} className="text-emerald-400" />
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="highest">Highest Rating</option>
                      <option value="lowest">Lowest Rating</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-gray-300 font-semibold mb-3 block">
                    Sentiment
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setSentimentFilter("All")}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        sentimentFilter === "All"
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      All ({reviews.length})
                    </button>
                    <button
                      onClick={() => setSentimentFilter("Positive")}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        sentimentFilter === "Positive"
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      Positive (
                      {reviews.filter((r) => r.sentiment === "Positive").length}
                      )
                    </button>
                    <button
                      onClick={() => setSentimentFilter("Negative")}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        sentimentFilter === "Negative"
                          ? "bg-red-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      Negative (
                      {reviews.filter((r) => r.sentiment === "Negative").length}
                      )
                    </button>
                    <button
                      onClick={() => setSentimentFilter("Neutral")}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        sentimentFilter === "Neutral"
                          ? "bg-gray-500 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      Neutral (
                      {reviews.filter((r) => r.sentiment === "Neutral").length})
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-gray-300 font-semibold mb-3 block">
                    Rating
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setRatingFilter("All")}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        ratingFilter === "All"
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      All Ratings
                    </button>
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setRatingFilter(rating.toString())}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${
                          ratingFilter === rating.toString()
                            ? "bg-yellow-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        {rating} ⭐ (
                        {reviews.filter((r) => r.rating === rating).length})
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <p className="text-gray-400">
                    Showing{" "}
                    <span className="text-emerald-400 font-bold">
                      {filteredReviews.length}
                    </span>{" "}
                    of {reviews.length} reviews
                  </p>
                  <button
                    onClick={() => {
                      setSentimentFilter("All");
                      setRatingFilter("All");
                      setSearchQuery("");
                      setSortBy("newest");
                      setStartDate("");
                      setEndDate("");
                    }}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-semibold transition"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {filteredReviews.map((review) =>
                editingId === review._id ? (
                  <div
                    key={review._id}
                    className="bg-gray-800 border border-gray-700 rounded-lg p-6"
                  >
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editForm.productName}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            productName: e.target.value,
                          })
                        }
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                      />
                      <textarea
                        value={editForm.reviewText}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            reviewText: e.target.value,
                          })
                        }
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white h-24 resize-none"
                      />
                      <div className="flex items-center gap-4">
                        <label className="text-gray-300">Rating:</label>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          value={editForm.rating}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              rating: parseInt(e.target.value),
                            })
                          }
                          className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                        <span className="text-yellow-400 font-semibold">
                          {"★".repeat(editForm.rating)}
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleSaveEdit(review._id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <ReviewCard
                    key={review._id}
                    review={review}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isEditable={true}
                  />
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
