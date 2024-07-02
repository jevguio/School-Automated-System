import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { format, formatDistanceToNow, formatRelative } from 'date-fns';
import { Box, ImageList, ImageListItem, Pagination, useMediaQuery } from '@mui/material';
import { auto } from '@popperjs/core';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({studentData}) {
  const [expanded, setExpanded] = React.useState(false);
  const [pagVal, setPagVal] = React.useState(0);
  const [posts, setPosts] = React.useState([]);
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  const [cols, setCols] = React.useState(2);
  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/post/get', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.data) {

          setPosts(Array.from(data.data));
        }else{
          W
        }
        Array.from(data.data).map((d, index) => { 
          if (Array.from(JSON.parse(d.fileImage)).length === 0) {

            setCols(2)
          } else if (Array.from(JSON.parse(d.fileImage)).length === 1) {

            setCols(1)
          } else if (Array.from(JSON.parse(d.fileImage)).length === 2) {

            setCols(2)
          } else if (Array.from(JSON.parse(d.fileImage)).length === 3) {

            setCols(2)
          } else {

            setCols(4)
          }
        })
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    setInterval(fetchPosts, 1000); 
  }, []);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'EEE, dd:MM:yy');
  };

  const formatTimeAgo = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  };

  const formatRelativeDate = (dateString) => {
    return formatRelative(new Date(dateString), new Date());
  };
  const matches = useMediaQuery('(min-width:600px)');
  // const filteredPosts = posts.filter(post =>
  //   post.departments_value.toLowerCase().includes(studentData.department)
  // );
  return (
    <>
      {posts.map((post, index) =>
        <Card sx={{ maxWidth: '70%', marginLeft: 'auto', marginRight: 'auto', marginBottom: '5%' }} key={index}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Shrimp and Chorizo Paella"
            subheader={formatTimeAgo(post.created_at)}
          />
          {post.fileImage !== "[]" ?
            <CardMedia
              key={index}
              component="img"
              sx={{ maxHeight: '40vh', maxWidth: '100%', height: '100%', width: 'auto', objectFit: 'cover', marginLeft: 'auto', marginRight: 'auto' }}
              image={"./storage/" + JSON.parse(post.fileImage)[pagVal]}
              alt="Paella dish"
            />
            : ''}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 1,
            }}
          >{Array.from(JSON.parse(post.fileImage)).map((va, index) =>
            <CardMedia
              key={index}
              component="img"
              sx={{
                maxHeight: matches ? '15%' : '',
                maxWidth: matches ? '12%' : (100 / Array.from(JSON.parse(post.fileImage)).length) + '%',
                height: '100%',
                margin: '2px',
                cursor: 'pointer',
                aspectRatio: '1/1'
              }}
              image={"./storage/" + va}
              onClick={() => setPagVal(index)}
              alt="Paella dish"
            />)}
          </Box>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post.title}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>

                {post.description}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      )}
    </>

  );
}
