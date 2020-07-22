import request from '../utils/request';
export const findAll = (startIndex) => (request({
    url: '/history/findAll/'+startIndex+'/'+10,
    method: 'get'
}));
export const Delete = (id) => (request({
    url: '/history/delete/'+id,
    method: 'DELETE'
}));
export const add = (data) => (request({
    url: '/history/add/',
    method: 'POST',
    data:data
}));
export const update = (data) => (request({
    url: '/history/update/',
    method: 'PUT',
    data:data
}));
