import React from 'react'
import styled from 'styled-components';
import PostsRoutes from '../../app/routes';
import { Outlet, useNavigate } from "react-router-dom";



const Div = styled.div`
  text-align: center;
  height: 100vh;
 
  h3{
    margin: 3rem auto;
    text-align: center;
    font-family: 'Galano Grotesque';
    font-size: 2rem;
    color: #000;

  }

  .box{
    background-color: #fff;
    display: flex;
    flex-direction: column;
    margin: auto;
    justify-content: center;
    text-transform: uppercase;
  }

  .box nav{
    display: flex;
    flex-direction: row;
  }
  
  .box span{
    font-weight: bolder;
    text-decoration: none;
    color: rgba(34, 34, 34, 0.6);
  }

  .box span:hover{
    background: none;
  }

  nav div {
    padding: 1rem;
    width: 100%;
  }

  nav div:hover:nth-child(1){
    border-right: none;
  }

  .box nav div:hover{
    border-bottom: 2px solid #dcd0a4;  
    border-right: none;
    border-left: none;

  }

  .box nav div:focus{
    border-bottom: 2px solid #dcd0a4;
  }

  .box nav div:active{
    color: #000;
    border-bottom: 3px solid #dcd0a4;
    background-color: none;
  }

  .box nav div:visited{
    color: #000;
    border-bottom: 2px solid #dcd0a4;
    background>-color: none;
  }
  
  nav span{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .outlet{
    width:100%;
    height: fit-content;
  }

  .footer{
    margin-top: 1rem;
  }
  @media only screen and (max-width: 480px) {
    /* Styles for small screens */
  }

  @media only screen and (min-width: 768px) and (max-width: 991px) {
        /* Styles for tablets in portrait */
        width:100%;
        height: 100vh;

        .box{
            width: 80%;
            

        }

    }

    @media only screen and (min-width: 992px) {
        /* Styles for small screens */
        width: 50%;
        margin: auto;
        height: 100vh;
        .box{
          min-width: 50%;
        }

    }
`;


const SignAction =()=> {
    const navigate = useNavigate();

    const handleSignInClick = () => {
        console.log("Handle Sign In Click");
        navigate(PostsRoutes.signAction.signin());
      };
    
      const handleJoinClick = () => {
        console.log("Handle Join In Click");
        navigate(PostsRoutes.signAction.signup());
      };
  return (
    <Div>
        <h3>SHOOP</h3>
        <div className="box">
            <nav>
              <div tabIndex={0} onClick={handleJoinClick} role="button">
                Join
              </div>
              <span>|</span>
              <div tabIndex={1} onClick={handleSignInClick} role="button">
                Sign In
              </div>  
            </nav> 
            <div className="outlet">
                <Outlet />
            </div>       
        </div>
        <div className="footer">
        Privacy Policy | Terms and Conditions

        </div>
    </Div>
  );
};

export default SignAction