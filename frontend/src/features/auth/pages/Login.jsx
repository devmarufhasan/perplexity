import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const initialFormData = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { handleLogin } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleLogin(formData.email, formData.password);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050505] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.3),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(127,29,29,0.5),transparent_30%),linear-gradient(145deg,#050505,#140909_45%,#050505)]" />
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
      <div className="absolute bottom-8 right-0 h-80 w-80 rounded-full bg-rose-500/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-4xl border border-white/10 bg-white/5 shadow-[0_0_80px_rgba(127,29,29,0.25)] backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
          <div className="hidden flex-col justify-between border-r border-white/10 bg-linear-to-br from-red-950/80 via-black to-black p-10 lg:flex">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.35em] text-red-300/70">
                Welcome Back
              </p>
              <h1 className="max-w-md text-5xl font-semibold leading-tight">
                Step into a bold dark workspace built for focus.
              </h1>
            </div>

            <div className="max-w-sm space-y-4 text-sm text-red-50/70">
              <p>
                Smooth access, striking contrast, and a red-glow theme that
                keeps the interface feeling sharp.
              </p>
              <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                  Sign In
                </p>
                <p className="mt-2 text-base text-white">
                  Use your email and password to continue.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-12">
            <div className="mx-auto max-w-md">
              <div className="mb-8 lg:hidden">
                <p className="text-sm uppercase tracking-[0.35em] text-red-300/70">
                  Welcome Back
                </p>
                <h1 className="mt-3 text-3xl font-semibold leading-tight">
                  Sign in to your account.
                </h1>
              </div>

              <div className="mb-8 hidden lg:block">
                <p className="text-sm uppercase tracking-[0.3em] text-red-300/70">
                  Account Login
                </p>
                <h2 className="mt-3 text-3xl font-semibold">
                  Enter your credentials
                </h2>
                <p className="mt-3 text-sm text-white/60">
                  Your form is fully controlled with React state and ready for
                  API integration.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-red-100"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-red-400 focus:ring-2 focus:ring-red-500/30"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="you@example.com"
                    type="email"
                    value={formData.email}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-red-100"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-red-400 focus:ring-2 focus:ring-red-500/30"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Enter your password"
                    type="password"
                    value={formData.password}
                  />
                </div>

                <button
                  className="w-full rounded-2xl bg-linear-to-r from-red-700 via-red-500 to-orange-400 px-4 py-3 font-semibold text-white shadow-[0_20px_50px_rgba(239,68,68,0.3)] transition hover:scale-[1.01] hover:shadow-[0_24px_60px_rgba(239,68,68,0.4)]"
                  type="submit"
                >
                  Sign In
                </button>
              </form>

              <p className="mt-6 text-sm text-white/60">
                Need an account?{" "}
                <Link
                  className="font-medium text-red-300 transition hover:text-red-200"
                  to="/register"
                >
                  Create one here
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
