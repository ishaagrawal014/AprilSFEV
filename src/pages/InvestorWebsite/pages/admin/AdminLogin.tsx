import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        'https://speedforceev.in/api/login',
        { email, password },
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );

      const token = response.data.token;

      // ✅ Persist token
      localStorage.setItem('token', token);

      // ✅ Attach token immediately
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // ✅ Redirect after successful login
      navigate('/admin/dashboard', { replace: true });

    } catch (error) {
      setError(
        error.response?.data?.message || 'Invalid login credentials'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style= { styles.container } >
    <form onSubmit={ handleSubmit } style = { styles.form } >
      <h2>Admin Login </h2>

  { error && <p style={ styles.error }> { error } </p> }

  <input
          type="email"
  placeholder = "Email"
  value = { email }
  onChange = {(e) => setEmail(e.target.value)
}
required
style = { styles.input }
  />

  <input
          type="password"
placeholder = "Password"
value = { password }
onChange = {(e) => setPassword(e.target.value)}
required
style = { styles.input }
  />

  <button type="submit" disabled = { loading } style = { styles.button } >
    { loading? 'Logging in…': 'Login' }
    </button>
    </form>
    </div>
  );
}


/* ================== STYLES ================== */
const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f4f6f8'
  },
  form: {
    width: '320px',
    padding: '30px',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.19)'
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    fontSize: '14px'
  },
  button: {
    width: '100%',
    padding: '10px',
    background: '#0051ff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px'
  },
  error: {
    color: 'red',
    marginBottom: '10px'
  }
};

