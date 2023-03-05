import {
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  CloudUploadOutlined,
  FolderAddOutlined,
  InboxOutlined
} from '@ant-design/icons';
import {Button, Col, Row, Modal, Input, message, Upload} from 'antd';
import {useState} from 'react';
import PubSub from 'pubsub-js'

import './barop.css'
import {createNavSearchAction} from "../../redux/actions/nav";
import {connect, useSelector} from "react-redux";


function Barop() {
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const [uploadData, setUploadData] = useState({});

  const currentPath = useSelector(state => state.fileListTableReducer.currentPath);

  // New Folder
  const showNewFolderModal = () => {
    setIsNewFolderModalOpen(true);
  };
  const handleNewFolderOk = () => {
    PubSub.publish('addNewFolder', newFolderName)
    setIsNewFolderModalOpen(false);
  };
  const handleNewFolderCancel = () => {
    setIsNewFolderModalOpen(false);
  };
  const handleNewFolderNameChange = (e) => {
    setNewFolderName(e.target.value)
  }

  // Upload
  const showUploadModal = () => {
    setIsUploadModalOpen(true);
  };
  const handleUploadOk = () => {
    setIsUploadModalOpen(false);
  };
  const handleUploadCancel = () => {
    setIsUploadModalOpen(false);
  };

  const handlerIsHidden = () => {
    let isHiddenTmp = isHidden
    setIsHidden(!isHiddenTmp, PubSub.publish('isHidden', !isHiddenTmp))
  }

  const handleBeforeUpload = file => {
    const isLt10G = file.size / 1024 / 1024 < (1024 * 1024 * 10);
    if (!isLt10G) {
      message.error('Image must smaller than 10GB!');
      return false;
    }
    setUploadData({
      currentPath
    })
    return true;
  };

  const {Dragger} = Upload;
  const uploadProps = {
    name: 'file',
    data: uploadData,
    multiple: false,
    beforeUpload: handleBeforeUpload,
    action: 'http://localhost:3000/playServer/api/upload',
    onChange(info) {
      const {status} = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        setIsUploadModalOpen(false);
        message.success(`${info.file.name} file uploaded successfully.`);
        PubSub.publish('search', {})
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <div className='baropWrapper'>
      <Row>
        <Col span={4}></Col>
        <Col span={16} className='baropMiddleWrapper'>

          <Button icon={<ArrowLeftOutlined/>}>Back</Button>
          <Button icon={<EyeInvisibleOutlined/>} onClick={handlerIsHidden}>Hidden</Button>
          <Button icon={<CloudUploadOutlined/>} onClick={showUploadModal}>Upload</Button>
          <Button icon={<FolderAddOutlined/>} onClick={showNewFolderModal}>New Folder</Button>

        </Col>
        <Col span={4}></Col>
      </Row>


      <Modal title="New Folder" open={isNewFolderModalOpen} onOk={handleNewFolderOk} onCancel={handleNewFolderCancel}>
        <div className='newFolderWrapper'>
          <p className='newFolderDesc'>current path: {currentPath}</p>
          <p className='newFolderDesc'>please enter the new directory name</p>
          <Input placeholder="folder name" value={newFolderName} onChange={handleNewFolderNameChange}/>
        </div>
      </Modal>

      <Modal title="Upload" open={isUploadModalOpen} onOk={handleUploadOk} onCancel={handleUploadCancel}>
        <div className='uploadWrapper'>
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined/>
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from uploading company data or other
              band files
            </p>
          </Dragger>
        </div>
      </Modal>

    </div>
  )
}

export default Barop;

// const mapStateToProps = (state) => {
//   return {
//     currentPath: state.fileListTableReducer.currentPath
//   };
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateKeyword: (newKeyword) => dispatch(createNavSearchAction(newKeyword))
//   };
// };
//
// // export default Nav;
// export default connect(mapStateToProps, mapDispatchToProps)(Nav)
