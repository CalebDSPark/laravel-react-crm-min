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

function InvoiceListView() {
    const classes = useStyles();
    const isMountedRef = useIsMountedRef();
    const history = useHistory();
    const [invoices, setInvoices] = useState(null);
    
    const getInvoices = useCallback(() => {
        authService.setTokenToHeader();
        axios.get('/api/invoices')
        .then((response) => {
            if (isMountedRef.current) {
                setInvoices(response.data.data);
            }
        }).catch(error=> {                
            if(error.response.status === 401) { // unauthorized
                history.push('/');
            }
        });
    }, [isMountedRef]);

    useEffect(() => {
        getInvoices();
    }, [getInvoices]);

    if (!invoices) {
        return null;
    }
        
    return (
        <Page className={classes.root} title="Invoice List">
            <Container maxWidth={false}>
                <Header />
                {invoices && (
                <Box mt={1}>
                    <Results invoices={invoices} />
                </Box>
                )}
            </Container>
        </Page>    
    );
}

export default InvoiceListView;
