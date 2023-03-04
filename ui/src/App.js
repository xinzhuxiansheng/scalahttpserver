import React from "react";
import Nav from './components/Nav/nav';
import Breadc from "./components/Breadc/breadc";
import Barop from "./components/BarOp/barop";
import FileListTable from "./components/FileListTable/fileListTable";
import PubSub from "pubsub-js";

import './App.css'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleSearchFileCall = (keyword) => {

    //

    this.fileListTableRef.current.updateFileList()
  }

  // 初始化
  componentDidMount() {
    PubSub.publish('first',{})
  }

  render() {
    return (
      <div className='appWrapper'>
        {/*导航*/}
        <Nav attributeOnSearchCall={this.handleSearchFileCall}></Nav>

        {/*面包屑*/}
        <Breadc></Breadc>

        {/*操作栏*/}
        <Barop></Barop>

        {/*资源列表*/}
        <FileListTable></FileListTable>
      </div>
    )
  }
}

export default App;

// import React, { Component } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   useParams,
// } from "react-router-dom";
//
// import reactLogo from "./images/react.svg";
// import playLogo from "./images/play.svg";
// import scalaLogo from "./images/scala.svg";
// import Client from "./Client";
//
// import "./App.css";
//
// const Tech = () => {
//   const params = useParams();
//   return <div>Current Route: {params.tech}</div>;
// };
//
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { title: "" };
//   }
//
//   async componentDidMount() {
//     Client.getSummary((summary) => {
//       this.setState({
//         title: summary.content,
//       });
//     });
//   }
//
//   render() {
//     return (
//       <Router>
//         <div className="App">
//           <h1>Welcome to {this.state.title}</h1>
//           <nav>
//             <Link to="scala">
//               <img width="400" height="400" src={scalaLogo} alt="Scala Logo" />
//             </Link>
//             <Link to="play">
//               <img
//                 width="400"
//                 height="400"
//                 src={playLogo}
//                 alt="Play Framework Logo"
//               />
//             </Link>
//             <Link to="react">
//               <img width="400" height="400" src={reactLogo} alt="React Logo" />
//             </Link>
//           </nav>
//           <Routes>
//             <Route path="/:tech" element={<Tech />} />
//           </Routes>
//           <div>
//             <h2>Check out the project on GitHub for more information</h2>
//             <h3>
//               <a
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 href="https://github.com/playframework/play-scala-react-seed"
//               >
//                 play-scala-react-seed
//               </a>
//             </h3>
//           </div>
//         </div>
//       </Router>
//     );
//   }
// }
//
// export default App;
