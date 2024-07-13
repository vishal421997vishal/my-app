import {Box, Button, Container, TextField, Typography} from '@mui/material';
import React from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Link, useNavigate} from "react-router-dom";
import {loginUser} from "../../services/authService";
import {useSnackbar} from "../../components/SnackbarContext";


const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter valid email')
    .required('User name is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Login = () => {
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();
  const { showMessage } = useSnackbar();

  const onSubmit = async (data: any) => {
    try {
     await loginUser(data.email, data.password);
      showMessage('Login successfully', 'success');
      navigate('/user-profile');
    } catch (err: any) {
      showMessage('Invalid Username or password', 'error');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12">
      <div className="mt-10 text-center">
        <Container component="main" maxWidth="sm">
          <Box className="bg-white p-6 rounded-lg shadow-md">
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className="mb-4" noValidate onSubmit={handleSubmit(onSubmit)}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                autoComplete="email"
                autoFocus
                {...register('email')}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register('password')}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
              <div className='mt-5'>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="bg-blue-500 hover:bg-blue-700 text-white"
                >
                  Sign In
                </Button>
              </div>
            </form>
            <div className="flex justify-between align-items-center">
              <div className="flex justify-end text-sm">
                <Link to="/forgot-password"
                      className="font-semibold text-black-100 text-indigo-500 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="flex text-sm">
                <Link to="/register" className="font-semibold text-black-100 text-indigo-500 hover:underline">
                  Don't have an account? Sign up
                </Link>
              </div>
            </div>
          </Box>
        </Container>
      </div>
    </div>
  )
}

export default Login;