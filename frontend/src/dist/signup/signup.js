var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Utility from "../common/utility.js";
const SignUp = (function () {
    // disable copy and paste for certain inputs:
    const disableCopyEvents = () => {
        let inputFieldsIds = ['signupPassword', 'signupConfirmPassword'];
        inputFieldsIds.map((field) => {
            Utility.getIDOfTheInputElement(field).addEventListener('paste', (e) => {
                e.preventDefault();
            });
            Utility.getIDOfTheInputElement(field).addEventListener('copy', (e) => {
                e.preventDefault();
            });
            Utility.getIDOfTheInputElement(field).addEventListener('cut', (e) => {
                e.preventDefault();
            });
        });
    };
    // validate user input fields:
    const validateInputFields = () => {
        let CONFIRM_PASSWORD = '';
        let passwordInput = Utility.getIDOfTheInputElement("signupPassword");
        let passwordInputConfirm = Utility.getIDOfTheInputElement("signupConfirmPassword");
        let hidePasswordInput = passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.cloneNode();
        let hidePasswordInputConfirm = passwordInputConfirm === null || passwordInputConfirm === void 0 ? void 0 : passwordInputConfirm.cloneNode();
        const inputContainer = Array.from(document.querySelectorAll("#signupContainer input"));
        inputContainer.map((inputElement) => {
            inputElement.addEventListener("input", function (event) {
                var _a, _b, _c;
                // function to hide the password for privacy reasons :
                const hidePassword = (passwordCondition) => {
                    var _a, _b;
                    if (passwordCondition == 'password') {
                        hidePasswordInput.id = 'signupPasswordHide';
                        hidePasswordInput.setAttribute('name', 'passwordCloned');
                        hidePasswordInput.value = inputValue.split('').map(() => '*').join().replaceAll(",", "");
                        // hide the main one and show the one with "*" :
                        if (((_a = inputElement.parentElement) === null || _a === void 0 ? void 0 : _a.lastElementChild).getAttribute('data-password-type') == 'show') {
                            passwordInput.classList.add("opacity-1");
                        }
                        else {
                            passwordInput.classList.add("opacity-0");
                            hidePasswordInput.classList.remove("opacity-1");
                            hidePasswordInput.classList.add("opacity-1");
                            hidePasswordInput.classList.add("absolute", "left-4", "w-11/12", "-z-10");
                        }
                        // Append the hide input at top the password input :
                        (passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.insertAdjacentElement('afterend', hidePasswordInput));
                    }
                    else {
                        hidePasswordInputConfirm.id = 'signupConfirmPasswordHide';
                        hidePasswordInputConfirm.setAttribute('name', 'confirmPasswordCloned');
                        hidePasswordInputConfirm.value = inputValue.split('').map(() => '*').join().replaceAll(",", "");
                        // hide the main one and show the one with "*" :
                        if (((_b = inputElement.parentElement) === null || _b === void 0 ? void 0 : _b.lastElementChild).getAttribute('data-password-type') == 'show') {
                            passwordInputConfirm.classList.add("opacity-1");
                        }
                        else {
                            passwordInputConfirm.classList.add("opacity-0");
                            hidePasswordInputConfirm.classList.add("opacity-1");
                            hidePasswordInputConfirm.classList.remove("opacity-1");
                            hidePasswordInputConfirm.classList.add("absolute", "left-4", "w-11/12", "-z-10");
                        }
                        // Append the hide input at top the password input :
                        (passwordInputConfirm === null || passwordInputConfirm === void 0 ? void 0 : passwordInputConfirm.insertAdjacentElement('afterend', hidePasswordInputConfirm));
                    }
                };
                const elementID = (_a = event.target) === null || _a === void 0 ? void 0 : _a.id;
                let inputValue = (_b = event.target) === null || _b === void 0 ? void 0 : _b.value;
                const showErrorMessage = (fieldValidation) => {
                    var _a, _b, _c, _d;
                    if (fieldValidation || !inputValue) {
                        (_b = (_a = inputElement.parentElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling) === null || _b === void 0 ? void 0 : _b.classList.add("hidden");
                    }
                    else {
                        (_d = (_c = inputElement.parentElement) === null || _c === void 0 ? void 0 : _c.nextElementSibling) === null || _d === void 0 ? void 0 : _d.classList.remove("hidden");
                    }
                };
                switch (elementID) {
                    case "signupEmail":
                        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
                        showErrorMessage(emailRegex.test(inputValue));
                        break;
                    case "signupUsername":
                        const userNameRegex = /^[\w ]{3,25}$/g;
                        const replaceCharacters = /[^a-zA-Z ]+/g;
                        if (replaceCharacters.test(inputValue)) {
                            event.target.value = inputValue.replace(replaceCharacters, '');
                        }
                        else {
                            showErrorMessage(userNameRegex.test(inputValue));
                        }
                        break;
                    // validate the passwords :
                    case "signupPassword":
                        CONFIRM_PASSWORD = inputValue;
                        Utility.getIDOfTheInputElement("signupConfirmPassword").value = '';
                        (_c = Utility.getIDOfTheInputElement("signupConfirmPasswordHide")) === null || _c === void 0 ? void 0 : _c.value = '';
                        let passErrMessage = '';
                        let checkForUppercase = Array.from(inputValue).filter((value) => {
                            return value.match(/^[^a-zA-Z]+$/) ? false : value === value.toUpperCase();
                        }).length;
                        let regexForSpecialChar = /[^\w\s]/g;
                        let showError = true;
                        if (inputValue.length < 8) {
                            passErrMessage = "Password must be at least 8 characters.";
                        }
                        else if (checkForUppercase <= 0) {
                            passErrMessage = "Password must contain atleast one upper case or lower case letter.";
                        }
                        else if (!regexForSpecialChar.test(inputValue)) {
                            passErrMessage = "Password must contain at least one special character.";
                        }
                        else {
                            showError = false;
                        }
                        ;
                        // display the error field
                        if (showError) {
                            document.getElementById("signupPasswordErr").innerText = passErrMessage;
                            showErrorMessage(false);
                        }
                        else {
                            showErrorMessage(true);
                        }
                        ;
                        hidePassword('password');
                        break;
                    case "signupConfirmPassword":
                        inputValue !== CONFIRM_PASSWORD && inputValue ? showErrorMessage(false) : showErrorMessage(true);
                        hidePassword('confirm-password');
                        break;
                }
            });
        });
    };
    /* function to show the password : */
    let showPasswordCTA = () => {
        let passwordElements = document.querySelectorAll(".show-hide-password");
        [...passwordElements].map((element, index) => {
            element.addEventListener("click", (event) => {
                let id = "signupPassword";
                if (index == 1) {
                    id = "signupConfirmPassword";
                }
                let signupPassword = Utility.getIDOfTheInputElement(id);
                let signupPasswordHide = Utility.getIDOfTheInputElement(id + "Hide");
                if (element.getAttribute('data-password-type') == 'hidden') {
                    element.setAttribute('src', element.getAttribute('data-show-password'));
                    element.setAttribute('data-password-type', 'show');
                    // change the input field to show the password :
                    signupPassword.classList.remove("opacity-0");
                    signupPasswordHide.classList.add("opacity-0");
                }
                else {
                    element.setAttribute('src', element.getAttribute('data-hide-password'));
                    element.setAttribute('data-password-type', 'hidden');
                    // change the input field to hide the password :
                    signupPassword.classList.add("opacity-0");
                    signupPasswordHide.classList.remove("opacity-0");
                }
            });
        });
    };
    /* function to check any empty input field value when submitting : */
    const checkForEmptyValues = () => {
        var _a, _b;
        let inputContainer = [...document.querySelectorAll('#signupContainer input')];
        let focusElement = false;
        let isError = false;
        let isUnresolvedError = true;
        for (let element = 0; element < inputContainer.length; element++) {
            let inputElement = Utility.getIDOfTheInputElement(inputContainer[element].id);
            if (inputElement.value == "") {
                isError = true;
                if (focusElement == false) {
                    inputElement.focus();
                    focusElement = true;
                }
                (_b = (_a = inputElement.parentElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
            }
            isUnresolvedError = isUnresolvedError && [...inputElement.parentElement.nextElementSibling.classList].includes('hidden');
        }
        return isError || !isUnresolvedError;
    };
    /* function to send data to the server for the signup: */
    function sendSignupData(e) {
        return __awaiter(this, void 0, void 0, function* () {
            alert('Signup data');
            e.preventDefault();
            // check if any input value or faulty value is present or not :
            if (checkForEmptyValues()) {
                return;
            }
            // intialize form data objects :
            let form = Utility.getIDOfTheInputElement('signupForm');
            let formData = new FormData(form);
            formData.delete('passwordCloned');
            formData.delete('confirmPasswordCloned');
            // calling the api :
            const response = yield fetch('http://localhost:3000/sumit', {
                method: "POST",
                body: new URLSearchParams(formData).toString(),
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            });
            const data = yield response.json();
            try {
                if (data.status == 200) {
                    alert('User Created Successfully');
                }
                else {
                    throw new Error(data.message);
                }
            }
            catch (e) {
                console.log(e);
            }
            finally {
            }
        });
    }
    const handleFormSubmit = () => {
        Utility.getIDOfTheInputElement('signupBtn').addEventListener("click", sendSignupData);
    };
    return {
        init: function () {
            // alert('called signup')
            showPasswordCTA();
            validateInputFields();
            handleFormSubmit();
            disableCopyEvents();
        }
    };
})();
export default SignUp;
