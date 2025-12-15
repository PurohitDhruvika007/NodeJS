import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [twit, setTwit] = useState("");
  const [editId, setEditId] = useState(null);
  const date = Date.now();

  const fetchApi = async () => {
    let res = await axios.get("http://localhost:5000");
    setData(res.data);
  };

  const handleAdd = async () => {
    if (editId == null) {
      let res = await axios.post("http://localhost:5000", {
        id: date,
        message: twit,
      });
      setData(res.data);
    } else {
      let res = await axios.put(`http://localhost:5000/${editId}`, {
        message: twit,
      });
      setData(res.data);
      setEditId(null);
    }
    setTwit("");
  };

  const handleUpdate = (id, message) => {
    setEditId(id);
    setTwit(message);
  };

  const handleDelete = async (id) => {
    let res = await axios.delete(`http://localhost:5000/${id}`);
    setData(res.data);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="twitter-container">

      {/* LEFT SIDEBAR — FILLED */}
      <aside className="left-sidebar">
        <div className="logo">
          <svg viewBox="0 0 24 24" className="twitter-logo">
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.697 4.697 0 002.048-2.591 9.29 9.29 0 01-2.97 1.137 4.66 4.66 0 00-7.93 4.247A13.222 13.222 0 013.15 3.9a4.658 4.658 0 001.444 6.215 4.62 4.62 0 01-2.11-.583v.06a4.664 4.664 0 003.737 4.568 4.683 4.683 0 01-2.104.08 4.667 4.667 0 004.356 3.236A9.345 9.345 0 012 19.54a13.19 13.19 0 007.548 2.212c9.057 0 14.01-7.496 14.01-13.986 0-.21-.005-.423-.014-.633a10.012 10.012 0 002.46-2.548z" />
          </svg>
        </div>


        <nav className="nav">
          <div className="nav-item active">Home</div>
          <div className="nav-item">Explore</div>
          <div className="nav-item">Notifications</div>
          <div className="nav-item">Messages</div>
          <div className="nav-item">Bookmarks</div>
          <div className="nav-item">Lists</div>
          <div className="nav-item">Profile</div>
          <div className="nav-item">More</div>
        </nav>

        <button className="tweet-btn">Tweet</button>

        {/* STATIC PROFILE PREVIEW */}
        <div className="profile-preview">
          <div className="avatar"></div>
          <div>
            <p className="name">Your Name</p>
            <p className="username">@username</p>
          </div>
        </div>
      </aside>

      {/* CENTER — YOUR TWEETS ONLY */}
      <main className="main-feed">
        <div className="feed-header">Home</div>

        <div className="tweet-input">
          <textarea
            placeholder="What's happening?"
            value={twit}
            onChange={(e) => setTwit(e.target.value)}
          />
          <div className="tweet-input-footer">
            <button onClick={handleAdd}>
              {editId ? "Update" : "Tweet"}
            </button>
          </div>
        </div>

        {data.map((ele) => (
          <div className="tweet-card" key={ele.id}>
            <div className="tweet-text">{ele.message}</div>
            <div className="tweet-icons">
              <i className="ri-heart-line icon"></i>

              <i
                className="ri-edit-2-line icon"
                onClick={() => handleUpdate(ele.id, ele.message)}
              ></i>

              <i
                className="ri-delete-bin-6-line icon"
                onClick={() => handleDelete(ele.id)}
              ></i>
            </div>

          </div>
        ))}
      </main>

      {/* RIGHT SIDEBAR — FILLED */}
      <aside className="right-sidebar">
        <input className="search" placeholder="Search Twitter" />

        <div className="card">
          <h4>Trends for you</h4>

          <div className="trend">
            <span className="trend-title">Trending worldwide</span>
            <p>#BreakingNews</p>
            <span className="trend-count">10.9K Tweets</span>
          </div>

          <div className="trend">
            <span className="trend-title">Trending in India</span>
            <p>#WorldNews</p>
            <span className="trend-count">125K Tweets</span>
          </div>

          <div className="trend">
            <span className="trend-title">Technology</span>
            <p>#ReactJS</p>
            <span className="trend-count">54K Tweets</span>
          </div>

          <span className="show-more">Show more</span>
        </div>

        <div className="card">
          <h4>Who to follow</h4>

          <div className="follow">
            <div className="avatar"></div>
            <div>
              <p className="name">Brie</p>
              <p className="username">@sketch_comedy</p>
            </div>
            <button>Follow</button>
          </div>

          <div className="follow">
            <div className="avatar"></div>
            <div>
              <p className="name">Harold</p>
              <p className="username">@h_wang88</p>
            </div>
            <button>Follow</button>
          </div>
        </div>
      </aside>

    </div>
  );
}

export default App;
