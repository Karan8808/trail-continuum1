import React from 'react';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer';

const HomePage = ({ isAuthenticated, accountInfo }) => {
  return (
    <section className="frame">
      <Header isAuthenticated={isAuthenticated} accountInfo={accountInfo} />
      <h1>Welcome to ContinuumInnovations Pvt Ltd!</h1>
      {/* {isAuthenticated 
        ? ( <h2>User is logged in</h2>) 
        : (<button>Login</button>
            // Login button or login related content
          )
      } */}
      <Footer />
    </section>
  );
};

export default HomePage;
