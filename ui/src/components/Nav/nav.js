import {Col, Row, Input} from 'antd';
// import {useState} from "react";
import {connect} from 'react-redux'
import {createNavSearchAction} from "../../redux/actions/nav";

import './nav.css'

const {Search} = Input;

function Nav(props) {
  // const [keyword, setkeyword] = useState('');

  const onSearch = (value) => {
    // console.log(value);
    // axios.get(`http://localhost:3000/playServer/api/pageIndex`).then(
    //   response => {
    //     console.log('成功了', response.data)
    //   },
    //   error => {
    //     console.log('失败了', error)
    //   }
    // )

    // 同步keyword
    props.search(value)

    // 通知父组件触发其他子组件

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
}

// export default Nav;
export default connect(
  state => ({keyword: state.navReducer.keyword}),
  {search: createNavSearchAction}
)(Nav)
