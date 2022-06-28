import React, { useState, useEffect } from "react";

const App = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("react");
  const [url, setUrl] = useState(
    "http://hn.algolia.com/api/v1/search?query=react"
  );

  const [loading, setLoading] = useState(false);

  const fetchNews = () => {
    setLoading(true);
    fetch(url)
      .then((result) => result.json())
      .then((data) => (setNews(data.hits), setLoading(false)))
      .then((error) => console.log(error));
  };
  useEffect(() => {
    fetchNews();
  }, [url]);

  const handleChanges = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  };

  const showLoading = () => {
    return loading ? <h2>loading...</h2> : " ";
  };

  const searchForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="text" value={searchQuery} onChange={handleChanges}></input>
      <button>search</button>
    </form>
  );

  const searchNews = () => news.map((n, i) => <p key={i}>{n.title}</p>);

  return (
    <>
      <h2>All React News</h2>
      {showLoading()}
      {searchForm()}
      {searchNews()}
    </>
  );
};
export default App;
