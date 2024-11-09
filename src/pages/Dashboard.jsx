import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {  DeletePost, FetchOneContent, FetchPostById } from '../config/crudeData';

function Dashboard({ user }) {
  const [userData, setUserData] = useState([]);
  const userId =user.$id; // Example user ID

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log(user)
        const data = await FetchOneContent(userId);
        console.log('Fetched data:', data);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

   
      fetchUserData();
    
  }, []);

  // ---------delete POst---------
const navigate =useNavigate()
  const handleSubmitDelete=async (postId)=>{

    const post= await FetchPostById(postId)
    console.log( "POst data" ,post)
    

     const response= await DeletePost(postId,post.image);
     if(response){
      alert("Delete Success")
      setUserData((prevData)=>(
        prevData.filter((data)=>data.$id !==postId) //==>to remove delted data ffrom state
      ))
      navigate('/dashboard');
     }
     else{
      console.error("Failed to delete post")
     }


  }


  

  return (
    <div className=" mb-20  dashboard p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-20">
        Welcome {user.name || 'Guest'}
      </h1>
      
      {/* --------Add post button ---------- */}
      <Link to={`/dashboard/add-post/${userId}`} >
        <button className="mt-10 w-full sm:w-auto bg-gradient-to-br from-cyan-500 to-black text-white text-sm font-medium rounded-lg px-6 py-3 transition-transform transform hover:scale-105">
          Add Post
        </button>
      </Link>


      <div className="dashboard-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        {userData ? (
          userData.map((document, index) => (
            <div
              key={index}
               className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-4">{document.title}</h3>

              {document.featureImage && (
                <img
                  src={document.featureImage}
                  alt="Post"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}

              <p className="text-gray-700">{document.content}</p>
             

                {/*----Update Button----  */}

      <Link   to={`/dashboard/update-post/${document.$id}`} >
      <button type="button" class="w-full mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Update</button>
      </Link>

        {/* --------Delete Button */}
      <Link>
      <button onClick={()=>handleSubmitDelete(document.$id)} type="button" class="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Delete</button>
      </Link>
            </div>

          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No content available</p>
        )}
        
      </div>

     
    </div>
  );
}

export default Dashboard;
