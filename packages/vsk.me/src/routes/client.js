import Home from "../components/Home";
import CV from "../components/CV";
import About from "../components/About";
import Contact from "../components/Contact";

export default [
  { path: "/", component: Home, exact: true },
  { path: "/about", component: About, exact: true },
  { path: "/cv", component: CV, exact: true },
  { path: "/contact", component: Contact, exact: true }
];