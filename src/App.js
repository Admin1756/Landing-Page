import { useEffect, useState } from "react";
import "./styles/zamzam.css";

import { OfferProvider, useOffer } from "./offer";
import { fire, fireSmallcase } from "./utils/pixel";
import { captureAttribution } from "./utils/tracking";

import OfferBanner from "./components/OfferBanner";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import ComparisonTable from "./components/ComparisonTable";
import SmallcaseSection from "./components/SmallcaseSection";
import Calculator from "./components/Calculator";
import Founder from "./components/Founder";
import Testimonials from "./components/Testimonials";
import FAQSection from "./components/Faq";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import CouponModal from "./components/CouponModal";
import AssessmentModal from "./components/AssessmentModal";
import VideoModal from "./components/VideoModal";

const pixelParams = (item) => ({
  content_name: item.name,
  content_ids: [item.scid],
  content_type: "product",
});

function Page() {
  const { claim } = useOffer();
  const [profile, setProfile] = useState(null); // set when the Financial Freedom form is submitted
  const [coupon, setCoupon] = useState(null);   // the smallcase whose coupon pop-up is open

  // Meta Pixel base code + PageView are in public/index.html
  useEffect(() => { captureAttribution(); }, []);

  // "Subscribe with 20% off" on a card: Pixel event, stop the timer, open the coupon pop-up
  const handleSubscribe = (item) => {
    fire("subscribeClick", pixelParams(item));
    claim();
    setCoupon(item);
  };

  // Final button in the pop-up: standard Subscribe event + one custom event per smallcase
  const handleProceed = (item) => {
    fire("subscribeFinal", pixelParams(item));
    fireSmallcase(item.scid, pixelParams(item));
  };

  return (
    <div className="zz">
      <OfferBanner />
      <Navbar />
      <Hero onStart={setProfile} />
      <TrustStrip />
      <ComparisonTable />
      <SmallcaseSection onInvest={handleSubscribe} />
      <Calculator />
      <Founder />
      <Testimonials />
      <FAQSection />
      <ContactSection />
      <Footer />

      {coupon && <CouponModal item={coupon} onProceed={handleProceed} onClose={() => setCoupon(null)} />}
      {profile && <AssessmentModal profile={profile} onClose={() => setProfile(null)} />}
    </div>
  );
}

export default function ZamzamLanding() {
  return (
    <OfferProvider>
      <Page />
    </OfferProvider>
  );
}
