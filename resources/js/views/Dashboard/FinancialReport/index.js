import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Card,
    CardHeader,
    Divider,
    makeStyles
} from '@material-ui/core';
import GenericMoreButton from '../../../components/GenericMoreButton';
import Chart from './Chart';

const useStyles = makeStyles(() => ({
    root: {},
    chart: {
    height: 400
    }
}));

function FinancialReport({ className, invoices, ...rest }) {
    const classes = useStyles();
    
    let labels = [];
    for(const val of invoices) {      
        if(!labels.includes(val.customer)) {
            labels.push(val.customer);    
        }        
    }    

    let prices = [];
    let taxes = []; 
    for(const label of labels) {
        let price = 0; 
        let tax = 0; 
        for(const val of invoices) {      
            if(val.customer === label) {
                price = price + val.price; 
                tax = tax + val.gst + val.pst;
            }
        } 
        prices.push(price.toFixed(2));
        taxes.push(tax.toFixed(2));
    }    
    const data = {
        thisYear: prices, 
        lastYear: taxes
    }

    console.log(invoices);
    console.log(labels);
    console.log(prices);
    console.log(taxes);
    
    return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={<GenericMoreButton />}
        title="Financial Stats"
      />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={700}
            pt={4} pr={2} pl={2}
        >
            <Chart className={classes.chart}
                data={data} labels={labels} 
            />
        </Box>
      </PerfectScrollbar>
    </Card>
    );  
}

FinancialReport.propTypes = {
className: PropTypes.string
};

export default FinancialReport;
