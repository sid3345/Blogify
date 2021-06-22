import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from "@material-ui/core/styles";
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'sticky',
    display: 'flex',
    justifyContent: 'center',
    border : "1px solid black",
    width : "25%",
    margin : "0 35%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft : "200px"
  },
   
}))

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  const classes = useStyles();

  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  const handleSearchChange=(e)=>{
    setKeyword(e.target.value.toLowerCase());
    }

  const filteredPosts = posts.filter((post)=>{
  let postTitle = post.title.toString().toLowerCase();
  return postTitle.indexOf(keyword) > -1;
  })

  return (
    <>
      <Header />
            <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
            
              inputProps={{ 'aria-label': 'search', 
              onChange: (e)=>handleSearchChange(e) }}
            />
          </div>
      <div className="home">
        <Posts posts={filteredPosts} />
      </div>
    </>
  );
}
