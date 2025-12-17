import { Trash2, Edit2 } from "lucide-react";
import {
  getSentimentColor,
  getSentimentBgColor,
  formatDate,
  getRatingStars,
} from "../utils/helpers";

export const ReviewCard = ({
  review,
  onEdit,
  onDelete,
  isEditable = false,
}) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 lg:p-8 border border-gray-700 hover:border-emerald-500/70 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 h-full flex flex-col transform hover:-translate-y-2">
      <div className="flex justify-between items-start mb-4 lg:mb-6">
        <div className="flex-1">
          <h3 className="text-lg lg:text-xl font-bold text-white mb-2 line-clamp-2">
            {review.productName}
          </h3>
          <p className="text-gray-400 text-xs lg:text-sm font-medium">
            {formatDate(review.createdAt)}
          </p>
        </div>
        {isEditable && (
          <div className="flex gap-2 ml-2">
            <button
              onClick={() => onEdit(review)}
              className="p-2 lg:p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition transform hover:scale-110"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => onDelete(review._id)}
              className="p-2 lg:p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition transform hover:scale-110"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>

      <p className="text-gray-300 mb-6 lg:mb-8 line-clamp-3 lg:line-clamp-4 flex-grow text-sm lg:text-base leading-relaxed">
        {review.reviewText}
      </p>

      <div className="border-t border-gray-700 pt-4 flex flex-col gap-4">
        <div className="flex justify-between items-center gap-3">
          <span
            className={`px-3 py-1.5 rounded-full text-xs lg:text-sm font-bold ${getSentimentBgColor(
              review.sentiment
            )} text-white`}
            style={{ color: getSentimentColor(review.sentiment) }}
          >
            {review.sentiment}
          </span>
          <span className="text-yellow-400 font-semibold text-sm lg:text-base">
            {getRatingStars(review.rating)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-xs lg:text-sm">Score:</span>
          <span className="text-emerald-400 font-bold text-sm lg:text-base">
            {review.score.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
