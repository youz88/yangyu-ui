import React from 'react'
import { Menu, Icon, Switch } from 'antd';
const SubMenu = Menu.SubMenu;

import Config from '../../config/index';

class LeftMenu extends React.Component {
    state = {
        theme: 'dark',
        current: '1',
        subMenu: ''
    }

    changeTheme = (value) => {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    }
    
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    componentDidMount(){
        let _this = this;
        let _token = localStorage.getItem(Config.userToken);
        $.ajax({
            url: '/permission/all',
            type: 'POST',
            headers: {
                Authorization: _token
            },
            success: function(data){
                _this.setState({
                    subMenu: data.data.map( (permission,index)=>{
                        return <SubMenu key={"sub"+index} title={<span><Icon type={permission.icon} /><span>{permission.permissionName}</span></span>}>
                                {
                                    permission.child.map((child)=>{
                                        return <Menu.Item key={child.id}>{child.permissionName}</Menu.Item>
                                    })
                                }
                            </SubMenu>
                    }),
                })
            }
        })
    }

    render() {
        return (
            <div>
                <Switch
                    checked={this.state.theme === 'dark'}
                    onChange={this.changeTheme}
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                />
                <br />
                <br />
                <Menu
                    theme={this.state.theme}
                    onClick={this.handleClick}
                    /* defaultOpenKeys={['sub0']} */
                    selectedKeys={[this.state.current]}
                    mode="inline"
                >
                    {this.state.subMenu}
                </Menu>
            </div>
        )
    }
}

module.exports = LeftMenu;