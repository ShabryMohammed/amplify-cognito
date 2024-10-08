import { Amplify } from 'aws-amplify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import config from './amplifyconfiguration.json';
import SignInPage from './components/LogIn';
import SignUpPage from './components/SignUp';
import HomePage from './components/Home';

Amplify.configure(config);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} /> {/* SignIn as the default route */}
        <Route path="/signup" element={<SignUpPage />} /> {/* Combined signup & confirm page */}
        <Route path="/home" element={<HomePage />} /> {/* Home after authentication */}
      </Routes>
    </Router>
  );
}

export default App;
