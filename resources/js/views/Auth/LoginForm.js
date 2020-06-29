import React, {useState, useRef} from 'react';
import { useDispatch } from 'react-redux';
import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    FormHelperText,    
    makeStyles,
    TextField,
    Typography,    
  } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { login } from '../../actions/accountActions';
import Copyright from './Copyright';

const LoginForm = (props) => {
    const dispatch = useDispatch();    
    const classes = useStyles();
    let txtUname = useRef(null);
    let txtPw = useRef(null);  
    const [errMsg, setErrMsg] = useState(null);    

    const handleSubmit = async event => {
        event.preventDefault();        
        
        try {                                    
            await dispatch(login(txtUname.current.value, txtPw.current.value));            
            props.history.push('/dash');                        
        } catch (error) {                       
            const msg = '* Please check your username and password';            
            txtUname.current.value = '';
            txtPw.current.value = '';
            setErrMsg(msg)            
        }            
    }
   
    return (    
        <Container component="main" maxWidth="xs">      
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in to CRM
                </Typography>
                
                {errMsg && (
                    <Box mt={1}>
                        <FormHelperText error> { errMsg } </FormHelperText>
                    </Box>
                )} 

                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField variant="outlined" margin="normal" required
                        fullWidth id="username" label="Username" name="username" autoFocus
                    inputRef={txtUname} defaultValue="Caleb Park"
                    />
                    <TextField variant="outlined" margin="normal" required
                        fullWidth name="password" label="Password" type="password"
                        id="password" autoComplete="current-password" defaultValue="123456"
                        inputRef={txtPw}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Sign In
                    </Button>                                 
                </form>
            </div>      
            <Box mt={10}>
                <Copyright />
            </Box>
        </Container>
    );  
};

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', 
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default LoginForm;
