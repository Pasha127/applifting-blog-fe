import React from "react";
import { Container } from "react-bootstrap";
import "./home.css";
import Navbar from "../navbar/navbar"
import ArticlePreview from "../articlePreview/articlePreview";
import { placeholderArticleArray } from "../../lib/tools/placeholders";
const Home = (props) => {
  return (<>
    <Navbar/>
    <Container className="home-body">
      <h1 className="">Recent Articles</h1>
        <div className="article-preview-container">
            {placeholderArticleArray.map((article, index) =>
                <ArticlePreview key={index + article.title} article={article}/>
            )}
        </div>
    </Container>
    </>);
};

export default Home;
