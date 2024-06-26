import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { usePosts } from '../contexts/PostContext';

const PostGallery = () => {
  const { data, currentPost, deselectPost } = usePosts();
  const number = data?.length;
  document.title = 'Meiersbook | All posts';

  // To prevent load undefined posts when clicking in
  if (currentPost === undefined || currentPost.length !== 0) deselectPost();

  return (
    <>
      <div className="front-panel">
        <Link className="btn compose-btn" to="/newpost">
          <Button level="secondary">New post</Button>
        </Link>
        <h1 className="primary-heading">
          {number > 0
            ? `You have ${number} post${number === 1 ? '' : 's'}:`
            : 'You have no posts! How about to create one?'}
        </h1>
      </div>
      <div className="card-container">
        {data
          ?.slice()
          .sort((a, b) => +a.title - b.title)
          .map((post) => (
            <Card post={post} key={post.id} />
          ))}
      </div>
    </>
  );
};

export default PostGallery;
