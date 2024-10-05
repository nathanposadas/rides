// driver/sign-in.tsx
import React from 'react';
import Auth from '../(auth)/sign-in'; // Adjust the path as necessary

const DriverSignIn = () => {
  return <Auth isDriver={true} />;
};

export default DriverSignIn;
