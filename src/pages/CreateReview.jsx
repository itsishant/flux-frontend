import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { reviewService } from "../services/services";
import { AlertCircle, CheckCircle } from "lucide-react";

export const CreateReview = () => {
  const [productName, setProductName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (reviewText.length < 10) {
      setError("Review must be at least 10 characters long");
      return;
    }

    setLoading(true);

    try {
      await reviewService.createReview(
        productName,
        reviewText,
        parseInt(rating)
      );
      setSuccess("Review created successfully!");
      setTimeout(() => navigate("/reviews"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 py-8 lg:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 lg:mb-12">
          Create New Review
        </h1>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 lg:p-10">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle
                size={20}
                className="text-red-400 flex-shrink-0 mt-0.5"
              />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mb-6 flex items-start gap-3">
              <CheckCircle
                size={20}
                className="text-emerald-400 flex-shrink-0 mt-0.5"
              />
              <p className="text-emerald-400 text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 font-semibold mb-3">
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition"
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-3">
                Review Text
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none transition h-32 resize-none"
                placeholder="Write your detailed review here (minimum 10 characters)"
                required
              />
              <p className="text-gray-400 text-sm mt-2">
                {reviewText.length}/500 characters (AI will analyze sentiment
                automatically)
              </p>
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-3">
                Rating
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <span className="text-2xl font-bold text-yellow-400 w-12 text-center">
                  {"★".repeat(rating)}
                  {"☆".repeat(5 - rating)}
                </span>
              </div>
            </div>

            <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
              <p className="text-gray-300 text-sm">
                <span className="font-semibold text-emerald-400">
                  ✓ AI Powered:
                </span>{" "}
                Your review will be automatically analyzed for sentiment
                (Positive, Negative, or Neutral) using advanced NLP technology.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? "Creating Review..." : "Create Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
