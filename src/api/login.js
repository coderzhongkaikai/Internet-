import ipURL from "./config";
import {get, post} from "../utils/service";
//登录
export function login(username,password,isShowMsg=0) {
    return post(ipURL + '/login/'+username+'/'+password, {username,password});
}

export function getUser(username) {
    return post(ipURL+'/getuser/'+username);
}