
function SectionHeader({
  icon,
  title,
  description
}) {

  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          {icon} {title}
        </h2>

        <p className="text-sm text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}

export default SectionHeader;