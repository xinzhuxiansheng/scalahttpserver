import {UPDATE_CURRENTPATH} from "../constant";

export const createFileListTableAction = currentPath => ({
  type:UPDATE_CURRENTPATH,data:currentPath
})
