import { connect } from "react-redux";

function Customer({ customername }) {
  return <h2>👋 Welcome, {customername}</h2>;
}

function mapStateToProps(state) {
  return { customername: state.customer.fullName };
}

export default connect(mapStateToProps)(Customer);

// connect was used in older code bases in redux projects, in newer react projects they use UseSelector() hook to get the redux state.

// using connect(mapStateToProps) we are getting the redux store state and mapping to the props in the component
