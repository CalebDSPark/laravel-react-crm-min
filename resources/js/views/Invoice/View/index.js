import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Box,
  Container,
  Divider,
  makeStyles
} from '@material-ui/core';
import axios from '../../../utils/axios';
import authService from '../../../services/authService';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import Page from '../../../components/Page';
import Header from './Header';
import InvoicePreview from './InvoicePreview';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function InvoiceView(props) {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [invoice, setInvoice] = useState(null);
  const invoiceId = props.match.params.invoiceId;

//   const getInvoice = useCallback(() => {
//     authService.setTokenToHeader();    
//     axios.get('/api/invoices/' + invoiceId)
//       .then((response) => {
//         if (isMountedRef.current) {
//           setInvoice(response.data.data);
//         }
//       });
//   }, [isMountedRef]);

//   useEffect(() => {
//     getInvoice();
//   }, [getInvoice]);

//   if (!invoice) {
//     return null;
//   }
  
  return (
    <Page
      className={classes.root}
      title="Invoice View"
    >
      <Container maxWidth={false}>
        <Header invoice={invoice} />
        <Box my={2}>
          <Divider />
        </Box>
        <InvoicePreview invoice={invoice} />
      </Container>
    </Page>
  );
}

export default InvoiceView;
