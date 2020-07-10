import ipURL from "./config";
import {get, post, put, deletes} from "../utils/service";

//首页
function getHome(isShowMsg = 1) {
    return get(ipURL + '/first');
}
export function getHomePic() {
    return get(ipURL+'/firstimg');
}
//设备信息
//获取设备信息
function getDeviceInfo(page, isShowMsg = 0) {
    return post(ipURL + '/information/findAll/' + page + '/10');
}

// 增加设备
function addEquipment(dataForm, isShowMsg = 1) {
    return post(ipURL + '/information/add', dataForm);
}

//修改设备
function editEquipment(dataForm, isShowMsg = 1) { //
    return put(ipURL + '/information/update', dataForm);
}

//上传excel
function uploadExcel(array, isShowMsg = 1) {
    return post(ipURL + '/uploadExcel', {array, isShowMsg});
}

//删除设备
function deleteDevice(eqpId, isShowMsg = 1) {
    return deletes(ipURL + '/information/delete/' + eqpId);
}

//设备历史工况
function getDeviceHistory(page, isShowMsg = 0) {
    return get(ipURL + '/history/findAll/' + page + '/10');
}

//设备实时工况
function getDeviceMonitor(page, isShowMsg = 0) {
    return get(ipURL + '/now/findAll/' + page + '/10');
}

//搜索
function search(searchText, isShowMsg = 1) {
    return post(ipURL + '/search', {searchText});
}

export {
    getDeviceHistory,
    getDeviceInfo,
    getDeviceMonitor,
    deleteDevice,
    addEquipment,
    editEquipment,
    search,
    uploadExcel,
    getHome
}
