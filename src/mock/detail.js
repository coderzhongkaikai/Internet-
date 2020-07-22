export default Mock.mock(httpUrl+'/equipment/get/'+1+'/10','post',function (data) {
    let page=JSON.parse(data.body);
    let table= {
        tableName: '设备信息',
        tableHead: [
            {index: 0,label:'模块识别码',prop:'moduleId'},
            {index: 1,label:'设备编号',prop:'eqpId'},
            {index: 2,label:'设备类型',prop:'eqpTypeId'},
            {index: 4,label:'当前状态',prop:'nowStatus'},
            {index: 5,label:'当前患者',prop:'patientName'},
            {index: 6,label:'负责医师',prop:'doctorName'},
            {index: 7,label:'所属医院',prop:'hospitalId'},
            ],
        tableData: [
            {
                'hospitalId': '100021',
                'moduleId': 20191147847578292,
                'eqpId': '0418032',
                'eqpTypeId': 'SZ-001',
                'nowStatus': 'none',
                'patientName': 'xxx',
                'doctorName': 'xxx',
                'location': '重庆市',
                'equipmentID': 122,
            },
            {
                'hospitalId': '100021',
                'moduleId': 20191147847578292,
                'eqpId': '0418033',
                'eqpTypeId': 'SZ-001',
                'nowStatus': 'none',
                'patientName': 'xxx',
                'doctorName': 'xxx',
                'location': '重庆市',
                'equipmentID': 122,
            },
            {
                'hospitalId': '100021',
                'moduleId': 20191147847578292,
                'eqpId': '0418034',
                'eqpTypeId': 'XZ-002',
                'nowStatus': 'none',
                'patientName': 'xxx',
                'doctorName': 'xxx',
                'location': '重庆市',
                'equipmentID': 122,
            }
            ]
    };
    let totalNumber=table.tableData.length;
    return {list: table,totalNumber: totalNumber,code: 1};
});