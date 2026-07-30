import { useState } from "react";
import { authService } from "../services/authService";
import toast from "react-hot-toast";
import AdminSubNav from "../components/admin/AdminSubNav";

const Field = ({ label, name, value, onChange, showPassword, onToggle }) => (
  <div>
    <label className="label text-xs">{label}</label>
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        className="input-field pr-16 py-2.5 text-sm"
        required
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gold hover:text-brand-brown text-[10px] font-bold font-body"
      >
        {showPassword ? "HIDE" : "SHOW"}
      </button>
    </div>
  </div>
);

const ChangePassword = () => {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const toggleShow = (field) => setShowPass((p) => ({ ...p, [field]: !p[field] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (form.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await authService.changePassword(form.currentPassword, form.newPassword);
      toast.success("Password changed successfully");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminSubNav />

      <div>
        <h1 className="font-display text-3xl text-brand-brown font-bold">Change Password</h1>
        <p className="font-body text-earth-500 text-xs mt-1">Keep your account secure</p>
      </div>

      <div className="bg-white rounded-2xl border border-earth-150 shadow-sm p-8 max-w-md">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Field 
            label="Current Password" 
            name="currentPassword" 
            value={form.currentPassword} 
            onChange={handleChange} 
            showPassword={showPass.current} 
            onToggle={() => toggleShow("current")} 
          />
          <Field 
            label="New Password" 
            name="newPassword" 
            value={form.newPassword} 
            onChange={handleChange} 
            showPassword={showPass.new} 
            onToggle={() => toggleShow("new")} 
          />
          <Field 
            label="Confirm New Password" 
            name="confirmPassword" 
            value={form.confirmPassword} 
            onChange={handleChange} 
            showPassword={showPass.confirm} 
            onToggle={() => toggleShow("confirm")} 
          />
          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-sm font-semibold rounded-lg shadow-sm">
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

