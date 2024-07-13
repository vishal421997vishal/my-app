import React from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {registerUser} from "../../services/authService";

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
const UserRegisterPage = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    registerUser(data.email, data.password).then((res: any) => {
      console.log('Registration form data', res);
      navigate('/user-profile');
    })

  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 text-center">
        <Container component="main" maxWidth="xs">
          <Box className="bg-white p-6 rounded-lg shadow-md">
            <Typography component="h1" variant="h5">
              Sign Up
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="bg-blue-500 hover:bg-blue-700 text-white"
              >
                Register
              </Button>
            </form>
            <div className="flex text-center justify-center text-sm mb-4">
              <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Login?
              </Link>
            </div>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default UserRegisterPage;