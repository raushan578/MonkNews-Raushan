import React, { Component } from 'react'

export class NewsItem extends Component {


    render() {
        let{title, description,imageUrl,newsUrl,author,date,source} = this.props;
        return (
        <>    <div>
       <div className="card" style={{width: "18rem"}}>
       <span  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {source}
   
  </span>
  <img src={!imageUrl?"https://www.businessinsider.in/photo/86426888/spacex-ceo-elon-musk-reveals-challenges-with-toilet-during-inspiration4-mission-promises-upgrades-in-future.jpg?imgsize=85086":imageUrl} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-muted">By - {!author?"Unknown": author} On {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read More</a>
  </div>
</div>
            </div> </>
        )
    }
}

export default NewsItem
