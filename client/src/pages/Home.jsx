import HeroSection from "../components/home/HeroSection";
import { AboutPreview } from "../components/home/AboutPreview";
import FeaturedServices from "../components/home/FeaturedServices";
import FeaturedGallery from "../components/home/FeaturedGallery";
import TestimonialsPreview from "../components/home/TestimonialsPreview";
import { ServiceArea } from "../components/home/ServiceArea";
import ContactCTA from "../components/home/ContactCTA";

const Home = () => (
  <>
    <HeroSection />
    <AboutPreview />
    <FeaturedServices />
    <FeaturedGallery />
    <TestimonialsPreview />
    <ServiceArea />
    <ContactCTA />
  </>
);

export default Home;
