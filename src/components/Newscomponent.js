import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Loading from './Loading';
import PropTypes from 'prop-types';

export class Newscomponent extends Component {
  articles = [];
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1
    }
  }
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,

  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=94a298e0b4df4b56940b3b518af7e628&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let resolveData = await data.json();
    // console.log(resolveData);
    this.setState({
      articles: resolveData.articles,
      totalResults: resolveData.totalResults,
      loading: false
    });
  }

  handlePrevPage = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=94a298e0b4df4b56940b3b518af7e628&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url);
    let resolveData = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles: resolveData.articles,
      loading: false
    })
  }

  handleNextPage = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=94a298e0b4df4b56940b3b518af7e628&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });

      let data = await fetch(url);
      let resolveData = await data.json();

      this.setState({
        page: this.state.page + 1,
        articles: resolveData.articles,
        loading: false
      })
    }
  }


  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center my-4'>NewsPiece - Top Headings</h1>
        {this.state.loading && <Loading />}
        <div className="row" >
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <Newsitem tittle={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })}

        </div>
        <div className="conatainer d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevPage}>&larr; prev</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextPage}>next &rarr;</button>

        </div>
      </div>
    )
  }
}

export default Newscomponent
