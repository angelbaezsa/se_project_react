import React from "react";
import { Route, Redirect } from "react-router-dom";

export function ProtectedRoute({ children, auth }) {
  console.log("this is the proptected route children", children);

  return <Route>{auth ? children : <Redirect to={"/"} />}</Route>;
}

// export default ProtectedRoute;

// export const ProtectedRoute = ({ component: Component, auth, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         auth ? (
//           <Component {...props} {...rest} />
//         ) : (
//           <Redirect to={{ pathname: "/", state: { from: props.location } }} />
//         )
//       }
//     />
//   );
// };
