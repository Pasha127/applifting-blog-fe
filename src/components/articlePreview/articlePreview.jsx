import React from "react";
import { Container } from "react-bootstrap";
import "./articlePreview.css";
import format from "date-fns/format";
import upDog from "../../lib/assets/UpShiba.png"
import downDog from "../../lib/assets/DownShiba.png"


const ArticlePreview = (props) => {
    const {article} = props 
  return (<>
        <div className="d-flex mb-4">
            <img className="cover-pic" src={article.image} alt="article cover"/>
            <div className="vote-space">
                <div className="votes-number">
                    <h3>{article.votes}</h3>
                </div>
                <div className="votes-container">
                    <button className="upvote-btn">
                        <img src={upDog} alt="upvote button"  height="60" width="60"/>
                    </button>
                    <button className="downvote-btn">
                        <img src={downDog} alt="downvote button"  height="60" width="60"/>
                    </button>
                </div>
            </div>
            <div className="preview-content">
                <h3>{article.title}</h3>
                <div className="my-3">{`${article.author} ⦁ ${format(article.date, 'yy/MM/dd')}`}</div>
                <h6>{`${article.perex}`}</h6>
                <div className="d-flex flex-row">

                <a 
                href={`/${article.id}`} 
                style={{textDecoration:"none"}} >
                    Read whole article
                </a>
                <div className='mx-3'>{`${article.comments?.length} comments`}</div>
                </div>
            </div>
        </div>
    </>);
};

export default ArticlePreview;
