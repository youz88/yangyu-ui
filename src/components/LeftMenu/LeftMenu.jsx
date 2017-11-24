import React from 'react'
import { Menu, Icon, Switch } from 'antd';
const SubMenu = Menu.SubMenu;

import Config from '../../config/index';

class LeftMenu extends React.Component {
    state = {
        theme: 'light',
        // current: '101',
    }

    changeTheme = (value) => {
        this.props.changeSiderColor(value);
        this.setState({
            theme: value ? 'light' : 'dark',
        });
    }
    
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (
            <div>
                <Switch
                    checked={this.state.theme === 'light'}
                    onChange={this.changeTheme}
                    checkedChildren="Light"
                    unCheckedChildren="Dark"
                />
                <br />
                <br />
                <Menu
                    theme={this.state.theme}
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    /* defaultOpenKeys={['sub0']} */
                    mode="inline"
                >
                    {this.props.subMenu}
                </Menu>
            </div>
        )
    }
}

module.exports = LeftMenu;