import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = ({ user }) => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/posts');
                setPosts(res.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    const handleCreatePost = async () => {
        if (!newPost.trim()) return;

        try {
            const res = await axios.post('http://localhost:5000/posts', {
                userId: user.id,
                content: newPost,
            });
            setPosts([res.data, ...posts]); 
            setNewPost(''); 
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="container">
            <h1>Recent Posts</h1>

            
            {user && (
                <div className="create-post">
                    <textarea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="Write something..."
                    ></textarea>
                    <button onClick={handleCreatePost}>Post</button>
                </div>
            )}

            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post._id} className="post">
                        <h3>{post.content}</h3>
                        {post.image && <img src={`http://localhost:5000/${post.image}`} alt="Post" />}
                        <p>
                            By: <a href={`/profile/${post.userId._id}`}>{post.userId.username}</a>
                        </p>
                        <p>At: {new Date(post.createdAt).toLocaleString()}</p>
                        
                        {user && post.userId._id === user.id && (
                            <button
                                onClick={async () => {
                                    try {
                                        await axios.delete(`http://localhost:5000/posts/${post._id}`, {
                                            data: { userId: user.id },
                                        });
                                        setPosts(posts.filter((p) => p._id !== post._id));
                                    } catch (error) {
                                        console.error('Error deleting post:', error);
                                    }
                                }}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                ))
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
};

export default HomePage;
