import { Toaster } from 'react-hot-toast';

const GlobalToastContainer = () => {
  return (
    <Toaster
      containerStyle={{
        // bottom: 150
        bottom: 120,
      }}
      toastOptions={{
        style: {
          fontSize: '16px',
        },
      }}
    />
  );
};

export default GlobalToastContainer;
