import React, {ChangeEvent, FormEvent, useState} from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {emailRegular} from "../../utils/regulars";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../redux/thunk/login-thunk";
import {AppRootStateType} from "../../redux/store";
import {appStatusStateType} from "../../redux/reducers/appStatusReducer";
import {Navigate} from 'react-router-dom';


type errorsType = {
    email?: string,
    password?: string,
}

type fieldsType = {
    email: string,
    password: string,
    rememberMe: boolean,
}

export const Login = () => {
    const dispatch = useDispatch();

    const [fields, setFields] = useState<fieldsType>({
        email: '',
        password: '',
        rememberMe: false,
    })
    const [formErrors, setFormErrors] = useState<errorsType>({
        email: '',
        password: '',
    });
    const onInputChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        if (formErrors[name]) {
            setFormErrors(prevState => ({...prevState, [name]: ''}));
        }
        setFields(prevState => ({...prevState, [name]: value}));
    }
    const onCheckboxChange = ({target: {checked}}: ChangeEvent<HTMLInputElement>) => {
        setFields(prevState => ({...prevState, rememberMe: checked}));
    }

    const isFormValid = () => {
        const errors: errorsType = {};
        if (!fields.email) {
            errors.email = 'Required';
        } else if (!emailRegular.test(fields.email)) {
            errors.email = 'Invalid email address';
        }
        if (!fields.password) {
            errors.password = 'Required'
        } else if (fields.password.length < 4) {
            errors.password = 'Password is too short';
        }
        if (errors.email || errors.password) {
            setFormErrors(errors);
            return false;
        } else {
            return true;
        }
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isFormValid()) {
            dispatch(loginTC(fields))
        }
    }

    return <Grid container justifyContent='center'>
        <Grid item justifyContent='center'>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href='https://social-network.samuraijs.com/'
                           target='_blank'> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <form onSubmit={onSubmit}>
                    <FormGroup>
                        <TextField label="Email" margin="normal" name='email' onChange={onInputChange}
                                   value={fields.email}
                                   error={!!formErrors.email} helperText={formErrors.email}/>
                        <TextField type="password" label="Password" name='password' value={fields.password}
                                   onChange={onInputChange} error={!!formErrors.password}
                                   helperText={formErrors.password}
                                   margin="normal"
                        />
                        <FormControlLabel label='Remember me'
                                          control={<Checkbox checked={fields.rememberMe} name='rememberMe'
                                                             onChange={onCheckboxChange}/>}/>
                        <Button type='submit' variant='contained' color='primary'>
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}