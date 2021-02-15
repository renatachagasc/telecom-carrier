import React from 'react';
import '../index.css';


import * as NumbersActions from '../../../store/ducks/numbers/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import { CircularProgressbarWithChildren, CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ChangingProgressProvider from "./ChangingProgressProvider";
import "react-circular-progressbar/dist/styles.css";


function ProgressCustom(props) {
      return (
        <div className="p-3">
            <CircularProgressbarWithChildren
                value={80}
                strokeWidth={8}
                styles={buildStyles({
                    pathColor: "#EB95E4",
                    trailColor: "transparent",
                })}
            >
                <div style={{ width: "84%" }}>
                    <ChangingProgressProvider values={[0, props.numbers.data.length]}>
                        {percentage => (
                            <CircularProgressbar
                                value={percentage}
                                text={`${percentage}`}
                                background
                                backgroundPadding={2}
                                styles={buildStyles({
                                    backgroundColor: "#ffffff",
                                    textColor: "#5840c4",
                                    pathColor: "#5840c4",
                                    trailColor: "transparent",
                                    pathTransition:
                                        percentage === 0 ? "none" : "stroke-dashoffset 0.5s ease 0s"
                                })}
                            />
                        )}
                    </ChangingProgressProvider>
                </div>
            </CircularProgressbarWithChildren>
        </div>
    );
}

const mapStateToProps = (state) => ({
    numbers: state.numbers
});

const mapDispatchProps = (dispatch) => bindActionCreators(NumbersActions, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(ProgressCustom);
