import {
  DownloadOutlined,
  DeleteOutlined, InfoOutlined,

  FileTextOutlined,
  FileImageOutlined,
  FolderOpenOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FilePptOutlined,
  FileMarkdownOutlined,
  FileZipOutlined

} from '@ant-design/icons';
import {Button, Col, Row, Space, Table} from 'antd';
import {fileListAPI} from "../../service/api";
import './fileListTable.css'
import React, {useState} from "react";
import {connect, useSelector} from "react-redux";
import {createFileListTableAction} from "../../redux/actions/fileListTable";
import PubSub from 'pubsub-js'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => {
      if (record.fType === 'folder') { //是跳转
        return <span>
        <FolderOpenOutlined style={{marginRight: '10px'}}/><a>{record.name}</a></span>;
      } else { // 文件是下载
        switch (record.fType) {
          case 'image':
            return <span><FileImageOutlined style={{marginRight: '10px'}}/><a>{record.name}</a></span>;
          case 'pdf':
            return <span><FilePdfOutlined style={{marginRight: '10px'}}/><a>{record.name}</a></span>;
          case 'word':
            return <span><FileWordOutlined style={{marginRight: '10px'}}/><a>{record.name}</a></span>;
          case 'excel':
            return <span><FileExcelOutlined style={{marginRight: '10px'}}/><a>{record.name}</a></span>;
          case 'ppt':
            return <span><FilePptOutlined style={{marginRight: '10px'}}/><a>{record.name}</a></span>;
          case 'md':
            return <span><FileMarkdownOutlined style={{marginRight: '10px'}}/><a>{record.name}</a></span>;
          case 'yasuobao':
            return <span><FileZipOutlined style={{marginRight: '10px'}}/><a>{record.name}</a></span>;
          case 'txt':
            return <span><FileTextOutlined style={{marginRight: '10px'}}/><a>{record.name}</a></span>;
        }
      }
    }
  },
  {
    title: 'Size',
    dataIndex: 'fSize',
    key: 'fSize',
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

function fileNameDesc(record) {
  if (record.fType === 'folder') { //是跳转
    return <span>
        <FolderOpenOutlined style={
          {marginRight: '10px'}
        }/>
        <a>{record.name}</a>
      </span>;
  } else { // 文件是下载
    return <span>
        <FolderOpenOutlined style={
          {marginRight: '10px'}
        }/>
        <a>{record.name}</a>
      </span>;
  }
}

class FileListTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
      currentPath: '/',
      keyword: '',
      list: []
    };
  }

  componentDidMount() {
    // 搜索
    PubSub.subscribe('search', (_, data) => {
      this.setState({keyword: data}, this.updateFileList)
    })

    // 首页第一次加载
    PubSub.subscribe('first', (_, data) => {
      this.updateFileList();
    })

    PubSub.subscribe('isHidden', (_, data) => {
      this.setState({isHidden: data}, this.updateFileList)
    })

  }

  // 请求接口
  updateFileList = () => {
    fileListAPI(this.state.currentPath, this.state.keyword, this.state.isHidden).then(data => {
      this.setState({list: data.data});
    })
  }


  render() {
    return (

      <div className='fileListTableWrapper'>
        <Row>
          <Col span={4}></Col>
          <Col span={16} className='fileListTableMiddleWrapper'>

            <Table pagination={false} columns={columns} dataSource={this.state.list}
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
