import Mock from 'mockjs'
import httpUrl from '../api/config'

export default Mock.mock(httpUrl+'/getHistory','post',function (data) {
    let databody=JSON.parse(data.body);
    let table= {
        tableName: '设备历史工况',
        tableHead: [

        ],
        tableData: [

        ]
    };
    let totalNumber=table.tableData.length;
    return {table: table,totalNumber: totalNumber,code: 1,isShowMsg: databody.isShowMsg};
});
