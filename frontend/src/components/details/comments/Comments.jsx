import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';

import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';

// Components
import Comment from './Comment';

// Styled Components
const Container = styled(Box)`
    margin-top: 50px;
    display: flex;
    align-items: center;
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%',
    objectFit: 'cover',
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
    padding: 10px;
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid #ccc;
    &:focus-visible {
        outline: none;
        border-color: #3f51b5;
    }
`;

const CommentBox = styled(Box)`
    margin-top: 20px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({ post }) => {
    const defaultAvatar = 'https://static.thenounproject.com/png/12017-200.png';

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const { account } = useContext(DataContext);

    // Fetch comments for the post
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await API.getAllComments(post._id);
                if (response.isSuccess) {
                    setComments(response.data);
                }
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        }
        fetchComments();
    }, [toggle, post]);

    // Update comment object when user types
    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account?.username || 'Anonymous',
            postId: post._id,
            comments: e.target.value
        });
    };

    // Post a new comment
    const addComment = async () => {
        try {
            await API.newComment(comment);
            setComment(initialValue);
            setToggle(prev => !prev);
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    }

    return (
        <Box>
            <Container>
                <Image src={defaultAvatar} alt="user avatar" />   
                <StyledTextArea 
                    rowsMin={5} 
                    placeholder="What's on your mind?"
                    onChange={handleChange} 
                    value={comment.comments}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40, textTransform: 'none' }}
                    onClick={addComment}
                >
                    Post
                </Button>             
            </Container>

            <CommentBox>
                {
                    comments && comments.length > 0 ? comments.map(comment => (
                        <Comment key={comment._id} comment={comment} setToggle={setToggle} />
                    )) : (
                        <Typography style={{ color: '#888', marginTop: '20px' }}>
                            Be the first to comment!
                        </Typography>
                    )
                }
            </CommentBox>
        </Box>
    )
}

export default Comments;
