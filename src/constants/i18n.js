import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

const i18n = new I18n({
  "en-US": {
    header: "Millions of songs. Free on Spotify.",
    signUp: "Sign up free",
    continueWithPhone: "Continue with phone number",
    continueWithGoogle: "Continue with Google",
    continueWithFacebook: "Continue with Facebook",
    logIn: "Log in",
    createAccount: "Create account",
    whatEmail: "What's your email?",
    confirmEmail: "You'll need to confirm this email later.",
    next: "Next",
    createPassword: "Create a password",
    useAtLeast: "Use at least 10 characters.",
    submit: "Submit",
    EmailOrUser: "Email or username",
    Password: "Password",
    Home: "Home",
    Search: "Search",
    YourLibrary: "Your Library",
    ArtistYouFollow: "Artists Your Follow",
    RecommendedWorks: "Recommended Works",
    YourPlaylists: "Your Playlists",
  },
});

i18n.locale = getLocales()[0].languageTag;
export default i18n;