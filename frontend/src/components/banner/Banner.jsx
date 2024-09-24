import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
  width: 100%;
  background: url(https://images.unsplash.com/photo-1589987607627-616cac5c2c5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fG1hY2Jvb2t8ZW58MHx8MHx8fDA%3D) center/cover no-repeat;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  filter: brightness(0.8); /* Darken the background for better text readability */
`;

const Heading = styled(Typography)`
  font-size: 72px;
  color: #FFFFFF;
  font-weight: bold;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.6); /* Adds depth to the text */
  font-family: 'Montserrat', sans-serif; /* Stylish font for the heading */
  letter-spacing: 5px; /* Increase letter spacing for an impressive look */
  margin-bottom: 10px; /* Adds a bit of space between heading and subheading */
`;

const SubHeading = styled(Typography)`
  font-size: 24px;
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.2); /* Semi-transparent white background */
  padding: 5px 20px;
  border-radius: 8px;
  font-family: 'Roboto', sans-serif; /* Subtle, stylish font for the subheading */
  letter-spacing: 2px;
`;

const Banner = () => {
  return (
    <Image>
      <Heading>BLOG</Heading>
      <SubHeading>By Jaysurya</SubHeading>
    </Image>
  );
};

export default Banner;
