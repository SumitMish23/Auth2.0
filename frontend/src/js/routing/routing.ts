import SignUp from "../signup/signup.js";
import Login from "../login/login.js";
const Routing = async () => {
  const Routes: { [key: string]: string } = {};
  document.addEventListener("navigate", e => {
    e.preventDefault();
    navigate(e?.detail);
  });
  function loadJS(fileToLoad: string) {

    switch (fileToLoad) {
      case "signUp":
        SignUp.init();
        break;
      case "signIn":
        Login.init();
        break;
    }
  };
  function initiateRouteEvents() {
    const navigateArr = Array.from(document.getElementsByTagName('a'));
    navigateArr.map((Link) => {
      Link.addEventListener("click", e => {
        e.preventDefault();
        const data = e.target?.getAttribute('navigateTo');
        if (!data) return;
        const navigateEvent = new CustomEvent("navigate", { detail: data });
        document.dispatchEvent(navigateEvent);
      })
    })
  }

  async function render(pageToCalled: string) {
    let page = '';
    if (pageToCalled) {
      page = pageToCalled;
    } else {
      page = Routes[window.location.pathname];
    };
    // debugger;
    const rootElement = document.getElementById('root');
    const rootParentElement = document.getElementById('login');
    try {
      let response = await fetch(`views/${page}.html`);
      let HTML = await response.text();
      if (page === '404Error') {
        rootParentElement.innerHTML = HTML;


      } else {
        // debugger;
        rootElement.innerHTML = HTML;
        loadJS(page);
        return new Promise((resolve) => {
          initiateRouteEvents();
          resolve(page);
        })
      }
    } catch (e) {
      console.log(e);
    }

  };
  function navigate(url = "") {
    const pathname: string = url || window.location.pathname;
    window.history.pushState({}, "", `${pathname}`);
    if (Routes[pathname]) {
      render(Routes[pathname]);
    } else {
      render('404Error');
    }
  };




  function setRoutes(route: string, htmlFile: string) {
    if (Routes.hasOwnProperty(route)) {
      return;
    } else {
      Routes[route] = htmlFile;
    }
  };

  // Routes to be called :
  setRoutes("/", "signUp");
  setRoutes("/sign-up", "signUp");
  setRoutes("/sign-in", "signIn");


  // On page load first call signUp :
  navigate('/');
};

export default Routing;