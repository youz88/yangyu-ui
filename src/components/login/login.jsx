import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Spin, Form, Input, Button, message } from 'antd';
const FormItem = Form.Item;

import $ from 'jquery';

import Config from '../../config/index';
import Base64 from '../../config/base64';

import styles from './login.less';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            passwordDirty: false,
            username: '',
            password: ''
        };
    }

    handleSubmit = (e) => { // 登录
        e.preventDefault();
        const {actions, form} = this.props;
	    form.validateFieldsAndScroll((err, values) => {
		    if (!err) {
                let username = values.username, // 用户名
                    password = values.password, // 密码
                    loginParams = { // 登录参数
                        phone: username,
                        password: Base64.base64encode(password),
                        accountType: 0,
                    };
                $.post('http://localhost:8020/auth/token',loginParams,function(data){
                    localStorage.setItem('token',data.msg)
                },'json')
		    }
	    });
    }
    // 验证用户名
    checkUsername = (rule, value, callback) => {
        const form = this.props.form;
        if (!value) {
            callback();
        } else if (!Config.checkEng(value)) {
            callback(Config.message.usernameEng);
        } else {
            callback();
        }
    }
    // 验证密码
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.passwordDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 14 },
            },
          };

        return (
            <div className="login-container">
                <div className="login-form">
                    <div className="login-logo">
                        <img src={Config.logoSrc} />
                        <span>youz</span>
                    </div>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem hasFeedback>
                            {getFieldDecorator('username', { initialValue: 'admin', rules: [{ required: true, message: Config.message.usernameInput }, { validator: this.checkUsername }] })(
                                <Input size="large" placeholder="用户名" maxLength="6" />
                            )}
                        </FormItem>
                        <FormItem hasFeedback>
                            {getFieldDecorator('password', { rules: [{ required: true, message: Config.message.passwordInput }, { validator: this.checkPassword }] })(
                                <Input size="large" type="password" placeholder="密码" maxLength="6" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" size="large" >登录</Button>
                        </FormItem>
                        <div className="login-account">
                            <span>账号：admin</span>
                            <span>密码：admin</span>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

const LoginForm = Form.create()(Login);

module.exports = LoginForm;