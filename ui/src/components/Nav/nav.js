import {Col, Row, Input} from 'antd';
// import {useState} from "react";
import {connect} from 'react-redux'
import {createNavSearchAction} from "../../redux/actions/nav";
import PubSub from 'pubsub-js'

import './nav.css'

const {Search} = Input;

const Nav = (props) => {
  const onSearch = (value) => {
    PubSub.publish('search',value)

    // // console.log(currentPath)
    // // 同步keyword
    // props.updateKeyword(value)
    // // 通知父组件 给子组件标记的属性对象
    // props.attributeOnSearchCall(value)

  }

  return (
    <div className='navWrapper'>
      <Row>
        <Col span={4}></Col>
        <Col span={16} className='navMiddleWrapper'>
          <div className='navWebHeaderDesc'>Scala HTTP File Server</div>
          <div className='navWebHeaderSearch'>
            <Search className='navSearchBtn' placeholder="Search text" onSearch={onSearch} enterButton/>
          </div>
        </Col>
        <Col span={4}></Col>
      </Row>

    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    keyword: state.navReducer.keyword,
    currentPath: state.fileListTableReducer.currentPath
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateKeyword: (newKeyword) => dispatch(createNavSearchAction(newKeyword))
  };
};

// export default Nav;
export default connect(mapStateToProps, mapDispatchToProps)(Nav)
