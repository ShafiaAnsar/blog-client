import React, { useState } from 'react';
import {Navigate } from "react-router-dom"
import Editor from '../Editor';
const CreatePost = () => {
  const [inputValue, setInputValue] = useState({
    title: '',
    summary: '',
    content: '',
    files: null, // Initialize 'files' as null
  });
const [redirect ,setRedirect] = useState(false)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    setInputValue({
      ...inputValue,
      files: file, // Update 'files' with the selected file
    });
  };

  const { title, summary, content, files } = inputValue;

  const createPost = async(e) => {
    e.preventDefault();

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.append('file', files); // Use append to add the file to the FormData

    const response=await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data, // Send the FormData with the request
      credentials:'include'
    })
    if( response.ok){
      setRedirect(true)
    }
  };
if (redirect){
  return <Navigate to={'/'} />
}
  return (
    <form onSubmit={createPost}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="summary"
        placeholder="Summary"
        value={summary}
        onChange={handleInputChange}
      />
      <input type="file" onChange={handleFileChange} />
      <Editor value={content} onChange={(content) => setInputValue({ ...inputValue, content })}/>
      <button style={{ marginTop: '5px', backgroundColor: 'black' }} type="submit">
        Create Post
      </button>
    </form>
  );
};

export default CreatePost;
