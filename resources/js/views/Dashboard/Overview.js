import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    Card,
    Grid,
    Typography,
    makeStyles
} from '@material-ui/core';
import Label from '../../components/Label';

const useStyles = makeStyles((theme) => ({
    root: {},
    item: {
    padding: theme.spacing(3),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
        '&:not(:last-of-type)': {
        borderRight: `1px solid ${theme.palette.divider}`
        }
    },
    [theme.breakpoints.down('sm')]: {
        '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.divider}`
        }
    }
    },
    valueContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
    },
    label: {
    marginLeft: theme.spacing(1)
    }
}));

function moneyFormat(val) {
    return val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function Overview({ className, invoices, ...rest }) {
    const classes = useStyles();  

    let total_paid_price = 0; 
    let total_paid_gst = 0; 
    let total_paid_pst = 0; 
    let total_unpaid_price = 0; 
    let total_unpaid_gst = 0; 
    let total_unpaid_pst = 0; 
    let active_subscription = 0; 
    for(const val of invoices) {        
        if(val.status === 0) { // unpaid
            active_subscription ++; 
            total_unpaid_price = total_unpaid_price + val.price;
            total_unpaid_gst = total_unpaid_gst+ val.gst;
            total_unpaid_pst = total_unpaid_pst + val.pst;
        } else if(val.status === 1) { // paid
            active_subscription ++; 
            total_paid_price = total_paid_price + val.price;
            total_paid_gst = total_paid_gst+ val.gst;
            total_paid_pst = total_paid_pst + val.pst;
        }
    }    
    return (
    <Card
        className={clsx(classes.root, className)}
        {...rest}
    >
        <Grid alignItems="center" container justify="space-between">
            <Grid className={classes.item} item
                md={3} sm={6} xs={12} 
            >
                <Typography component="h2" gutterBottom
                    variant="overline" color="textSecondary"
                >
                Total Paid Income
                </Typography>
                <div className={classes.valueContainer}>
                <Typography variant="h3" color="textPrimary" >
                    ${moneyFormat(total_paid_price)}
                </Typography>
                <Label className={classes.label} color="success" >
                    +20%
                </Label>
                </div>
            </Grid>
            <Grid className={classes.item} item
                md={3} sm={6} xs={12}
            >
                <Typography component="h2" gutterBottom
                    variant="overline" color="textSecondary"
                >
                Total Paid Tax (GST+PST)
                </Typography>
                <div className={classes.valueContainer}>
                <Typography variant="h3" color="textPrimary" >
                    ${moneyFormat(total_paid_gst + total_paid_pst)}
                </Typography>
                <Label className={classes.label} color="success" >
                    +12%
                </Label>
                </div>
            </Grid>
            <Grid className={classes.item} item
                md={3} sm={6} xs={12}
            >
                <Typography component="h2" gutterBottom
                    variant="overline" color="textSecondary"
                >
                Total Unpaid (+Tax)
                </Typography>
                <div className={classes.valueContainer}>
                <Typography variant="h3" color="textPrimary" >
                    ${moneyFormat(total_unpaid_price + total_unpaid_gst + total_unpaid_pst)}                
                </Typography>
                <Label className={classes.label} color="error" >
                    -15%
                </Label>
                </div>
            </Grid>
            <Grid className={classes.item} item
                md={3} sm={6} xs={12}
            >
                <Typography component="h2" gutterBottom
                    variant="overline" color="textSecondary"
                >
                Active Subscriptions
                </Typography>
                <div className={classes.valueContainer}>
                <Typography variant="h3" color="textPrimary" >
                    {active_subscription}
                </Typography>
                </div>
            </Grid>
        </Grid>
    </Card>
    );
}

Overview.propTypes = {
    className: PropTypes.string
};

export default Overview;
