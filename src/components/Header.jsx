import { AppBar, Button, Toolbar, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1
    }
}))

export default function Header() {
    const classes = useStyles()
    return (
        <AppBar position='static'>
            <Toolbar>
                <Box sx={{ marginLeft: 'auto' }}>
                    <Button color='inherit' component={Link} to='/login'>
                        Login
                    </Button>
                    <Button color='inherit' component={Link} to='/signup'>Signup</Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
