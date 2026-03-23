
function EmptyState({ text }) {

  return (
    <div className="
      flex flex-col items-center
      justify-center
      gap-2
      py-8
      text-gray-400"
    >
      <div className="text-3xl">
        📦
      </div>

      <p className="text-sm">
        {text}
      </p>
    </div>
  );
}

export default EmptyState;