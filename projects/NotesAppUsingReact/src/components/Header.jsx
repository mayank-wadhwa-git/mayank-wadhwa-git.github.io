import React from "react";
import NoteIcon from '@material-ui/icons/Note';

function Header() {
  return (
    <header>
      <h1>
        <NoteIcon fontSize="large"></NoteIcon>
        Notes
      </h1>
    </header>
  );
}

export default Header;
