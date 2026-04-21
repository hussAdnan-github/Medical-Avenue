import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import WhatsAppButton from "@/components/feature/WhatsAppButton";
import CustomCursor from "@/components/base/CustomCursor";
import ScrollProgress from "@/components/base/ScrollProgress";
import PageTransition from "@/components/base/PageTransition";
import MouseFollower from "@/components/base/MouseFollower";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={__BASE_PATH__}>
        {/* Global interactive systems */}
        <CustomCursor />
        <ScrollProgress />
        <MouseFollower />

        {/* Page transitions wrapper */}
        <PageTransition>
          <AppRoutes />
        </PageTransition>

        <WhatsAppButton />
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
