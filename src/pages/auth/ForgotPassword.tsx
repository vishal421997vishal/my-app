import React, {useState} from "react";
import * as yup from "yup";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {resetPassword} from "../../services/authService";

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter valid email')
    .required('User name is required')
});

const ForgotPasswordPage = () => {
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: { email: string }) => {
    setError(null);
    try {
      const res = await resetPassword(data.email);
      console.log('Reset password data', res);
      alert('Password reset email sent. Please check your inbox.');
      navigate('/');
    } catch (err: any) {
      console.error('Reset password error:', err);
      setError(err.message);
    }
  };


  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 text-center">
        <Container component="main" maxWidth="xs">
          <Box className="bg-white p-6 rounded-lg shadow-md">
            <Typography component="h1" variant="h5">
              Reset Password
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="bg-blue-500 hover:bg-blue-700 text-white"
              >
                Reset Password
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
  );
}

export default ForgotPasswordPage;