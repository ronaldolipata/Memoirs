import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { UserContext } from '@/UserContext';
import style from '@/components/UserPosts/style.module.css';

const UserPosts = () => {
  const { username, posts, searchedUserPosts } = useContext(UserContext);

  const { usernameParams } = useParams();

  return (
    <div className={style.postsContainer}>
      {username !== null && usernameParams === username
        ? posts.map(({ _id, title, imageUrl }) => (
            <div key={_id}>
              <Link to={`post/${_id}`}>
                <Card className={style.card}>
                  <CardCover>
                    <img src={imageUrl} loading="lazy" alt="post picture" />
                  </CardCover>
                  <CardCover
                    sx={{
                      background:
                        'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                    }}
                  />
                  <CardContent sx={{ justifyContent: 'flex-end' }}>
                    <Typography
                      level="h2"
                      fontSize="lg"
                      textColor="#fff"
                      mb={1}
                    >
                      {title}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))
        : searchedUserPosts.map(({ _id, title, imageUrl }) => (
            <div key={_id}>
              <Link to={`post/${_id}`}>
                <Card className={style.card}>
                  <CardCover>
                    <img src={imageUrl} loading="lazy" alt="post picture" />
                  </CardCover>
                  <CardCover
                    sx={{
                      background:
                        'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                    }}
                  />
                  <CardContent sx={{ justifyContent: 'flex-end' }}>
                    <Typography
                      level="h2"
                      fontSize="lg"
                      textColor="#fff"
                      mb={1}
                    >
                      {title}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
    </div>
  );
};

export default UserPosts;
