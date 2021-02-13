import React, {Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);


class CommentForm extends React.Component {
  state= {
    isModalOpen : false
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  handleSubmit =(values) => {
    alert(JSON.stringify(values))
  }

  render() {
    //<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}></Modal
    return(
      <div>
        <Button outline onClick={this.toggleModal}>
        <i className="fa fa-pencil fa-lg" />Submit Comment</Button>
        <Modal 
        isOpen={this.state.isModalOpen}
        toggle={this.toggleModal}
        >
        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={values => this.handleSubmit(values)}>
            <div classname="form-group">
              <Label htmlFor="rating">Rating</Label>
              <Control.select
              model=".rating"
              id="rating"
              name="rating"
              className="form-control"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Control.select>
              </div>
              <div className="form-group">
                <Label htmlFor="author">Your Name</Label>
                <Control.text
                  model=".author"
                  id="author"
                  name="author"
                  className="form-control"
                  placeholder="Your Name"
                  validators={{
                    minLength: minLength(2),
                    maxLength: maxLength(15)
                  }}
                >   
              </Control.text>
              <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  componen="div"
                  messages={{
                      required: 'Required',
                      minLength: 'Must be at least 2 characters',
                      maxLength: 'Must be 15 characters or less'
                  }}
                />
            </div> 
            <div className="form-group">
                <Label htmlFor="author">Comment</Label>
                <Control.textarea
                  model=".text"
                  id="author"
                  name="text"
                  className="form-control"
                  rows="6"
                >  
              </Control.textarea>
            </div> 
            <Button type="submit" color="primary">Submit</Button>      
          </LocalForm>
        </ModalBody>
        </Modal>
      </div>
    );
  }
}


  function RenderCampsite({campsite}) {
    return (
      <div className="col-md-5 m-1">
          <Card>
              <CardImg top src={campsite.image} alt={campsite.name} />
              <CardBody>
                  <CardText>{campsite.description}</CardText>
              </CardBody>
          </Card>
      </div>
    )
  }

function RenderComments({comments}){
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
           <CommentForm></CommentForm>
           </div>
       )

   }
}

  function CampsiteInfo(props) {
          if (props.campsite) {
            return (
              <div className="container">
                  <div className="row">
                      <div className="col">
                          <Breadcrumb>
                              <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                          </Breadcrumb>
                          <h2>{props.campsite.name}</h2>
                          <hr />
                      </div>
                  </div>
                  <div className="row">
                      <RenderCampsite campsite={props.campsite} />
                      <RenderComments comments={props.comments} />
                  </div>
              </div>
            );
          }
    return <div />;
  }


export default CampsiteInfo;