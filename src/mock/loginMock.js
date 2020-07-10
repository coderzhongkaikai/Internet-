import Mock from 'mockjs'
import httpUrl from '../api/config'
// export default Mock.mock(httpUrl+'/loginCheck','post',function (data,isShowMsg) {
//     let form=JSON.parse(data.body);
//     console.log(form);
//     if (form.username==='admin' && form.password==='1234') return {code: 200,isShowMsg: 0,token:"ASDQWXZ1328QW"};
//     else return {code: 0}
//     // return form;
// });
export function loginMock(username,password) {
    console.log(username,password)
    if (username==='admin' && password==='1234') return {code: 200,isShowMsg: 0,token:"ASDQWXZ1328QW"};
    else return {code: 0}
    // return post(ipURL + '/login/'+username+'/'+password, {username,password});
}
