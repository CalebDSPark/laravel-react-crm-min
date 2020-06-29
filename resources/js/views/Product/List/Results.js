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
    Search as SearchIcon,
    ShoppingBag
} from 'react-feather';
import { productCates } from '../../../constants';

function applyFilters(products, query, filters) {

    return products.filter((product) => {
        let matches = true;
        // search
        if (query) {
            const properties = ['code', 'name'];             
            matches = false;
            properties.forEach((property) => {                
                if (product[property].toString().toLowerCase().includes(query.toLowerCase())) {
                    matches = true;
                }
            });                       
        }

        // filter 
        if(filters.cate && product.cate.toString() !== filters.cate) {
            matches = false; 
        }        
        return matches;
    });
}

function applyPagination(products, page, limit) {
    return products.slice(page * limit, page * limit + limit);
}

const useStyles = makeStyles((theme) => ({
    root: {},
    queryField: {
        width: 500
    }, 
    icon: {
        marginRight: theme.spacing(1)
    },
    value: {
        color: colors.green[600],
        fontWeight: theme.typography.fontWeightMedium
    },
}));

function Results({ className, products, ...rest }) {
    const classes = useStyles();        
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
    let value = null;
    if (event.target.value !== '0') {
      value = event.target.value;
    }

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
const filteredProducts = applyFilters(products, query, filters);
const paginatedProducts = applyPagination(filteredProducts, page, limit);

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
        placeholder="Search products"
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
            {productCates.map((val) => (
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
                Code
            </TableCell>
            <TableCell>
                Category
            </TableCell>
            <TableCell>
                Name
            </TableCell>
            <TableCell align="right">
                Price
            </TableCell>            
            <TableCell align="right">
                Actions
            </TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
            {paginatedProducts.map((product) => {            

            return (
                <TableRow>                
                    <TableCell>
                        <Box display="flex" alignItems="center" >                            
                            <div>                                 
                                <Link color="inherit" variant="h6" component={RouterLink}
                                    to={'/products/' + product.id + '/edit'} 
                                >   
                                    <Tooltip title="Edit">                                               
                                        <SvgIcon className={classes.icon} fontSize="small" color="primary">                                
                                            <ShoppingBag />
                                        </SvgIcon>   
                                    </Tooltip>                                                                                           
                                    {product.code}                                             
                                </Link>                                
                            </div>
                        </Box>
                    </TableCell>
                    <TableCell>                                             
                        {(productCates.filter(val => (val.id === product.cate)))[0].name}                       
                    </TableCell>
                    <TableCell>
                        {product.name}
                    </TableCell>
                    <TableCell align="right">
                        <span className={classes.value}>                        
                            ${product.price}
                        </span>                       
                    </TableCell>
                    <TableCell align="right">
                        <Tooltip title="Edit">  
                        <IconButton component={RouterLink} to={'/products/' + product.id + '/edit'} >
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
    count={filteredProducts.length}
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
products: PropTypes.array
};

Results.defaultProps = {
products: []
};

export default Results;
