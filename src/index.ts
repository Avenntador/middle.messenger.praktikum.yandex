import Profile from './pages/profile';
import Auth from './pages/auth';
import Chat from './pages/chat';
import ErrorPage from './pages/error';
import AuthController from './controllers/AuthController';
import Router from './utils/Router';
import RoutesPath from './utils/Router/RoutePaths';
import { isProtectedCurrentRoute } from './utils/helpers';

document.addEventListener('DOMContentLoaded', async () => {
  Router.use(RoutesPath.SIGNIN, Auth);
  Router.use(RoutesPath.SIGNUP, Auth);
  Router.use(RoutesPath.SETTINGS, Profile);
  Router.use(RoutesPath.SETTINGS_EDIT, Profile);
  Router.use(RoutesPath.SETTINGS_EDIT_PASSWORD, Profile);
  Router.use(RoutesPath.MESSENGER, Chat);
  Router.use(RoutesPath.ERROR_404, ErrorPage);
  Router.use(RoutesPath.ERROR_500, ErrorPage);

  await AuthController.getCurrentUser()
    .then(() => {
      Router.start();

      if (isProtectedCurrentRoute()) {
        Router.go(RoutesPath.MESSENGER);
      }
    })
    .catch(() => {
      Router.start();
      if (!isProtectedCurrentRoute()) {
        Router.go(RoutesPath.SIGNIN);
      }
    });
});
