import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '@/App.css';

function App() {
  const [posts, setPosts] = useState(null);
  const [users, setUsers] = useState(null);

  const { username } = useParams();
  console.log(username);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(
        'http://localhost:5000/api/v1/users/mujang3'
      );
      // `http://localhost:5000/api/v1/users/${username}`
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setUsers([data]);
      }
    };
    fetchPost();
  }, []);

  // users.map(({ userDetails, userPosts }) => {});

  return (
    <div className="App">
      <div>
        {users &&
          users.map(({ userDetails, userPosts }) => (
            <p key={userDetails._id}>
              {userDetails.username} {userDetails.country}
            </p>
          ))}
      </div>
    </div>
  );
}

export default App;
