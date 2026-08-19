export default function SettingsPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold">
        Settings
      </h1>

      <p className="mt-2 text-gray-600">
        Manage your application settings.
      </p>

      <div className="mt-6 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold">
          Appearance
        </h2>

        <p className="mt-2 text-gray-500">
          Theme settings will be available here.
        </p>
      </div>
    </div>
  );
}