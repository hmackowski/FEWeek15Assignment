// Importing necessary libraries
import React, { useState } from "react";  // Importing React library along with the hook `useState`
import axios from "axios";  // Importing `axios` library which is used to make HTTP requests

// Define the API URL
const url = "https://6354ce2cccce2f8c020dc132.mockapi.io/spaceFriends";  // URL endpoint from where we are going to fetch and update the data

// Define `Post` functional component
// It receives `postId`, `post`, `onDelete`, and `setPost` as props
function Post({ postId, post, onDelete, setPost }) {

  // Define states using `useState` hook
  const [isEditing, setIsEditing] = useState(false);  // State to handle editing status of a post
  const [message, setMessage] = useState(post.message);  // State to store and update post's message

  // Function to handle Edit button click event
  function handleEdit() {
    setIsEditing(true);  // Set `isEditing` to true, enabling the editing mode
  }

  // Asynchronous function to handle Save button click event
  async function handleSave() {
    try {
      console.log(postId);  // Log the `postId`
      // Send a PUT request to the server with updated message and wait for the response
      await axios.put(`${url}/${postId}`, { message });
      setIsEditing(false);  // Set `isEditing` to false, disabling the editing mode
    } catch (err) {
      console.error(err);  // Log the error if any
    }
  }

  // Function to handle changes in the textarea input
  function handleChange(e) {
    setMessage(e.target.value);  // Update `message` state with the new value of the textarea input
  }

  // Define the JSX that this component will render
  return (
    <div className="post" id={postId}>
      <div className="delete-button">
        {/* Delete button that calls `onDelete` function with `post` as argument */}
        <button className="button-x" onClick={() => onDelete(post)}>X</button>
        {/* Conditionally render Save button or Edit button depending on `isEditing` state */}
        {isEditing ? (
          <button className="save-button" onClick={handleSave}>Save</button>
        ) : (
          <button className="edit-button" onClick={handleEdit}>Edit</button>
        )}
      </div>
      <br />
      <div className="img-box">
        {/* Render post's avatar and name */}
        <img style={{ height: "80px" }} src={post.avatar} alt="" />
        <h3>{post.name}</h3>
      </div>
      <form className="input-forms">
        {/* Textarea input for post's message */}
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          value={message}
          disabled={!isEditing}  // Textarea is disabled when not in editing mode
          readOnly={!isEditing}  // Textarea is read-only when not in editing mode
          onChange={handleChange}  // Call `handleChange` function when textarea input changes
        ></textarea>
      </form>
    </div>
  );
}

// Export `Post` component so it can be imported in other files
export default Post;
