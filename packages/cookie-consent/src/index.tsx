sasdiasjdis;
import {
  Button,
  Card,
  Link,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

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
  },
}));

interface CookieProps {
  segmentKey: string;
}

function Cookie({ segmentKey }: CookieProps): JSX.Element {
  const [manageCookies, setManageCookies] = useState<boolean>(false);
  const [showCookieConsent, setShowCookiesConsent] = useState<boolean>(true);
  const classes = useStyles();
  useEffect(() => {
    console.log("key: ", segmentKey);
  });
  return (
    <>
      {showCookieConsent && !manageCookies ? (
        <Card className={classes.cookieConsentCard}>
          <div className={classes.cookieConsentTextContent}>
            <Typography>
              We use cookies to collect data to improve your user experience. By
              using our website, you&apos;re agreeing to our{" "}
              <Link className={classes.link}>cookies policy</Link>. You can
              change your{" "}
              <Link
                onClick={() => setManageCookies(true)}
                className={classes.link}
              >
                preferences
              </Link>{" "}
              at any time.
            </Typography>
          </div>
        </Card>
      ) : (
        <Card hidden={!manageCookies} className={classes.cookieConsentCard}>
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
              onClick={() => setShowCookiesConsent(false)}
            >
              Decline
            </Button>
            <Button
              size="medium"
              variant="contained"
              className={classes.button}
              onClick={() => setShowCookiesConsent(false)}
            >
              Accept
            </Button>
          </div>
        </Card>
      )}
    </>
  );
}

export default Cookie;
