import React from 'react';

/**
 * Example component demonstrating Tailwind CSS usage
 * You can use this as a reference for converting existing components to Tailwind
 */
const TailwindExample = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Example Card with Tailwind */}
      <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Tailwind CSS is Ready! 🎉
        </h2>
        <p className="text-gray-600 mb-4">
          You can now use Tailwind utility classes throughout your project.
          Your existing CSS is still working alongside Tailwind.
        </p>
        
        {/* Button examples */}
        <div className="flex gap-4 flex-wrap">
          <button className="bg-primary hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
            Primary Button
          </button>
          <button className="bg-secondary hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
            Secondary Button
          </button>
          <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200">
            Outline Button
          </button>
        </div>

        {/* Grid example */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-blue-600 text-3xl mb-2">📱</div>
            <h3 className="font-semibold text-gray-800 mb-2">Responsive</h3>
            <p className="text-sm text-gray-600">Mobile-first responsive design</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-green-600 text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">Fast</h3>
            <p className="text-sm text-gray-600">Optimized for performance</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="text-purple-600 text-3xl mb-2">🎨</div>
            <h3 className="font-semibold text-gray-800 mb-2">Customizable</h3>
            <p className="text-sm text-gray-600">Easy to customize and extend</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TailwindExample;

