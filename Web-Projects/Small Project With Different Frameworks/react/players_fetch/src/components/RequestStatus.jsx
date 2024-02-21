/** @format 
 * Student instructions:
 *
 * This component is used to display the status of a request. It receives new status as children. 
 * 
 * Create the component that you did in Vue now with React. Use provided props to handle user events. Find and replace functionality with React equivalents.

 * NOTE: use the same ids, classes and html elements as you did in Vue. Refer to tests in the __tests__ folder to pass the unit tests, and to the cypress/e2e folder for the end-to-end tests.
*/

export const RequestStatus = ({ children }) => {
  return (
    <div id="request-status">
      {children}
    </div>
  );
};
