const Post = ({ loading, posts, error }) => {
  if (loading) {
    return <div>Post Loading...</div>;
  }
  if (error) {
    return <div>Error on Post</div>;
  }
  return (
    <div>
      <ul>
        {posts && posts.map((post) => <li key={post.id}>{post.title}</li>)}
      </ul>
    </div>
  );
};

export default Post;
