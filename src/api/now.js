import request from '../utils/request';
export const findAll = (startIndex) => (request({
    url: '/now/findAll/'+startIndex+'/'+10,
    method: 'get'
}));
export const Delete = (id) => (request({
    url: '/now/delete/'+id,
    method: 'DELETE'
}));
export const add = (data) => (request({
    url: '/now/add',
    method: 'POST',
    data:data
}));
export const update = (data) => (request({
    url: '/now/update',
    method: 'PUT',
    data:data
}));
