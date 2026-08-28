import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Gallery from "./pages/Gallery";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import ManageGallery from "./admin/ManageGallery";
import ManageServices from "./admin/ManageServices";
import ManageBookings from "./admin/ManageBookings";
import ManageContacts from "./admin/ManageContacts";
import ManageTestimonials from "./admin/ManageTestimonials";
import ManageSettings from "./admin/ManageSettings";
import ChangePassword from "./admin/ChangePassword";
import { ForgotPassword, ResetPassword } from "./admin/ForgotPassword";

// Guards
import ProtectedRoute from "./components/admin/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              fontFamily: "Nunito, sans-serif",
              fontSize: "14px",
              borderRadius: "10px",
            },
            success: { iconTheme: { primary: "#8B1A1A", secondary: "#fff" } },
          }}
        />

        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/"             element={<Home />} />
            <Route path="/about"        element={<About />} />
            <Route path="/services"     element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/gallery"      element={<Gallery />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact"      element={<Contact />} />
            <Route path="/booking"      element={<Booking />} />
          </Route>

          {/* Admin Auth Routes (no layout) */}
          <Route path="/admin/login"          element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/reset-password/:token" element={<ResetPassword />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard"    element={<Dashboard />} />
            <Route path="gallery"      element={<ManageGallery />} />
            <Route path="services"     element={<ManageServices />} />
            <Route path="bookings"     element={<ManageBookings />} />
            <Route path="contacts"     element={<ManageContacts />} />
            <Route path="testimonials" element={<ManageTestimonials />} />
            <Route path="settings"     element={<ManageSettings />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
