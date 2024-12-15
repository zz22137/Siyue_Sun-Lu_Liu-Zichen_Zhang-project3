import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserProfilePage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/users/${userId}`);
                setUser(res.data.user);
                setPosts(res.data.posts);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [userId]);

    if (!user) return <p>Loading...</p>;

    return (
        <div className="container">
            <h1>{user.username}</h1>
            <p>Bio: {user.description}</p>
            <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
            <h2>Posts</h2>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post._id} className="post">
                        <h3>{post.content}</h3>
                        {post.image && <img src={`http://localhost:5000/${post.image}`} alt="Post" />}
                        <p>At: {new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                ))
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
};

export default UserProfilePage;
