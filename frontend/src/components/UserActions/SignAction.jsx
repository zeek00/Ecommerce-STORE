import React from 'react'
import styled from 'styled-components';
import PostsRoutes from '../../app/routes';
import { Link, Outlet, useNavigate } from "react-router-dom";



const Div = styled.div`
  margin: auto;
  background: rgb(238,238,238);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h3{
    margin: 3rem auto;
    font-family: 'Galano Grotesque';
    font-size: 2rem;
    color: #000;

  }
  .box{
    display: flex;
    flex-direction: column;
    padding: 2rem;
    background: rgb(255,255,255);
    width: 60%;
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
    border-bottom: 2px solid #ccc;
    padding: 1rem;
    width: 100%;
  }

  .box nav div:hover{
    border-bottom: 2px solid #dcd0a4;  
  }

  .box div:focus{
    border-bottom: 2px solid #dcd0a4;
    }
    .box div:active{
        color: #000;
        border-bottom: 2px solid #dcd0a4;
        background-color: none;
    }
    .box div:visited{
        color: #000;
        border-bottom: 2px solid #dcd0a4;
        background-color: none;
    }
    .outlet{
        outlet: 1px solid red;
        width:100%;
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
        .box{
            width: 80%;

        }

    }

    @media only screen and (min-width: 992px) {
        /* Styles for small screens */
        width:100%;

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
            <div tabIndex={0} onClick={handleJoinClick}>
                    <span>Join</span>
            </div>
            <div tabIndex={1} onClick={handleSignInClick}>
                    <span>Sign In</span>
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