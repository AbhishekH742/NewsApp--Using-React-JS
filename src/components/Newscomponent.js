import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class Newscomponent extends Component {
  articles = [ ];
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1
    }
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=94a298e0b4df4b56940b3b518af7e628&page=1`;
    let data = await fetch(url);
    let resolveData = await data.json();
    // console.log(resolveData);
    this.setState({ articles: resolveData.articles, totalResults: resolveData.totalResults });
  }

  handlePrevPage = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=94a298e0b4df4b56940b3b518af7e628&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let resolveData = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles: resolveData.articles
    })
  }

  handleNextPage = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 21)) {

    }
    else {

      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=94a298e0b4df4b56940b3b518af7e628&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url);
      let resolveData = await data.json();

      this.setState({
        page: this.state.page + 1,
        articles: resolveData.articles
      })
    }
  }


  render() {
    return (
      <div className='container my-3'>
        <h1>NewsPiece - Top Headings</h1>
        <div className="row" >
          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <Newsitem tittle={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })}

        </div>
        <div className="conatainer d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevPage}>&larr; prev</button>
          <button type="button" className="btn btn-dark" onClick={this.handleNextPage}>next &rarr;</button>

        </div>
      </div>
    )
  }
}

export default Newscomponent
