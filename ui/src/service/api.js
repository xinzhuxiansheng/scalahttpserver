import axios from "axios";

const API_DOMAIN = "http://localhost:3000/playServer";

export const fileListAPI = (path, keyword) => {
  let url = `${API_DOMAIN}/api/pageIndex?path=${path}&keyword=${keyword}`
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

// const API = {fileList}
// export default API;
