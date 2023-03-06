import {HomeOutlined, UserOutlined} from '@ant-design/icons';
import {Breadcrumb, Col, Row} from 'antd';
import {useSelector} from 'react-redux';

import './breadc.css'
import fileListTableReducer from "../../redux/reducers/fileListTable";
import {useEffect, useMemo, useState} from "react";

function Breadc() {
  const [breads, setBreads] = useState([])
  const currentPath = useSelector(state => state.fileListTableReducer.currentPath);
  // 使用useMemo() hook缓存myData数据
  const memoizedData = useMemo(() => currentPath, [currentPath]);

  // 监听数据变化
  useEffect(() => {
    // 检查数据是否已更改并触发相应的方法
    console.log('数据已更改', memoizedData);
    // 将data字符串按照 / 分割成数组
    const arr = memoizedData.split('/');
    // 删除第一个元素
    arr.splice(-1, 1);
    // 处理边界，如果数组为空或只有一个元素，则返回空数组
    setBreads(memoizedData.split('/').splice(-1, 1));
  }, [memoizedData]);

  return (
    <div className='breadcWrapper'>
      <Row>
        <Col span={4}></Col>
        <Col span={16} className='breadcMiddleWrapper'>

          <Breadcrumb>
            <Breadcrumb.Item href="">
              <HomeOutlined/>
            </Breadcrumb.Item>

            {/*<Breadcrumb.Item href="">*/}
            {/*  <UserOutlined/>*/}
            {/*  <span>Application List</span>*/}
            {/*</Breadcrumb.Item>*/}

            {breads.map(item => (
              <Breadcrumb.Item>{item}</Breadcrumb.Item>

            ))}

          </Breadcrumb>

        </Col>
        <Col span={4}></Col>
      </Row>

    </div>
  )
}

export default Breadc;
