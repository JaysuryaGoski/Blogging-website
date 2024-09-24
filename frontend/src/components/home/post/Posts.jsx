import { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import { API } from '../../../service/api.js';
import Post from './Post';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await API.getAllPosts({ category: category || '' });
                if (response.isSuccess) {
                    setPosts(response.data);
                } else {
                    console.log("Error fetching posts", response.message);
                }
            } catch (error) {
                console.log("Error while fetching posts:", error);
            }
        };
        fetchData();
    }, [category]);

    return (
        <Grid container spacing={3}>
            {posts?.length ? (
                posts.map((post) => (
                    <Grid item lg={3} sm={4} xs={12} key={post._id}>
                        <Link
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            to={`details/${post._id}`}
                        >
                            <Post post={post} />
                        </Link>
                    </Grid>
                ))
            ) : (
                <Box style={{ color: '#878787', margin: '30px 80px', fontSize: 18 }}>
                    <Typography>No data is available for the selected category.</Typography>
                </Box>
            )}
        </Grid>
    );
};

export default Posts;
