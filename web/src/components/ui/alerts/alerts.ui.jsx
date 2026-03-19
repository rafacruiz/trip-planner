
const styles = {
  error: `
    bg-gradient-to-r from-red-50 to-white
    border-red-100 text-red-600
  `,
  success: `
    bg-gradient-to-r from-green-50 to-white
    border-green-100 text-green-600
  `,
  warning: `
    bg-gradient-to-r from-yellow-50 to-white
    border-yellow-100 text-yellow-600
  `,
  info: `
    bg-gradient-to-r from-blue-50 to-white
    border-blue-100 text-blue-600
  `,
};

const iconStyles = {
  error: "bg-red-100 text-red-500",
  success: "bg-green-100 text-green-500",
  warning: "bg-yellow-100 text-yellow-500",
  info: "bg-blue-100 text-blue-500",
};






const icons = {
  error: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
  ),
  success: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
  ),
  warning: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86l-7 12.14A2 2 0 005 19h14a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
  ),
  info: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
  ),
};

function Alert({ message, type = "info", center = false }) {
  return (
    <div
      className={`
        flex items-start gap-3
        rounded-2xl border px-4 py-3
        text-sm
        shadow-md
        backdrop-blur-sm
        transition-all duration-200
        ${styles[type]}
        ${center ? "justify-center text-center" : ""}
        animate-fade-in
      `}
    >
      <div
        className={`
          flex items-center justify-center
          w-8 h-8 rounded-full
          ${iconStyles[type]}
        `}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {icons[type]}
        </svg>
      </div>

      <div className="flex-1 leading-relaxed">
        {message}
      </div>
    </div>
  );
}

export default Alert;