import RoutesPath from '../Router/RoutePaths';

const isProtectedCurrentRoute = () => {
  const currentLocation = window.location.pathname;
  return currentLocation === RoutesPath.SIGNIN || currentLocation === RoutesPath.SIGNUP;
};

export default isProtectedCurrentRoute;
