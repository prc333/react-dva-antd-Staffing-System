import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Layout, Menu, Icon ,Switch} from 'antd';
import SearchUser from "../components/SearchUser/SearchUser.js";
import Regist from "../components/Regist/Regist.js";
const { Header, Content, Footer, Sider } = Layout;

class IndexPage extends React.Component {
    constructor(){
        super();
        this.state={
            theme:"dark",
            menuItem : "1"
        }
    }
    componentWillMount(){
        if(window.sessionStorage.getItem("login") != "true"){
            window.location = "/#/login";
        }
    }
    changeTheme(value){
        this.setState({
            theme : (value?"dark":"light")
        })
    }
    menuClickHandler({ item, key, keyPath }){
        this.setState({
            ...this.state,
            menuItem : key
        })
    }
    changeToKey4(){
        this.setState({
            ...this.state,
            menuItem : "4"
        })
    }
    showContent(){
        if(this.state.menuItem == "1"){
            return null;
        }else if(this.state.menuItem == "2"){
            return null;
        }else if(this.state.menuItem == "3"){
            return null; 
        }else if(this.state.menuItem == "4"){
            return <SearchUser></SearchUser>;
        }else if(this.state.menuItem == "5"){
            return <Regist changeToKey4={this.changeToKey4.bind(this)}></Regist>;
        }

    }
    render(){
        return (
            <Layout>
              <Sider
                
                breakpoint="lg"
                collapsedWidth="0"
                onCollapse={(collapsed, type) => { /*console.log(collapsed, type);*/ }}
              >
                <div className={styles.logo} />
                <Menu theme={this.state.theme} mode="inline" 
                    defaultSelectedKeys={['1']} 
                    selectedKeys={[this.state.menuItem]}
                    onClick={this.menuClickHandler.bind(this)} >
                  <Menu.Item key="1">
                    <Icon type="user" />
                    <span className="nav-text">用户</span>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Icon type="video-camera" />
                    <span className="nav-text">nav 2</span>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Icon type="upload" />
                    <span className="nav-text">nav 3</span>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <Icon type="user" />
                    <span className="nav-text">用户管理</span>
                  </Menu.Item>
                  <Menu.Item key="5">
                    <Icon type="user" />
                    <span className="nav-text">注册新用户</span>
                  </Menu.Item>
                </Menu>
                <div style={{ textAlign: 'right' }}>
                    <Switch

                      checked={this.state.theme === 'dark'}
                      onChange={this.changeTheme.bind(this)}
                      checkedChildren="黑暗"
                      unCheckedChildren="明亮"
                    />
                </div>
              </Sider>
              <Layout>
                <Header style={{ background: '#fff', padding: 0 }} />
                <Content style={{ margin: '24px 16px 0' }}>
                  <div style={{ padding: 24, background: '#fff', minHeight: 500 }}>
                    {this.showContent()}
                  </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                   ©{(new Date()).getFullYear()}  by prc333
                </Footer>
              </Layout>
            </Layout>
            
            
        )
    }
}



export default connect()(IndexPage);
