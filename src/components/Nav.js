import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ libraryStatus, handleDrawer }) => (
  <nav>
    <h1>Lofiツ</h1>
    <button
      className={libraryStatus ? "library-active" : ""}
      onClick={handleDrawer}
    >
      <span>Library</span>
      <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
    </button>
  </nav>
);

export default Nav;
