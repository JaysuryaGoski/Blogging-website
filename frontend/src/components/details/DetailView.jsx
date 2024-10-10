// Styled Components
import Comments from './comments/Comments';
import { Box, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { API } from '../../service/api';
const Container = styled(Box)`
    margin: 50px 100px;
    ${({ theme }) => theme.breakpoints.down('md') && {
        margin: '20px 10px',
    }}
`;

const Image = styled('img')`
    width: 100%;
    height: 60vh;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

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

const Author = styled(Box)`
    color: #878787;
    display: flex;
    align-items: center;
    margin: 20px 0;
    font-size: 14px;
    ${({ theme }) => theme.breakpoints.down('sm') && {
        display: 'block',
        textAlign: 'center',
    }}
`;

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

const CommentContainer = styled(Box)`
    margin-top: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const CommentAuthor = styled(Typography)`
    font-weight: 600;
    font-size: 18px;
    margin-right: 20px;
`;

const CommentDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const CommentText = styled(Typography)`
    font-size: 16px;
    color: #333;
    line-height: 1.5;
`;

// Component
const DetailView = () => {
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    const [post, setPost] = useState({});
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
        try {
            await API.deletePost(id);
            navigate('/');
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }


    return (
        <Container>
            <Image src={url} />
            <IconWrapper>
                <EditIcon />
                <DeleteIcon onClick={deleteBlog} />
            </IconWrapper>
            <Heading>{post.title}</Heading>
            <Author>
                <CommentAuthor>{post.author}</CommentAuthor>
                <CommentDate>{new Date(post.date).toDateString()}</CommentDate>
            </Author>
            <PostDate>{new Date(post.date).toDateString()}</PostDate>
            <Description>{post.description}</Description>
            <Comments>
                {post.comments.map((comment) => (
                    <CommentContainer key={comment._id}>
                        <CommentAuthor>{comment.name}</CommentAuthor>
                        <CommentDate>{new Date(comment.date).toDateString()}</CommentDate>
                        <CommentText>{comment.comments}</CommentText>
                    </CommentContainer>
                ))}
            </Comments>
        </Container>
    );
};
export default DetailView;