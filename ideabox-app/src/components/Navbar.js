import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
// import { mailFolderListItems, otherMailFolderListItems } from "./tileData";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100vw"
  },
  appBar: {
    position: "absolute",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    color: "#00646e",
    // marginLeft: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: "100vw"
    }
  },
  navIconHide: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  navIconShow: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "flex"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

class Navbar extends React.Component {
  state = {
    loggedIn: this.props.loggedIn,
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider style={{ backgroundColor: "#40aaaa" }} />
        <List>
          <Link to="/idea-feed" className={"snavBarLinks margin-left-15"}>
            Idea Feed
          </Link>
        </List>
        <Divider style={{ backgroundColor: "#40aaaa" }} />
        <List>
          <Link to="/my-ideas" className={"snavBarLinks margin-left-15"}>
            My Ideas
          </Link>
        </List>
        <Divider style={{ backgroundColor: "#40aaaa" }} />
        <List>
          <Link className={"snavBarLinks margin-left-15"}>Profile</Link>
        </List>
        <Divider style={{ backgroundColor: "#40aaaa" }} />
        <List>
          <Link className={"snavBarLinks margin-left-15"}>Notifications</Link>
        </List>
        <Divider style={{ backgroundColor: "#40aaaa" }} />
        {/* <List>{otherMailFolderListItems}</List> */}
      </div>
    );

    return (
      <React.Fragment>
        <AppBar
          className={classes.appBar}
          style={{ boxShadow: "none", borderBottom: "2px solid #40aaaa" }}
        >
          <Toolbar className={"spacedBetween"}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconShow}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/">
              <img
                src={`https://res.cloudinary.com/nthnh/image/upload/v1557877811/ideaBox/Logo1_soiz0u.svg`}
                alt="Brand Logo"
                width="173"
              />
            </Link>

            <div className={classes.navIconHide}>
              <div
                className={"flexed-div flexed-col margin-left-15 alignedCenter"}
              >
                <img
                  src={`https://res.cloudinary.com/nthnh/image/upload/v1557750841/ideaBox/baseline-create_new_folder-24px_1_vpiqrs.svg`}
                  alt="Idea Feed"
                />
                <Link to="/idea-feed" className={"snavBarLinks"}>
                  Idea Feed
                </Link>
              </div>
              <div
                className={"flexed-div alignedCenter flexed-col margin-left-15"}
              >
                <img
                  src={`https://res.cloudinary.com/nthnh/image/upload/v1557750841/ideaBox/baseline-create_new_folder-24px_1_vpiqrs.svg`}
                  alt="my ideas"
                />
                <Link to="/my-ideas" className={"snavBarLinks"}>
                  My Ideas
                </Link>
              </div>
              <div
                className={"flexed-div flexed-col margin-left-15 alignedCenter"}
              >
                <img
                  src={`https://res.cloudinary.com/nthnh/image/upload/v1557750841/ideaBox/baseline-create_new_folder-24px_1_vpiqrs.svg`}
                  alt="profile icon"
                />
                <Link to="/user-profile" className={"snavBarLinks"}>
                  Profile
                </Link>
              </div>
              <div
                className={"flexed-div flexed-col margin-left-15 alignedCenter"}
              >
                <img
                  src={`https://res.cloudinary.com/nthnh/image/upload/v1557750841/ideaBox/baseline-create_new_folder-24px_1_vpiqrs.svg`}
                  alt="notification icon"
                />
                <Link className={"snavBarLinks"}>Notifications</Link>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </React.Fragment>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Navbar);

// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { logout } from "../services/auth";

// export default class Navbar extends Component {
//   state = {
//     loggedIn: this.props.loggedIn
//   };

//   componentDidUpdate(prevProps) {
//     if (this.props.loggedIn !== prevProps.loggedIn) {
//       this.setState({ loggedIn: this.props.loggedIn });
//     }
//   }

//   handleLogout = () => {
//     logout().then(() => {
//       this.setState({ loggedIn: null });
//       this.props.setUser(null);
//     });
//   };
//   render() {
//     //const currentChallengeId = this.props.currentChallenge._id
//     return (
//       <div>
//         <div className="navBar">
//           <div className="navBarLogo">
//             <Link to="/">
//               <img
//                 src="https://res.cloudinary.com/dpcx0po55/image/upload/v1557764459/IdeaBox/logo_pwottr.png"
//                 alt=""
//               />
//             </Link>
//           </div>
//           {/* {this.state.loggedIn.role === "manager" && (
//             <Link to="/managerDashboard">Manager Dashboard</Link>
//           )}
//           {this.state.loggedIn.role === "super-manager" && (
//             <React.Fragment>
//               <Link to="/admin">Admin Roles</Link>
//               <Link to="/managerDashboard">Manager Dashboard</Link>
//             </React.Fragment>
//           )} */}
//           <ul className="navBarLinks">
//             <div className="navBarIcons">
//               <img
//                 src="https://res.cloudinary.com/dpcx0po55/image/upload/v1557764443/IdeaBox/lightbulb-new_jkbzyw.png"
//                 alt=""
//               />
//               <li>
//                 <Link to="/idea-feed">Idea Feed</Link>
//               </li>
//             </div>
//             <div className="navBarIcons">
//               <img
//                 src="https://res.cloudinary.com/dpcx0po55/image/upload/v1557765939/IdeaBox/Group_twzivq.png"
//                 alt=""
//               />
//               <li>
//                 <Link to="/my-ideas">My Ideas</Link>
//               </li>
//             </div>
//             <div className="navBarIcons">
//               <img
//                 src="https://res.cloudinary.com/dpcx0po55/image/upload/v1557765939/IdeaBox/ProfileIcon_n7k0lx.png"
//                 alt=""
//               />
//               <li>
//                 <Link to="/">Profile</Link>
//               </li>
//             </div>
//             <div className="navBarIcons">
//               <img
//                 src="https://res.cloudinary.com/dpcx0po55/image/upload/v1557762768/IdeaBox/comment_schndj.png"
//                 alt=""
//               />
//               <li>
//                 <Link to="/">Notification</Link>
//               </li>
//             </div>
//             <div className="navBarIcons">
//               <img src="" alt="" />
//               <li onClick={this.handleLogout}>
//                 <Link to="/">Logout</Link>
//               </li>
//             </div>
//           </ul>
//         </div>
//         ) (
//         <ul>
//           <li>
//             <Link to="/signup">Signup</Link>
//           </li>
//           <li>
//             <Link to="/login">Login</Link>
//           </li>
//         </ul>
//         )}
//       </div>
//     );
//   }
// }
