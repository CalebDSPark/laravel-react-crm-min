import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  name: {
    marginTop: theme.spacing(1)
  },
  avatar: {
    height: 100,
    width: 100
  }
}));

function ProfileDetails({ user, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          textAlign="center"
        >
          <Avatar
            className={classes.avatar}            
          />
          <Typography
            className={classes.name}
            gutterBottom
            variant="h3"
            color="textPrimary"
          >
            {user && `${user.first_name} ${user.last_name}`}            
          </Typography>        
        </Box>
      </CardContent>      
    </Card>
  );
}

ProfileDetails.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default ProfileDetails;
