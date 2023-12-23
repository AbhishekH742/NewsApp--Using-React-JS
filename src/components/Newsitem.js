import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let { tittle, description, imgUrl, newsUrl } = this.props;
    return (
      <div className='container my-3'>
        <div className="card" style={{ width: "18rem" }}>
          <img src={imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{tittle}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} className="btn btn-sm btn-primary">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Newsitem
