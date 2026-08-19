"use client";

export default function TaskCard({
  title,
  description,
  status,
  priority,
  onDelete,
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

      <div className="flex gap-3 mt-5">
  <button
    type="button"
    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
    onClick={() => console.log("Task completed:", title)}
  >
    Complete
  </button>

  <button
    type="button"
    onClick={onDelete}
    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
  >
    Delete
  </button>
</div>
    </div>
  );
}