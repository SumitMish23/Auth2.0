// Import all JS files :
import Routing from "./routing/routing.js";
import SignUp from "./signup/signup.js";
import Login from "./login/login.js";
// Calling Functions with init :
console.log(Routing());
console.log(Routing().then((functionToCall) => {
    console.log(functionToCall);
    switch (true) {
        case functionToCall == 'signUp':
            SignUp.init();
            break;
        case functionToCall == 'signIn':
            Login.init();
            break;
    }
}));
