import { signOut } from '@aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

function HomePage({ user }) {
  const navigate = useNavigate(); // For navigation

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log('User signed out');
      navigate('/'); // Navigate back to SignIn page
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  return (
    <div>
      <h1>
        Hello {user?.attributes?.given_name} {user?.attributes?.family_name}
      </h1>
      <p>Email: {user?.attributes?.email}</p>
      <p>Phone: {user?.attributes?.phone_number}</p>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}

export default HomePage;
