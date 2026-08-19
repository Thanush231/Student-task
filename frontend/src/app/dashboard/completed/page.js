export default function CompletedTasksPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        Completed Tasks
      </h1>

      <p className="mt-2 text-gray-600">
        View your completed tasks here.
      </p>

      <div className="mt-6 bg-white rounded-xl shadow-md p-8 text-center">
        <p className="text-gray-500">
          No Completed Tasks
        </p>
      </div>
    </div>
  );
}