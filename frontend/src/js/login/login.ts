import Utility from "../common/utility.js";

const Login = (function () {
  // Initialize the variables and functions:
  const hidePassword = () => {
    const hideBtn = Utility.getIDOfTheInputElement('passwordHideCTA');
    const passwordInput = Utility.getIDOfTheInputElement("password");

    hideBtn.addEventListener('click', () => {

      if (hideBtn.dataset.status == 'show') {
        hideBtn.setAttribute('data-status', 'hidden');
        hideBtn.setAttribute('src', hideBtn.dataset.hidePasswordSrc);
        passwordInput.type = "password";
      } else {
        hideBtn.setAttribute('data-status', 'show');
        hideBtn.setAttribute('src', hideBtn.dataset.showPasswordSrc);
        passwordInput.type = "text";
      }
    })
 };

  const validateInputFields = () => {
    const inputFieldsArr = document.querySelectorAll('#loginContainer input');
    [...inputFieldsArr].map((value: Element) => {
      value.addEventListener('input', (event: Event) => {
        const target = event.target as HTMLInputElement;
        const elementId = target.id;
        const inputValue = target.value;

        let rememberMeSelected = false;
        switch (elementId) {
          case 'email':
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            if (!emailRegex.test(inputValue) && inputValue.length !== 0) {
              Utility.getIDOfTheInputElement('loginEmailError').classList.remove('hidden');
            } else {
              Utility.getIDOfTheInputElement('loginEmailError').classList.add('hidden')
            }
            break;
          case 'password':
            let passErrMessage: string = '';
            let regexForSpecialChar = /[^\w\s]/g;
            let checkForUppercase: number = Array.from(inputValue).filter((value: string) => {
              return value.match(/^[^a-zA-Z]+$/) ? false : value === value.toUpperCase()
            }).length;
            let errorBox = Utility.getIDOfTheInputElement('loginPasswordErr');
            let showError = true;
            switch (true) {
              case (inputValue.length <= 3 || inputValue.length >= 25):
                passErrMessage = 'Password length must be between 3 and 25 characters.'
                break;
              case (Boolean(!checkForUppercase)):
                passErrMessage = 'Password must contain one Uppercase character.'
                break;
              case (!regexForSpecialChar.test(inputValue)):
                passErrMessage = 'Password must contain at least one special character.'
                break;
              default:
                showError = false;
                break;
              }
            if (showError  && inputValue.length > 0) {
              errorBox.innerText = passErrMessage;
              errorBox.classList.remove('hidden');
            } else {
              errorBox.classList.add('hidden');
            }
          case 'rememberMe':
            const rememberMe = Utility.getIDOfTheInputElement("rememberMe");
            rememberMe.checked ? rememberMeSelected = true : null;
            break;

        }


      });
    });
  };
  return {
    init: function () {
      validateInputFields();
      hidePassword();
    }
  };

})();


export default Login;