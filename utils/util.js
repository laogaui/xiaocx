Date.prototype.format = function (format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatRisks (obj) {
  let structure = {
    az: {},
    tj: {},
  }
  let risks = obj.risks
  let sections = obj.sections
  let buildings = obj.buildings
  Object.keys(risks).forEach((i) => {
    if (risks[i]['category'] == '土建') {
      let sectionId = risks[i]['section']
      let buildingId = sections[sectionId]['building']
      if (!structure.tj[`${buildingId}`]) {
        structure.tj[`${buildingId}`] = {}
      }
      if (!structure.tj[`${buildingId}`][`${sectionId}`]) {
        structure.tj[`${buildingId}`][`${sectionId}`] = []
      }
      structure.tj[`${buildingId}`][`${sectionId}`].push(i)
    } else if (risks[i]['category'] == '安装') {
      let sectionId = risks[i]['section']
      let buildingId = sections[sectionId]['building']
      if (!structure.az[`${buildingId}`]) {
        structure.az[`${buildingId}`] = {}
      }
      if (!structure.az[`${buildingId}`][`${sectionId}`]) {
        structure.az[`${buildingId}`][`${sectionId}`] = []
      }
      structure.az[`${buildingId}`][`${sectionId}`].push(i)
    }
  })
  let ret = Object.assign({}, obj) 

  ret.structure = structure

  return ret
}

module.exports = {
  formatTime,
  formatRisks
}
