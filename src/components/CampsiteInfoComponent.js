import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class CampsiteInfo extends Component {
  renderCampsite(campsite) {
    return (
    <div className="col-md-5 m-1">
        <Card>
            <CardImg top src={campsite.image} alt={campsite.name} />
            <CardBody>
            <CardTitle>{campsite.name}</CardTitle>
            <CardText>{campsite.description}</CardText>
            </CardBody>
        </Card>
    </div>
    )
  }

renderComment(comments){
   if (comments) {
       return (
           <div className="col-md-5 m-1">
           <h4>Comments</h4>
           {comments.map(comment => {
               const dateComment = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))
               return(
                   <div key={comment.id}>
                    <p>
                        {comment.text}<br/>
                        -- {comment.author}, {dateComment}
                    </p>
                   </div>
               )
           })}
           </div>
       )

   }
}

  render() {
          if (this.props.campsite) {
            const comments = this.props.campsite.comments
      return (
        <div className="container">
          <div className='row'>
            {this.renderCampsite(this.props.campsite)}
            {this.renderComment(comments)}
          </div>
        </div>
      );
    }
    return <div />
  }
}


export default CampsiteInfo;