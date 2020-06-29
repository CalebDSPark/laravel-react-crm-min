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

function CustomerListView() {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const history = useHistory();
    const [customers, setCustomers] = useState(null);
    
    const getCustomers = useCallback(() => {
        authService.setTokenToHeader();
        axios.get('/api/customers')
        .then((response) => {
            if (isMountedRef.current) {
            setCustomers(response.data);
            }
        }).catch(error=> {                
            if(error.response.status === 401) { // unauthorized
                history.push('/');
            }
        });
    }, [isMountedRef]);

    useEffect(() => {
        getCustomers();
    }, [getCustomers]);

    if (!customers) {
        return null;
    }
        
    return (
        <Page className={classes.root} title="Customer List">
            <Container maxWidth={false}>
                <Header />
                {customers && (
                <Box mt={1}>
                    <Results customers={customers.data} />
                </Box>
                )}
            </Container>
        </Page>    
    );
}

export default CustomerListView;
