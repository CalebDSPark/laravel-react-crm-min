import React from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from '../../../components/Page';
import Header from './Header';
import CustomerCreateForm from './CustomerCreateForm';

const useStyles = makeStyles((theme) => ({
root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
    }
}));

function CustomerCreateView() {
const classes = useStyles();

return (
    <Page className={classes.root} 
        title="Customer Create" 
    >        
        <Container maxWidth={false}>
            <Header />
            <Box mt={3}>
                <CustomerCreateForm  />
            </Box>
        </Container>
      
    </Page>
    );
}

export default CustomerCreateView;
