/**
 * api接口的统一封装
 */
import AdminApi from './AdminApi'
import ArticleApi from './ArticleApi'
import AuthenticationApi from './AuthenticationApi'
import UserApi from './UserApi'
import CommonApi from './CommonApi'

const apis = {
  AdminApi,
  ArticleApi,
  AuthenticationApi,
  UserApi,
  CommonApi,
};

export default apis


