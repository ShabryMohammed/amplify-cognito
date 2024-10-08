import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, confirmSignUp } from '@aws-amplify/auth';

function SignUpPage() {
  const [formState, setFormState] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone_number: '',
    confirmationCode: '',
  });
  const [isSignUpComplete, setSignUpComplete] = useState(false); // Tracks whether sign-up is complete
  const [error, setError] = useState(''); // Error state
  const navigate = useNavigate(); // For navigation

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async () => {
    const { email, password, firstname, lastname, phone_number } = formState;
    try {
      await signUp({
        username: email, // Using email as username
        password,
        attributes: {
          email,
          phone_number,
          given_name: firstname,
          family_name: lastname,
        },
      });
      console.log('Sign-up successful. Confirmation code sent to email:', email);
      setSignUpComplete(true); // Show confirmation code input after sign-up
    } catch (error) {
      if (error.code === 'UsernameExistsException') {
        setError('User already exists. Please sign in.');
        navigate('/'); // Navigate to SignIn page
      } else {
        setError('Error signing up. Please try again.');
      }
      console.log('Error signing up:', error);
    }
  };

  const handleConfirmSignUp = async () => {
    const { email, confirmationCode } = formState;
    try {
      await confirmSignUp(email, confirmationCode);
      console.log('Sign-up confirmed for email:', email);
      navigate('/'); // Navigate to the sign-in page after confirmation
    } catch (error) {
      setError('Invalid confirmation code. Please try again.');
      console.log('Error confirming sign up:', error);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error messages */}
      {!isSignUpComplete ? (
        <div>
          <h2>Sign Up</h2>
          <input
            name="firstname"
            placeholder="First Name"
            value={formState.firstname}
            onChange={handleInputChange}
          />
          <input
            name="lastname"
            placeholder="Last Name"
            value={formState.lastname}
            onChange={handleInputChange}
          />
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
          <input
            name="phone_number"
            placeholder="Phone Number"
            value={formState.phone_number}
            onChange={handleInputChange}
          />
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      ) : (
        <div>
          <h2>Confirm Sign Up</h2>
          <input
            name="confirmationCode"
            placeholder="Confirmation Code"
            value={formState.confirmationCode}
            onChange={handleInputChange}
          />
          <button onClick={handleConfirmSignUp}>Confirm Sign Up</button>
        </div>
      )}
    </div>
  );
}

export default SignUpPage;
