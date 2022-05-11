import React, {useEffect} from 'react';
import './App.css';
import {AppBar, Button, Container, Toolbar} from "@mui/material";
import {Todolists} from "../pages/Todolists/Todolists";
import {ErrorToast} from "../components/Toasts/ErrorToast";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../redux/store";
import {appStatusStateType} from "../redux/reducers/appStatusReducer";
import {Loading} from "../loader/Loading";
import {Route, Routes, Link, Navigate} from "react-router-dom";
import {Login} from "../pages/Login/Login";
import {checkAuthTC, logOutTC} from "../redux/thunk/login-thunk";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkAuthTC());
    }, [dispatch])
    const {
        isFetching,
        isUserAuth,
        isInitialized
    } = useSelector<AppRootStateType, appStatusStateType>(state => state.app);

    const logOutHandler = () => {
        dispatch(logOutTC());
    }

    if (!isInitialized) {
        return <Loading/>;
    }
    return (
        <div className="App">
            {isFetching && <Loading/>}
            <ErrorToast/>
            <AppBar position="static">
                <Toolbar>{isUserAuth ? (<>
                    <Button color='inherit'><Link to='/todolists'>TodoLists</Link></Button>
                    <Toolbar>
                        <Button color='inherit' onClick={logOutHandler}>Log out</Button>
                    </Toolbar>
                </>) : (
                    <Button color="inherit"><Link to='/login'>Login</Link></Button>)
                }
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Routes>
                    {isUserAuth ? (<>
                            <Route path='/login' element={<Navigate to='/todolists'/>}/>
                            <Route path='/todolists/*' element={<Todolists/>}/>
                        </>)
                        : (<>
                            <Route path='/*' element={<Navigate to='login'/>}/>
                            <Route path='/login' element={<Login/>}/>
                        </>)
                    }
                </Routes>
            </Container>
        </div>
    );
}

export default App;
