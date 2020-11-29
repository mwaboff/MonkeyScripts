import React from 'react';
import '../../css/InputCounter.css';


export default class InputCounter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      requested_id: props.elem_id,
      watched_elem: null,
      min: props.min,
      max: props.max,
      count: 0,
      style: "neutral-char-count"
    }
  }


  componentDidMount() {
    if (!this.state.requested_id) return;

    let input_elem = document.getElementById(this.props.elem_id);
    input_elem.addEventListener('input', this.keyWasPressed.bind(this));
    this.setState({
      watched_elem: input_elem
    });
  }
 
  keyWasPressed() {
    let new_count = this.state.watched_elem.value.length;
    this.setStyle(new_count);
    this.setState({ count: new_count });
  }

  setStyle(new_count) {
    let good_count = "good-char-count";
    let neutral_count = "neutral-char-count";
    let new_style = "bad-char-count";
    let min = this.state.min;
    let max = this.state.max;

    if      (!min && !max) { new_style = good_count; }
    else if (!min && new_count <= max) { new_style = good_count; }
    else if (!max && min <= new_count) { new_style = good_count; }
    else if (min <= new_count && new_count <= max) { new_style = good_count; }
    if (new_count == 0) { new_style = neutral_count; }

    this.setState({ style: new_style });
  }

  setOutputText(count) {
    let min = this.state.min;
    let max = this.state.max;
    let result = count + " characters";

    if      (!min && max) { result += " (max: " + max + ")"; }
    else if (min && !max) { result += " (min: " + min + ")"; }
    else if (min && max)  { result += " (min: " + min + ", max: " + max + ")"; }
    
    return result;
  }

  render() {
    if (!this.state.watched_elem) return (<></>);

    let output_text = this.setOutputText(this.state.count);

    return (
      <div className={ "input-counter " + this.state.style }>{ output_text }</div>
    )
  }
}