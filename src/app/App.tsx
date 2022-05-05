import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Todolists} from "../pages/Todolists/Todolists";
import {ErrorToast} from "../components/Toasts/ErrorToast";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../redux/store";
import {appStatusStateType} from "../redux/reducers/appStatusReducer";
import {Loading} from "../loader/Loading";

function App() {
    const {isFetching} = useSelector<AppRootStateType, appStatusStateType>(state => state.app);
    return (
        <div className="App">
            {isFetching && <Loading/>}
            <ErrorToast/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Todolists/>
            </Container>
        </div>
    );
}

export default App;
