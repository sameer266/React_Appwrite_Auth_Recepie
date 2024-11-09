import React, { useEffect, useState } from 'react';
import "../style/home.css";
import { FetchAllPosts, GetImage } from '../config/crudeData';
import { Link } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([]);
    const [showBox, setShowBox] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch all posts initially
            const allPosts = await FetchAllPosts();

            // For each post, fetch the image URL using the featureImage ID
            const postsWithImages = await Promise.all(
                allPosts.map(async (post) => {
                    const imageUrl = post.featureImage ? await GetImage(post.featureImage) : '';
                    return { ...post, imageUrl }; // Add `imageUrl` property to each post
                })
            );

            setPosts(postsWithImages); // Set state with updated posts containing image URLs

            // Show the box after posts are fetched
            setShowBox(true);
        };

        fetchData();
    }, []);

    return (
        <div className="home px-4 mb-16 ">
            <h1 style={{ textAlign: 'center', fontSize: "30px", textShadow: "1px 1px 1px black, 3px 3px 3px black" }}>
                All Recipe Food
            </h1>

            {/* ------------Box ------------ */}
            <div className={`box ${showBox ? 'show' : ''}`}>
                <p> Please Login or Sign Up To Get Data and Post Data</p>
                <Link to="/login">
                    <button className="login-btn">
                        Log In
                    </button>
                </Link>
            </div>

            {/* Grid container */}
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
                {posts.map((post) => (
                    <div key={post.$id} className="max-w-72 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 hover:shadow-slate-950">
                        <a>
                            <img
                                className="rounded-t-lg w-full"
                                src={post.imageUrl} // Use the `imageUrl` here
                                alt={post.title}
                            />
                        </a>
                        <div className="p-5">
                            <a>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {post.title}
                                </h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {post.content}
                            </p>
                            <a 
                                style={{ cursor: "pointer" }} 
                                onClick={() => alert("please Login or Signup")} 
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
