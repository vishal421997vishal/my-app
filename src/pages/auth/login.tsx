import {Box, Button, Container, TextField, Typography} from '@mui/material';
import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Link, useNavigate} from "react-router-dom";
import {loginUser} from "../../services/authService";


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
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setError(null); // Clear any existing errors
    try {
      const res = await loginUser(data.email, data.password);
      console.log('Login form data', res);
      navigate('/user-profile');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 text-center">
        <Container component="main" maxWidth="xs">
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
                className="mb-4"
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
                className="mb-4"
              />
              <div className="flex justify-end text-sm mb-4">
                <Link to="/forgot-password" className="font-semibold text-black-100 hover:text-indigo-500 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="bg-blue-500 hover:bg-blue-700 text-white"
              >
                Sign In
              </Button>
            </form>
            <div className="flex text-center justify-center text-sm mb-4">
              <p className={'mr-1'}>Don't have an account?</p>
              <Link to="/register" className="font-semibold text-black-100 hover:text-indigo-500 hover:underline">
                User Register
              </Link>
            </div>
          </Box>
        </Container>
      </div>
    </div>
  )
}

export default Login;