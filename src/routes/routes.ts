import LandingPage from "../pages/landing-page/LandingPage";
import GistPage from "../pages/gist-page/GistPage";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/gists/:gistId", component: GistPage }
];

export default routes;
