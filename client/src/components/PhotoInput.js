import React from "react";
import {
  Fab,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

const PhotoInput = ({ value, label, onChange, ...rest }) => (
  <div>
    {Boolean(Array.isArray(value) && value.length) && (
      <div>Imagem selecionada: {value.map(f => f.name).join(", ")}</div>
    )}
    <label>
    <Fab
      color="secondary"
      size="small"
      component="span"
      aria-label="add"
      variant="extended"
    >
      <AddIcon /> Upload photo
    </Fab>
      { label }.
      <input
        {...rest}
        style={{ display: "none" }}
        type="file"
        onChange={onChange}
      />
    </label>
  </div>
);

export default PhotoInput;