import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import FloatingNav from "@/components/floating/FloatingNav";
import ContactFloat from "@/components/floating/ContactFloat";
import OfferPin from "@/components/floating/OfferPin";
import WelcomeLeadPopup from "@/components/forms/WelcomeLeadPopup";
import { site } from "@/config/site";
import { sectionRegistry } from "@/registry/sectionRegistry";

export default function Home() {
  const enabledSections = site.sections.filter((section) => section.enabled);

  return (
    <main className="bg-navy text-white overflow-x-hidden max-md:pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]">
      <NavBar />
      {site.widgets.floatingNav ? <FloatingNav /> : null}
      {site.widgets.contactFloat ? <ContactFloat /> : null}
      {site.widgets.offerPin ? <OfferPin /> : null}
      {site.widgets.welcomePopup ? <WelcomeLeadPopup /> : null}

      {enabledSections.map((section) => {
        const Component = sectionRegistry[section.id];
        return <Component key={section.id} />;
      })}

      <Footer />
    </main>
  );
}
