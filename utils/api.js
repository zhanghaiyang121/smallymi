let host = 'https://gwsapitest.ggwsfw.cn'
var config = {
    'getOpenid': `${host}/wx/small/openid`,
    'getphoneNumber': `${host}/wx/small/phoneNumber`,
    'getMain': `${host}/parent/main`,
    'getComplain': `${host}/complain`,
    'getProvide': `${host}/dept`,
    'getInformation': `${host}/information/wx`,
    'getDetail': `${host}/information/wx/`,
    'qiuToken': `${host}/qn/uptoken`,
    'qiuUpload': `http://up-z1.qiniup.com/`,
    'getTowns': `${host}/dept/towns`,
    'getVillage': `${host}/dept/village`,
    'saveParent': `${host}/parent`,
    'getParent': `${host}/parent/`,
    'integrity': `${host}/parent/integrity`,
    'getChild': `${host}/child/`,
    'saveChild': `${host}/child`,
    'getChildList': `${host}/parent/childs`,
    'getVaccine': `${host}/child/vaccine/`, //疫苗列表
    'getStandard': `${host}/vaccine/wx/standard`, //未登陆首页接种疫苗列表
    'deptList': `${host}/parent/dept`, //接种列表
    'setAppoint': `${host}/parent/appointment`, //申请
    'appoint': `${host}/parent/lastdept/` //上次接种地点
    
}
module.exports = config