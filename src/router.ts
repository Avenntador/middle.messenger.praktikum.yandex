import profileContainer from './pages/profile';
import authContainer from './pages/auth';
import chatContainer from './pages/chat';
import errorContainer from './pages/error';

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

  const navLinks = document.querySelectorAll('.nav-link');
  const root = document.getElementById('root');

  if (!root) {
    throw new Error("Root element doesn't exist");
  }

  const render = (path: string) => {
    switch (path) {
      case '/':
        root.innerHTML = authContainer('/');
        break;
      case '/register':
        root.innerHTML = authContainer('register');
        break;
      case '/profile':
        root.innerHTML = profileContainer('profile');
        break;
      case '/profile-edit':
        root.innerHTML = profileContainer('profile-edit');
        break;
      case '/profile-change-password':
        root.innerHTML = profileContainer('profile-change-password');
        break;
      case '/chat':
        root.innerHTML = chatContainer();
        break;
      case '/error404':
        root.innerHTML = errorContainer('404');
        break;
      case '/error500':
        root.innerHTML = errorContainer('500');
        break;
      default:
        root.innerHTML = errorContainer('404');
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
