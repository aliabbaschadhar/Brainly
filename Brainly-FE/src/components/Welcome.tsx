export function Welcome() {
  return (
    <div className="flex flex-col justify-center items-center max-w-2xl mx-auto">
      {/* Animated greeting with fade-in effect */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <p className="lg:text-4xl text-2xl font-extrabold text-center text-gray-800 dark:text-gray-100">
          Welcome to
        </p>
      </div>

      {/* Logo and brand name with enhanced design */}
      <div className="flex justify-center items-center gap-3 mt-4 mb-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="w-14 h-14 md:w-16 md:h-16 stroke-current text-blue-600 dark:text-blue-400 transform hover:scale-110 transition-transform duration-300"
        >
          <defs>
            <style>
              {`
                .cls-1 {
                  fill: none;
                  stroke: currentColor;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  stroke-width: 2px;
                }
              `}
            </style>
          </defs>
          <path
            className="cls-1"
            d="M28.46 4H29a14 14 0 0 1 14 14v12a14 14 0 0 1-14 14h-.5a4.46 4.46 0 0 1-4.5-4.46V8.46A4.46 4.46 0 0 1 28.46 4z"
          />
          <path
            className="cls-1"
            d="M9.46 4H10a14 14 0 0 1 14 14v12a14 14 0 0 1-14 14h-.5A4.46 4.46 0 0 1 5 39.54V8.46A4.46 4.46 0 0 1 9.46 4z"
            transform="rotate(180 14.5 24)"
          />
          <path
            className="cls-1"
            d="m36.53 6.48-4.92 4.21 2.85 6.41M43 17.1s-6.4 7.83-9.25 6.4M35.88 27.9l6.89 4.98M38.02 30.04l-4.27 2.13M6.08 15s6.33 2.56 6.33 7.54M9.79 17.33l3.33-3.37M8.45 38.9l4.67-8.57M10.78 34.61s3-1.44 4.47 0M17.29 4.17l-.33 4.1M20 21.79l4 1.28"
          />
        </svg>

        <h1 className="text-transparent font-extrabold text-center bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-3xl lg:text-5xl drop-shadow-sm hover:scale-105 transition-all duration-300">
          Second Brain
        </h1>
      </div>

      {/* Description card with improved styling */}
      <div className="w-full max-w-md backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 py-6 px-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center">
          Your personal knowledge hub for
          <span className="font-semibold text-blue-600 dark:text-blue-400"> organizing</span>,
          <span className="font-semibold text-indigo-600 dark:text-indigo-400"> accessing</span>, and
          <span className="font-semibold text-purple-600 dark:text-purple-400"> sharing</span>
          valuable content in one place.
        </p>

        <div className="mt-4 text-center">
          <span className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            Great ideas deserve a great home
          </span>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Save links
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Organize content
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Collaborate
          </div>
        </div>
      </div>
    </div>
  );
}
