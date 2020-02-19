import React, { memo } from 'react';
import {
  IconButton,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import moment from 'moment';
import { Link } from 'react-router-dom';

function UserItem({ user }){
  return (
    <ListItem key={user.id} button component={Link} to={`/usuarios/${user.id}`}>
      <ListItemText
        primary={user.name}
        secondary={user.updatedAt && `Updated ${moment(user.updatedAt).fromNow()}`}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={() => this.deleteUser(user)} color="inherit">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default memo(UserItem);