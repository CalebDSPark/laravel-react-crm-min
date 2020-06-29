/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {    
    Box,
    Button,
    Card,
    Checkbox,
    colors,
    Divider,
    IconButton,
    InputAdornment,
    Link,
    SvgIcon,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,    
    Tabs,
    TextField,
    Tooltip,
    Typography,
    makeStyles
} from '@material-ui/core';
import {
    Edit as EditIcon,
    ArrowRight as ArrowRightIcon,
    Search as SearchIcon
} from 'react-feather';
import { invoiceStatus } from '../../../constants';
import Label from '../../../components/Label';
import ReceiptIcon from '@material-ui/icons/Receipt';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';

const labelColors = {
  0: 'error',    // unpaid
  1: 'success',  // paid
  2: 'warning'   // inactive
};

function applyFilters(invoices, query, filters) {
    return invoices.filter((invoice) => {     
        let matches = true;
        // search
        if (query) {
            matches = false;            
            if (invoice.customer.toLowerCase().includes(query.toLowerCase())) {                
                matches = true;
            }            
        }

        // filter 
        if(filters.cate !== null && 
           filters.cate !== 'all' && 
           invoice.status.toString() !== filters.cate) {
            matches = false; 
        }        
        return matches;
    });
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
function getComparator(order, orderBy) {
    return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function applySort(arr, sort) {
    const [orderBy, order] = sort.split('|');
    const comparator = getComparator(order, orderBy);
    const stabilizedThis = arr.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        // eslint-disable-next-line no-shadow
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function applyPagination(invoices, page, limit) {
    return invoices.slice(page * limit, page * limit + limit);
}

const useStyles = makeStyles((theme) => ({
    root: {},
    queryField: {
        width: 500
    }, 
    icon: {
        marginRight: theme.spacing(1)
    },
    green: {
        color: colors.green[600],
        fontWeight: theme.typography.fontWeightMedium
    },
}));

function Results({ className, invoices, ...rest }) {
    const classes = useStyles();    
    const [selectedInvoices, setSelectedInvoices] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [query, setQuery] = useState('');    
    const [filters, setFilters] = useState({
        cate: null         
    });

    const handleQueryChange = (event) => {
        event.persist();
        setQuery(event.target.value);
    };

    const handleCategoryChange = (event) => {
        event.persist();             
        const value = event.target.value;
        setFilters((prevFilters) => ({
        ...prevFilters,
        cate: value
        }));
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    // Usually query is done on backend with indexing solutions
    const filteredInvoices = applyFilters(invoices, query, filters);
    const sortedInvoices = applySort(filteredInvoices, 'id|desc');
    const paginatedInvoices = applyPagination(sortedInvoices, page, limit);

    return (
    <Card
        className={clsx(classes.root, className)}
        {...rest}
    >   
        <Divider />
        <Box p={2} minHeight={56} display="flex" alignItems="center" >
        <TextField
            className={classes.queryField}
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                <SvgIcon fontSize="small" color="action" >
                    <SearchIcon />
                </SvgIcon>
                </InputAdornment>
            )
            }}
            onChange={handleQueryChange}
            placeholder="Search invoices"
            value={query}
            variant="outlined"
        />
        <Box flexGrow={1} />
            <TextField
                className={classes.categoryField}
                label="Category"
                name="category"
                onChange={handleCategoryChange}
                select
                SelectProps={{ native: true }}
                value={filters.cate || 'all'}
                variant="outlined"
            >
                {invoiceStatus.map((val) => (
                    <option value={val.id}>
                        {val.name}
                    </option>
                ))}
            </TextField>       
        </Box>
    
        <PerfectScrollbar>
        <Box minWidth={700}>
            <Table>
            <TableHead>
            <TableRow>          
                <TableCell align="center">
                    ID
                </TableCell>
                <TableCell>
                    Customer
                </TableCell>                                
                <TableCell>
                    Total Price
                </TableCell>                                
                <TableCell>
                    Status
                </TableCell>            
                <TableCell align="right">
                    Actions
                </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {paginatedInvoices.map((invoice) => {
                const isInvoiceSelected = selectedInvoices.includes(invoice.id);

                return (
                    <TableRow hover key={invoice.id} selected={isInvoiceSelected} >                
                        <TableCell>
                            <Box display="flex" alignItems="center" >                            
                                <div>                                                                                                              
                                    <SvgIcon className={classes.icon} fontSize="small" color="primary">                                
                                        <ReceiptIcon />
                                    </SvgIcon>                               
                                    {invoice.id}                                                                                 
                                </div>
                            </Box>
                        </TableCell>
                        <TableCell>                                                                         
                            {invoice.customer}
                        </TableCell>                                           
                        <TableCell>    
                            <span className={classes.green}>                                                                           
                                ${invoice.price}
                            </span>
                            <Typography variant="body2" color="textSecondary" >
                                GST: ${invoice.gst} / PST: ${invoice.pst}
                            </Typography>                           
                        </TableCell>                     
                        <TableCell>     
                            <Label color={labelColors[invoice.status]}>                       
                                {(invoiceStatus.filter(val => (val.id === invoice.status)))[0].name}
                            </Label>
                        </TableCell>
                        <TableCell align="right">
                            <Tooltip title="Edit">  
                            <IconButton component={RouterLink} to={'#'} >
                                <SvgIcon fontSize="small">
                                    <EditIcon />
                                </SvgIcon>
                            </IconButton>                        
                            </Tooltip>

                            <Tooltip title="View">  
                            <IconButton component={RouterLink} to={'/invoices/' + invoice.id + '/view'} >
                                <SvgIcon fontSize="small">
                                    <DesktopWindowsIcon />
                                </SvgIcon>
                            </IconButton>                        
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                );
                })}
            </TableBody>
            </Table>
        </Box>
        </PerfectScrollbar>
        <TablePagination
        component="div"
        count={filteredInvoices.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
        />
    </Card>
    );
}

Results.propTypes = {
    className: PropTypes.string,
    invoices: PropTypes.array
};

Results.defaultProps = {
    invoices: []
};

export default Results;
