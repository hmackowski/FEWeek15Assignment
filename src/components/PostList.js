// PostList.js
// Importing necessary libraries and components
import React from 'react';  // Importing React library
import Post from './Post';  // Importing `Post` component from the local file `Post.js`
import axios from 'axios';  // Importing `axios` library which is used to make HTTP requests

// Defining `PostList` functional component
// It receives `posts` (array of post objects) and `setPosts` (function to update posts) as props
function PostList({ posts, setPosts }) {

  // Define the API URL
  const url = "https://6354ce2cccce2f8c020dc132.mockapi.io/spaceFriends";  // URL endpoint from where we are going to fetch and delete the data

  // Defining function `handleDeletePost` which takes post to delete as argument
  const handleDeletePost = (postToDelete) => {
    axios.delete(`${url}/${postToDelete.id}`);  // Send DELETE request to the defined url with post id appended to delete the post and wait for the response
    const updatedPosts = posts.filter(post => post.id !== postToDelete.id);  // Filter out the deleted post from `posts` state and save it to `updatedPosts`
    setPosts(updatedPosts);  // Update `posts` state with `updatedPosts`
  };

  // Return the JSX that this component will render
  return (
    <div className='posts'>
      {/* Map through `posts` array and render `Post` component for each post */}
      {posts.map((post, index) => (
        <Post
          key={post.id}  // Unique key for each post for React to keep track of each rendered Post component
          postId={post.id}  // Pass the post id as `postId` prop
          post={post}  // Pass the whole post object as `post` prop
          onDelete={handleDeletePost}  // Pass the `handleDeletePost` function as `onDelete` prop
          setPosts={setPosts}  // Pass the `setPosts` function as `setPosts` prop
        />
      ))}
    </div>
  );
}

// Export `PostList` component so it can be imported in other files
export default PostList;
