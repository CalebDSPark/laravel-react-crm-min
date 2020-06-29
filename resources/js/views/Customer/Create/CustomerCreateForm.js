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
    Switch,
    TextField,
    Typography,
    makeStyles
} from '@material-ui/core';
import { customerTypeOptions, provinceOptions, currencyOptions } from '../../../constants';
import axios from '../../../utils/axios';
import authService from '../../../services/authService';

const useStyles = makeStyles(() => ({
root: {}
}));

function CustomerCreateForm({
className,
customer,
...rest
}) {
const classes = useStyles();
const { enqueueSnackbar } = useSnackbar();
const history = useHistory();

return (
<Formik
    initialValues={{        
        organization: '',
        last_name: '',
        first_name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        province: 'BC',
        country: '',
        currency: 1                                   
    }}
    validationSchema={Yup.object().shape({        
        organization: Yup.string().max(255),
        first_name: Yup.string().max(255).required('First name is required'),
        last_name: Yup.string().max(255).required('Last name is required'),
        email: Yup.string().email('Must be a valid email').max(255),
        phone: Yup.string().max(30),
        address: Yup.string().max(255),
        city: Yup.string().max(255),        
        country: Yup.string().max(255)   
    })}
    onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
    }) => {
        try {            
            // API request [Demo]
            // authService.setTokenToHeader();
            // const request = await axios.post('/api/customers', { values });               

            resetForm();
            setStatus({ success: true });
            setSubmitting(false);
            enqueueSnackbar('New customer has been created.', {
                variant: 'success'             
            });      
                        
            // redirect to customer list 
            history.push('/customers');

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
                        error={Boolean(touched.organization && errors.organization)}
                        helperText={touched.organization && errors.organization}                                        
                        onBlur={handleBlur} onChange={handleChange}
                        label="Organization"
                        name="organization"                        
                        value={values.organization}
                        variant="outlined" fullWidth
                    />
                </Grid>
                <Grid item md={4} xs={12} >
                    <TextField
                        error={Boolean(touched.first_name && errors.first_name)}
                        helperText={touched.first_name && errors.first_name}                                        
                        onBlur={handleBlur} onChange={handleChange}
                        label="First name"
                        name="first_name"                        
                        value={values.first_name}
                        variant="outlined" fullWidth required
                    />
                </Grid>
                <Grid item md={4} xs={12} >
                    <TextField
                        error={Boolean(touched.last_name && errors.last_name)}
                        helperText={touched.last_name && errors.last_name}                                        
                        onBlur={handleBlur} onChange={handleChange}
                        label="Last name"
                        name="last_name"                        
                        value={values.last_name}
                        variant="outlined" fullWidth required
                    />
                </Grid>
                <Grid item md={4} xs={12} >
                    <TextField 
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                        onBlur={handleBlur} onChange={handleChange}                                                 
                        label="Email address" 
                        name="email"                                        
                        value={values.email}
                        variant="outlined" fullWidth 
                    />
                </Grid>
                <Grid item md={4} xs={12} >
                    <TextField
                        error={Boolean(touched.phone && errors.phone)}
                        helperText={touched.phone && errors.phone}
                        onBlur={handleBlur} onChange={handleChange}                        
                        label="Phone number"
                        name="phone"                        
                        value={values.phone}
                        variant="outlined" fullWidth
                    />
                </Grid>
                
                <Grid item md={4} xs={12} >
                    <TextField
                        error={Boolean(touched.address && errors.address)}
                        helperText={touched.address && errors.address}                                
                        onBlur={handleBlur} onChange={handleChange}
                        label="Address"
                        name="address"                    
                        value={values.address}
                        variant="outlined" fullWidth
                    />
                </Grid>
                <Grid item md={4} xs={12} >
                    <TextField
                        error={Boolean(touched.city && errors.city)}
                        helperText={touched.city && errors.city}                                
                        onBlur={handleBlur} onChange={handleChange}
                        label="City"
                        name="city"                    
                        value={values.city}
                        variant="outlined" fullWidth
                    />
                </Grid>              
                <Grid item md={4} xs={12} >
                    <TextField
                        onChange={handleChange}
                        select fullWidth
                        SelectProps={{ native: true }}
                        variant="outlined"
                        label="Select Province"
                        name="province"                                                                 
                        value={values.province}
                    >
                        {provinceOptions.map((val) => (
                            <option value={val.id} >
                                {val.name}
                            </option>
                        ))}
                    </TextField>
                </Grid>
                <Grid item md={4} xs={12} >
                    <TextField
                        error={Boolean(touched.country && errors.country)}
                        helperText={touched.country && errors.country}                                
                        onBlur={handleBlur} onChange={handleChange}
                        label="Country"
                        name="country"                    
                        value={values.country}
                        variant="outlined" fullWidth
                    />
                </Grid>
                             
            </Grid>
            <Box mt={5}>
            <Button variant="contained" color="secondary"
                type="submit" disabled={isSubmitting}
            >
                Create Customer
            </Button>
            </Box>
        </CardContent>
        </Card>
    </form>
    )}
</Formik>
);
}

CustomerCreateForm.propTypes = {
className: PropTypes.string,
customer: PropTypes.object.isRequired
};

export default CustomerCreateForm;
