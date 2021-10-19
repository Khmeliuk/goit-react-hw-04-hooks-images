import { Component } from "react/cjs/react.production.min";
import s from "./Button.module.css";
import PropTypes from "prop-types";

export default class Button extends Component {
  state = {};

  changePage = () => {
    this.props.onSubmit();
  };
  render() {
    return (
      <button type="button" className={s.Button} onClick={this.changePage}>
        Load more
      </button>
    );
  }
}

Button.propType = { onSubmit: PropTypes.func.isRequired };
