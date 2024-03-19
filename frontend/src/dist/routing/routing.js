var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import SignUp from "../signup/signup.js";
import Login from "../login/login.js";
const Routing = () => __awaiter(void 0, void 0, void 0, function* () {
    document.addEventListener("navigate", e => {
        e.preventDefault();
        navigate(e === null || e === void 0 ? void 0 : e.detail);
    });
    function loadJS(fileToLoad) {
        switch (fileToLoad) {
            case "signUp":
                SignUp.init();
                break;
            case "signIn":
                Login.init();
                break;
        }
    }
    function initiateRouteEvents() {
        const navigateArr = Array.from(document.getElementsByTagName('a'));
        navigateArr.map((Link) => {
            Link.addEventListener("click", e => {
                var _a;
                e.preventDefault();
                const data = (_a = e.target) === null || _a === void 0 ? void 0 : _a.getAttribute('navigateTo');
                if (!data)
                    return;
                const navigateEvent = new CustomEvent("navigate", { detail: data });
                document.dispatchEvent(navigateEvent);
            });
        });
    }
    function render(pageToCalled) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = '';
            if (pageToCalled) {
                page = pageToCalled;
            }
            else {
                page = Routes[window.location.pathname];
            }
            ;
            // debugger;
            const rootElement = document.getElementById('root');
            const rootParentElement = document.getElementById('login');
            try {
                let response = yield fetch(`views/${page}.html`);
                let HTML = yield response.text();
                if (page === '404Error') {
                    rootParentElement.innerHTML = HTML;
                }
                else {
                    // debugger;
                    rootElement.innerHTML = HTML;
                    loadJS(page);
                    return new Promise((resolve) => {
                        initiateRouteEvents();
                        resolve(page);
                    });
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    ;
    function navigate(url = "") {
        const pathname = url || window.location.pathname;
        window.history.pushState({}, "", `${pathname}`);
        if (Routes[pathname]) {
            render(Routes[pathname]);
        }
        else {
            render('404Error');
        }
    }
    ;
    const Routes = {};
    function setRoutes(route, jsfile) {
        if (Routes.hasOwnProperty(route)) {
            return;
        }
        else {
            Routes[route] = jsfile;
        }
    }
    ;
    // Routes to be called :
    setRoutes("/", "signUp");
    setRoutes("/sign-up", "signUp");
    setRoutes("/sign-in", "signIn");
    // On page load first call signUp :
    navigate('/');
});
export default Routing;
