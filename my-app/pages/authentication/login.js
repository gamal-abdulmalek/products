import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
import { useRouter } from 'next/router';
import { HttpClient } from '@/api/client/http-client';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await HttpClient.post('api/login', form);
      localStorage.setItem('token', response.token); // Save token in localStorage
      router.push('/dashboard/products'); // Redirect to dashboard or any protected route
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link href="/authentication/register" underline="hover">
              Register here
            </Link>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Forgot your password?{' '}
            <Link href="/authentication/forgotpassword" underline="hover">
              Reset it here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}