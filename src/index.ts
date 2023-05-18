import registerHelpers from './utils/helpers/registerHelper';
import Profile from './pages/profile';
import Auth from './pages/auth';
import Chat from './pages/chat';
import ErrorPage from './pages/error';
import AuthController from './controllers/AuthController';
import Router from './utils/Router';

import RoutesPath from './utils/Router/RoutePaths';

window.addEventListener('DOMContentLoaded', async () => {
  Router.use(RoutesPath.SIGNIN, Auth)
    .use(RoutesPath.SIGNUP, Auth)
    .use(RoutesPath.SETTINGS, Profile)
    .use(RoutesPath.SETTINGS_EDIT, Profile)
    .use(RoutesPath.SETTINGS_EDIT_PASSWORD, Profile)
    .use(RoutesPath.MESSENGER, Chat)
    .use(RoutesPath.MESSENGER_ID, Chat)
    .use(RoutesPath.ERROR_404, ErrorPage)
    .use(RoutesPath.ERROR_500, ErrorPage);

  registerHelpers();

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case RoutesPath.SIGNIN:
    case RoutesPath.SIGNUP:
      isProtectedRoute = false;
      break;
    default:
      break;
  }

  try {
    await AuthController.getCurrentUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(RoutesPath.MESSENGER);
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(RoutesPath.SIGNIN);
    }
  }
});
