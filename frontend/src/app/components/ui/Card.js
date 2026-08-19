export default function Card({ children }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8">
      {children}
    </div>
  );
}