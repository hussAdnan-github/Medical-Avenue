import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Search from "../pages/search/page";
import About from "../pages/about/page";
import Services from "../pages/services/page";
import ServiceDetail from "../pages/services/detail";
import Doctors from "../pages/doctors/page";
import DoctorProfile from "../pages/doctors/profile";
import Booking from "../pages/booking/page";
import BookingConfirmation from "../pages/booking/confirmation";
import Contact from "../pages/contact/page";
import Packages from "../pages/packages/page";
import PackageDetail from "../pages/packages/detail";
import Offers from "../pages/offers/page";
import FAQ from "../pages/faq/page";
import Blog from "../pages/blog/page";
import BlogDetail from "../pages/blog/detail";
import DNASimulator from "../pages/dna-simulator/page";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/search", element: <Search /> },
  { path: "/about", element: <About /> },
  { path: "/services", element: <Services /> },
  { path: "/services/:id", element: <ServiceDetail /> },
  { path: "/doctors", element: <Doctors /> },
  { path: "/doctors/:id", element: <DoctorProfile /> },
  { path: "/booking", element: <Booking /> },
  { path: "/booking/confirmation", element: <BookingConfirmation /> },
  { path: "/contact", element: <Contact /> },
  { path: "/packages", element: <Packages /> },
  { path: "/packages/:id", element: <PackageDetail /> },
  { path: "/offers", element: <Offers /> },
  { path: "/faq", element: <FAQ /> },
  { path: "/blog", element: <Blog /> },
  { path: "/blog/:id", element: <BlogDetail /> },
  { path: "/dna-simulator", element: <DNASimulator /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
