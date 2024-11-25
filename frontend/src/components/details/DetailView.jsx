import { useState, useEffect, useContext } from 'react';

import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

// components
import Comments from './comments/Comments';

const Container = styled(Box)(({ theme }) => ({
  margin: '50px auto',
  padding: '0 20px',
  maxWidth: '1200px',
  [theme.breakpoints.down('md')]: {
    margin: '20px auto',
    padding: '0 10px',
  },
}));

const Image = styled('img')({
  width: '100%',
  height: '60vh',
  objectFit: 'cover',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
});

const ActionsWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
  marginTop: '10px',
});

const EditIcon = styled(Edit)`
  padding: 8px;
  border: 1px solid #1976d2;
  border-radius: 50%;
  color: #1976d2;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #e3f2fd;
    transform: scale(1.1);
  }
`;

const DeleteIcon = styled(Delete)`
  padding: 8px;
  border: 1px solid #d32f2f;
  border-radius: 50%;
  color: #d32f2f;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #ffebee;
    transform: scale(1.1);
  }
`;

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: '36px',
  fontWeight: '700',
  textAlign: 'center',
  margin: '30px 0',
  letterSpacing: '1px',
  color: '#333',
  [theme.breakpoints.down('sm')]: {
    fontSize: '28px',
    margin: '20px 0',
  },
}));

const Author = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '20px 0',
  fontSize: '14px',
  color: '#555',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

const AuthorLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  fontWeight: 600,
  '&:hover': {
    textDecoration: 'underline',
  },
});

const Description = styled(Typography)(({ theme }) => ({
  lineHeight: '1.7',
  color: '#444',
  fontSize: '18px',
  textAlign: 'justify',
  marginTop: '20px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
  },
}));

const DetailView = () => {
  const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

  const [post, setPost] = useState({});
  const { account } = useContext(DataContext);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, []);

  const deleteBlog = async () => {
    await API.deletePost(post._id);
    navigate('/');
  };

  return (
    <Container>
      <Image src={post.picture || url} alt="Post Thumbnail" />
      <ActionsWrapper>
        {account.username === post.username && (
          <>
            <Link to={`/update/${post._id}`}>
              <EditIcon />
            </Link>
            <DeleteIcon onClick={deleteBlog} />
          </>
        )}
      </ActionsWrapper>
      <Heading>{post.title}</Heading>
      <Author>
        <AuthorLink to={`/?username=${post.username}`}>
          Author: {post.username}
        </AuthorLink>
        <Typography>{new Date(post.createdDate).toDateString()}</Typography>
      </Author>
      <Description>{post.description}</Description>
      <Comments post={post} />
    </Container>
  );
};

export default DetailView;
