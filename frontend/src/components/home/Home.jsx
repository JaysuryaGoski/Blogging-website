import Banner from "../banner/Banner";
import Categories from "./Categories";
import Posts from "./post/Posts";
import { Grid, styled } from "@mui/material";

// Styled container to wrap the grid and improve layout
const Container = styled(Grid)`
  padding: 20px 50px;
  background-color: #f7f7f7; /* Light background to contrast with dark elements */
`;

const Sidebar = styled(Grid)`
  padding-right: 20px; /* Spacing between categories and posts */
`;

const Content = styled(Grid)`
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Add subtle shadow for depth */
  background-color: #ffffff; /* White background for posts section */
  border-radius: 10px; /* Rounded corners for a modern look */
  padding: 20px;
`;

const Home = () => {
  return (
    <>
      <Banner />
      <Container container>
        <Sidebar item lg={2} sm={2} xs={12}>
          <Categories />
        </Sidebar>
        <Content item lg={10} sm={10} xs={12}>
          <Posts />
        </Content>
      </Container>
    </>
  );
};

export default Home;
