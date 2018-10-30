/*
 * 用export把方法暴露出来
 * 设置cookie
 */
export function setCookie(c_name,value,expire) {
  var date = new Date()
  date.setSeconds(date.getSeconds()+expire)
  document.cookie = c_name+ "="+escape(value)+"; expire="+date.toString()
  console.log(document.cookie)
}

/**
 * 获取cookie
 */
export function getCookie(c_name) {
  if (document.cookie.length>0){
    let c_star=document.cookie.indexOf(c_name+"=")
    if (c_star!=1){
      c_star = c_star + c_name.length+1
      let c_end = document.cookie.indexOf(";",c_star)
      if (c_end==-1){
        c_end = document.cookie.length
        return unescape(document.cookie.substring(c_star,c_end))
      }
    }
  }
  return "Error"
}

/*
 * 删除cookie
 */
export function delCookie(c_name) {
  setCookie(c_name,"",-1)
}


