import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Loading from './Loading';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class Newscomponent extends Component {
  articles = [];

  capitalizeString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeString(this.props.category)} - NewsPiece`;
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

  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=94a298e0b4df4b56940b3b518af7e628&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let resolveData = await data.json();
    this.props.setProgress(70);

    // console.log(resolveData);
    this.setState({
      articles: resolveData.articles,
      totalResults: resolveData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
    

  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=94a298e0b4df4b56940b3b518af7e628&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let resolveData = await data.json();
    // // console.log(resolveData);
    // this.setState({
    //   articles: resolveData.articles,
    //   totalResults: resolveData.totalResults,
    //   loading: false
    // });
    this.updateNews();
  }

  handlePrevPage = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=94a298e0b4df4b56940b3b518af7e628&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });

    // let data = await fetch(url);
    // let resolveData = await data.json();

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: resolveData.articles,
    //   loading: false
    // })

    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }

  handleNextPage = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=94a298e0b4df4b56940b3b518af7e628&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      // this.setState({ loading: true });

      // let data = await fetch(url);
      // let resolveData = await data.json();

      // this.setState({
      //   page: this.state.page + 1,
      //   articles: resolveData.articles,
      //   loading: false
      // });

      this.setState({ page: this.state.page + 1 });
      this.updateNews();
    }
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=94a298e0b4df4b56940b3b518af7e628&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let resolveData = await data.json();
    
    this.setState({
      articles: this.state.articles.concat(resolveData.articles),
      totalResults: resolveData.totalResults,
      loading: false
    });
  }


  render() {
    return (
      <>
        <div>
          <h1 className='text-center my-5'>NewsPiece - Top {this.capitalizeString(this.props.category)}  Headings</h1>
          {this.state.loading && <Loading />}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Loading />}
          >
            <div className='container my-3'>
              <div className="row" >
                {this.state.articles.map((element) => {
                  return <div className="col-md-4" key={element.url}>
                    <Newsitem tittle={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.id} />
                  </div>
                })}
              </div>
            </div>
          </InfiniteScroll >
        </div>
      </>
    )
  }
}

export default Newscomponent
