import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    Breadcrumbs,
    Button,
    Grid,
    Link,
    SvgIcon,
    Typography,
    makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles(() => ({
root: {}
}));

function Header({ className, ...rest }) {
const classes = useStyles();

return (
   <Grid container spacing={3} justify="space-between"
    className={clsx(classes.root, className)}
    {...rest}
    >
        <Grid item>
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
        >
        <Link variant="body1" color="inherit"
            to="/dash" component={RouterLink} >
            Dashboard
        </Link>        
        <Link variant="body1" color="inherit"
            to="/customers" component={RouterLink} >
            Customers
        </Link>        
        <Typography variant="body1" color="textPrimary" >
            New
        </Typography>
        </Breadcrumbs>

        <Typography variant="h3" color="textPrimary" >            
            Create Customer
        </Typography>
        </Grid>
        <Grid item>
        <Button color="secondary" variant="contained" style={{ color: '#FFF'}}
            component={RouterLink} to={'/customers/'}
        >            
            <SvgIcon fontSize="small" className={classes.actionIcon} >
                <ArrowForwardIosIcon />
            </SvgIcon>            
            Back
        </Button>
        </Grid>
    </Grid>    
    );
}

Header.propTypes = {
    className: PropTypes.string
};

export default Header;
