import "./App.css";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useState, useEffect } from "react";
import User from "./user";
import Pagination from "./pagination";
import Spinner from "./spinner";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineMore,
} from "react-icons/ai";

function App() {
  const [search, setSearch] = useState();
  const [spinner, setSpinner] = useState(false);
  const [user, setUser] = useState([]);
  const [count, setCount] = useState();
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };
  console.log(count);
  const searchUser = () => {
    axios.get(`https://api.github.com/users/${search}`).then((response) => {
      setUser(response.data);
      setCount(response.data.public_repos);
    });
  };
  const searchButton = () => {
    searchUser();
  };
  useEffect(() => {
    const getRepos = async (currentPage) => {
      setSpinner(true);
      const res = await fetch(
        `https://api.github.com/users/${search}/repos?page=${currentPage}&per_page=4`
      );
      const data = await res.json();
      setItems(data);
      setSpinner(false);
      console.log(data);
    };
    getRepos(currentPage);
  }, [currentPage, user]);

  return (
    <div className="App">
      <div className="div2">
        <div>
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Enter user eg: johnpapa"
          />
          <button
            type="button"
            class="btn btn-primary position-relative"
            onClick={searchButton}
          >
            search
          </button>
        </div>

        <User user={user} />
        <div className="paginatemain">
          {items?.map(({ name, description }) => (
            <Pagination name={name} description={description} />
          ))}
        </div>
        {spinner && <Spinner />}
        <div className="paginate1">
          {count && (
            <ReactPaginate
              previousLabel={<AiOutlineDoubleLeft />}
              nextLabel={<AiOutlineDoubleRight />}
              breakLabel={"..."}
              pageCount={count / 4}
              pageRangeDisplayed={"3"}
              onPageChange={handlePageClick}
              containerClassName={"pagination justify-content-center"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
