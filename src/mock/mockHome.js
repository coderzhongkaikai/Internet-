import Mock from 'mockjs'
import httpUrl from '../api/config'
export default Mock.mock(httpUrl+'/getHome','post',function (data,isShowMsg) {
    const form={

    };
    return {form: form,isShowMsg:isShowMsg};
});
