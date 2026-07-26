import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
    <div className="text-center">
      <p className="font-accent text-gold-500 text-2xl mb-4">Oops!</p>
      <h1 className="font-display text-8xl md:text-9xl text-maroon-700 font-bold mb-4">404</h1>
      <p className="font-display text-3xl text-earth-800 mb-4">Page Not Found</p>
      <p className="font-body text-earth-500 mb-8 max-w-md mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary px-10 py-4 text-base">
        Back to Home
      </Link>
    </div>
  </div>
);

export default NotFound;
