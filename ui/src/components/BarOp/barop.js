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


const {Dragger} = Upload;
const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const {status} = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};


function Barop() {
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // New Folder
  const showNewFolderModal = () => {
    setIsNewFolderModalOpen(true);
  };
  const handleNewFolderOk = () => {
    setIsNewFolderModalOpen(false);
  };
  const handleNewFolderCancel = () => {
    setIsNewFolderModalOpen(false);
  };

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
          <p className='newFolderDesc'>current path: /yzhou</p>
          <p className='newFolderDesc'>please enter the new directory name</p>
          <Input placeholder="folder name"/>
        </div>
      </Modal>

      <Modal title="Upload" open={isUploadModalOpen} onOk={handleUploadOk} onCancel={handleUploadCancel}>
        <div className='uploadWrapper'>
          <Dragger {...props}>
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
