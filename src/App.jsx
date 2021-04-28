import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AdminPage from "./components/AdminPage";
import RankListsPage from "./components/RankListsPage";
import UploadPage from "./components/UploadPage";
import { auth } from "./utils/firebase";
import { useEffect } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";

const admins = ["luisrdevy480@gmail.com", "soyoscarrh@gmail.com", "marckessfm@gmail.com"];
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
}));
const App = () => {
  const classes = useStyles();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!user) return;
    if (!admins.includes(user.email)) auth.signOut();
  }, [user]);
  return (
    <div>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <Link className={classes.link} to="/">
                Seguimiento
              </Link>
            </Typography>
            <Button color="inherit">
              <Link className={classes.link} to="/ranking">
                Ranking
              </Link>
            </Button>
            <Button color="inherit">
              <Link className={classes.link} to="/upload">
                Upload
              </Link>
            </Button>
            <Button color="inherit">
              <Link className={classes.link} to="/admin">
                Admin
              </Link>
            </Button>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path="/">
            <h1>Home</h1>
          </Route>
          <Route path="/ranking">
            <RankListsPage />
          </Route>
          <Route path="/admin">
            <AdminPage user={user} />
          </Route>
          <Route path="/upload">
            <UploadPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
