import { Outlet, useLocation, useParams } from 'react-router-dom';
import Post from '../components/Post';
import { usePosts } from '../contexts/PostContext';
import { useEffect } from 'react';

const PostPage = () => {
  const { id } = useParams();
  const { getPost } = usePosts();
  const { pathname } = useLocation();

  useEffect(() => {
    getPost(id);
  }, [id]);

  return (
    <>
      {!pathname.includes('editpost') && <Post />}
      <Outlet />
    </>
  );
};

export default PostPage;
