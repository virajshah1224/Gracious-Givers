/**
 * Author: Venkata Saikiran Kattekola (B00857007)
 */
function authenticateUser(response) {
  localStorage.setItem("token", JSON.stringify(response));
}

function isAuthenticated() {
  var userObj = localStorage.getItem("token");
  if (
    userObj &&
    JSON.parse(userObj) &&
    JSON.parse(userObj).data &&
    JSON.parse(userObj).data.user
  ) {
    //return userObj;
    return JSON.parse(userObj).data.user;
  } else {
    return false;
  }
}

function setTokenOnLogOut() { 
  localStorage.removeItem("token");
  redirectUser("/");
}

//redirect user
function redirectUser(path) {
    window.location.href = path;
}

//export the function
export { authenticateUser, isAuthenticated, setTokenOnLogOut, redirectUser };
