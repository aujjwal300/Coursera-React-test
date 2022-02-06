import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

class DishDetail extends Component {

    renderDish(dish) {
        if (dish != null) {
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    renderComments(dish) {
        
        if (dish != null) {
            const comments = dish.comments.map((comment) => {
                return (
                    <li key={comment.id}>
                        <div className="mt-3">{comment.comment}</div>
                        <p className="mt-2">-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </li>
                );
            });

            return (
                <div>
                    <h4>Comments</h4>
                    <ul className='list-unstyled'>{comments}</ul>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    render() {
        const dish = this.props.dish

        if (dish == null) {
            return (<div></div>);
        }
        
        const dishItem = this.renderDish(dish);
        const dishComment = this.renderComments(dish);
        return <div className='container'>
                <div className='row'>
                    <div className='col-12 col-md-5 m-1'>   
                        {dishItem}
                    </div>
                    <div className='col-12 col-md-5 m-1'>   
                        {dishComment}
                    </div>
                </div>
            </div>
    }
}

export default DishDetail;