import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { BsBoxSeam } from 'react-icons/bs';
import { FaRegUser } from 'react-icons/fa';
import { BiMessageSquareDots } from 'react-icons/bi';
import { MdCancel } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import PostsRoutes from '../../app/routes';
import { selectCurrentUser } from '../../features/selectors';
import { logOutAsync } from '../../features/session/dataThunks';


const Div = styled.div`
  position: absolute;
  top: auto;
  right: 0rem;
  z-index: 20;
  background: rgb(248, 249, 250);
  width: 80%;
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  transition: all .5s ease-in-out;
  transform: ${(props) => (props.isOpen ? 'scaleY(1)' : 'scaleY(0)')};
  transform-origin: left top;

  &:target{
    transform: ${(props) => (props.isOpen ? 'scaleY(0)' : 'scaleY(1)')};
  }
  &:hover {
    opacity: 1;
    transform: translateY(0);
  }

  .cont-one {
    display: flex;
    justify-content: space-between;
    padding: 0.7rem;
    font-size: 1.2rem;
    cursor: pointer;
    background: rgba(34, 34, 34, 0.8);
    color: #fff;
  }

  .access span {
    font-size: 1rem;
    color: #fff;
  }
  .access span:hover {
    text-decoration: underline;
    background: none;
  }

  .action {
    display: flex;
    padding: 1rem;
    font-size: 1.4rem;
    color: #333;
  }

  .action:hover{
    color: rgb(234,227,201);
    cursor: pointer;
    font-weight: 600;
  }

  .action span {
    padding-left: 1rem;
    font-size: 1.2rem;
  }

  @media only screen and (max-width: 480px) {
    /* Styles for small screens */
    top: 3rem;

  }

  @media only screen and (min-width: 768px) and (max-width: 991px) {
        /* Styles for tablets in portrait */
        width: 32%;
        top: 4rem;
        right: 0rem;
    }

    @media only screen and (min-width: 992px) {
        /* Styles for small screens */
        width: 23%;
        top: 4rem;
        right: 1rem;
    }
`;

const UserMenu = ({ isOpen, onClose }) => {
  const userNow = useSelector(selectCurrentUser) !== null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignInClick = () => {
    navigate(PostsRoutes.signAction.signin());
  };

  const handleJoinClick = () => {
    navigate(PostsRoutes.signAction.signup());
  };  
  
  const handleLogoutClick = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if(confirmLogout){
      dispatch(logOutAsync())
    }
    if(userNow === null ){
      navigate(PostsRoutes.signAction.signin());
    }
  };

  return (
    <Div isOpen={isOpen}>
      <div className="cont-one">
        <div className="access">
          { userNow ? (
            <Link onClick={handleLogoutClick} to={PostsRoutes.signAction.signin()}>
              <span> Logout</span>
            </Link>):(
            <>
              <Link onClick={handleSignInClick} to={PostsRoutes.signAction.signin()}>
              <span> Sign In</span>
              </Link>{' '}
              |
              <Link onClick={handleJoinClick} to={PostsRoutes.signAction.signup()}>
                {' '}
                <span> Join</span>
              </Link>
            </>)
          }
        </div>
        <MdCancel onClick={onClose} />
      </div>
      <Link to={PostsRoutes.coming()}>
        <div className="action">
          <FaRegUser />
          <span>My Account</span>
        </div>
      </Link>
      <Link to={PostsRoutes.coming()}>  
        <div className="action">
          <BsBoxSeam />
          <span>My Orders</span>
        </div>
      </Link>
      <Link to={PostsRoutes.coming()}>
        <div className="action">
          <BiMessageSquareDots />
          <span>Contact Preferences</span>
        </div>
      </Link>
    </Div>
  );
};

export default UserMenu;
