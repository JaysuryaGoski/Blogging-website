import { useState, useEffect } from 'react';
import { Box, styled, TextareaAutosize, Button, FormControl, InputBase } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

import { API } from '../../service/api';

// Styled Components
const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: '20px 10px',
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '20px',
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 24px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
`;

const StyledTextArea = styled(TextareaAutosize)`
    width: 100%;
    margin-top: 20px;
    font-size: 18px;
    border-radius: 10px;
    border: 1px solid #ccc;
    padding: 15px;
    box-sizing: border-box;
    &:focus-visible {
        outline: none;
    }
`;

// Initial post structure
const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: 'codeforinterview',
    categories: 'Tech',
    createdDate: new Date()
}

const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState(null);
    const [imageURL, setImageURL] = useState('');
    const defaultImageURL = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    // Fetch post details by ID
    useEffect(() => {
        const fetchPost = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchPost();
    }, [id]);

    // Handle image upload and update post
    useEffect(() => {
        const uploadImage = async () => {
            if (file) {
                const data = new FormData();
                data.append('name', file.name);
                data.append('file', file);

                let response = await API.uploadFile(data);
                if (response.isSuccess) {
                    setImageURL(response.data);
                    setPost(prevState => ({
                        ...prevState,
                        picture: response.data
                    }));
                }
            }
        }
        uploadImage();
    }, [file]);

    // Update the blog post
    const updateBlogPost = async () => {
        await API.updatePost(post);
        navigate(`/details/${id}`);
    };

    // Handle input changes
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    return (
        <Container>
            {/* Display image (either from post data or default image) */}
            <Image src={post.picture || imageURL || defaultImageURL} alt="Post" />

            {/* Form control for title and image upload */}
            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" style={{ cursor: 'pointer' }} />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField
                    onChange={handleChange}
                    value={post.title}
                    name="title"
                    placeholder="Title"
                />
                <Button
                    onClick={updateBlogPost}
                    variant="contained"
                    color="primary"
                    style={{ margin: '0 30px' }}
                >
                    Update
                </Button>
            </StyledFormControl>

            {/* Text area for post description */}
            <StyledTextArea
                minRows={5}
                placeholder="Tell your story..."
                name="description"
                onChange={handleChange}
                value={post.description}
            />
        </Container>
    );
};

export default Update;
