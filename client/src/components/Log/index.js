import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUp from './SignUp';


const Log = ( props) => {

    const [signUp, setSignUp] = useState(true);
  

    return (
      
      
        <div className="connection-form">
            <div className="form-container">

                <ul>
                    <li onClick={() => setSignUp(true) } className={ signUp ? "active-btn" : ""}>S'inscrire</li>
                    <li  onClick={() => setSignUp(false) } className={signUp ? "" : "active-btn" }>se connecter</li>
                </ul>

                {signUp ? <SignUp/> : <SignInForm/> }
              
            </div>
        </div>
    );
};

export default Log;