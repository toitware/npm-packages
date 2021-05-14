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
