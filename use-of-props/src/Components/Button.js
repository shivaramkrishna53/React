import React from "react";

export default function Button(props) {
  return (
    <div>
      <button
        onClick={() => {
          props.incredecre(props.operation, props.val);
        }}
        type="button"
        class="btn btn-primary"
      >
        {props.operation} by {props.val}
      </button>
      <br></br>
      <br></br>
    </div>
  );
}
