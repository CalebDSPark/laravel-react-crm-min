/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Avatar,
    Box,
    Button,
    Card,    
    colors,
    Divider,
    IconButton,
    InputAdornment,
    Link,
    SvgIcon,    
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,    
    TextField,
    Tooltip,
    Typography,
    makeStyles
} from '@material-ui/core';
import {
    Edit as EditIcon,    
    Search as SearchIcon
} from 'react-feather';
import getInitials from '../../../utils/getInitials';
import Label from '../../../components/Label';
import { statusOptions } from '../../../constants';

const labelColors = {
    0: 'warning',  // inactive
    1: 'success'   // active    
};

const sortOptions = [
    {
        value: 'id|desc',
        label: 'Newest first'
    },
    {
        value: 'id|asc',
        label: 'Oldest first'
    }
];

function applyFilters(customers, query, filters) {
    return customers.filter((customer) => {
        let matches = true;
        // search
        if (query) {
            const properties = ['company', 'first_name', 'last_name'];      
            let containsQuery = false;
            properties.forEach((property) => {
                if (customer[property].toLowerCase().includes(query.toLowerCase())) {
                    containsQuery = true;
                }
            });        
            if (!containsQuery) {
                matches = false;
            }
        }

        // filter 
        if(filters.cate !== null && filters.cate !== 'all' && 
            customer.status.toString() !== filters.cate) {
            matches = false; 
        }        
        return matches;
    });
}

function applyPagination(customers, page, limit) {
    return customers.slice(page * limit, page * limit + limit);
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

function applySort(customers, sort) {
    const [orderBy, order] = sort.split('|');
    const comparator = getComparator(order, orderBy);
    const stabilizedThis = customers.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        // eslint-disable-next-line no-shadow
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
    root: {},
        queryField: {
        width: 500
    },   
    avatar: {
        backgroundColor: colors.red[500],
        color: colors.common.white,
        marginRight: theme.spacing(2)
    }
}));

function Results({ className, customers, ...rest }) {
    const classes = useStyles();        
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState(sortOptions[0].value);
    const [filters, setFilters] = useState({
        cate: null         
    });
    
    const handleCategoryChange = (event) => {
        event.persist();              
        const value = event.target.value;
        setFilters((prevFilters) => ({
            ...prevFilters,
            cate: value
        }));
    };

    const handleQueryChange = (event) => {
        event.persist();
        setQuery(event.target.value);
    };
    const handleSortChange = (event) => {
        event.persist();
        setSort(event.target.value);
    };
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };
    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    // Usually query is done on backend with indexing solutions
    const filteredCustomers = applyFilters(customers, query, filters);
    const sortedCustomers = applySort(filteredCustomers, sort);
    const paginatedCustomers = applyPagination(sortedCustomers, page, limit);

    return (
    <Card className={clsx(classes.root, className)} {...rest} >    
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
                placeholder="Search customers"
                value={query}
                variant="outlined"
            />
            <Box flexGrow={1} />            
            <Box mr={3} >
                <TextField
                    className={classes.categoryField}
                    label="Category" name="category"
                    onChange={handleCategoryChange}
                    select
                    SelectProps={{ native: true }}
                    value={filters.cate || 'all'}
                    variant="outlined"
                >
                    {statusOptions.map((val) => (
                        <option value={val.id}>
                            {val.name}
                        </option>
                    ))}
                </TextField>   
            </Box>                            
            <TextField
                label="Sort By" name="sort" onChange={handleSortChange}
                select SelectProps={{ native: true }}
                value={sort} variant="outlined" 
            >
                {sortOptions.map((option) => (
                <option key={option.value} value={option.value} >
                    {option.label}
                </option>
                ))}
            </TextField>            
        </Box>
    
        <PerfectScrollbar>
        <Box minWidth={700}>
            <Table>
            <TableHead>
                <TableRow>            
                <TableCell>
                    Company
                </TableCell>
                <TableCell>
                    Name
                </TableCell>
                <TableCell>
                    Phone
                </TableCell>
                <TableCell>
                    Location
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
                {paginatedCustomers.map((customer) => {                

                return (                    
                    <TableRow>
                        <TableCell>
                            <Box display="flex" alignItems="center" >
                                <Avatar className={classes.avatar} src={customer.avatar}>
                                    {getInitials(customer.company)}
                                </Avatar>
                                <div>
                                <Link color="inherit" variant="h6" component={RouterLink}
                                    to={'#'} 
                                >                                    
                                    {customer.company}                         
                                </Link>
                                <Typography variant="body2" color="textSecondary" >
                                    {customer.email}
                                </Typography>
                                </div>
                            </Box>
                        </TableCell>
                        <TableCell>
                            {customer.first_name} {customer.last_name}                                
                        </TableCell>
                        <TableCell>
                            {customer.phone}
                        </TableCell>
                        <TableCell>
                            {customer.city}                        
                        </TableCell>
                        <TableCell>                              
                            <Label color={labelColors[customer.status]}>                       
                                {(statusOptions.filter(val => (val.id === customer.status)))[0].name}
                            </Label>                  
                        </TableCell>
                        <TableCell align="right">
                            <Tooltip title="Edit">
                            {/*<IconButton component={RouterLink} to={'/customers/' + customer.id + '/detail'} >*/}                            
                            <IconButton component={RouterLink} to={'#'} >
                                <SvgIcon fontSize="small">
                                    <EditIcon />
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
            count={filteredCustomers.length}
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
    customers: PropTypes.array
};

Results.defaultProps = {
    customers: []
};

export default Results;
