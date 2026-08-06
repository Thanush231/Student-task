export default function TaskCard({
  title,
  description,
  status,
  priority,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {status}
        </span>
      </div>

      <p className="text-gray-600 mt-3">
        {description}
      </p>

      <div className="mt-4">
        <span className="text-sm font-medium">
          Priority:
        </span>{" "}
        {priority}
      </div>
    </div>
  );
}