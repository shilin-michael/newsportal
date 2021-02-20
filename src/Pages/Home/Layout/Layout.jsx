import React, { useState, useEffect } from "react";
import { getService } from "../../../Actions/UserAction";
import Cards from "../../../Components/Card";
import Pagination from "../../../Components/Pagination";
import "./Layout.scss";

const Layout = () => {
  const limit = 5;
  const [sectionList, setSectionList] = useState([]);
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageList, setPageList] = useState({ page: 0, limit: limit });

  const handleClickList = (section) => {
    const newData = articles.filter(
      (item) => item.section.toLowerCase() === section.toLowerCase()
    );
    setArticles(newData);
  };

  const onPageChange = (page) => {
    setPageList({ ...pageList, page: page - 1 });
  };

  const getSectionList = async () => {
    const result = await getService(
      "https://api.nytimes.com/svc/news/v3/content/section-list.json"
    );
    if (result.status == "OK") {
      setSectionList(result?.results || []);
    }
  };

  const getArticle = async () => {
    const result = await getService(
      "https://api.nytimes.com/svc/news/v3/content/all/all.json",
      pageList
    );
    if (result.status == "OK") {
      setArticles(result?.results || []);
      setTotal(result?.num_results);
    }
  };
  
  useEffect(() => {
    getSectionList();
    getArticle();
  }, []);

  useEffect(() => {
    getArticle();
    console.log('on page change')
  }, [pageList]);

  return (
    <div className="sidewrapper">
      <div className="sectionlist">
        {sectionList.map((list) => (
          <div
            className="sideitem"
            key={list.section}
            onClick={(e) => handleClickList(list.section)}
          >
            {list.display_name}
          </div>
        ))}
      </div>
      <div>
        <div className="newslist">
          {articles.map((article) => (
            <Cards {...article} />
          ))}
        </div>
        <div>
          <Pagination
            total={total}
            currentPage={pageList.page + 1}
            pageSize={limit}
            onChangefn={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;
