import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <p className="mb-5 font-semibold text-blue-600">
            ✨ Make every day productive
          </p>

          <h1 className="text-5xl font-extrabold leading-tight text-slate-900 md:text-6xl">
            Organize your tasks.
            <span className="block text-blue-600">
              Achieve your goals.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700">
            Plan your day, manage your priorities, and stay focused with a
            simple task manager designed for students.
          </p>

          <Link
            href="/register"
            className="mt-8 inline-block rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white shadow-lg hover:bg-blue-700"
          >
            Start Managing Tasks →
          </Link>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-blue-300/30 blur-3xl" />

          <div className="relative rounded-3xl bg-white p-6 shadow-2xl">
            <svg
              viewBox="0 0 500 380"
              className="w-full"
              role="img"
              aria-label="Task management illustration"
            >
              <rect width="500" height="380" rx="28" fill="#eff6ff" />
              <circle cx="410" cy="70" r="45" fill="#dbeafe" />
              <circle cx="80" cy="310" r="55" fill="#ede9fe" />
              <rect x="90" y="55" width="320" height="270" rx="18" fill="white" />
              <rect x="120" y="88" width="150" height="18" rx="9" fill="#2563eb" />
              <rect x="120" y="125" width="240" height="12" rx="6" fill="#dbeafe" />

              <circle cx="135" cy="180" r="13" fill="#22c55e" />
              <path
                d="M128 180l5 5 10-12"
                fill="none"
                stroke="white"
                strokeWidth="4"
              />
              <rect x="165" y="174" width="160" height="12" rx="6" fill="#cbd5e1" />

              <circle cx="135" cy="225" r="13" fill="#3b82f6" />
              <rect x="165" y="219" width="190" height="12" rx="6" fill="#93c5fd" />

              <circle cx="135" cy="270" r="13" fill="#a855f7" />
              <rect x="165" y="264" width="135" height="12" rx="6" fill="#ddd6fe" />

              <path
                d="M365 250c30-35 70-20 55 20-10 25-45 35-55 55-10-20-45-30-55-55-15-40 25-55 55-20z"
                fill="#2563eb"
              />
            </svg>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 md:grid-cols-3">
        <Feature
          icon="📝"
          title="Plan clearly"
          text="Keep all your tasks organized."
        />
        <Feature
          icon="⚡"
          title="Stay focused"
          text="Prioritize your important work."
        />
        <Feature
          icon="🏆"
          title="Reach goals"
          text="Track your daily progress."
        />
      </section>
    </main>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="rounded-2xl !bg-white p-6 text-center shadow-md">
      <div className="text-4xl">{icon}</div>

      <h2 className="mt-3 !text-xl !font-bold !text-slate-900">
        {title}
      </h2>

      <p className="mt-2 !text-slate-600">
        {text}
      </p>
    </div>
  );
}