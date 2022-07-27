import HomeHeader from '../Header';
import { ContactSection } from './ContactSection';
import { FeaturesSection } from './FeaturesSection';
import LandingSection from './LandingSection';

export default function LandingPage() {
  return (
    <>
      <HomeHeader />
      <LandingSection />
      <FeaturesSection />
      <ContactSection />
    </>
  );
}
