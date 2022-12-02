import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import style from '@/components/PostPicture/style.module.css';

const PostPicture = ({ imageUrl }) => {
  return (
    <div className={style.postPictureContainer}>
      <Card className={style.card}>
        <CardCover>
          <img src={imageUrl} loading="lazy" alt="post picture" />
        </CardCover>
        <CardContent sx={{ justifyContent: 'flex-end' }}></CardContent>
      </Card>
    </div>
  );
};

export default PostPicture;
