import { Alert, Checkbox, Icon } from 'antd';
import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import styles from './style.less';
const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;

@connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))
class Login extends Component {
  loginForm = undefined;
  state = {
    type: 'account',
    autoLogin: true,
  };
  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };
  handleSubmit = (err, values) => {
    const { type } = this.state;

    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: { ...values, type },
      });
    }
  };
  onTabChange = type => {
    this.setState({
      type,
    });
  };
  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      if (!this.loginForm) {
        return;
      }

      this.loginForm.validateFields(['mobile'], {}, async (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;

          try {
            const success = await dispatch({
              type: 'login/getCaptcha',
              payload: values.mobile,
            });
            resolve(!!success);
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  renderMessage = content => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { userLogin, submitting } = this.props;
    const { status, type: loginType } = userLogin;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          onCreate={form => {
            this.loginForm = form;
          }}
        >
          <Tab
            key="account"
            tab='账户密码登录'
          >
            {status === 'error' &&
              loginType === 'account' &&
              !submitting &&
              this.renderMessage(
                '账户或密码错误（admin/ant.design）'
              )}
            <UserName
              name="userName"
              placeholder='用户名：admin or user'
              rules={[
                {
                  required: true,
                  message: '请输入用户名'
                },
              ]}
            />
            <Password
              name="password"
              placeholder='密码：ant.design'
              rules={[
                {
                  required: true,
                  message: '请输入密码'
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();

                if (this.loginForm) {
                  this.loginForm.validateFields(this.handleSubmit);
                }
              }}
            />
          </Tab>
          <Tab
            key="mobile"
            tab= '手机号登录'
          >
            {status === 'error' &&
              loginType === 'mobile' &&
              !submitting &&
              this.renderMessage(
                '验证码错误'
              )}
            <Mobile
              name="mobile"
              placeholder='手机号'
              rules={[
                {
                  required: true,
                  message: '请输入手机号'
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误'
                },
              ]}
            />
            <Captcha
              name="captcha"
              placeholder=''
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText=''
              getCaptchaSecondText=''
              rules={[
                {
                  required: true,
                  message: ''
                },
              ]}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
            <a
              style={{
                float: 'right',
              }}
              href=""
            >
              忘记密码
            </a>
          </div>
          <Submit loading={submitting}>
            登录
          </Submit>
          <div className={styles.other}>
          其他登录方式
            <Icon type="alipay-circle" className={styles.icon} theme="outlined" />
            <Icon type="taobao-circle" className={styles.icon} theme="outlined" />
            <Icon type="weibo-circle" className={styles.icon} theme="outlined" />
            <Link className={styles.register} to="/user/register">
            注册账户
            </Link>
          </div>
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
