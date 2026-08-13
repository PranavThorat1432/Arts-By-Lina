import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import toast from "react-hot-toast";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-brown flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="font-accent text-4xl text-brand-gold mb-1">Arts by Lina</p>
          <p className="font-body text-brand-cream/60 text-sm">Admin Panel</p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-brand-gold/10">
          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-3xl">✉</span>
              </div>
              <h2 className="font-display text-2xl text-brand-brown font-bold mb-2">Check Your Email</h2>
              <p className="font-body text-earth-500 text-sm mb-6">A password reset link has been sent to <strong>{email}</strong>. The link expires in 10 minutes.</p>
              <Link to="/admin/login" className="font-body text-sm text-brand-gold hover:underline">Back to Login</Link>
            </div>
          ) : (
            <>
              <h1 className="font-display text-3xl text-brand-brown font-bold mb-2">Forgot Password</h1>
              <p className="font-body text-earth-500 text-sm mb-7">Enter your admin email to receive a reset link.</p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="label text-xs">Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field py-2.5 text-sm" placeholder="admin@artsbylina.com" required />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-sm font-semibold rounded-lg shadow-sm disabled:opacity-60">
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
                <div className="text-center">
                  <Link to="/admin/login" className="font-body text-sm text-brand-gold hover:underline">Back to Login</Link>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { toast.error("Passwords do not match"); return; }
    if (form.password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      await authService.resetPassword(token, form.password);
      toast.success("Password reset! Please login.");
      navigate("/admin/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Reset failed. Link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-brown flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="font-accent text-4xl text-brand-gold mb-1">Arts by Lina</p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-brand-gold/10">
          <h1 className="font-display text-3xl text-brand-brown font-bold mb-2">Set New Password</h1>
          <p className="font-body text-earth-500 text-sm mb-7">Choose a strong new password.</p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label text-xs">New Password</label>
              <input type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} className="input-field py-2.5 text-sm" required />
            </div>
            <div>
              <label className="label text-xs">Confirm Password</label>
              <input type="password" value={form.confirm} onChange={(e) => setForm((p) => ({ ...p, confirm: e.target.value }))} className="input-field py-2.5 text-sm" required />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-sm font-semibold rounded-lg shadow-sm disabled:opacity-60">
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

