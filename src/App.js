import { useEffect, useState } from "react";
import "./styles/zamzam.css";

import { initPixel } from "./utils/pixel";
import { captureAttribution } from "./utils/tracking";

import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import PainPoints from "./components/PainPoints";
import ComparisonTable from "./components/ComparisonTable";
import WorkbookSection from "./components/WorkbookSection";
import HowItWorks from "./components/HowItWorks";
import Founder from "./components/Founder";
import Testimonials from "./components/Testimonials";
import FaqSection from "./components/FaqSection";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";
import StickyCta from "./components/StickyCta";
import AssessmentModal from "./components/AssessmentModal";
import WorkbookModal from "./components/WorkbookModal";

export default function ZamzamLanding() {
  const [profile, setProfile] = useState(null);       // set when the header form is submitted
  const [workbook, setWorkbook] = useState(null);     // { source, initial } when the modal is open

  useEffect(() => { captureAttribution(); initPixel(); }, []);

  const openWorkbook = (source, initial) => {
    setProfile(null); // close the plan if the workbook was opened from its result screen
    setWorkbook({ source, initial });
  };

  return (
    <div className="zz">
      <TopBar />
      <Navbar onWorkbook={openWorkbook} />
      <Hero onStart={setProfile} onWorkbook={openWorkbook} />
      <TrustStrip />
      <PainPoints />
      <ComparisonTable />
      <WorkbookSection onWorkbook={openWorkbook} />
      <HowItWorks />
      <Founder />
      <Testimonials />
      <FaqSection />
      <FinalCta />
      <Footer />
      <StickyCta onWorkbook={openWorkbook} hidden={!!profile || !!workbook} />

      {profile && <AssessmentModal profile={profile} onClose={() => setProfile(null)} onWorkbook={openWorkbook} />}
      {workbook && <WorkbookModal source={workbook.source} initial={workbook.initial} onClose={() => setWorkbook(null)} />}
    </div>
  );
}
