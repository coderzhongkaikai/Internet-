#接口文档：
###请求参数默认加上isShowMsg且后台直接返回
####返回参数code,isShowMsg下文已省略

1.	‘/getAllEquipments’：拉取当前页的设备信息
请求参数：page （int）
返回参数：tableData，totalNumber

2.	'/updateEquipment':更新（修改）设备信息
请求参数：dataform对象
返回参数：无

3.	'/addEquipment'：添加设备
请求参数：dataform对象
返回参数：无

4.	'/deleteEquipment'：删除设备
请求参数：equipmentName
返回参数：无

5.	'/search'：查询设备信息
请求参数：searchData
返回参数：tableData，totalNumber

6.	'/getHistory'：拉取设备历史工况
请求参数：page （int）
返回参数：tableData，totalNumber

7.	'/getMonitor'：拉取设备实时工况
请求参数：page （int）
返回参数：tableData，totalNumber
 
7.	'/administratorLogin'：登录
请求参数：form对象
返回参数：无

8. '/uploadExcel': 上传excel表格
请求参数：array数组
返回参数：无

#网络请求自定义Code码：

 ‘0’:操作失败
 
 '1':操作成功

#设备信息管理deviceInfo
1. 所属医院编码	hospitalID
2. 模块识别码	MID
3. 设备编号	equipmentName
4. 设备型号	equipmentType
5. 设备状态信息	workStateInfo
6. 病人ID	patientName
7. 主管医生ID	doctorName
8. 设备位置（身份证编码前6位）	GPS
9. 设备信息deviceInfo

#设备实时工况deviceMonitor
1. 设备编号	equipmentName
2. 模块识别码	MID
3. 病人ID	patientName
4. 病人基本信息	patientInfo
5. 主管医生	doctorName
6. 治疗进程	process
7. 治疗评价	review

#设备历史工况deviceHistory
1. 设备编号	equipmentName
2. 模块识别码	MID
3. 病人ID	patientName
4. 病人基本信息	patientInfo
5. 康复方案	plan
6. 实际康复数据	planData
7. 治疗进程	process
8. 治疗评价	review
9. 时间	date



