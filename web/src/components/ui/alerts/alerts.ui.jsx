
const styles = {
  error: `
    bg-red-50/80 border-red-200 text-red-700
  `,
  success: `
    bg-green-50/80 border-green-200 text-green-700
  `,
  warning: `
    bg-yellow-50/80 border-yellow-200 text-yellow-700
  `,
  info: `
    bg-blue-50/80 border-blue-200 text-blue-700
  `,
};

const iconStyles = {
  error: "bg-red-100 text-red-600",
  success: "bg-green-100 text-green-600",
  warning: "bg-yellow-100 text-yellow-600",
  info: "bg-blue-100 text-blue-600",
};

const icons = {
  error: (
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
  ),
  success: (
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
  ),
  warning: (
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86l-7 12.14A2 2 0 005 19h14a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
  ),
  info: (
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
  ),
};

function Alert({ message, type = "info", center = false }) {
  return (
    <div
      className={`
        flex items-center gap-3
        rounded-xl border px-4 py-3
        text-sm
        shadow-sm
        transition-all duration-200
        ${styles[type]}
        ${center ? "justify-center text-center" : ""}
      `}
    >
      <div
        className={`
          flex items-center justify-center
          w-9 h-9 shrink-0 rounded-full
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

      <p className="leading-snug">
        {message}
      </p>
    </div>
  );
}

export default Alert;