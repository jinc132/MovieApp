import React, { Component } from 'react'; 
import './style.css'; 
import firebase from 'firebase/app'

export default class ReviewList extends Component {
  constructor(props){
    super(props);
    this.state = {reviews:[]};
  }
  componentDidMount() {
    this.reviewsRef = firebase.database().ref('reviews');
    this.reviewsRef.on('value', (snapshot) => {
      this.setState({
        reviews: snapshot.val()
      })
    });
  }

  componentWillUnmount() {
    this.reviewsRef.off();
  }

  render() {
    if (!this.state.reviews) return null; //if no chirps, don't display

    let reviewArray = Object.keys(this.state.reviews).map((key) =>
    {
      let chirpObj = this.state.reviews[key];
      chirpObj.id = key;
      return chirpObj;
    });
     //REPLACE THIS with an array of actual values!
    let reviewItems = reviewArray.map((key) => {
      return <ReviewItem key= {key.id} review= {key} currentUser= {this.props.currentUser} />
    });
    return (
      <div className="container">
        {reviewItems}
      </div>);
  }
}

//A single Chirp
class ReviewItem extends Component {
  likeChirp() {
    let likes  = firebase.database().ref('Review/'+ this.props.review.id +'/likes');
    let update = this.props.review.likes;
    if(update === undefined){
      update = {};
    }
    let uid = this.props.currentUser.uid;
    if(update[uid] === true){
      update[uid] = null;
    }else{
      update[uid] = true;
    }

    likes.set(update)
    .catch((error) => {
      this.setState({errorMessage: error.message});
    })
  }
 
  render() {
    let review = this.props.review; //current chirp (convenience)

    //counting likes
    let likeCount = 0; //count likes
    let userLikes = false; //current user has liked
    if(review.likes){
      likeCount = Object.keys(review.likes).length;
      if(review.likes[this.props.currentUser.uid]) //if user id is listed
        userLikes = true; //user liked!
    }

    return (
      <div className="row py-4 bg-white border">
        <div className="col-1">
          <img className="avatar" src={review.userPhoto} alt={review.userName+' avatar'} />
        </div>
        <div className="col pl-4 pl-lg-1">

          <span className="handle">{review.userName} {/*space*/}</span>

          <div className="chirp">{review.text}</div>

          {/* A section for showing chirp likes */}
          <div className="likes">          
            <i className={'fa fa-heart '+(userLikes ? 'user-liked': '')} aria-label="like" onClick={() => this.likeChirp()} ></i>            
            <span>{/*space*/} {likeCount}</span>
          </div>
        </div>
      </div>      
    );
  }
}