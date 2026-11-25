import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
        const response = await axios.post(
            'https://speedforceev.in/api/login',
            { email, password },
            { headers: { Accept: 'application/json' } }
        );

        console.log('✅ Response:', response.data);

        const token = response.data.token;

        if (!token) {
            console.log('❌ No token in response');
            setError('Login failed — no token received');
            return;
        }

        localStorage.setItem('admin_token', token);
        console.log('✅ Token saved:', localStorage.getItem('admin_token'));

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setTimeout(() => {
    navigate('/admin/dashboard', { replace: true });
}, 100);

        console.log('✅ Navigating to dashboard...');
        navigate('/admin/dashboard', { replace: true });
        console.log('✅ Navigate called');

    } catch (err: any) {
        console.log('❌ Error:', err);
        console.log('❌ Error response:', err.response?.data);
        setError(err.response?.data?.message ?? 'Invalid login credentials');
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

