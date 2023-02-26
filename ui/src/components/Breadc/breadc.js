import {HomeOutlined, UserOutlined} from '@ant-design/icons';
import {Breadcrumb, Col, Row} from 'antd';

import './breadc.css'

function Breadc() {
  return (
    <div className='breadcWrapper'>
      <Row>
        <Col span={4}></Col>
        <Col span={16} className='breadcMiddleWrapper'>

          <Breadcrumb>
            <Breadcrumb.Item href="">
              <HomeOutlined/>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="">
              <UserOutlined/>
              <span>Application List</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Application</Breadcrumb.Item>
          </Breadcrumb>

        </Col>
        <Col span={4}></Col>
      </Row>

    </div>
  )
}

export default Breadc;
