import {DownloadOutlined, DeleteOutlined, InfoOutlined} from '@ant-design/icons';
import {Button, Col, Row, Space, Table} from 'antd';
import {fileListAPI} from "../../service/api";
import './fileListTable.css'
import React from "react";

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // render: (text) => <a>{text}</a>,
  },
  {
    title: 'Size',
    dataIndex: 'size',
    key: 'size',
    width: 120,
  },
  {
    title: 'ModTime',
    dataIndex: 'modTime',
    key: 'modTime',
    width: 190,
  },
  {
    title: 'Actions',
    key: 'actions',
    width: 225,
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" icon={<DownloadOutlined/>} size='small'>
          Download
        </Button>
        <Button type="primary" icon={<InfoOutlined/>} size='small'/>
        <Button danger icon={<DeleteOutlined/>} size='small'/>
      </Space>
    ),
  },
];

class FileListTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  // keyword值从 redux获取
  updateFileList = (path, keyword) => {
    fileListAPI(path, keyword).then(data => {
      this.setState({data: data.data});
    })
  }

  render() {
    return (
      <div className='fileListTableWrapper'>
        <Row>
          <Col span={4}></Col>
          <Col span={16} className='fileListTableMiddleWrapper'>

            <Table pagination={false} columns={columns} dataSource={this.state.data}
                   rowKey={"name"}
                   size="middle"/>

          </Col>
          <Col span={4}></Col>
        </Row>

      </div>
    )
  }
}

export default FileListTable;
