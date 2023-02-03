//sends the jwt with the header
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    // for Node.js Express back-end
    return  user.accessToken;
  } else {
    return undefined;
  }
}