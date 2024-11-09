import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/logo1.png';
import { useNavigate, useParams } from 'react-router-dom';
import { FetchPostById, UpdatePost } from '../../config/crudeData';

function UpdateData() {
  const { postId } = useParams();

  // ------Old post-------
  const [oldData, setOldData] = useState({
    title: '',
    image: '',
    content: '',
  });

  const oldImageId = oldData.image;
  console.log("Image id",oldImageId)

  // --------Fetching old post-------------
  useEffect(() => {
    const loadPost = async () => {
      const post = await FetchPostById(postId);
      if (post) {
        setOldData({
          title: post.title,
          image: post.image,
          content: post.content,
        });
      } else {
        console.error('Old Post not found');
      }
    };
    loadPost();
  }, [postId]);

  // -------new Post----------
  const [newData, setNewData] = useState({
    title: '',
    image: '',
    content: '',
  });

  useEffect(() => {
    // Update newData when oldData changes
    setNewData({
      title: oldData.title,
      image: oldData.image,
      content: oldData.content,
    });
  }, [oldData]);

  const handleOnChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setNewData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setNewData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // -------handle Submit--------
  const navigate = useNavigate();
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const updatePost = await UpdatePost(postId, oldImageId, newData);
    if (updatePost) {
      alert('Update Post Success');
      navigate('/dashboard');
    }
  };

  return (
    <>
      <div>UpdatePost</div>
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
                  value={newData.title}
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
                  value={newData.content}
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
                Update Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateData;
