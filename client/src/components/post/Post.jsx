import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  return (
    <div className="post">
      <div className="postInfo">
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
        </Link>
      </div>
      <p className="postDesc">{post.desc}</p>
      
    </div>
    
  );
}
