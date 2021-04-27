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

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(2),
  },
  lineSkip: {
    paddingTop: theme.spacing(1),
  },
  cookieConsentTextContent: {
    margin: theme.spacing(2),
  },
  buttons: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: "none",
  },
  cookieConsentCard: {
    position: "fixed",
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: 10020,
    width: "calc(100% - 32px)",
    overflow: "visible",
  },
  exitButton: {
    position: "absolute",
    top: -10,
    right: -10,
  },
}));

let loadedAnalytics = false;

interface CookieProps {
  segmentKey: string;
  show: boolean;
  changeConsent: boolean;
  customCookiePolicyLinkComponent?: JSX.Element;
}

export function CookieConsent({
  segmentKey,
  show,
  changeConsent,
  customCookiePolicyLinkComponent,
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
        <Card className={classes.cookieConsentCard}>
          <IconButton
            className={classes.exitButton}
            onClick={() => handleAcceptCookieUI()}
          >
            <FiX />
          </IconButton>
          <div className={classes.cookieConsentTextContent}>
            <Typography variant="h3">Change your cookie setting</Typography>
            <Typography>
              We use cookies to register the traffic on our website. The main
              purpose is to improve our website performance and your experience
              of our website.{" "}
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
      );
    } else {
      return (
        <Card className={classes.cookieConsentCard}>
          <IconButton
            className={classes.exitButton}
            onClick={() => handleAcceptCookieUI()}
          >
            <FiX />
          </IconButton>
          <div className={classes.cookieConsentTextContent}>
            <Typography>
              We use cookies to collect data to improve your user experience. By
              using our website, you&apos;re agreeing to our{" "}
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
      );
    }
  }
  return <></>;
}

export default CookieConsent;
