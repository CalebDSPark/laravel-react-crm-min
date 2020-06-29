import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import { useHistory } from 'react-router';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import axios from '../../../utils/axios';
import authService from '../../../services/authService';
import Page from '../../../components/Page';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import Header from './Header';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
}));

function ProductListView() {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const history = useHistory();
    const [products, setProducts] = useState(null);
    
    const getProducts = useCallback(() => {
        authService.setTokenToHeader();
        axios.get('/api/products')
        .then((response) => {
            if (isMountedRef.current) {
                setProducts(response.data);
            }
        }).catch(error=> {                
            if(error.response.status === 401) { // unauthorized
                history.push('/');
            }
        });
    }, [isMountedRef]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    if (!products) {
        return null;
    }
        
    return (
        <Page className={classes.root} title="Product List">
            <Container maxWidth={false}>
                <Header />
                {products && (
                <Box mt={1}>
                    <Results products={products.data} />
                </Box>
                )}
            </Container>
        </Page>    
    );
}

export default ProductListView;
