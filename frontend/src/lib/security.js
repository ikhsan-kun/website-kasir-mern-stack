import { getActiveRoute } from './url-parser';
import { getToken, saveToken, removeToken } from './config';

const unauthenticatedRoutesOnly = ['/login', '/register'];

export function getAccessToken() {
  try {
    const accessToken = getToken();
    if (!accessToken || accessToken === 'null' || accessToken === 'undefined') {
      return null;
    }
    return accessToken;
  } catch (error) {
    console.error('getAccessToken: error:', error);
    return null;
  }
}

export function putAccessToken(token) {
  try {
    saveToken(token);
    return true;
  } catch (error) {
    console.error('putAccessToken: error:', error);
    return false;
  }
}

export function removeAccessToken() {
  try {
    removeToken();
    console.log('berhasil hapus token');
    return true;
  } catch (error) {
    console.error('removeAccessToken: error:', error);
    return false;
  }
}

export function checkUnauthenticatedRouteOnly(navigate) {
  const url = getActiveRoute();
  const isLogin = !!getAccessToken();

  if (unauthenticatedRoutesOnly.includes(url) && isLogin) {
    navigate('/');
    return true;
  }
  return false;
}

export function checkAuthenticatedRoute(navigate) {
  const isLogin = !!getAccessToken();
  if (!isLogin) {
    navigate('/login');
    return false;
  }
  return true;
}

export function getLogout(navigate) {
  removeAccessToken();
  navigate('/login');
}