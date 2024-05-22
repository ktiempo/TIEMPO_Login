import { Button, Container, Grid, Paper, TextField, Typography, } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    Paper: {
        padding: theme.spacing(4),
        marginTop: theme.spacing(4),
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2)
    },
    submit: {
        marginTop: theme.spacing(2)
    },
    link: {
        textDecoration: 'none'
    },
    title: {
        marginBottom: theme.spacing(4)
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: theme.spacing(2)
    }
}))

export default function Signup() {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [confirmpasswordError, setConfirmPasswordError] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        if (!validateEmail(e.target.value)) {
            setEmailError('Please enter valid email')
        }
        else {
            setEmailError('')
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email)
    }

    const handlePasswordChange = (e) => {
        setPasswordError(e.target.value)
        if (e.target.value.length < 6) {
            setPasswordError('Password must be atleast 6 characters')
        }
        else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
        if (e.target.value.length < 6) {
            setConfirmPasswordError('Password must be atleast 6 characters')
        }
        else if (e.target.value !== password) {
            setConfirmPasswordError('Password do not match')
        }
        else {
            setConfirmPasswordError('')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(email && password && confirmpassword && !Boolean(emailError) && !Boolean(passwordError) && !Boolean(confirmpasswordError)){
            alert('Account created Successfully')
        }
    }
    return (
        <Container maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <img className={classes.logo} src='/vite.svg' alt='logo' />
                <Typography className={classes.title} variant='h4' align='center' gutterBottom>
                    Signup
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        label='Email'
                        variant='outlined'
                        fullWidth
                        value={email}
                        onChange={handleEmailChange}
                        error={Boolean(emailError)}
                        helperText={emailError}
                    />
                    <TextField
                        label='Password'
                        variant='outlined'
                        fullWidth
                        value={password}
                        onChange={handlePasswordChange}
                        error={Boolean(password)}
                        helperText={password}
                    />
                    <TextField
                        label='Confirm Password'
                        variant='outlined'
                        fullWidth
                        value={confirmpassword}
                        onChange={handleConfirmPasswordChange}
                        error={Boolean(confirmpasswordError)}
                        helperText={confirmpasswordError}
                    />
                    <Button className={classes.submit} variant='contained' color='primary' type='submit' fullWidth >
                        Signup{""}
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}

