import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createQuestion } from "../actions";
import { IoMdArrowRoundBack, IoMdCheckmarkCircle } from "react-icons/io";
import { LoaderSmall } from "../components/Loader";

class NewQuiz extends React.Component {
  constructor() {
    super();
    this.state = {
      question: null,
      answer: null,
      A: null,
      B: null,
      C: null,
      D: null,
      updating: false,
      err: null
    };
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value, err: null }, () => this.checkProgress());
  };

  createQuiz = event => {
    event.preventDefault();
    this.props.dispatch(
      createQuestion(
        this.props.topic,
        this.state.question,
        this.state.A,
        this.state.B,
        this.state.C,
        this.state.D,
        this.state.answer,
        this.props.history
      )
    );
  };
  checkProgress = () => {
    if (
      this.state.question &&
      !this.state.A &&
      !this.state.B &&
      !this.state.C &&
      !this.state.D &&
      !this.state.answer
    ) {
      return "filled filled1";
    } else if (
      this.state.question &&
      this.state.A &&
      !this.state.B &&
      !this.state.C &&
      !this.state.D &&
      !this.state.answer
    ) {
      return "filled filled2";
    } else if (
      this.state.question &&
      this.state.A &&
      this.state.B &&
      !this.state.C &&
      !this.state.D &&
      !this.state.answer
    ) {
      return " filled filled3";
    } else if (
      this.state.question &&
      this.state.A &&
      this.state.B &&
      this.state.C &&
      !this.state.D &&
      !this.state.answer
    ) {
      return "filled filled4";
    } else if (
      this.state.question &&
      this.state.A &&
      this.state.B &&
      this.state.C &&
      this.state.D &&
      !this.state.answer
    ) {
      return "filled filled5";
    } else if (
      this.state.question &&
      this.state.A &&
      this.state.B &&
      this.state.C &&
      this.state.D &&
      this.state.answer
    ) {
      return "filled filled6";
    } else {
      return "filled";
    }
  };

  handleUpdate = () => {
    if (
      this.state.question &&
      this.state.A &&
      this.state.B &&
      this.state.C &&
      this.state.D &&
      this.state.answer
    ) {
      this.setState({ updating: true });
    } else {
      this.setState({ updating: false, err: "⚠︎ Must fill all the fields!" });
    }
  };

  render() {
    return (
      <>
        <div className="signup_container">
          <div className="arrow_container">
            <Link to="/quizsets" className="back_arrow">
              <IoMdArrowRoundBack />
            </Link>
            <p className="signup">Question</p>
          </div>
          <p className="question_no">
            {this.props.quizset && this.props.quizset.questions.length + 1}
          </p>
          <p
            className={
              this.state.question &&
              this.state.A &&
              this.state.B &&
              this.state.C &&
              this.state.D &&
              this.state.answer
                ? "tick tick2"
                : "tick"
            }
          >
            <IoMdCheckmarkCircle />
          </p>
          <div className="progress_container_question">
            <p className={this.checkProgress()}></p>
          </div>
          <form onSubmit={this.createQuiz} className="new_question_form">
            <div class="control">
              <textarea
                className="textarea_question"
                name="question"
                placeholder={`Type the question for ${this.props.quizset &&
                  this.props.quizset.topic}`}
                onChange={this.onChange}
                value={this.state.question}
              ></textarea>
            </div>
            <label
              className={
                this.state.err ? "label_options_err" : "label_options"
              }
            >
              {this.state.err ? this.state.err : "Options"}
            </label>

            <input
              className="input_question is-primary"
              type="text"
              name="A"
              onChange={this.onChange}
              value={this.state.A}
              placeholder="A"
            />
            <input
              className="input_question  is-primary"
              type="text"
              name="B"
              onChange={this.onChange}
              value={this.state.B}
              placeholder="B"
            />
            <input
              className="input_question  is-primary"
              type="text"
              name="C"
              onChange={this.onChange}
              value={this.state.C}
              placeholder="C"
            />
            <input
              className="input_question  is-primary"
              type="text"
              name="D"
              onChange={this.onChange}
              value={this.state.D}
              placeholder="D"
            />
            <select
              className="select_question"
              name="answer"
              onChange={this.onChange}
            >
              <option selected="true" disabled="disabled">
                Select your answer
              </option>
              <option>{this.state.A}</option>
              <option>{this.state.B}</option>
              <option>{this.state.C}</option>
              <option>{this.state.D}</option>
            </select>
            <button
              className={
                this.state.updating
                  ? "button_signup update_loading "
                  : "button_signup"
              }
              onClick={this.handleUpdate}
            >
              {" "}
              <span className="update_question">Create</span>{" "}
              {this.state.updating ? <LoaderSmall /> : null}
            </button>
          </form>
        </div>
      </>
    );
  }
}
function mapStateToProps({ quizset }) {
  return {
    topic: quizset.topic,
    quizset: quizset.quizset
  };
}

export default connect(mapStateToProps)(withRouter(NewQuiz));
