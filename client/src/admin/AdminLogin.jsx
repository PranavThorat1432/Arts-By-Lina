import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-brown flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <p className="font-accent text-4xl text-brand-gold mb-1">Arts by Lina</p>
          <p className="font-body text-brand-cream/60 text-sm">Admin Panel</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-brand-gold/10">
          <h1 className="font-display text-3xl text-brand-brown font-bold mb-2">Sign In</h1>
          <p className="font-body text-earth-500 text-sm mb-7">Enter your credentials to access the dashboard.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label text-xs">Email Address</label>
              <input
                type="email" name="email" value={form.email}
                onChange={handleChange} placeholder="admin@artsbylina.com"
                className="input-field py-2.5 text-sm" required autoFocus
              />
            </div>
            <div>
              <label className="label text-xs">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"} name="password"
                  value={form.password} onChange={handleChange}
                  placeholder="••••••••" className="input-field pr-12 py-2.5 text-sm" required
                />
                <button
                  type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gold hover:text-brand-brown text-xs font-semibold"
                >
                  {showPass ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link to="/admin/forgot-password" className="font-body text-xs text-brand-gold hover:underline">
                Forgot password?
              </Link>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full py-3 text-sm font-semibold rounded-lg shadow-sm disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
