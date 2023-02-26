import { DownloadOutlined,DeleteOutlined,InfoOutlined } from '@ant-design/icons';
import { Button,Col, Row,Space, Table } from 'antd';

import './fileListTable.css'

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
        <Button type="primary" icon={<DownloadOutlined /> } size='small'>
          Download
        </Button>
        <Button type="primary" icon={<InfoOutlined />} size='small'/>
        <Button danger icon={<DeleteOutlined />} size='small'/>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    size: '32 MB',
    modTime: '2023-02-17 00:00:00',
  },
  {
    key: '2',
    name: 'Jim Green',
    size: '2.1 GB',
    modTime: '2023-02-17 00:00:00',
  },
  {
    key: '3',
    name: 'Joe Black',
    size: '32 MB',
    modTime: '2023-02-17 00:00:00',
  },
];

function FileListTable() {

  return (
    <div className='fileListTableWrapper'>
      <Row>
        <Col span={4}></Col>
        <Col span={16} className='fileListTableMiddleWrapper'>

          <Table pagination={false} columns={columns}  dataSource={data} size="middle"/>

        </Col>
        <Col span={4}></Col>
      </Row>

    </div>
  )
}

export default FileListTable;
