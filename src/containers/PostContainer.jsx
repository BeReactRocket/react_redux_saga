import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../components/Post';
import { getPosts } from '../redux/modules/posts';

const PostContainer = () => {
  const { loading, posts, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return <Post loading={loading} posts={posts} error={error} />;
};

export default PostContainer;
