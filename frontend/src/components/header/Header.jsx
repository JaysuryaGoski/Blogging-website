import { AppBar, Toolbar, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";


const Component = styled(AppBar)`
  background: #333; /* Dark background for a modern look */
  color: #ffffff; /* White text for contrast */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
`;

const Container = styled(Toolbar)`
  justify-content: space-around; /* Space out the links */
`;

const NavLink = styled(Link)`
  padding: 20px;
  color: #ffffff; /* White text for visibility */
  text-decoration: none;
  font-family: 'Montserrat', sans-serif; /* Stylish font */
  font-weight: 600; /* Semi-bold text for emphasis */
  transition: color 0.3s ease; /* Smooth transition for hover effect */

  &:hover {
    color: #ffdd57; /* Bright color on hover */
  }
`;

const Logo = styled(Typography)`
  font-size: 1.8rem; /* Larger font size for the logo */
  font-weight: 700; /* Bold style for the logo */
  color: #ffdd57; /* Bright color for the logo */
  font-family: 'Montserrat', sans-serif; /* Stylish font for the logo */
`;

const Header = () => {
  return (
    <Component>
      <Container>
        <Logo variant="h6">My Portfolio</Logo> {/* Logo section */}
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/login">Logout</NavLink>
      </Container>
    </Component>
  );
};

export default Header;
