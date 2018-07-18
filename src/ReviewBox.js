import React, { Component } from 'react';
import firebase from 'firebase/app';
import StarRatingComponent from 'react-star-rating-component';

export default class ReviewBox extends Component {
    constructor(props){
      super(props);
      this.state = {
        post:'',
        rating: 1
      };
    }

    onStarClick(nextValue) {
      this.setState({rating: nextValue});
      this.state = {post:'', rating: 1};
    }

    updatePost(event) {
        this.setState({post: event.target.value});
    }

    postReview(event){
        event.preventDefault(); //don't submit
        
        /* TODO: add a new Chirp to the database */
        let newReview = {
          text: this.state.post,
          userId: this.props.currentUser.uid,
          userName: this.props.currentUser.displayName,
          rating: this.state.rating
        };
    
        let tasksRef = firebase.database().ref('reviews');
    
        tasksRef.push(newReview)
        
    
        this.setState({post:''}); //empty out post for next time
    }

    render() {
        let user = this.props.currentUser; //the current user (convenience)
        const { rating } = this.state;
    
        return (
          <div className="container">
            <div className="row py-3 chirp-box">
              <div className="col pl-4 pl-lg-1">
                <form>
                  <textarea name="text" className="form-control mb-2" placeholder="Leave a comment!" 
                    
                    value={this.state.post} 
                    onChange={(e) => this.updatePost(e)}
                    />
                  <div>
                    <StarRatingComponent 
                      name="rate1" 
                      starCount={5}
                      value={rating}
                      onStarClick={this.onStarClick.bind(this)}
                    />
                  </div>  
    
                  {/* Only show this if the post length is > 140 */}
                  {this.state.post.length > 150 &&
                    <small className="form-text">150 character limit!</small>
                  }
                  
                  <div className="text-right">
                    {/* Disable if invalid post length */}
                    <button className="btn btn-primary" 
                      disabled={this.state.post.length === 0 || this.state.post.length > 140}
                      onClick={(e) => this.postReview(e)} 
                      >
                      <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Share
                    </button> 					
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      }
}