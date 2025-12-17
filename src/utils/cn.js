/**
 * Utility function to merge Tailwind CSS classes
 * Handles conditional class merging and prevents conflicts
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
