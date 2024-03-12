const Routing = async () => {

  window.addEventListener("DOMContentLoaded", (event) => {
    window.addEventListener('popstate', () => {
        // navigate();
    });
  });


  document.addEventListener("navigate", e => {
    e.preventDefault();
    navigate(e?.detail);
  });
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

    const rootElement = document.getElementById('root');
    const rootParentElement = document.getElementById('login');
    try {
      let response = await fetch(`views/${page}.html`);
      let HTML = await response.text();
      if (page === '404Error') {
        rootParentElement.innerHTML = HTML;
      } else {
        rootElement.innerHTML = HTML;
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
    window.dispatchEvent(new Event('popstate'));

    if (Routes[pathname]) {
      return render(Routes[pathname]);
    } else {
      return render('404Error');
    }

  };

  const Routes: { [key: string]: string } = {
    "/": 'signUp',
    "/sign-up": 'signUp',
    "/sign-in": 'signIn',
  };
  return navigate();
};

export default Routing;