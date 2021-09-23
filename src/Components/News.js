import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize : 8,
        category : 'general',

      }
      static propTypes = {
      
country : PropTypes.string,
pageSize : PropTypes.number,
category : PropTypes.string,



      }
    
    constructor() {
        super();
        console.log("Hello i am a Constructor from news Components");
        this.state = {
            articles: [],
            loading: false,
            page: 1

        }
    }

    async componentDidMount() {
        console.log("cdm");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b7352313fd454d7daa87949667f0c96f&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
     
      
        this.setState({
            articles: parseData.articles,

            totalResults: parseData.trotalResults,
            loading: false
        });

    }

    handlePrevClick = async () => {
        console.log("Prev");

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b7352313fd454d7daa87949667f0c96f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
    
       
        this.setState({

            page: this.state.page - 1,
            articles: parseData.articles,
            loading: false
        })
    }
    handleNextClick = async () => {

        console.log("Next");
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {


            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b7352313fd454d7daa87949667f0c96f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parseData = await data.json();
        

            this.setState({

                page: this.state.page + 1,
                articles: parseData.articles,
                loading: false

            })
        }
    }


















    render() {
        return (
            <>
                <div className="container my-3">
                    <h2 className="text-center">Monk News - Top Headlines</h2>
                    {this.state.loading && <Spinner />}
                    <div className="row my-5 ">
                        {!this.state.loading && this.state.articles.map((element) => {

                            return <div className="col-md-4  my-3 " key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} newsUrl={element.url} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name}/>
                            </div>
                        })}


                    </div>

                </div>
                <div className="container d-flex justify-content-between ">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-secondary " onClick={this.handlePrevClick}>&larr;Prev</button>
                    <p style={{color:'red'}}> Created & Developed by -Raushan Raj. Copyrights Disclaimer © </p>
                    
                    <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))} type="button" className="btn btn-success" onClick={this.handleNextClick}>Next &rarr;</button>




                </div>


            </>





        )
    }
}


export default News
