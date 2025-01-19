import LandingPage from "../pages/landing-page/LandingPage";
import GistPage from "../pages/gist-page/GistPage";
import MyGistsPage from "../pages/my-gists-page/MyGistsPage";
import StarredGistsPage from "../pages/starred-gists-page/StarredGistsPage";
import CreateGistPage from "../pages/create-gist-page/CreateGistPage";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/gists/:gistId", component: GistPage },
  { path: "/my-gists", component: MyGistsPage, private: true },
  { path: "/starred-gists", component: StarredGistsPage, private: true },
  { path: "/create-gist", component: CreateGistPage, private: true },
];

export default routes;
