var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Routing = () => __awaiter(void 0, void 0, void 0, function* () {
    window.addEventListener("DOMContentLoaded", (event) => {
        window.addEventListener('popstate', () => {
            // navigate();
        });
    });
    document.addEventListener("navigate", e => {
        e.preventDefault();
        navigate(e === null || e === void 0 ? void 0 : e.detail);
    });
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
            const rootElement = document.getElementById('root');
            const rootParentElement = document.getElementById('login');
            try {
                let response = yield fetch(`views/${page}.html`);
                let HTML = yield response.text();
                if (page === '404Error') {
                    rootParentElement.innerHTML = HTML;
                }
                else {
                    rootElement.innerHTML = HTML;
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
        window.dispatchEvent(new Event('popstate'));
        if (Routes[pathname]) {
            return render(Routes[pathname]);
        }
        else {
            return render('404Error');
        }
    }
    ;
    const Routes = {
        "/": 'signUp',
        "/sign-up": 'signUp',
        "/sign-in": 'signIn',
    };
    return navigate();
});
export default Routing;
