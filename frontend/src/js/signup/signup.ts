
import Utility from "../common/utility.js";
interface String {
  replaceAll(input: string, output: string): any;
}
const SignUp = (function () {

  // disable copy and paste for certain inputs:
  const disableCopyEvents = () => {
    let inputFieldsIds = ['signupPassword', 'signupConfirmPassword'];
    inputFieldsIds.map((field) => {
      Utility.getIDOfTheInputElement(field).addEventListener('paste', (e: Event) => {
        e.preventDefault();
      });
      Utility.getIDOfTheInputElement(field).addEventListener('copy', (e: Event) => {
        e.preventDefault();
      });
      Utility.getIDOfTheInputElement(field).addEventListener('cut', (e: Event) => {
        e.preventDefault();
      });
    })
  };



  // validate user input fields:
  const validateInputFields = () => {
    let CONFIRM_PASSWORD = '';
    let passwordInput = Utility.getIDOfTheInputElement("signupPassword");
    let passwordInputConfirm = Utility.getIDOfTheInputElement("signupConfirmPassword")
    let hidePasswordInput = (passwordInput?.cloneNode() as HTMLInputElement);
    let hidePasswordInputConfirm = (passwordInputConfirm?.cloneNode() as HTMLInputElement);
    const inputContainer = Array.from(document.querySelectorAll<HTMLInputElement>("#signupContainer input"));
    inputContainer.map((inputElement: HTMLInputElement) => {
      inputElement.addEventListener("input", function (event: Event) {

        // function to hide the password for privacy reasons :
        const hidePassword = (passwordCondition: string) => {

          if (passwordCondition == 'password') {

            hidePasswordInput.id = 'signupPasswordHide';
            hidePasswordInput.setAttribute('name', 'passwordCloned');
            hidePasswordInput.value = inputValue.split('').map(() => '*').join().replaceAll(",", "");


            // hide the main one and show the one with "*" :
            if ((inputElement.parentElement?.lastElementChild as HTMLElement).getAttribute('data-password-type') == 'show') {
              passwordInput.classList.add("opacity-1");
            } else {
              passwordInput.classList.add("opacity-0");
              hidePasswordInput.classList.remove("opacity-1");
              hidePasswordInput.classList.add("opacity-1");
              hidePasswordInput.classList.add("absolute", "left-4", "w-11/12", "-z-10");
            }

            // Append the hide input at top the password input :
            (passwordInput?.insertAdjacentElement('afterend', hidePasswordInput));

          } else {

            hidePasswordInputConfirm.id = 'signupConfirmPasswordHide';
            hidePasswordInputConfirm.setAttribute('name', 'confirmPasswordCloned');
            hidePasswordInputConfirm.value = inputValue.split('').map(() => '*').join().replaceAll(",", "");

            // hide the main one and show the one with "*" :
            if ((inputElement.parentElement?.lastElementChild as HTMLElement).getAttribute('data-password-type') == 'show') {
              passwordInputConfirm.classList.add("opacity-1");
            } else {
              passwordInputConfirm.classList.add("opacity-0");
              hidePasswordInputConfirm.classList.add("opacity-1");
              hidePasswordInputConfirm.classList.remove("opacity-1");
              hidePasswordInputConfirm.classList.add("absolute", "left-4", "w-11/12", "-z-10");
            }

            // Append the hide input at top the password input :
            (passwordInputConfirm?.insertAdjacentElement('afterend', hidePasswordInputConfirm));
          }
        }

        const elementID = (event.target as HTMLInputElement)?.id;
        let inputValue = (event.target as HTMLInputElement)?.value;

        const showErrorMessage = (fieldValidation: Boolean) => {
          if (fieldValidation || !inputValue) {
            inputElement.parentElement?.nextElementSibling?.classList.add("hidden");
          }
          else {
            inputElement.parentElement?.nextElementSibling?.classList.remove("hidden");
          }

        };
        switch (elementID) {
          case "signupEmail":
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            showErrorMessage(emailRegex.test(inputValue))
            break;

          case "signupUsername":
            const userNameRegex = /^[\w ]{3,25}$/g;
            const replaceCharacters: RegExp = /[^a-zA-Z ]+/g;
            if (replaceCharacters.test(inputValue)) {
              (event.target as HTMLInputElement).value = inputValue.replace(replaceCharacters, '');
            } else {
              showErrorMessage(userNameRegex.test(inputValue))
            }
            break;

          // validate the passwords :
          case "signupPassword":
            CONFIRM_PASSWORD = inputValue;
            Utility.getIDOfTheInputElement("signupConfirmPassword").value = '';
            Utility.getIDOfTheInputElement("signupConfirmPasswordHide")?.value = '';
            let passErrMessage: string = '';
            let checkForUppercase: number = Array.from(inputValue).filter((value: string) => {
              return value.match(/^[^a-zA-Z]+$/) ? false : value === value.toUpperCase()
            }).length;
            let regexForSpecialChar = /[^\w\s]/g;
            let showError = true;

            if (inputValue.length < 8) {
              passErrMessage = "Password must be at least 8 characters."
            }
            else if (checkForUppercase <= 0) {
              passErrMessage = "Password must contain atleast one upper case or lower case letter."
            } else if (!regexForSpecialChar.test(inputValue)) {
              passErrMessage = "Password must contain at least one special character."
            } else {
              showError = false;
            };

            // display the error field
            if (showError) {
              document.getElementById("signupPasswordErr")!.innerText = passErrMessage
              showErrorMessage(false);
            } else {
              showErrorMessage(true)
            };
            hidePassword('password');
            break;

          case "signupConfirmPassword":
            inputValue !== CONFIRM_PASSWORD && inputValue ? showErrorMessage(false) : showErrorMessage(true);
            hidePassword('confirm-password');
            break;
        }
      })
    });
  }

  /* function to show the password : */
  let showPasswordCTA = () => {
    let passwordElements = document.querySelectorAll(".show-hide-password");
    [...passwordElements].map((element, index) => {

      element.addEventListener("click", (event: Event) => {

        let id = "signupPassword";
        if (index == 1) {
          id = "signupConfirmPassword"
        }

        let signupPassword = Utility.getIDOfTheInputElement(id);
        let signupPasswordHide = Utility.getIDOfTheInputElement(id + "Hide")

        if (element.getAttribute('data-password-type') == 'hidden') {

          element.setAttribute('src', (element.getAttribute('data-show-password') as string));
          element.setAttribute('data-password-type', 'show');

          // change the input field to show the password :
          signupPassword.classList.remove("opacity-0");
          signupPasswordHide.classList.add("opacity-0");

        } else {
          console.log("in");
          element.setAttribute('src', (element.getAttribute('data-hide-password') as string));
          element.setAttribute('data-password-type', 'hidden');

          // Change the input field to hide the password :
          signupPassword.classList.add("opacity-0");
          signupPasswordHide.classList.remove("opacity-0");
        }
      })
    })
  };

  /* Function to check any empty input field value when submitting : */

  const checkForEmptyValues = () => {
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
        inputElement.parentElement?.nextElementSibling?.classList.remove('hidden');

      }
      isUnresolvedError = isUnresolvedError && [...inputElement.parentElement.nextElementSibling.classList].includes('hidden');

    }
    return isError || !isUnresolvedError;

  }

  /* Function to send data to the server for the signup: */
  async function sendSignupData(e: Event) {
    // alert('Signup data')
    e.preventDefault();

    // Check if any input value or faulty value is present or not :
    if (checkForEmptyValues()) {
      return;
    }

    // Intialize form data objects :
    let form = Utility.getIDOfTheInputElement('signupForm');
    let formData = new FormData(form);
    formData.delete('passwordCloned');
    formData.delete('confirmPasswordCloned');
    // Calling the api :
    const response = await fetch('http://localhost:3000/sumit', {
      method: "POST",
      body: new URLSearchParams(formData as any).toString(),
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    });
    const data = await response.json();
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
  };

  const handleFormSubmit = () => {
    Utility.getIDOfTheInputElement('signupBtn').addEventListener("click", sendSignupData);
  };
  return {
    init: function () {
      showPasswordCTA();
      validateInputFields();
      handleFormSubmit();
      disableCopyEvents();
    
    }
  };
})();
export default SignUp;