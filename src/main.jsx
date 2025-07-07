import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { AuthProvider } from './context/AuthContext.jsx';
import './index.css'
import App from './App.jsx'


const container = document.getElementById('root');
const root = createRoot(container);

// Add error boundary for debugging
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("App crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1 style={{color: 'red', padding: '20px'}}>App Crashed - Check Console</h1>;
    }
    return this.props.children;
  }
}

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "362624441959-2f2lqprs5m80hkmkfk0rrernphnhl2t6.apps.googleusercontent.com"}>
        <BrowserRouter basename="/">
            <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
