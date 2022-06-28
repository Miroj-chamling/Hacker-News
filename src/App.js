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

// const App = () => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     document.title = `Clicked ${count} times`;
//   });

//   const increment = () => {
//     setCount(count + 1);
//   };

//   const decrement = () => {
//     setCount(count - 1);
//   };

//   return (
//     <>
//       <h2>Counter App</h2>
//       <button onClick={increment}> + </button>
//       <h2>{count}</h2>
//       <button onClick={decrement}> - </button>
//     </>
//   );
// };

// class App extends Component {
//   state = {
//     count: 0,
//   };
//   increment = () => {
//     this.setState({
//       count: this.state.count + 1,
//     });
//   };
//   componentDidMount() {
//     document.title = `Clicked ${this.state.count} times`;
//     console.log("component mounted");
//   }
//   componentDidUpdate() {
//     document.title = `Clicked ${this.state.count} times`;
//     console.log("component updated");
//   }
//   render() {
//     return (
//       <div>
//         <h2>Counter App</h2>
//         <button onClick={this.increment}>
//           Clicked {this.state.count} times.
//         </button>
//       </div>
//     );
//   }
// }

export default App;
