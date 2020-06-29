import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import { useHistory } from 'react-router';
import {
    Container,
    Grid,
    makeStyles
} from '@material-ui/core';
import axios from '../../utils/axios';
import authService from '../../services/authService';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import Page from '../../components/Page';
import Header from './Header';
import Overview from './Overview';
import FinancialReport from './FinancialReport';

const useStyles = makeStyles((theme) => ({
    root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
    },
    container: {
    [theme.breakpoints.up('lg')]: {
        paddingLeft: 64,
        paddingRight: 64
    }
    }
}));

function DashboardView() {
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
    <Page
        className={classes.root}
        title="Dashboard"
    >
        <Container
        maxWidth={false}
        className={classes.container}
        >
        <Header />
        <Grid container spacing={3} >
            <Grid item xs={12}>
                <Overview invoices={invoices} />
            </Grid>            
            <Grid item xs={12} >
                <FinancialReport invoices={invoices} />
            </Grid>
        </Grid>
        </Container>
    </Page>
    );
}

export default DashboardView;
