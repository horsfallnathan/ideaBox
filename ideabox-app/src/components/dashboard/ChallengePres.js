import React from 'react' 

class ChallengePres extends React.Component {


    render() {
        return (
            <div>
                <div className="challengePres">
                    <div className="challengePresInnerDiv">
                        <div className="challengePresKata">
                            <h2>#</h2>
                        </div>
                        <div className="challengePresTitleBtns">
                            <div className="challengePresTitle">
                            <h1>Title of Challenge</h1>
                            </div>
                            <div className="challengePresBtns">
                                <button>Read more</button>
                                <button>Submit Idea</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )

    }

}
export default ChallengePres