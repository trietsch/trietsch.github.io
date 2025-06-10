/**
 * Theming.
 *
 * Supports the preferred color scheme of the operating system as well as
 * the theme choice of the user.
 *
 */
const themeToggle = document.querySelector(".theme-toggle");
const chosenTheme = window.localStorage && window.localStorage.getItem("theme");
const chosenThemeIsDark = chosenTheme == "dark";
const chosenThemeIsLight = chosenTheme == "light";
const templateSrc = document.getElementById("logo").attributes["template-src"].value

// Detect the color scheme the operating system prefers.
function detectOSColorTheme() {
    let osPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    let osPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    let previousOsPreference = localStorage.getItem("osTheme");
    let currentOsPreference = osPrefersDark ? "dark" : "light";

    if (localStorage.getItem("theme") !== null && previousOsPreference === currentOsPreference) {
        setTheme(localStorage.getItem("theme"));
        return;
    }


    if (osPrefersDark) {
        localStorage.removeItem("theme");
        localStorage.setItem("osTheme", "dark");
        setTheme("dark");
    } else if (osPrefersLight) {
        localStorage.removeItem("theme");
        localStorage.setItem("osTheme", "light");
        setTheme("light");
    }
}

function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.getElementById("logo").src = templateSrc.replace("$theme", theme);
}

function toggleTheme(e) {
    if (chosenThemeIsDark) {
        localStorage.setItem("theme", "light");
    } else if (chosenThemeIsLight) {
        localStorage.setItem("theme", "dark");
    } else {
        if (document.documentElement.getAttribute("data-theme") == "dark") {
            localStorage.setItem("theme", "light");
        } else {
            localStorage.setItem("theme", "dark");
        }
    }

    setTheme(localStorage.getItem("theme"));

    window.location.reload();
}

// Event listener
if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme, false);
    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => e.matches && detectOSColorTheme());
    window
        .matchMedia("(prefers-color-scheme: light)")
        .addEventListener("change", (e) => e.matches && detectOSColorTheme());

    detectOSColorTheme();
} else {
    localStorage.removeItem("theme");
}
