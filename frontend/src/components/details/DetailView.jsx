import { useState, useEffect, useContext } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

// Components
import Comments from './comments/Comments';

// Styled Components
const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: '20px 10px',
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '60vh',
    objectFit: 'cover',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
});

const IconWrapper = styled(Box)`
    float: right;
    display: flex;
    gap: 10px;
`;

const EditIcon = styled(Edit)`
    cursor: pointer;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 50%;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const DeleteIcon = styled(Delete)`
    cursor: pointer;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 50%;
    &:hover {
        background-color: #f8d7da;
    }
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 700;
    text-align: center;
    margin: 40px 0 10px;
    letter-spacing: 1px;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
    fontSize: '14px',
    [theme.breakpoints.down('sm')]: {
        display: 'block',
        textAlign: 'center',
    },
}));

const PostDate = styled(Typography)`
    margin-left: auto;
    font-size: 14px;
    color: #555;
`;

const Description = styled(Typography)`
    line-height: 1.7;
    color: #444;
    font-size: 18px;
    margin-top: 20px;
    text-align: justify;
`;

const DetailView = () => {
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    const [post, setPost] = useState({});
    const { account } = useContext(DataContext);
    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        const fetchPostData = async () => {
            const response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchPostData();
    }, [id]);

    const deleteBlog = async () => {  
        await API.deletePost(post._id);
        navigate('/');
    }

    return (
        <Container>
            <Image src={post.picture || url} alt="Post" />
            
            {account.username === post.username && (
                <IconWrapper>
                    <Link to={`/update/${post._id}`}>
                        <EditIcon color="primary" />
                    </Link>
                    <DeleteIcon onClick={deleteBlog} color="error" />
                </IconWrapper>
            )}

            <Heading>{post.title}</Heading>

            <Author>
                <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>
                        Author: <span style={{ fontWeight: 600 }}>{post.username}</span>
                    </Typography>
                </Link>
                <PostDate>{new Date(post.createdDate).toDateString()}</PostDate>
            </Author>

            <Description>{post.description}</Description>

            <Comments post={post} />
        </Container>
    );
}

export default DetailView;
