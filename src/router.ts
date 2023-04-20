import renderDom from './utils/renderDom';

import Profile from './pages/profile';
import Auth from './pages/auth';
import Chat from './pages/chat';

const router = () => {
  const routes = [
    {
      path: '/',
    },
    {
      path: '/register',
    },
    {
      path: '/profile',
    },
    {
      path: '/profile-edit',
    },
    {
      path: '/profile-change-password',
    },
    {
      path: '/chat',
    },
    {
      path: '/error404',
    },
    {
      path: '/error500',
    },
  ];

  const ProfileInstance = new Profile();
  const AuthInstance = new Auth();
  const ChatInstance = new Chat();

  const navLinks = document.querySelectorAll('.nav-link');
  const root = document.getElementById('root');

  if (!root) {
    throw new Error("Root element doesn't exist");
  }

  const render = (path: string) => {
    switch (path) {
      case '/':
        AuthInstance.changePage('login');
        renderDom(root, AuthInstance);
        break;
      case '/register':
        AuthInstance.changePage('register');
        renderDom(root, AuthInstance);
        break;
      case '/profile':
        ProfileInstance.changePage('profile');
        renderDom(root, ProfileInstance);
        break;
      case '/profile-edit':
        ProfileInstance.changePage('profile-edit');
        renderDom(root, ProfileInstance);
        break;
      case '/profile-change-password':
        ProfileInstance.changePage('profile-change-password');
        renderDom(root, ProfileInstance);
        break;
      case '/chat':
        renderDom(root, ChatInstance);
        break;
      // case '/error404':
      //   root.innerHTML = errorContainer('404');
      //   break;
      // case '/error500':
      //   root.innerHTML = errorContainer('500');
      //   break;
      default:
      // root.innerHTML = errorContainer('404');
    }
  };

  function routerHandler(event: Event) {
    event.preventDefault();
    if (event.target && event.target instanceof HTMLAnchorElement) {
      history.pushState({}, 'newUrl', event.target.href);
    }
    const route = routes.find((routeItem) => routeItem.path === window.location.pathname);
    if (route && route.path) {
      render(route.path);
    } else {
      render('');
    }
  }

  navLinks.forEach((item) => {
    item.addEventListener('click', (e) => routerHandler(e));
  });

  window.addEventListener('popstate', () => {
    const route = routes.find((routeItem) => routeItem.path === window.location.pathname);
    if (route) {
      render(route.path);
    } else {
      render('');
    }
  });

  window.addEventListener('DOMContentLoaded', () => {
    const route = routes.find((routeItem) => routeItem.path === window.location.pathname);
    if (route) {
      render(route.path);
    } else {
      render('');
    }
  });
};

export default router;
