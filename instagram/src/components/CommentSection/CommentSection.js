import React, { Component } from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';
import {StyledCommentsDiv, StyledCommentInput} from './StyledComments';

class CommentSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: props.comments,
            current: '',
            time: props.time,
            id: props.id,
        };
    }

    addComment = e => {
        e.preventDefault();

        // ========= comment checking here ???????

        let comments = this.state.comments.concat({
            text: this.state.current, 
            username: localStorage.getItem('username')
        });
        localStorage.setItem(this.state.id, JSON.stringify(comments));
        e.target.reset();
        this.setState({comments});
    };

    deleteComment = id => {
        localStorage.removeItem(this.state.id);
        this.setState({
            comments: this.state.comments.filter(comment => comment.text + comment.user !== id)
        });
    };

    handleInputChange = e => {
        this.setState({
            current: e.target.value,
        });
    };

    /* Lifecycle Methods */

    componentWillMount() {
        localStorage.getItem(this.state.id) && this.setState({
            comments: JSON.parse(localStorage.getItem(this.state.id))
        });
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(this.state.id, JSON.stringify(nextState.comments));
    }

    render () {
        return (
            <StyledCommentsDiv>
                {
                    this.state.comments.map((comment, ind) =>
                    <Comment 
                        key={comment.text + ind} 
                        id={comment.text + comment.user}
                        user={comment.username} 
                        text={comment.text} 
                        delete={this.deleteComment} />)
                }
                <p>{this.state.time}</p>
                <hr />
                <form onSubmit={this.addComment}>
                    <StyledCommentInput 
                        onChange={this.handleInputChange} 
                        type="text" 
                        placeholder="Add a comment..." />
                </form>
            </StyledCommentsDiv>
        );
    }
};

CommentSection.propTypes = {
    comments: PropTypes.arrayOf(
        PropTypes.objectOf(PropTypes.string),
    ),
    time: PropTypes.string,
};

export default CommentSection;