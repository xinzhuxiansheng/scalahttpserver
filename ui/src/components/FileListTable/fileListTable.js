import {DownloadOutlined, DeleteOutlined, InfoOutlined} from '@ant-design/icons';
import {Button, Col, Row, Space, Table} from 'antd';
import {fileListAPI} from "../../service/api";
import './fileListTable.css'
import React, {useState} from "react";
import {connect, useSelector} from "react-redux";
import {createFileListTableAction} from "../../redux/actions/fileListTable";

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
    dataIndex: 'modificationTimeDesc',
    key: 'modificationTimeDesc',
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

// const FileListTable = React.forwardRef((props, ref) => {
//   // get the state from the redux store
//   const { keyword, currentPath, error } = props;
//   const [data, setData] = useState([]);
//   // keyword值从 redux获取
//   const updateFileList = () => {
//     fileListAPI(this.props.currentPath, this.props.keyword).then(data => {
//       this.setState({data: data.data});
//     })
//   }

  // keyword值从 redux获取
  updateFileList = (keyword) => {
    fileListAPI(this.props.currentPath, keyword).then(data => {
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
        <h2>keyword： {this.props.keyword}</h2>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    keyword: state.navReducer.keyword,
    currentPath: state.fileListTableReducer.currentPath
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentPath: (currentPath) => dispatch(createFileListTableAction(currentPath))
  };
};

// export default FileListTable;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {forwardRef: true},
)(FileListTable)
