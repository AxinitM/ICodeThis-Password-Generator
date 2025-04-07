document.addEventListener("DOMContentLoaded", function () {
  // Get references to the elements
  const resultEl = document.getElementById("result");
  const copyBtn = document.getElementById("copy-to-clipboard-btn");
  const generateBtn = document.getElementById("generate-pw-btn");

  const lengthInput = document.getElementById("length");
  const uppercaseCheckbox = document.getElementById("uppercase");
  const lowercaseCheckbox = document.getElementById("lowercase");
  const numbersCheckbox = document.getElementById("numbers");
  const symbolsCheckbox = document.getElementById("symbols");

  // Function to generate password
  function generatePassword() {
    const length = parseInt(lengthInput.value);

    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let possibleCharacters = "";

    // Add selected character types to possibleCharacters
    if (uppercaseCheckbox.checked) possibleCharacters += upperCaseLetters;
    if (lowercaseCheckbox.checked) possibleCharacters += lowerCaseLetters;
    if (numbersCheckbox.checked) possibleCharacters += numbers;
    if (symbolsCheckbox.checked) possibleCharacters += symbols;

    // If no option is selected, show message
    if (possibleCharacters === "") {
      resultEl.innerHTML =
        '<span style="color: red; font-size: 0.8rem;">Please select at least one option!</span>';
      return;
    }

    let password = "";
    // Generate password by picking random characters
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * possibleCharacters.length);
      password += possibleCharacters[randomIndex];
    }

    // Show generated password
    resultEl.textContent = password;
  }

  // Function to copy password to clipboard
  function copyToClipboard() {
    const textToCopy = resultEl.textContent;

    // Check if there are no selected options
    const possibleCharacters =
      (uppercaseCheckbox.checked ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "") +
      (lowercaseCheckbox.checked ? "abcdefghijklmnopqrstuvwxyz" : "") +
      (numbersCheckbox.checked ? "0123456789" : "") +
      (symbolsCheckbox.checked ? "!@#$%^&*()_+-=[]{}|;:,.<>?" : "");

    // If no options are selected, show an alert and do not copy
    if (possibleCharacters === "") {
      alert("Please select at least one option!");
      return;
    }

    // If a password is generated, copy it
    if (textToCopy) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          alert("Password copied to clipboard!");
          clearPasswordAndResetOptions();
        })
        .catch((err) => {
          alert("Failed to copy password: " + err);
          clearPasswordAndResetOptions();
        });
    } else {
      // If the text is empty (like the error message), show an error alert
      alert("Failed to copy password: No password generated.");
      clearPasswordAndResetOptions();
    }
  }

  // Function to clear password and reset options
  function clearPasswordAndResetOptions() {
    // Clear password field
    resultEl.textContent = "";

    // Reset the checkboxes to checked
    uppercaseCheckbox.checked = true;
    lowercaseCheckbox.checked = true;
    numbersCheckbox.checked = true;
    symbolsCheckbox.checked = true;

    // Reset the length input to its default value
    lengthInput.value = 10;
  }

  // Set up event listeners
  generateBtn.addEventListener("click", generatePassword);
  copyBtn.addEventListener("click", copyToClipboard);
});
