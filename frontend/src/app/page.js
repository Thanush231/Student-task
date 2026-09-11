import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 transition-colors">
      <section className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-12 px-4 sm:px-6 py-12 sm:py-20 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <p className="mb-3 sm:mb-5 font-semibold text-blue-600 dark:text-blue-400 inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/40 rounded-full text-sm">
            ✨ Make every day productive
          </p>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white">
            Organize your tasks.
            <span className="block text-blue-600 dark:text-blue-400 mt-1">
              Achieve your goals.
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300 mx-auto lg:mx-0">
            Plan your day, manage your priorities, and stay focused with a
            simple task manager designed specifically for students.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/register"
              className="w-full sm:w-auto text-center rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg hover:bg-blue-700 transition active:scale-95 text-base sm:text-lg"
            >
              Start Managing Tasks →
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto text-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-8 py-4 font-semibold text-slate-700 dark:text-slate-200 shadow hover:bg-slate-50 dark:hover:bg-slate-700 transition active:scale-95 text-base sm:text-lg"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="relative mt-6 lg:mt-0 max-w-md mx-auto lg:max-w-none w-full">
          <div className="absolute -inset-4 sm:-inset-8 rounded-full bg-blue-300/30 dark:bg-blue-600/20 blur-2xl sm:blur-3xl" />

          <div className="relative rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-800 p-4 sm:p-6 shadow-xl border border-slate-100 dark:border-slate-700">
            <svg
              viewBox="0 0 500 380"
              className="w-full h-auto"
              role="img"
              aria-label="Task management illustration"
            >
              <rect width="500" height="380" rx="28" fill="#eff6ff" className="dark:fill-slate-900" />
              <circle cx="410" cy="70" r="45" fill="#dbeafe" className="dark:fill-blue-900/40" />
              <circle cx="80" cy="310" r="55" fill="#ede9fe" className="dark:fill-purple-900/40" />
              <rect x="90" y="55" width="320" height="270" rx="18" fill="white" className="dark:fill-slate-800" />
              <rect x="120" y="88" width="150" height="18" rx="9" fill="#2563eb" />
              <rect x="120" y="125" width="240" height="12" rx="6" fill="#dbeafe" className="dark:fill-slate-700" />

              <circle cx="135" cy="180" r="13" fill="#22c55e" />
              <path
                d="M128 180l5 5 10-12"
                fill="none"
                stroke="white"
                strokeWidth="4"
              />
              <rect x="165" y="174" width="160" height="12" rx="6" fill="#cbd5e1" className="dark:fill-slate-600" />

              <circle cx="135" cy="225" r="13" fill="#3b82f6" />
              <rect x="165" y="219" width="190" height="12" rx="6" fill="#93c5fd" className="dark:fill-slate-600" />

              <circle cx="135" cy="270" r="13" fill="#a855f7" />
              <rect x="165" y="264" width="135" height="12" rx="6" fill="#ddd6fe" className="dark:fill-slate-600" />

              <path
                d="M365 250c30-35 70-20 55 20-10 25-45 35-55 55-10-20-45-30-55-55-15-40 25-55 55-20z"
                fill="#2563eb"
              />
            </svg>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 sm:gap-6 px-4 sm:px-6 pb-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Feature
          icon="📝"
          title="Plan clearly"
          text="Keep all your assignments and tasks structured."
        />
        <Feature
          icon="⚡"
          title="Stay focused"
          text="Prioritize your urgent and important student deadlines."
        />
        <Feature
          icon="🏆"
          title="Reach goals"
          text="Track your daily achievements and completed tasks."
        />
      </section>
    </main>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 text-center shadow-md border border-slate-100 dark:border-slate-700/60 transition-transform hover:-translate-y-1">
      <div className="text-4xl">{icon}</div>

      <h2 className="mt-3 text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
        {title}
      </h2>

      <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
        {text}
      </p>
    </div>
  );
}