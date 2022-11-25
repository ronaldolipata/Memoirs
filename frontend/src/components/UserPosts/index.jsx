import * as React from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { useContext } from 'react';
import { UserContext } from '@/UserContext';
import style from '@/components/UserPosts/style.module.css';

export default function GradientCover() {
  const { posts } = useContext(UserContext);

  return (
    <div className={style.postsContainer}>
      {posts.length === 0 ? (
        <p>No post available</p>
      ) : (
        posts.map(({ _id, title, imageUrl }) => (
          <div key={_id}>
            <Card className={style.card}>
              <CardCover>
                <img src={imageUrl} loading="lazy" alt="" />
              </CardCover>
              <CardCover
                sx={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                }}
              />
              <CardContent sx={{ justifyContent: 'flex-end' }}>
                <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
                  {title}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))
      )}
    </div>
  );
}
