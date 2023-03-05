import axios from "axios";
import FileSaver from 'file-saver';
import PubSub from "pubsub-js";

const API_DOMAIN = "http://localhost:3000/playServer";

export const fileListAPI = (path, keyword, isHidden) => {
  let url = `${API_DOMAIN}/api/pageIndex?path=${path}&keyword=${keyword}&isHidden=${isHidden}`
  console.log("fileListAPI: " + url)
  return axios.get(url).then(
    response => {
      console.log('成功了', response.data)
      return response.data
    },
    error => {
      console.log('失败了', error)
    }
  )
}

export const createFolderAPI = (params) => {
  return axios.post(`${API_DOMAIN}/api/createFolder`, params).then(
    response => {
      console.log('成功了', response.data)
      return response.data
    },
    error => {
      console.log('失败了', error)
    }
  )
}

export const deleteResourceAPI = (params) => {
  return axios.post(`${API_DOMAIN}/api/deleteResource`, params).then(
    response => {
      console.log('成功了', response.data)
      return response.data
    },
    error => {
      console.log('失败了', error)
    }
  )
}

export const downloadResourceAPI = (id,currentPath, resourceName) => {
  PubSub.publish('downloadLoading', {"id":id,isShow:true})

  let url = `${API_DOMAIN}/api/downloadResource?currentPath=${currentPath}&resourceName=${resourceName}`
  return axios.get(url, {responseType: 'blob'}).then(
    response => {
      const contentDisposition = response.headers['content-disposition'];
      const fileName = contentDisposition.split(';')[1].trim().split('=')[1].replace(/"/g, '');
      const blob = new Blob([response.data], {type: response.headers['content-type']});
      FileSaver.saveAs(blob, fileName);
      PubSub.publish('downloadLoading', {"id":id,isShow:false})
    },
    error => {
      console.log('失败了', error)
      PubSub.publish('downloadLoading', {"id":id,isShow:false})
    }
  )
}

// const API = {fileList}
// export default API;
