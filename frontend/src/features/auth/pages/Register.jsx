import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const initialFormData = {
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { handleRegister } = useAuth();
  const { user, loading } = useSelector((state) => state.auth);

  if (!loading && user) {
    return <Navigate replace to="/" />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleRegister(formData.username, formData.email, formData.password);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050505] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.28),transparent_30%),radial-gradient(circle_at_right,rgba(249,115,22,0.12),transparent_25%),linear-gradient(160deg,#040404,#130707_45%,#060606)]" />
      <div className="absolute left-8 top-10 h-56 w-56 rounded-full bg-red-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-4xl border border-white/10 bg-white/5 shadow-[0_0_80px_rgba(153,27,27,0.25)] backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr]">
          <div className="p-6 sm:p-8 lg:p-12">
            <div className="mx-auto max-w-md">
              <p className="text-sm uppercase tracking-[0.3em] text-red-300/70">
                New Account
              </p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight">
                Create your profile in the red zone.
              </h1>
              <p className="mt-3 text-sm text-white/60">
                This form includes two-way binding for username, email, and
                password fields.
              </p>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-red-100"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-red-400 focus:ring-2 focus:ring-red-500/30"
                    id="username"
                    name="username"
                    onChange={handleChange}
                    placeholder="Choose a username"
                    type="text"
                    value={formData.username}
                  />
                </div>

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
                    placeholder="Create a password"
                    type="password"
                    value={formData.password}
                  />
                </div>

                <button
                  className="w-full rounded-2xl bg-linear-to-r from-red-800 via-red-600 to-orange-500 px-4 py-3 font-semibold text-white shadow-[0_20px_50px_rgba(239,68,68,0.3)] transition hover:scale-[1.01] hover:shadow-[0_24px_60px_rgba(249,115,22,0.35)]"
                  type="submit"
                >
                  Create Account
                </button>
              </form>

              <p className="mt-6 text-sm text-white/60">
                Already have an account?{" "}
                <Link
                  className="font-medium text-red-300 transition hover:text-red-200"
                  to="/login"
                >
                  Return to login
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="hidden border-l border-white/10 bg-linear-to-br from-black via-red-950/70 to-black p-10 lg:flex lg:flex-col lg:justify-between">
            <div className="rounded-3xl border border-red-400/15 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                Dark Theme
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight">
                Rich shadows, sharp highlights, and a cool red glow.
              </h2>
            </div>

            <div className="grid gap-4 text-sm text-white/70">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                Username, email, and password are each managed by local state.
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                The submit handler is ready for API calls or validation logic.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
