import request from '../utils/request';
export const findAll = (startIndex) => (request({
    url: '/information/findAll/'+startIndex+'/'+10,
    method: 'get'
}));
export const Delete = (id) => (request({
    url: '/information/delete/'+id,
    method: 'DELETE'
}));
export const add = (data) => (request({
    url: '/information/add/',
    method: 'POST',
    data:data
}));
export const update = (data) => (request({
    url: '/information/update/',
    method: 'PUT',
    data:data
}));
