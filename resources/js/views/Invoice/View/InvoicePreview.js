import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  makeStyles
} from '@material-ui/core';
import Logo from '../../../components/Logo';

const useStyles = makeStyles(() => ({
  root: {}
}));

function InvoicePreview({ invoice, className, ...rest }) {
  const classes = useStyles();  

  return (
    <Paper className={clsx(classes.root, className)} {...rest} >
      <PerfectScrollbar>
        <Box minWidth={800} p={6} >
          <Grid container justify="space-between" >
            <Grid item>
              <Logo />
              <Typography variant="h5" color="textPrimary" >
                www.calebpark.com
              </Typography>
            </Grid>
            <Grid item>              
              <Typography align="right" variant="h5" color="textPrimary" >
                Invoice # 1212333
              </Typography>
            </Grid>
          </Grid>
          <Box my={4}>
            <Grid container justify="space-between" >
              <Grid item>
                <Typography variant="body1" color="textPrimary" >
                  555 Buard St
                  {' '}
                  <br />
                  Vancouver, BC, Canada
                  {' '}
                  <br />
                  V37 4G9
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" color="textPrimary" >
                  Company No 11112-347477 
                  {' '}
                  <br />                 
                </Typography>
              </Grid>
              <Grid item>
                <Typography align="right" variant="body1" color="textPrimary" >
                  Email: accounts@calebpark.com
                  {' '}
                  <br />
                  Tel: (+1) 604 455 1457
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box my={4}>
            <Grid container justify="space-between" >
              <Grid item>
                <Typography gutterBottom variant="h5" color="textPrimary" >
                  Due date
                </Typography>
                <Typography variant="body1" color="textPrimary" >
                  {moment('2020-08-30').format('DD MMM YYYY')}
                </Typography>
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="h5" color="textPrimary" >
                  Date of issue
                </Typography>
                <Typography variant="body1" color="textPrimary" >
                  {moment('2020-08-01').format('DD MMM YYYY')}
                </Typography>
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="h5" color="textPrimary" >
                  Reference
                </Typography>
                <Typography variant="body1" color="textPrimary" >
                  11212-454545
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box my={4}>
            <Typography gutterBottom variant="h5" color="textPrimary" >
              Billed to
            </Typography>
            <Typography>
              Samsung
              {' '}
              <br />
              123 Blue mountain, Vancouver
              {' '}
              <br />
              BC, Canada
              {' '}
              <br />              
            </Typography>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Description
                </TableCell>
                <TableCell />
                <TableCell align="right">
                  Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>            
              <TableRow>
                <TableCell />
                <TableCell>
                  Subtotal
                </TableCell>
                <TableCell align="right">                  
                  $100.00
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell />
                <TableCell>
                  GST
                </TableCell>
                <TableCell align="right">                 
                  $5.00
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell />
                <TableCell>
                  PST
                </TableCell>
                <TableCell align="right">                 
                  $7.00
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell />
                <TableCell>
                  Total
                </TableCell>
                <TableCell align="right">                  
                  $112.00
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box mt={2}>
            <Typography
              gutterBottom
              variant="h5"
              color="textPrimary"
            >
              Notes
            </Typography>
            <Typography variant="body1" color="textSecondary" >
              Thank you for your business.
            </Typography>
          </Box>
        </Box>
      </PerfectScrollbar>
    </Paper>
  );
}

InvoicePreview.propTypes = {
  className: PropTypes.string,
  invoice: PropTypes.object.isRequired
};

export default InvoicePreview;
