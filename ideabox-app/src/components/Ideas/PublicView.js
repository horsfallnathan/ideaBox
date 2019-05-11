import React, { Component } from 'react'
import { getSingleIdea } from '../../services/ideas'
import { createComment } from '../../services/comments'

// import Popover from 'react-text-selection-popover';
// import placeRightBelow from 'react-text-selection-popover/lib/placeRightBelow'

class PublicViewIdea extends Component {
    constructor(props) {
        super(props)
        this.ref = React.createRef()
    }

    state = {
        challenge: {},
        idea: {},
        commentContent: ''
    }

    componentDidMount() {
        const { ideaId } = this.props.match.params
        getSingleIdea(ideaId).then(ideainfo => {
            const { challenge } = ideainfo.data
            const { idea } = ideainfo.data
            this.setState({ challenge, idea, commentContent: "" })
        })
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value })
    }

    handleSubmit = event => {
        event.preventDefault()
        let info = { content: this.state.commentContent, ideaId: this.state.idea._id }
        createComment(info)

        let copyComm = this.state.idea.comments
        copyComm.push(info);

        this.setState({
            commentContent: "",
            idea: { comments: copyComm }
        })
    }

    selectedText = (id) => {
        // let fullString = document.getElementsByTagName("body")[0].textContent;
        var range = window.getSelection().getRangeAt(0)

        // var startPosition = fullString.search(range);
        // var getPosition = range.toString();
        // var endPosition = parseInt(getPosition.length) + parseInt(startPosition);

        let element = document.createElement("span")
        element.className = "Selected-text"
        range.surroundContents(element)

        // create a new div element 
        // var newDiv = document.createElement("input");

        // add the newly created element and its content into the DOM 
        // var currentDiv = document.getElementById(id)

        var textdiv = document.createElement('input')

        textdiv.style.left = '100px'
        textdiv.style.top = '200px'
        textdiv.style.position = 'absolute'

        document.getElementsByTagName('body')[0].appendChild(textdiv)
        // let currentDiv = document.getElementById("div1")
        // document.body.insertBefore(newDiv, currentDiv);

    }

    render() {
        const { title, description, upVotes, need, benefit, estimatedResources, competition, teamMembers, comments } = this.state.idea
        const challengeTitle = this.state.challenge.title
        return (
            <div>
                <div>
                    {challengeTitle ? <h1>The Innovation Challenge: {challengeTitle}</h1> : <h1>Open Idea</h1>}
                    <h1 onMouseUp={this.selectedText}>Submited Idea: {title}</h1>
                </div>
                <div>
                    <h2>Engagement</h2>
                    {{ upVotes } === 1 ? <p>{upVotes} Up-Vote</p> : <p>{upVotes} Up-Votes</p>}

                    <h2>Idea Description</h2>
                    <p id="idea-description" onMouseUp={() => this.selectedText("idea-description")}>{description}</p>

                    <h2>Need</h2>
                    <p>Who is the target group for your idea?</p>
                    <p id="need" onMouseUp={() => this.selectedText("need")}>{need}</p>

                    <h2>Benefit</h2>
                    <p>How will the idea benefit the target group? </p>
                    <p id="benefit" onMouseUp={() => this.selectedText("benefit")}>{benefit}</p>

                    <h2>Estimated Resources</h2>
                    <p>Which resources do you think are needed to work on this idea?</p>
                    <p id="estimated-resources" onMouseUp={() => this.selectedText("estimated-resources")}>{estimatedResources}</p>

                    <h2>Competition</h2>
                    <p>Are there any other products trying to solve the same problem?</p>
                    <p id="competition" onMouseUp={() => this.selectedText("competition")}>{competition}</p>

                    <h2>Idea Team</h2>
                    <p>{teamMembers}</p>

                    <div className="Org">
                        <h2>Comments</h2>
                        <h4>Manager Comments</h4>
                        <h4>Colleague Comments</h4>

                        {comments && comments.map((comment, i) => {
                            return (
                                <div key={i}>
                                    <h4>Comment</h4>
                                    <p>{comment.content}</p>
                                </div>
                            )
                        })}

                        <form onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="Leave a comment..." value={this.commentContent} name="commentContent" onChange={this.handleChange} />
                        </form>
                    </div>
                </div>
            </div >

        )
    }
}

export default PublicViewIdea
