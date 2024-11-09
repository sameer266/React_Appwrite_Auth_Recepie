import React, { useState } from 'react';
import {  useNavigate, useParams} from 'react-router-dom';
import logo from '../../assets/images/logo1.png';
import { CreatePost } from '../../config/crudeData';


function AddData() {

  const {userId}=useParams();


  const [formData, setFormData] = useState({
    title: '',
    image: null,  // Set initial state for image as null
    content: '',
    userId: String(userId)
  });

  const handleOnChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      // Handle file input separately
      setFormData((prevData) => ({
        ...prevData,
        image: files[0]  // Assign the file object directly to `image`
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  // ---------Handle on submit--------
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    
    // Pass the `formData` fields, ensuring `image` is properly uploaded
    const addPostStat = await CreatePost(formData.title, formData.image, formData.content,formData.userId);
    if (addPostStat) {
      navigate('/dashboard');
      alert('Post added successfully');

    } else {
      alert('Error adding post');
    }
  };

  return (
    <div className="mt-20 flex flex-col justify-center font-sans sm:h-screen p-4">
      <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <div className="text-center mb-12">
          <img src={logo} alt="logo" className="w-40 inline-block" />
        </div>

        <form onSubmit={handleOnSubmit}>
          <div className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Title</label>
              <input
                value={formData.title}
                onChange={handleOnChange}
                name="title"
                type="text"
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter Title"
              />
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Choose Image</label>
              <input
                onChange={handleOnChange}
                name="image"
                type="file"
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
              />
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Content</label>
              <textarea
                value={formData.content}
                onChange={handleOnChange}
                name="content"
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter content..."
              />
            </div>
          </div>

          <div className="mt-12">
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Add Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddData;
