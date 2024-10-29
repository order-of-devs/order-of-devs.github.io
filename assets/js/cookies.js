"use strict";

const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};
const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) return cookieValue;
  }
  return null;
};

const handleCookieChoice = (choice) => {
  if (choice === "accept") {
    setCookie("userConsent", "bannershowed", 365);
  } else if (choice === "reject") {
    setCookie("userConsent", "bannershowed", 365);
    const cookiesToDelete = ["_ga", "_ga_J03H31BQKV"];

    cookiesToDelete.forEach((cookieName) => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  }

  document.getElementById("cookie-banner").classList.add("d-none");
};

window.addEventListener("load", () => {
  if (!getCookie("userConsent")) {
    document.getElementById("cookie-banner").classList.remove("d-none");
  }
});

document
  .getElementById("accept-cookies")
  .addEventListener("click", () => handleCookieChoice("accept"));
document
  .getElementById("reject-cookies")
  .addEventListener("click", () => handleCookieChoice("reject"));
