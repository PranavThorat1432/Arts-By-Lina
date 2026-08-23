import { Link } from "react-router-dom";

const ContactCTA = () => (
  <section className="section-padding bg-earth-950 relative overflow-hidden">
    {/* Decorative element */}
    <div className="absolute top-0 left-0 w-64 h-64 bg-gold-500/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-maroon-700/10 rounded-full translate-x-1/3 translate-y-1/3" />

    <div className="page-container relative z-10 text-center">
      <p className="font-accent text-gold-400 text-2xl mb-4">Ready to Book?</p>
      <h2 className="font-display text-4xl md:text-6xl text-cream-50 font-semibold mb-6">
        Let's Create Something Beautiful
      </h2>
      <p className="font-body text-cream-300 text-lg max-w-xl mx-auto mb-10">
        Book your appointment today and let us craft a stunning Mehndi design for your special occasion.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/booking" className="btn-gold text-base px-10 py-4">
          Book Appointment Now
        </Link>
        <Link to="/contact" className="btn-secondary border-cream-400 text-cream-200 hover:bg-cream-100 hover:text-earth-900 text-base px-10 py-4">
          Get in Touch
        </Link>
      </div>
    </div>
  </section>
);

export default ContactCTA;
