import React, {Component} from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem,
    Modal, ModalHeader, ModalBody, Button, Col, Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <div className="col-12 col-md-6 col-lg-5 ml-lg-5 mr-lg-5 pl-lg-4 pb-lg-4 m-1">
                <Card>
                    <CardImg width="80" src={dish.image} alt={dish.name}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

function RenderComments({comments}) {
    
    if (comments != null) {
        return (
            <>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map((comment) => {
                        return (
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                        );
                    })}
                </ul>
            </>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => ((val) && (val.length >= len)) ;

class DishDetail extends Component {

    constructor(props){
        super(props);

        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmitComment(values) {
        this.toggleModal();
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
    }

    render() {
        if (this.props == null) {
            return (<div></div>);
        }
        else {
            return (
                <>
                    <div className='container'>
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem>
                                    <Link to='/home'>Home</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem>
                                    <Link to='/menu'>Menu</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>{this.props.dish.name}</h3>
                                <hr/>
                            </div>
                        </div>
                        <div className='row'>
                            <RenderDish dish={this.props.dish} />
                            <div className="col-12 col-md-5 ml-3 mb-4 m-2">
                                <RenderComments comments={this.props.comments} />
                                <Button outline bg-primary onClick={this.toggleModal}>
                                    <span className="fa fa-pencil fa-lg"/> Submit Comment
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}> 
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm  onSubmit={(values) => this.handleSubmitComment(values)}>
                                <Row className="form-group">
                                    <Col>
                                        <Label htmlFor="rating">Rating</Label>
                                        <Control.select model=".rating" name="rating" className='form-control'>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Label>Your Name</Label>
                                        <Control.text model=".author" name="author" placeholder="Your Name"
                                            className='form-control'
                                            validators={{
                                                minLength: minLength(3), maxLength: maxLength(15)
                                            }} />
                                        <Errors className='pl-2 text-danger' model=".author" show="touched"
                                            messages={{
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Label>Comment</Label>
                                        <Control.textarea model=".comment" name="comment" rows="6"
                                        className='form-control' />
                                    </Col>
                                </Row>
                                <Button className="bg-primary col-3 offset-9" value="submit" type="submit">Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </>
            )
        }
    }
}

export default DishDetail;