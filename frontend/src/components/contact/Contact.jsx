import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 50vh;
    background-position: center; /* Centered for a better visual */
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
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

const ContactLink = styled(Link)`
    color: #007bff;
    transition: color 0.3s;
    margin-left: 5px; /* Added space between text and icon */

    &:hover {
        color: #0056b3; /* Darker blue on hover */
    }
`;

const ImportantContent = styled(Box)`
    margin-top: 40px;
    background-color: #f8f9fa; /* Light gray background */
    padding: 20px;
    border-left: 4px solid #007bff; /* Blue left border for emphasis */
`;

const Contact = () => {
    return (
        <Box>
            <Banner>
                <Typography variant="h4" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Get in Touch
                </Typography>
            </Banner>
            <Wrapper>
                <Typography variant="h3" style={{ fontWeight: 'bold' }}>Getting in touch is easy!</Typography>
                <Text variant="h5">
                    You can reach out to me through the following platforms:
                </Text>
                <Text variant="h6">
                    <ContactLink href="https://www.instagram.com/jaysuryagoski/" target="_blank">
                        <Instagram />
                    </ContactLink>
                    <Text component="span" style={{ marginLeft: '5px' }}>Instagram</Text>
                </Text>
                <Text variant="h6">
                    <ContactLink href="mailto:jaysuryagoski13@gmail.com?Subject=This is a subject" target="_blank">
                        <Email />
                    </ContactLink>
                    <Text component="span" style={{ marginLeft: '5px' }}>Email</Text>
                </Text>
                <ImportantContent>
                    <Typography variant="h5" style={{ fontWeight: 'bold' }}>Important Information:</Typography>
                    <Text>
                        I am available for freelance projects, collaborations, or any inquiries. 
                        Don't hesitate to reach out if you have a question or need assistance with a project.
                    </Text>
                    <Text>
                        My working hours are Monday to Saturday, 9 AM - 8 PM (IST). 
                        I strive to respond to messages within 24 hours.
                    </Text>
                </ImportantContent>
            </Wrapper>
        </Box>
    );
}

export default Contact;
