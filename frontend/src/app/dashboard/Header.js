export default function Header() {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>

      <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
        Logout
      </button>

    </header>
  );
}