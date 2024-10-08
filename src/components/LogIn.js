import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '@aws-amplify/auth';

function SignInPage() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); // Error state
  const navigate = useNavigate(); // For navigation

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async () => {
    const { email, password } = formState;
    try {
      const user = await signIn(email, password); // Sign in using email
      console.log('Sign-in successful:', user);
      navigate('/home'); // Navigate to Home page
    } catch (error) {
      setError('Incorrect username or password. Please try again.');
      console.log('Error signing in:', error);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error messages */}
      <h2>Sign In</h2>
      <input
        name="email"
        placeholder="Email"
        value={formState.email}
        onChange={handleInputChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formState.password}
        onChange={handleInputChange}
      />
      <button onClick={handleSignIn}>Sign In</button>
      <p>
        Don't have an account? <a href="/signup">Sign Up</a> {/* Navigation to SignUp page */}
      </p>
    </div>
  );
}

export default SignInPage;
