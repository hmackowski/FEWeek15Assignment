// Import necessary libraries and components
import React, { useEffect, useState } from "react";  // Importing React along with the hooks `useState` and `useEffect` from the React library
import PostList from "./PostList";  // Importing `PostList` component from the local file `PostList.js`
import axios from "axios";  // Importing `axios` library which is used to make HTTP requests

// Define the API URL
const url = "https://6354ce2cccce2f8c020dc132.mockapi.io/spaceFriends";  // URL endpoint from where we are going to fetch the data

// Define `PostBox` functional component
function PostBox() {

  // Define states using the `useState` hook
  const [postName, setPostName] = useState("");  // Declare a new state variable called `postName` with setter `setPostName` and initial value of empty string
  const [postContent, setPostContent] = useState("");  // Declare a new state variable called `postContent` with setter `setPostContent` and initial value of empty string
  const [posts, setPosts] = useState([]);  // Declare a new state variable called `posts` with setter `setPosts` and initial value of empty array

  // Define `useEffect` hook which will execute once after the initial render because of the empty dependency array
  useEffect(() => {
    fetchData();  // Calling the function `fetchData` once after the initial render
  }, []);  // Dependency array is empty, so this effect runs once after mounting and not on updates

  // Define asynchronous function `fetchData`
  const fetchData = async () => {
    try {
      const response = await axios.get(url);  // Send GET request to the defined url and wait for the response
      setPosts(response.data);  // Set the received response data to `posts` state
    } catch (error) {
      console.error("Error fetching data", error);  // If any error occurs during the fetch, it gets logged to the console
    }
  };

  // Define asynchronous function `handleAddPost`
  const handleAddPost = async () => {
    const newPost = {
      name: postName,
      message: postContent,
    };  // Declare object `newPost` with `name` and `message` properties

    try {
      await axios.post(url, newPost);  // Send POST request to the defined url with `newPost` as data and wait for the response
      fetchData();  // After successfully adding a new post, we fetch all the posts again to update our `posts` state
      setPostName("");  // Reset `postName` state
      setPostContent("");  // Reset `postContent` state
    } catch (error) {
      console.error("Error adding post", error);  // If any error occurs during the post, it gets logged to the console
    }
  };

  // Define function `handleSubmit`
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevents the default form submission behavior
    handleAddPost();  // Call the function `handleAddPost` on form submission
  };

  // Define `useEffect` hook that depends on `posts`
  useEffect(() => {
    document.title = `${posts.length} post(s)`;  // Changes the document title to reflect the number of posts
    console.log(posts.length, 'useEffect was triggered');  // Log the number of posts and a message to the console each time `posts` changes
  }, [posts]);  // The effect depends on `posts`, it will execute each time `posts` changes

  // Define the JSX that this component will render
  return (
    <>
      {/* Code for creating a new post */}
      <div className="post-box">
        <div className="img-box">
          <img
            style={{ height: "50px" }}
            src="https://art.pixilart.com/8aab586e9c05f2d.png"
            alt="ded"
          />
        </div>
        {/* Form for new post */}
        <form onSubmit={handleSubmit} className="input-forms">
          <input
            className="post-name"
            type="text"
            name="name"
            placeholder={`Name:`}
            value={postName}
            onChange={(e) => setPostName(e.target.value)}  // The value of the input is bound to `postName` state, and the state is updated each time input changes
          />
          <br />
          <input
            className="post-content"
            type="text"
            name="message"
            placeholder={`What's on your mind?`}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}  // The value of the input is bound to `postContent` state, and the state is updated each time input changes
          />
          <input className="post-submit" type="submit" value={"Post"} />
        </form>
      </div>
      {/* Render `PostList` component passing `posts` and `setPosts` as props */}
      <PostList posts={posts} setPosts={setPosts} />
    </>
  );
}

// Export the `PostBox` component so it can be imported in other files
export default PostBox;
