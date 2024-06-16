import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { usePosts } from '../contexts/PostContext';
import Spinner from './Spinner';

const Post = () => {
  const { currentPost, isLoading, deletePost, deselectPost } = usePosts();
  const navigate = useNavigate();

  const handleDelete = async () => {
    deselectPost();
    await deletePost(currentPost.id);
    navigate('/');
  };

  if (isLoading) return <Spinner />;
  if (currentPost === undefined && !isLoading) return navigate('*');
  if (!currentPost.id) return;

  document.title = `Meiersbook | ${currentPost.title}`;

  return (
    <div className="post-container" post-id={currentPost.id}>
      <h1 className="title-heading">{currentPost.title}</h1>
      <div className="post-image">
        <img
          src={require(`../img/posts/${currentPost.image}`)}
          alt={currentPost.title}
        />
      </div>
      <div className="buttons-nav front-panel">
        <Link className="btn" to="/">
          <Button level="secondary" onClick={deselectPost}>
            Go back
          </Button>
        </Link>
        <Link className="btn" to="editpost">
          <Button level="secondary">Modify</Button>
        </Link>
        <Button
          className="btn delete-btn"
          level="delete"
          onClick={handleDelete}
        >
          Delete post
        </Button>
      </div>
    </div>
  );
};

export default Post;
