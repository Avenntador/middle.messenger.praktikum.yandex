import Profile from './pages/profile';
import Auth from './pages/auth';
import Chat from './pages/chat';
import ErrorPage from './pages/error';
import Router from './utils/Router';

document.addEventListener('DOMContentLoaded', () => {
  Router.use('/', Auth);
  Router.use('/sign-up', Auth);
  Router.use('/settings', Profile);
  Router.use('/settings-edit', Profile);
  Router.use('/settings-change-password', Profile);
  Router.use('/chat', Chat);
  Router.use('/404', ErrorPage);
  Router.use('/500', ErrorPage);

  Router.start();
});
