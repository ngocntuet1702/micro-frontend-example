import React from "react";
const RemoteApp = React.lazy(() => import("Remote/App"));
const RemoteButton = React.lazy(() => import("Remote/Button"));
 
const RemoteWrapper = ({ children }) => (
 <div
   style={{
     background: "white",
   }}
 >
   <div>{children}</div>
 </div>
);
 
export const App = () => {
  const [counter, setCounter] = React.useState(0);
  const handleClick = () => {
    console.log('button click', counter);
    setCounter(prev => prev + 1);
  }
  return (
    <div style={{ background: "white" }}>
      <h1>This is Host App!</h1>
      <p>Counter from Host-app: {counter}</p>
      <h2>Remote App:</h2>
      <RemoteWrapper>
        <RemoteApp />
      </RemoteWrapper>
      <h2>Remote Button:</h2>
      <RemoteWrapper>
        <RemoteButton color="red" handleClick={handleClick}/>
      </RemoteWrapper>
      <br />
      <a href="http://localhost:4000">Link to Remote App</a>
    </div>
)};
export default App;