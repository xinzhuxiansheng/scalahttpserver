import {
  DownloadOutlined,
  DeleteOutlined,
  InfoOutlined,
  ExclamationCircleFilled,

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
import {Button, Col, Row, Space, Table, Modal} from 'antd';
import {fileListAPI, createFolderAPI, deleteResourceAPI, downloadResourceAPI} from "../../service/api";
import './fileListTable.css'
import React, {useState} from "react";
import {connect, useSelector} from "react-redux";
import {createFileListTableAction} from "../../redux/actions/fileListTable";
import PubSub from 'pubsub-js'

const {confirm} = Modal;

class FileListTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
      currentPath: '/',
      keyword: '',
      list: [],
      newFolderName: '',
      isOpenInfoModal: false,
      resourceInfo: {},
      downloadLoading: [],
    };
  }

  columns = [
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
          <Button type="primary" loading={this.state.downloadLoading[record.id]}
                  onClick={() => this.downloadResource(record)}
                  icon={<DownloadOutlined/>} size='small'>
            Download
          </Button>
          <Button type="primary" onClick={() => this.alertInfo(record)} icon={<InfoOutlined/>} size='small'/>

          {/*删除*/}
          <Button danger icon={<DeleteOutlined/>} onClick={() => this.showDeleteConfirm(record)} size='small'/>
        </Space>
      ),
    },
  ];

  downloadResource = (record) => {
    // this.setState({downloadLoading: true})
    downloadResourceAPI(record.id, this.state.currentPath, record.name)
    //this.setState({downloadLoading: false})
  };

  alertInfo = (record) => {
    this.setState({
      resourceInfo: JSON.stringify(record, null, 2),
      isOpenInfoModal: true
    })
  };
  handleOpenInfoOk = () => {
    this.setState({
      isOpenInfoModal: false
    })
  };
  handleOpenInfoCancel = () => {
    this.setState({
      isOpenInfoModal: false
    })
  };

  deleteResource = (record) => {
    // alert(record.name)

  }


  showDeleteConfirm = (record) => {
    confirm({
      title: '你是否要删除该目录或者文件?',
      icon: <ExclamationCircleFilled/>,
      content: '若删除的是目录，其子目录和同样同样被删除',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };


  componentDidMount() {
    // 搜索
    PubSub.subscribe('search', (_, data) => {
      this.setState({keyword: data}, this.updateFileList)
    })

    // 首页第一次加载
    PubSub.subscribe('first', (_, data) => {
      this.updateFileList();
    })

    // 隐藏
    PubSub.subscribe('isHidden', (_, data) => {
      this.setState({isHidden: data}, this.updateFileList)
    })

    // 添加新文件夹
    PubSub.subscribe('addNewFolder', (_, data) => {
      this.setState({newFolderName: data}, this.createNewFolder)
    })

    // 上传文件
    PubSub.subscribe('refresh', (_, data) => {
      this.createNewFolder()
    })

    PubSub.subscribe('downloadLoading', (_, data) => {
      let index = data.id
      let isShow = data.isShow
      let newLoadings = [...this.state.downloadLoading]
      newLoadings[index] = isShow;
      this.setState({
        downloadLoading: newLoadings
      })
    })
  }

  // 请求接口
  updateFileList = () => {
    fileListAPI(this.state.currentPath, this.state.keyword, this.state.isHidden).then(data => {
      this.setState({list: data.data});
    })
  }

  createNewFolder = () => {
    let params = {
      "currentPath": this.state.currentPath,
      "newFolderName": this.state.newFolderName
    }
    createFolderAPI(params)
      .then(data => {
        this.updateFileList()
      })
  }


  render() {
    return (

      <div className='fileListTableWrapper'>
        <Row>
          <Col span={4}></Col>
          <Col span={16} className='fileListTableMiddleWrapper'>

            <Table pagination={false} columns={this.columns} dataSource={this.state.list}
                   rowKey={(record) => record.id}
                   size="middle"/>
          </Col>
          <Col span={4}></Col>
        </Row>
        {/*<h2>keyword： {this.props.keyword}</h2>*/}
        <Modal title="资源信息" open={this.state.isOpenInfoModal} onOk={this.handleOpenInfoOk}
               onCancel={this.handleOpenInfoCancel}
               width={700}>
          <pre>
            {this.state.resourceInfo}
          </pre>
        </Modal>
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
