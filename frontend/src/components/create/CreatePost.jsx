import { useState, useEffect, useContext } from 'react';
import { styled, Box, TextareaAutosize, Button, InputBase, FormControl } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
};

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState(null);
    const { account } = useContext(DataContext);

    const defaultImage = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    const url = post.picture || defaultImage;

    // Handle file upload
    useEffect(() => {
        if (file) {
            const uploadImage = async () => {
                const formData = new FormData();
                formData.append('file', file);

                const response = await API.uploadFile(formData, null, null);
                if (response.isSuccess) {
                    setPost((prevPost) => ({
                        ...prevPost,
                        picture: response.data.imageUrl // Ensure imageUrl matches the server's response key
                    }));
                } else {
                    console.error('Image upload failed:', response.error);
                }
            };
            uploadImage();
        }
    }, [file]);

    // Set initial post state based on location and account
    useEffect(() => {
        if (location.search) {
            const categories = location.search.split('=')[1] || 'All';
            setPost((prevPost) => ({
                ...prevPost,
                categories,
                username: account.username
            }));
        }
    }, [location.search, account.username]);

    // Save post to the server
    const savePost = async () => {
        try {
            const response = await API.createPost(post);
            if (response.isSuccess) {
                navigate('/');
            } else {
                console.error('Error creating post:', response.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Handle input field changes
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    return (
        <Container>
            {/* Image preview */}
            <Image src={url} alt="post" />

            {/* File input and title field */}
            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField
                    onChange={handleChange}
                    name="title"
                    placeholder="Title"
                />
                <Button onClick={savePost} variant="contained" color="primary">
                    Publish
                </Button>
            </StyledFormControl>

            {/* Post description */}
            <Textarea
                minRows={5}
                placeholder="Tell your story..."
                name="description"
                onChange={handleChange}
            />
        </Container>
    );
};

export default CreatePost;
