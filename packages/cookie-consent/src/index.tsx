import {
  Button,
  Card,
  IconButton,
  Link,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { SessionStorage } from "./sessionStorage";

declare global {
  interface Window {
    analytics: SegmentAnalytics.AnalyticsJS;
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(2),
  },
  lineSkip: {
    paddingTop: theme.spacing(1),
  },
  cookieConsentTextContent: {
    margin: theme.spacing(2),
    marginLeft: 88,
  },
  buttons: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  link: {
    color: "#5E6FDB",
    textDecoration: "none",
  },
  cookieConsentCard: {
    position: "relative",
    zIndex: 10020,
    overflow: "visible",
    border: "black",
    borderStyle: "solid",
    borderWidth: 2,
    maxWidth: "47em",
    minHeight: 80,
    margin: "0 auto",
  },
  cookieWrapper: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: theme.spacing(4),
  },
  exitButton: {
    position: "absolute",
    top: -8,
    right: -8,
  },
  cookieIcon: {
    position: "absolute",
    top: 11,
    left: 11,
  },
}));

let loadedAnalytics = false;

interface CookieProps {
  segmentKey: string;
  show: boolean;
  changeConsent: boolean;
  customCookiePolicyLinkComponent?: JSX.Element;
  onAnalyticsReady?: (analytics: SegmentAnalytics.AnalyticsJS) => void;
}

export function CookieConsent({
  segmentKey,
  show,
  changeConsent,
  customCookiePolicyLinkComponent,
  onAnalyticsReady,
}: CookieProps): JSX.Element {
  const classes = useStyles();
  const [isUserConsent, setUserConsent] = useState<boolean | null>(null);
  const [isPageLoaded, setPageLoaded] = useState<boolean>(false);
  const [isUserSignedIn] = useState<boolean>(
    Cookies.get("ToitUserID") ? true : false
  );
  const [manageCookies, setManageCookies] = useState<boolean>(false);
  const [
    userPreferenceShowCookieConsent,
    setUserPreferenceShowCookieConsent,
  ] = useState<boolean>(
    Cookies.get("toit-cookies") === "true" ||
      SessionStorage.getItem("disallow-cookies") === "true"
      ? false
      : true
  );

  const handleAcceptCookieUI = () => {
    Cookies.set("toit-cookies", "true", {
      path: "/",
      expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    });
    setUserConsent(true);
    setUserPreferenceShowCookieConsent(false);
    SessionStorage.removeItem("disallow-cookies");
    window.location.reload();
  };

  const handleAcceptCookie = () => {
    if ("analytics" in window && !loadedAnalytics) {
      // Setup segment
      loadedAnalytics = true;
      let segmentAPIKey = segmentKey;

      // Check if the meta segment-key is set.
      const segmentKeyDOM = document.querySelector('meta[name="segment-key"]');
      if (segmentKeyDOM) {
        segmentAPIKey = segmentKeyDOM.getAttribute("content") || segmentAPIKey;
      }

      if (analytics.load && segmentAPIKey) {
        analytics.load(segmentAPIKey);
      }

      analytics.ready(() => {
        const userID = Cookies.get("ToitUserID");
        if (userID) {
          analytics.identify("user/" + userID, {
            entity_type: "user",
          });
        }
        if (onAnalyticsReady !== undefined) {
          onAnalyticsReady(analytics);
        }
      });
    }
  };

  const cookieIcon = (
    <svg
      width="58"
      height="54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes.cookieIcon}
    >
      <path
        d="M35.385 3.094l-2.547-2.092a33.68 33.68 0 00-1 2.456c-.365 1.019.393 2.243.818 2.729v.636c-.273.516-.782 1.765-.637 2.638.146.873 1.94 3.275 3.82 3.547l4.093 1.729.455-.819c-.364-.546 1.092-2.82-1.273-3.365-2.062-.476-2.638-3.457-3.275-4.366-.509-.728-.515-2.365-.454-3.093z"
        fill="#996139"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.874 6.347c-1.508-1.445-1.094-3.164 0-5.347-.143 0-1.017.19-2.002.406-1.272.278-2.73.596-3.037.596-2.941.121-9.988 1.619-14.645 6.64C7.37 14.918 1.093 22.74 1.002 29.38.91 36.02 4.185 41.296 7.096 44.116l.514.501c2.385 2.339 5.884 5.768 11.186 6.393 2.42 1.134 7.476 1.932 10.131 1.383 7.913-1.638 11.916-4.275 13.28-5.367.474-.38 1.278-1.044 2.159-1.773 1.654-1.369 3.583-2.964 4.117-3.32.428-.286 1.378-1.515 2.395-2.832.928-1.202 1.913-2.477 2.608-3.172 1.164-1.164 2.122-5.579 2.456-7.64.182-.698.436-2.693 0-5.094-.434-2.389-1.445-4.075-1.903-4.63l.054-.237h-.98c-3.044.622-4.339-1.1-5.01-1.994a4.6 4.6 0 00-.297-.37c-.44-.03-.83-.052-1.18-.072-2.317-.131-2.843-.161-3.791-1.267-.334-1.031-3.904-2.017-4.631-1.435-.525.42-2.777-1.215-4.2-2.248-.548-.398-.974-.707-1.13-.774-1.545-.654-.81-2.14-.29-3.191.117-.237.223-.451.29-.63z"
        fill="#FFB681"
      />
      <path
        d="M32.874 1l.447.224A.5.5 0 0032.874.5V1zm0 5.347l.468.176a.5.5 0 00-.122-.537l-.346.361zm-2.002-4.941l-.106-.489.106.489zm-3.037.596v-.5h-.021l.02.5zM13.19 8.642l.367.34-.367-.34zM1.002 29.38l.5.006-.5-.006zm6.094 14.735l-.348.359.348-.36zm.514.501l.35-.357-.35.357zm11.186 6.393l.212-.453a.498.498 0 00-.153-.043l-.06.496zm10.131 1.383l.101.49-.101-.49zm13.28-5.367l-.312-.39.312.39zm2.159-1.773l.319.385-.32-.385zm4.117-3.32l.278.416-.278-.416zm2.395-2.832l-.396-.305.396.305zm5.064-10.812l-.484-.127a.523.523 0 00-.01.047l.494.08zm0-5.094l-.492.09.492-.09zm-1.903-4.63l-.488-.112a.5.5 0 00.102.43l.386-.318zm.054-.237l.487.112a.5.5 0 00-.487-.612v.5zm-.98 0v-.5a.5.5 0 00-.1.01l.1.49zm-5.01-1.994l-.4.3.4-.3zm-.297-.37l.363-.345a.5.5 0 00-.33-.155l-.033.5zm-1.18-.072l.028-.499-.029.5zm-3.791-1.267l-.476.153c.02.063.053.122.096.172l.38-.325zm-4.631-1.435l-.313-.39.313.39zm-4.2-2.248l.294-.404-.294.404zm-1.13-.774l.198-.46h-.003l-.195.46zm-.29-3.191l.448.221-.448-.221zm-.157-6.2c-.552 1.101-.97 2.154-1.028 3.144-.06 1.03.269 1.963 1.129 2.787l.692-.722c-.648-.62-.866-1.269-.822-2.006.045-.776.381-1.675.923-2.756l-.894-.448zm-1.448 1.117c.494-.107.955-.208 1.312-.282.178-.037.327-.067.438-.087.132-.024.164-.025.145-.025v-1c-.09 0-.221.023-.324.041-.123.023-.281.054-.463.092-.362.075-.83.177-1.321.284l.213.977zm-3.144.608c.126 0 .318-.028.51-.061.207-.036.463-.085.746-.143.566-.115 1.253-.265 1.888-.404l-.213-.977c-.637.14-1.316.288-1.874.401-.28.057-.524.104-.716.137a6.084 6.084 0 01-.313.045l-.028.002v1zm-14.278 6.48c4.534-4.889 11.432-6.362 14.298-6.48l-.041-1c-3.015.125-10.21 1.647-14.99 6.8l.733.68zM1.502 29.387c.043-3.178 1.574-6.697 3.865-10.24 2.285-3.534 5.286-7.034 8.19-10.165l-.733-.68c-2.917 3.145-5.965 6.695-8.297 10.301C2.202 22.2.55 25.912.502 29.373l1 .014zm5.942 14.37c-2.836-2.748-6.03-7.898-5.942-14.37l-1-.013c-.093 6.808 3.26 12.209 6.246 15.1l.696-.717zm.516.503l-.516-.503-.696.718.512.5.7-.715zm10.895 6.254c-5.114-.604-8.502-3.908-10.895-6.254l-.7.715c2.378 2.33 5.987 5.884 11.477 6.532l.118-.993zm-.271.949c1.272.596 3.195 1.089 5.118 1.365 1.92.275 3.914.346 5.326.054l-.202-.979c-1.244.257-3.104.204-4.982-.065-1.873-.27-3.688-.743-4.836-1.28l-.424.905zm10.444 1.42c7.987-1.653 12.063-4.323 13.491-5.466l-.624-.781c-1.3 1.04-5.23 3.645-13.07 5.267l.203.98zm13.491-5.466c.479-.383 1.286-1.051 2.166-1.779l-.638-.77a213.21 213.21 0 01-2.152 1.768l.624.78zm2.166-1.779c1.672-1.384 3.57-2.952 4.075-3.29l-.554-.832c-.563.375-2.522 1.998-4.159 3.352l.638.77zm4.075-3.29c.158-.105.33-.271.5-.451.175-.187.373-.418.586-.676.424-.514.92-1.158 1.427-1.814l-.791-.611c-.51.66-.996 1.29-1.408 1.79-.206.25-.39.462-.544.627a2.3 2.3 0 01-.324.303l.554.833zm2.513-2.941c.939-1.215 1.9-2.458 2.566-3.124l-.707-.707c-.723.723-1.731 2.03-2.65 3.22l.791.61zm2.566-3.124c.363-.362.671-.93.935-1.553.27-.637.516-1.384.732-2.148.434-1.53.76-3.168.93-4.213l-.988-.16a39.109 39.109 0 01-.904 4.1c-.21.743-.443 1.446-.69 2.03-.254.597-.502 1.017-.722 1.237l.707.707zm2.587-7.868c.2-.769.457-2.838.008-5.31l-.984.18c.424 2.33.171 4.252.008 4.878l.968.252zm.008-5.31c-.45-2.47-1.496-4.236-2.01-4.858l-.77.636c.402.488 1.377 2.095 1.796 4.402l.984-.18zm-2.828-4.888l-.055.236.975.224.054-.237-.974-.223zm-.493.611h.98v-1h-.98v1zm-5.41-2.194c.335.446.878 1.175 1.761 1.696.9.53 2.113.822 3.75.488l-.2-.98c-1.409.288-2.367.029-3.042-.37-.694-.408-1.133-.987-1.47-1.435l-.8.601zm-.26-.326c.06.063.137.164.26.326l.799-.6c-.108-.144-.224-.3-.333-.415l-.725.689zm-.846.084c.35.02.74.042 1.177.07l.065-.998c-.442-.028-.835-.05-1.185-.07l-.057.998zm-4.142-1.442c.509.594.953.953 1.618 1.153.61.183 1.394.224 2.524.289l.056-.999c-1.185-.067-1.823-.107-2.292-.248-.415-.125-.707-.333-1.147-.846l-.759.651zm-3.939-1.37c-.006.005.031-.024.16-.044.121-.02.283-.025.481-.013a6.42 6.42 0 011.369.259c.485.143.946.331 1.296.534.174.101.31.2.403.29a.495.495 0 01.134.172l.951-.307a1.45 1.45 0 00-.396-.59 3.178 3.178 0 00-.59-.43 7.11 7.11 0 00-1.515-.628 7.407 7.407 0 00-1.591-.299 3.264 3.264 0 00-.699.024c-.206.033-.44.101-.627.251l.624.781zm-4.806-2.233c.707.513 1.644 1.194 2.473 1.693.412.247.82.465 1.174.592.176.063.364.113.546.123a.886.886 0 00.613-.175l-.624-.78c.068-.056.118-.04.067-.043a1.03 1.03 0 01-.264-.066c-.26-.094-.602-.27-.996-.508-.785-.472-1.685-1.126-2.401-1.645l-.588.809zm-1.034-.72l.022.012c.019.01.043.025.074.044.061.04.14.092.234.158.19.132.429.306.704.506l.588-.81a49.83 49.83 0 00-.72-.516 3.504 3.504 0 00-.506-.312l-.396.918zm-.54-3.872c-.249.503-.613 1.225-.679 1.92-.034.362.008.752.212 1.113.206.363.546.644 1.01.84l.39-.92c-.309-.131-.456-.282-.53-.413-.076-.134-.108-.304-.086-.526.045-.475.308-1.022.58-1.57l-.897-.444zm.27-.583c-.056.15-.15.339-.27.583l.896.443c.113-.228.233-.468.31-.675l-.936-.351z"
        fill="#000"
      />
      <path
        d="M55.512 23.12c-.436-2.4-1.48-4.092-1.935-4.638l-1.5.5c.084 1.114-1.099 5.644-2 8-1.438 2.682-1.97 3.439-2.5 4.5-1 2-6.5 7.5-7.5 8.5s-8.08 5.5-11.58 8c-2.8 2-6.253 2.282-8.42 3 2.133.371 4 1.5 8 1 8.019-1.002 12.636-4.409 14-5.5 1.364-1.092 5.181-4.454 6-5 .819-.546 3.545-4.545 5-6 1.164-1.164 2.102-5.206 2.435-7.267.182-.698.437-2.693 0-5.094z"
        fill="#D79667"
      />
      <path
        d="M4.264 21.335c-.36-.617.156-2.12.562-2.663.487-.45 1.13-.9 1.814-.874.133.005.295-.075.416-.136.15-.076.347-.047.509-.09.217-.06.493-.119.712-.086.242.037.587-.127.819.034.154.106.484.445.54.615.083.248.14.52.06.773-.053.171.005.497-.111.63-.081.094-.05.27-.103.356-.088.144-.293.27-.43.35-.53.314-1.013.708-1.538 1.03-.329.2-.837.595-1.236.602-.283.005-.54.164-.824.071-.48-.157-.904-.123-1.19-.612zM7.269 38.332c-.144-.435-.002-.983-.05-1.457l1.677-1.448c.46-.426 1.285-.636 1.892-.77.341-.076.709-.304 1.01-.277.258.024.537.075.804.163.581.19 1.11 1.03 1.223 1.601.168.849-.422 1.415-.994 1.984-.542.539-1.074 1.098-1.644 1.626-.302.28-.82.454-1.174.649-.198.108-.738.42-.973.346-.612-.192-.977-1.1-1.327-1.545-.158-.2-.363-.627-.444-.872zM22.225 22.547c-1.757-1.066-1.147-3.094.117-4.265.386-.327 1.263-.956 1.69-.855.671.253 1.579-.306 2.207-.488.64-.187 1.954-.57 2.46-.024.461.499.574 1.601.38 2.219-.263.837-.782 1.304-1.527 1.945-.245.212-.598.277-.866.458-.248.168-.42.442-.672.603-.258.164-.988.655-1.268.652-.703-.007-1.884.141-2.521-.245zM14.699 10.003c-.199-.812.102-1.03.332-1.79l1.162-1.556c.407-.377 1.387-.83 1.921-.876.648-.056 1.138.185 1.743.208.657.025 1.304.487 1.539 1.174.07.206.275.357.285.577.008.16.018.342.07.496.115.337-.071.539-.211.865-.186.433-.86.548-1.18.844-.196.181-.48.228-.702.377-.212.143-.353.404-.608.478-.919.268-1.711.54-2.66.23-.826-.27-1.449-.037-1.691-1.027zM28.518 11.351c-.36-.388-.785-.894-.913-1.415-.203-.623-.24-2.177 1.245-3.414.226-.21.333-.497.565-.712.194-.18.416-.309.605-.466.264-.218.575-.29.919-.286.264.003.77-.205.999.017.157.151.43.38.516.58.126.297.125.748.165 1.071.105.849-.254 1.91-.889 2.498l-.913.846c-.177.164-.44.521-.67.6-.494.168-1.077 1.277-1.629.681z"
        fill="#000"
      />
      <path
        d="M44.53 7.493c-.476.056-1.076.098-1.526-.087-.566-.184-1.726-.988-1.84-2.74-.033-.278-.186-.51-.22-.795-.028-.238-.005-.47-.018-.693-.02-.31.095-.577.281-.827.144-.193.262-.675.547-.724.195-.034.509-.114.701-.069.286.067.617.308.875.452.679.377 1.266 1.208 1.358 1.988l.132 1.122c.026.219.147.603.082.812-.141.454.361 1.475-.371 1.56z"
        fill="#996139"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M51.956 11.632c-.75-.224-1.677-.549-2.233-1.117-.729-.641.519-.845 1.48-3.543.13-.438-1.137-1.856-1.003-2.306.112-.374.297-.707.42-1.05.172-.478.517-.804.958-1.058.34-.196.827-.842 1.287-.732.314.075.836.159 1.096.35.386.284 1.8 1.447 2.095 1.829.774 1.004.041 2.043-.326 3.273l-.527 1.767c-.102.344-.17.998-.402 1.27-.504.589-1.69 1.661-2.845 1.317z"
        fill="#FFB681"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42.629 22.07c.086-.316.73-.836.958-1.047l1.136-.624c.552-.25 1.073-.212 1.647-.24.596-.028.94-.09 1.379.384.317.343.842.777.424 1.268-.187.218-.241.544-.474.76-.21.195-.706.54-.967.627-.267.09-.505.336-.774.45-.458.192-.852.515-1.304.725-.54.252-1.204.32-1.623-.133-.165-.178-.537-.446-.542-.7-.004-.22-.283-.606-.157-.813.08-.133.252-.49.297-.656zM24.324 33.781c.393-.795 1.04-1.315 1.678-1.906l1.533-.45c.195.095 1.706.003 1.892.108.198.11.311.04.5.137.34.175.623.232.982.463.29.186.774.704 1.025.975.37.399.778.795 1.01 1.257.795 1.59-.042 1.82-1.155 1.926-.304.03-.512.254-.765.366-.2.088-.582.05-.737.168-.261.2-.485.449-.725.672-.283.262-.787.239-1.143.382-.339.136-.936.408-1.44.218-.319-.12-.661-.062-.928-.35-.277-.3-.96-.893-1.046-1.214-.113-.417-.558-.984-.553-1.374.006-.377-.27-1.089-.128-1.378zM20.525 48.62c.409-.378.845-.717 1.257-1.098l.844-.584c.116-.107.475-.262.626-.265.15-.002.308-.18.458-.145.12.026.327-.044.448-.07.254-.056.508.107.74.142.161.024.603.53.656.688.078.236.079.45.132.677.078.338-.177.72-.212 1.045-.021.204-.326.537-.474.674-.113.105-.253.328-.324.465-.077.147-.245.26-.366.372a3.183 3.183 0 01-1.014.645c-.285.109-.737.273-1.048.26-.259-.01-.588-.037-.843-.127-.315-.111-.465-.272-.69-.515-.345-.373-.665-.922-.58-1.444.056-.335.14-.488.39-.72zM44.187 39.088c-1.274-.773-.831-2.244.086-3.093.279-.238.915-.694 1.225-.621.487.183 1.145-.221 1.6-.354.465-.135 1.418-.413 1.785-.017.335.362.417 1.161.276 1.61-.191.607-.567.945-1.107 1.41-.178.154-.434.201-.629.332-.18.122-.304.321-.488.438-.186.119-.716.475-.919.473-.51-.005-1.367.102-1.829-.178z"
        fill="#000"
      />
    </svg>
  );

  const handleDeclineCookie = () => {
    if (Cookies.get("toit-cookies")) {
      Cookies.remove("toit-cookies", { path: "/" });
    }
    setUserConsent(false);
    setUserPreferenceShowCookieConsent(false);
  };

  const handleDeclineCookieUI = () => {
    SessionStorage.setItem("disallow-cookies", "true");
    handleDeclineCookie();
    window.location.reload();
  };

  const handleCookies = () => {
    if (SessionStorage.getItem("disallow-cookies") === "true") {
      handleDeclineCookie();
    } else {
      handleAcceptCookie();
    }
  };

  useEffect(() => {
    handleCookies();

    // Check if user has explicitly chosen to opt in or out
    if (isUserConsent) {
      handleAcceptCookieUI();
    } else if (isUserConsent === false) {
      handleDeclineCookie();
    }
    setPageLoaded(true);
  }, [isUserConsent, show, changeConsent]);
  if (
    show &&
    ((isPageLoaded && userPreferenceShowCookieConsent && !isUserSignedIn) ||
      changeConsent)
  ) {
    if (manageCookies) {
      return (
        <div className={classes.cookieWrapper}>
          <Card className={classes.cookieConsentCard}>
            <IconButton
              className={classes.exitButton}
              onClick={() => handleAcceptCookieUI()}
            >
              <FiX />
            </IconButton>
            <div className={classes.cookieConsentTextContent}>
              {cookieIcon}
              <Typography variant="h3">Change your cookie setting</Typography>
              <Typography>
                We use cookies to register the traffic on our website. The main
                purpose is to improve our website performance and your
                experience of our website.{" "}
              </Typography>

              <Typography className={classes.lineSkip}>
                Feel free to change it any time, by pressing either decline or
                accept below.
              </Typography>
            </div>
            <div className={classes.buttons}>
              <Button
                size="medium"
                variant="contained"
                className={classes.button}
                onClick={() => handleDeclineCookieUI()}
              >
                Decline
              </Button>
              <Button
                size="medium"
                variant="contained"
                className={classes.button}
                onClick={() => handleAcceptCookieUI()}
              >
                Accept
              </Button>
            </div>
          </Card>
        </div>
      );
    } else {
      return (
        <div className={classes.cookieWrapper}>
          <Card className={classes.cookieConsentCard}>
            <IconButton
              className={classes.exitButton}
              onClick={() => handleAcceptCookieUI()}
            >
              <FiX />
            </IconButton>
            <div className={classes.cookieConsentTextContent}>
              {cookieIcon}
              <Typography>
                We use cookies to collect data to improve your user experience.
                By using our website, you&apos;re agreeing to our{" "}
                {customCookiePolicyLinkComponent ? (
                  customCookiePolicyLinkComponent
                ) : (
                  <Link
                    href="https://toit.io/cookies-policy"
                    target="_blank"
                    rel="noopener"
                    className={classes.link}
                  >
                    cookie policy
                  </Link>
                )}
                . You can change your{" "}
                <Link
                  href="javascript:undefined;"
                  onClick={() => setManageCookies(true)}
                  className={classes.link}
                >
                  preferences
                </Link>{" "}
                at any time.
              </Typography>
            </div>
          </Card>
        </div>
      );
    }
  }
  return <></>;
}

export default CookieConsent;
