const LoadingIndicator = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-white rounded-xl shadow-2xl border border-amber-200">
      
      {/* The Spinner Element: 
        - w-12 h-12: Sets the width and height.
        - border-4: Sets the border thickness.
        - border-gray-200: Sets the base (light) color of the circle.
        - border-t-blue-500: Sets the top border to a different color (the 'moving' part).
        - rounded-full: Makes it a perfect circle.
        - animate-spin: Applies the custom Tailwind animation utility.
      */}
      <div className="w-14 h-14 border-4 border-gray-200 border-t-amber-500 rounded-full animate-spin">
      </div>

      {/* Loading Text */}
      <p className="mt-5 text-xl font-semibold text-gray-700">
        Loading...
      </p>
    </div>
  );
};

export default LoadingIndicator;