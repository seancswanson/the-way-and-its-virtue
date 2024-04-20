// Adapted from https://www.tohuwabohu.io/2022/11/astrojs-theme-toggle/
const storageKey = "theme-preference";

const getColorPreference = () => {
  let preference = localStorage.getItem(storageKey);
  if (!preference) {
    preference = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return preference;
};

const setPreference = (themeName) => {
  localStorage.setItem(storageKey, themeName);
  document.documentElement.setAttribute("data-theme", themeName);
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.checked = themeName === "dark";
  }
};

const togglePreference = () => {
  const currentPreference = getColorPreference();
  const newPreference = currentPreference === "dark" ? "light" : "dark";
  setPreference(newPreference);
};

// Function to initialize theme
const initializeTheme = () => {
  const theme = getColorPreference();
  setPreference(theme);
};

// Listen for astro:after-swap event
// https://docs.astro.build/en/guides/view-transitions/#astroafter-swap
document.addEventListener("astro:after-swap", () => {
  initializeTheme();
});

// Initialize theme on page load
initializeTheme();
