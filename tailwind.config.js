import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "",
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                primary: ["Space Mono", ...defaultTheme.fontFamily.mono],
                secondary: ["Muli", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    light: "##f5f4ee",
                    DEFAULT: "#eeece2",
                },
                secondary: {
                    light: "gray-100",
                    DEFAULT: "gray-100",
                    dark: "#FFD700",
                },
            },
        },
    },

    plugins: [forms],
};
