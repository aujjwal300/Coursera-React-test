import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';

    function RenderDish({ dish }) {
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

    function RenderComments({ dish }) {
        
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

    const DishDetail = (props) => {
        const dish = props.dish

        if (dish == null) {
            return (<div></div>);
        }
        
        const dishItem = <RenderDish dish={props.dish} />
        const dishComment = <RenderComments dish={props.dish} />;
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

export default DishDetail;