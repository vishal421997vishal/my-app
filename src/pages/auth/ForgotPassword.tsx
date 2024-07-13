import React, {useState} from "react";
import * as yup from "yup";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {resetPassword} from "../../services/authService";
import {useSnackbar} from "../../components/SnackbarContext";

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
  const {showMessage} = useSnackbar();

  const onSubmit = async (data: { email: string }) => {
    try {
      await resetPassword(data.email);
      showMessage('Password reset email sent. Please check your inbox.', 'success');
      navigate('/');
    } catch (err: any) {
      showMessage('Invalid Email', 'error');
    }
  };


  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 text-center">
        <Container component="main" maxWidth="sm">
          <Box className="bg-white p-6 rounded-lg shadow-md">
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <form className="mb-5" noValidate onSubmit={handleSubmit(onSubmit)}>
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
              <div className='mt-5'>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="bg-blue-500 hover:bg-blue-700 text-white"
                >
                  Reset Password
                </Button>
              </div>
            </form>
            <div className="flex text-start text-sm mb-4">
              <Link to="/login" className="font-semibold text-black-100 text-indigo-500 hover:underline">
                Remember your password?
              </Link>
            </div>
          </Box>
        </Container>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;