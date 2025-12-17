import { useState, useEffect } from "react";
import { reviewService } from "../services/services";
import {
  BarChart3,
  TrendingUp,
  MessageSquare,
  Clock,
  Star,
} from "lucide-react";
import { ReviewCard } from "../components/ReviewCard";

export const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animateGraphs, setAnimateGraphs] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && allReviews.length > 0) {
      setTimeout(() => setAnimateGraphs(true), 100);
    }
  }, [loading, allReviews]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setAnimateGraphs(false);
      const reviewsData = await reviewService.getAllReviews();

      // Handle both array and object responses from API
      let reviews = [];
      if (Array.isArray(reviewsData)) {
        reviews = reviewsData;
      } else if (reviewsData?.reviews && Array.isArray(reviewsData.reviews)) {
        reviews = reviewsData.reviews;
      }

      console.log("Dashboard - Fetched reviews:", reviews);
      console.log("Dashboard - Total reviews count:", reviews.length);

      setAllReviews(reviews);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setAllReviews([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-700 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const totalReviews = allReviews.length;
  const positiveCount = allReviews.filter(
    (r) => r.sentiment === "Positive"
  ).length;
  const negativeCount = allReviews.filter(
    (r) => r.sentiment === "Negative"
  ).length;
  const neutralCount = allReviews.filter(
    (r) => r.sentiment === "Neutral"
  ).length;
  const avgRating =
    totalReviews > 0
      ? (
          allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        ).toFixed(1)
      : 0;

  const recentReviews = allReviews.slice(-6).reverse();
  const positivePercentage =
    totalReviews > 0 ? ((positiveCount / totalReviews) * 100).toFixed(1) : 0;
  const negativePercentage =
    totalReviews > 0 ? ((negativeCount / totalReviews) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gray-950 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12 lg:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <button
            onClick={fetchData}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition flex items-center gap-2"
          >
            <Clock size={18} />
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 mb-12">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 lg:p-8 hover:border-cyan-500/50 transition transform hover:-translate-y-1 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-semibold mb-2">
                  Total Reviews
                </p>
                <p className="text-4xl font-bold text-white">{totalReviews}</p>
              </div>
              <MessageSquare className="text-cyan-400" size={40} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 lg:p-8 hover:border-emerald-500/50 transition transform hover:-translate-y-1 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-semibold mb-2">
                  Positive
                </p>
                <p className="text-4xl font-bold text-emerald-400">
                  {positiveCount}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {positivePercentage}%
                </p>
              </div>
              <TrendingUp className="text-emerald-400" size={40} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 lg:p-8 hover:border-red-500/50 transition transform hover:-translate-y-1 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-semibold mb-2">
                  Negative
                </p>
                <p className="text-4xl font-bold text-red-400">
                  {negativeCount}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {negativePercentage}%
                </p>
              </div>
              <BarChart3 className="text-red-400" size={40} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 lg:p-8 hover:border-gray-500/50 transition transform hover:-translate-y-1 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-semibold mb-2">
                  Neutral
                </p>
                <p className="text-4xl font-bold text-gray-400">
                  {neutralCount}
                </p>
              </div>
              <MessageSquare className="text-gray-400" size={40} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 lg:p-8 hover:border-yellow-500/50 transition transform hover:-translate-y-1 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-semibold mb-2">
                  Avg Rating
                </p>
                <p className="text-4xl font-bold text-yellow-400">
                  {avgRating}
                </p>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={
                        i < Math.round(avgRating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-600"
                      }
                    />
                  ))}
                </div>
              </div>
              <TrendingUp className="text-yellow-400" size={40} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 lg:p-10 shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <BarChart3 className="text-emerald-400" size={32} />
              Sentiment Distribution
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-300 font-semibold text-lg">
                    Positive Sentiment
                  </span>
                  <span className="text-emerald-400 font-bold text-lg">
                    {positiveCount} ({positivePercentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                  <div
                    key={`positive-${positivePercentage}-${totalReviews}`}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-4 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: animateGraphs ? `${positivePercentage}%` : "0%",
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-300 font-semibold text-lg">
                    Negative Sentiment
                  </span>
                  <span className="text-red-400 font-bold text-lg">
                    {negativeCount} ({negativePercentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                  <div
                    key={`negative-${negativePercentage}-${totalReviews}`}
                    className="bg-gradient-to-r from-red-500 to-red-400 h-4 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: animateGraphs ? `${negativePercentage}%` : "0%",
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-300 font-semibold text-lg">
                    Neutral Sentiment
                  </span>
                  <span className="text-gray-400 font-bold text-lg">
                    {neutralCount} (
                    {totalReviews > 0
                      ? ((neutralCount / totalReviews) * 100).toFixed(1)
                      : 0}
                    %)
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                  <div
                    key={`neutral-${neutralCount}-${totalReviews}`}
                    className="bg-gradient-to-r from-gray-500 to-gray-400 h-4 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: animateGraphs
                        ? `${
                            totalReviews > 0
                              ? (neutralCount / totalReviews) * 100
                              : 0
                          }%`
                        : "0%",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 lg:p-10 shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <TrendingUp className="text-cyan-400" size={32} />
              Quick Stats
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <span className="text-gray-300 font-medium">
                  Customer Satisfaction
                </span>
                <span className="text-2xl font-bold text-emerald-400">
                  {positivePercentage}%
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <span className="text-gray-300 font-medium">
                  Issues Detected
                </span>
                <span className="text-2xl font-bold text-red-400">
                  {negativeCount}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <span className="text-gray-300 font-medium">
                  Average Rating
                </span>
                <span className="text-2xl font-bold text-yellow-400">
                  {avgRating} / 5.0
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <span className="text-gray-300 font-medium">
                  Total Feedback
                </span>
                <span className="text-2xl font-bold text-cyan-400">
                  {totalReviews}
                </span>
              </div>
            </div>
          </div>
        </div>

        {recentReviews.length > 0 && (
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 lg:p-10 shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Clock className="text-emerald-400" size={32} />
              Recent Reviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentReviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  isEditable={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
