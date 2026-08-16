import { useState, useEffect } from "react";
import { settingsService } from "../services/settingsService";
import Loader from "../components/common/Loader";
import toast from "react-hot-toast";
import AdminSubNav from "../components/admin/AdminSubNav";

const Section = ({ title, children }) => (
  <div className="bg-white rounded-2xl border border-earth-150 shadow-sm p-6 mb-5">
    <h3 className="font-display text-xl text-brand-brown font-bold mb-4 pb-2 border-b border-earth-100">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const ManageSettings = () => {
  const [form, setForm] = useState({
    businessName: "", tagline: "", aboutContent: "",
    contactEmail: "", phoneNumber: "", whatsappNumber: "",
    instagramURL: "", serviceAreaText: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    settingsService.get().then((data) => {
      setForm({
        businessName:  data.businessName  || "",
        tagline:       data.tagline       || "",
        aboutContent:  data.aboutContent  || "",
        contactEmail:  data.contactEmail  || "",
        phoneNumber:   data.phoneNumber   || "",
        whatsappNumber: data.whatsappNumber || "",
        instagramURL:  data.instagramURL  || "",
        serviceAreaText: data.serviceAreaText || "",
      });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await settingsService.update(form);
      toast.success("Settings saved successfully");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <AdminSubNav />

      <div className="mb-6">
        <h1 className="font-display text-3xl text-brand-brown font-bold">Website Settings</h1>
        <p className="font-body text-earth-500 text-sm mt-1">Update your website content and contact information</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <Section title="Business Info">
          <div>
            <label className="label text-xs">Business Name</label>
            <input type="text" name="businessName" value={form.businessName} onChange={handleChange} className="input-field py-2.5 text-sm" />
          </div>
          <div>
            <label className="label text-xs">Tagline</label>
            <input type="text" name="tagline" value={form.tagline} onChange={handleChange} className="input-field py-2.5 text-sm" placeholder="Your business tagline" />
          </div>
          <div>
            <label className="label text-xs">Service Area Text</label>
            <input type="text" name="serviceAreaText" value={form.serviceAreaText} onChange={handleChange} className="input-field py-2.5 text-sm" placeholder="e.g. Serving Jalgaon & surrounding areas · Home & Venue visits available" />
          </div>
        </Section>

        <Section title="About Content">
          <div>
            <label className="label text-xs">About Description</label>
            <textarea name="aboutContent" value={form.aboutContent} onChange={handleChange} rows={6} className="input-field py-2.5 text-sm resize-none" placeholder="Write about yourself and your work..." />
          </div>
        </Section>

        <Section title="Contact Details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label text-xs">Contact Email</label>
              <input type="email" name="contactEmail" value={form.contactEmail} onChange={handleChange} className="input-field py-2.5 text-sm" placeholder="your@email.com" />
            </div>
            <div>
              <label className="label text-xs">Phone Number</label>
              <input type="tel" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="input-field py-2.5 text-sm" placeholder="+91 XXXXXXXXXX" />
            </div>
          </div>
        </Section>

        <Section title="Social Media">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label text-xs">WhatsApp Number</label>
              <input type="text" name="whatsappNumber" value={form.whatsappNumber} onChange={handleChange} className="input-field py-2.5 text-sm" placeholder="919XXXXXXXXX (with country code, no +)" />
            </div>
            <div>
              <label className="label text-xs">Instagram Profile URL</label>
              <input type="url" name="instagramURL" value={form.instagramURL} onChange={handleChange} className="input-field py-2.5 text-sm" placeholder="https://instagram.com/yourusername" />
            </div>
          </div>
        </Section>

        <button type="submit" disabled={saving} className="btn-primary w-full sm:w-auto px-10 py-3 text-sm disabled:opacity-60 font-semibold rounded-lg shadow-sm">
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
};

export default ManageSettings;

