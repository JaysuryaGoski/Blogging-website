/* eslint-disable react/prop-types */
// Styled Components
import { Box, Typography, styled } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useContext } from 'react';
import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';
const StyledComment = styled(Box)`
    margin-top: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const StyledContainer = styled(Box)`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const StyledName = styled(Typography)`
    font-weight: 600;
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const StyledDeleteIcon = styled(Delete)`
    margin-left: auto;
    cursor: pointer;
    color: #f44336;
    &:hover {
        color: #d32f2f;
    }
`;

const StyledCommentText = styled(Typography)`
    font-size: 16px;
    color: #333;
    line-height: 1.5;
`;

// Component
const Comment = ({ comment, setToggle }) => {
    const { account } = useContext(DataContext);

    const removeComment = async () => {
        try {
            await API.deleteComment(comment._id);
            setToggle((prevToggle) => !prevToggle);
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    return (
        <StyledComment>
            <StyledContainer>
                <StyledName>{comment.name}</StyledName>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
            </StyledContainer>
            <StyledContainer>
                <StyledName>{comment.name}</StyledName>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                {comment.name === account?.username && (
                    <StyledDeleteIcon onClick={removeComment} />
                )}
            </StyledContainer>
            <StyledCommentText>{comment.comments}</StyledCommentText>
        </StyledComment>
    );
};

export default Comment;