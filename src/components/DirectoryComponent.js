import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';


class Directory extends Component {
 

  render() {
    const allCampsites = this.props.campsites.map((campsite, index) => {
      return (
        <div key={campsite.id} className="col-md-5 m-1">
          <Card onClick={() => this.props.onClick(campsite.id)}>
            <CardImg width="100%" src={campsite.image} alt={campsite.name} />
            <CardImgOverlay>
              <CardTitle>{campsite.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      )
    })
    return (
      <div className="container">
        <div className="row">
          {allCampsites}
        </div>
            
      </div>
    );
  }
}
export default Directory;