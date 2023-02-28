import {Col, Row, Input} from 'antd';
import axios from "axios";

import './nav.css'

const {Search} = Input;

function Nav() {
  const onSearch = (value) => {
    console.log(value);
    axios.get(`http://localhost:3000/playServer/api/pageIndex`).then(
      response => {
        console.log('成功了', response.data)
      },
      error => {
        console.log('失败了', error)
      }
    )
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

export default Nav;
