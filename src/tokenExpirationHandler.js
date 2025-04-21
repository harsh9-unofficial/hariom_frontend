// Function to decode JWT token (base64 decoding of payload)
function decodeJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }
  
  // Function to check if token is expired and remove it
  function checkTokenExpiration() {
    const token = localStorage.getItem('token'); // Adjust key as per your app
    if (!token) return;
  
    const decoded = decodeJwt(token);
    if (!decoded || !decoded.exp) {
        localStorage.clear();
      return;
    }
  
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (decoded.exp < currentTime) {
      console.log('Token expired, removing from localStorage');
      localStorage.clear();
    }
  }
  
  // Run check on page load
  checkTokenExpiration();
  
  // Set up periodic check (every minute)
  setInterval(checkTokenExpiration, 60 * 1000);
  
  // Optional: Export functions for use in other modules
  export { decodeJwt, checkTokenExpiration };