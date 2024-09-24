import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url('https://1.bp.blogspot.com/-US1FfMco3Lc/YID8RgSJ9oI/AAAAAAAAoJo/sBL8_Cz01_8m136NkBogdm5vn-ddhChSQCLcBGAsYHQ/s16000/Software-development.png');
    width: 100%;
    height: 50vh;
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 20px;
    color: white;
`;

const Wrapper = styled(Box)`
    padding: 40px;
    background-color: #ffffff; /* White background for content area */
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    margin: -60px 20px 20px; /* Overlap with Banner */
`;

const Text = styled(Typography)`
    color: #343a40; /* Dark gray for main text */
    line-height: 1.6;
`;

const HighlightText = styled(Typography)`
    color: #007bff; /* Bright blue for emphasis */
    font-weight: bold;
`;

const ContactLink = styled(Link)`
    color: #007bff;
    transition: color 0.3s;

    &:hover {
        color: #0056b3; /* Darker blue on hover */
    }
`;

const About = () => {
    return (
        <Box>
            <Banner>
                <Typography variant="h4" style={{ textAlign: 'center', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
                    About Me
                </Typography>
            </Banner>
            <Wrapper>
                <Typography variant="h3" style={{ fontWeight: 'bold' }}>Jaysurya Goski</Typography>
                <Text variant="h5">
                    <HighlightText>Career Objective:</HighlightText> 
                    To secure a challenging MERN Stack Web Developer position within a dynamic organization where I can leverage my proficiency in JavaScript, React, Node.js, and MongoDB to develop robust and scalable web applications. 
                    I am eager to contribute my problem-solving skills, adaptability, and strong work ethic to deliver exceptional software solutions that align with the company's objectives.
                    <br />
                    If you are interested, you can view some of my favorite projects here
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <ContactLink href="https://github.com/JaysuryaGoski" target="_blank"><GitHub /></ContactLink>
                    </Box>
                </Text>
                <Text variant="h5">
                    Need something built or simply want to chat? Reach out to me on
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <ContactLink href="https://www.instagram.com/jaysuryagoski13/" target="_blank">
                            <Instagram />
                        </ContactLink>
                    </Box>
                    or send me an Email 
                    <ContactLink href="mailto:jaysuryagoski13@gmail.com?Subject=This is a subject" target="_blank">
                        <Email />
                    </ContactLink>.
                </Text>
            </Wrapper>
        </Box>
    );
}

export default About;
