import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,    
    TextField,    
    makeStyles
} from '@material-ui/core';
import { productCates, statusOptions } from '../../../constants';
import axios from '../../../utils/axios';
import authService from '../../../services/authService';

const useStyles = makeStyles(() => ({
root: {}
}));

function ProductCreateForm({
className,
product,
...rest
}) {
const classes = useStyles();
const { enqueueSnackbar } = useSnackbar();
const history = useHistory();

return (
<Formik
    initialValues={{        
        code: '',
        cate: 1,        
        type: 1,
        name: '',
        price: 0.00,  
        desc: '',      
        status: 1                                   
    }}
    validationSchema={Yup.object().shape({        
        code: Yup.number().min(0).required('Product code is required'),
        cate: Yup.number().min(0),        
        type: Yup.number().min(0),
        name: Yup.string().max(255),
        price: Yup.number().min(0),        
        desc: Yup.string().max(1000)        
    })}
    onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
    }) => {
        try {       
            
            // API request            
            // authService.setTokenToHeader();
            // const request = await axios.post('/api/products', { values });               

            resetForm();
            setStatus({ success: true });
            setSubmitting(false);
            enqueueSnackbar('New product has been created.', {
                variant: 'success'                
            });      
                        
            // redirect to product list 
            history.push('/products');

        } catch (error) {                        
            setStatus({ success: false });
            setErrors({ submit: error.message });
            setSubmitting(false);
            enqueueSnackbar(error.message, { 
                variant: 'error'
            });        
        }
    }}
>
    {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
    }) => (
    <form
        className={clsx(classes.root, className)}
        onSubmit={handleSubmit}
        {...rest}
    >

        <Card>
        <CardContent>
            <Grid container spacing={3} >                
                <Grid item md={4} xs={12} >
                    <TextField
                        error={Boolean(touched.code && errors.code)}
                        helperText={touched.code && errors.code}                                        
                        onBlur={handleBlur} onChange={handleChange}
                        label="Product Code"
                        name="code"                        
                        value={values.code}
                        variant="outlined" fullWidth required
                    />
                </Grid>
                <Grid item md={4} xs={12} >
                    <TextField
                        onChange={handleChange}
                        select fullWidth
                        SelectProps={{ native: true }}
                        variant="outlined"
                        label="Select Category"
                        name="cate"                                                                 
                        value={values.cate}
                    >
                        {productCates.map((val) => (
                            (val.id !== 0) &&
                            <option value={val.id} >
                                {val.name}
                            </option>
                        ))}
                    </TextField>
                </Grid>             
                <Grid item md={4} xs={12} >
                    <TextField
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}                                        
                        onBlur={handleBlur} onChange={handleChange}
                        label="Product Name"
                        name="name"                        
                        value={values.name}
                        variant="outlined" fullWidth required
                    />
                </Grid>
                <Grid item md={4} xs={12} >
                    <TextField 
                        error={Boolean(touched.price && errors.price)}
                        helperText={touched.price && errors.price}
                        onBlur={handleBlur} onChange={handleChange}                                                 
                        label="Price (CAD)" 
                        name="price"                                        
                        value={values.price}
                        variant="outlined" fullWidth 
                    />
                </Grid>                                         
                <Grid item md={4} xs={12} >
                    <TextField
                        error={Boolean(touched.desc && errors.desc)}
                        helperText={touched.desc && errors.desc}                                
                        onBlur={handleBlur} onChange={handleChange}
                        label="Description"
                        name="desc"                    
                        value={values.desc}
                        variant="outlined" fullWidth
                        multiline rowsMax={5}
                    />
                </Grid>                            
                <Grid item md={4} xs={12} >
                    <TextField
                        onChange={handleChange}
                        select fullWidth
                        SelectProps={{ native: true }}
                        variant="outlined"
                        label="Select Status"
                        name="status"                                                                 
                        value={values.status}
                    >
                        {statusOptions.map((val) => (
                            (val.id !== 'all') &&
                            <option value={val.id} >
                                {val.name}
                            </option>
                        ))}
                    </TextField>
                </Grid>
                
            </Grid>
            <Box mt={5}>
            <Button variant="contained" color="secondary"
                type="submit" disabled={isSubmitting}
            >
                Create Product
            </Button>
            </Box>
        </CardContent>
        </Card>
    </form>
    )}
</Formik>
);
}

ProductCreateForm.propTypes = {
className: PropTypes.string,
product: PropTypes.object.isRequired
};

export default ProductCreateForm;
