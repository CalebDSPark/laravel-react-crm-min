import React from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from '../../../components/Page';
import Header from './Header';
import ProductCreateForm from './ProductCreateForm';

const useStyles = makeStyles((theme) => ({
root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
    }
}));

function ProductCreateView() {
const classes = useStyles();

return (
    <Page className={classes.root} 
        title="Product Create" 
    >        
        <Container maxWidth={false}>
            <Header />
            <Box mt={5}>
                <ProductCreateForm  />
            </Box>
        </Container>
      
    </Page>
    );
}

export default ProductCreateView;
