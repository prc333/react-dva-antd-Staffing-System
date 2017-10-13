import React from "react";
import {connect} from "dva";
import styles from "./SearchUser.css";
import EditableCell from "./EditableCell.js";
import { Table, Input, Popconfirm } from 'antd';
import UsersFilter from "./UsersFilter.js";
const { Column, ColumnGroup } = Table;
class SearchUser extends React.Component{
	constructor({users,dispatch}){
		super();

		this.state = {
			data:users.users,
			page:users.paginations.page,
			pageSize:users.paginations.pageSize,
			sortBy:users.paginations.sortBy,
			order:users.paginations.order

		};
		this.columns = [{
	      title: 'ID',
	      dataIndex: 'id',
	      sorter:true,
	      width: '10%',
	      render: (text, record, index) => this.renderColumns(this.state.data, index, 'id', text),
	    }, {
	      title: '姓名',
	      dataIndex: 'name',
	      sorter:true,
	      width: '10%',
	      render: (text, record, index) => this.renderColumns(this.state.data, index, 'name', text),
	    }, {
	      title: '电话',
	      sorter:true,
	      dataIndex: 'telephone',
	      width: '15%',
	      render: (text, record, index) => this.renderColumns(this.state.data, index, 'telephone', text),
	    },{
	      title: '电子邮箱',
	      sorter:true,
	      dataIndex: 'email',
	      width: '20%',
	      render: (text, record, index) => this.renderColumns(this.state.data, index, 'email', text),
	    },{
	      title: '籍贯',
	      sorter:true,
	      dataIndex: 'homeplace',
	      width: '25%',
	      render: (text, record, index) => this.renderColumns(this.state.data, index, 'homeplace', text),
	    }, {
	      title: 'operation',
	      dataIndex: 'operation',
	      render: (text, record, index) => {
	        const { editable } = this.state.data[index].name;
	        return (
	          <div className="editable-row-operations">
	            {
	              editable ?
	                <span>
	                  <a onClick={() => this.editDone(index, 'save')}>保存</a>
	                  <Popconfirm title="确定取消编辑吗?" onConfirm={() => this.editDone(index, 'cancel')}>
	                    <a>取消</a>
	                  </Popconfirm>
	                </span>
	                :
	                <span>
	                  <a onClick={() => this.edit(index)}>编辑</a>
	                </span>
	            }
	          </div>
	        );
	      },
	    }];
	}
	
	componentWillMount(){
		this.props.dispatch({type:"users/fetchData",page:1,pageSize:10,keyWord:undefined,sortBy:"id",order:"ascend"})
	}
	componentWillReceiveProps(nextProps){
		
		this.setState({
			...this.state,
			data:nextProps.users.users,
			page:nextProps.users.paginations.page,
			pageSize:nextProps.users.paginations.pageSize,
			sortBy:nextProps.users.paginations.sortBy,
			order:nextProps.users.paginations.order
		})
	}
	renderColumns(data, index, key, text) {
    const { editable, status } = data[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return (<EditableCell
    	style={{"fontSize":"30px"}}
      editable={editable}
      value={text}
      onChange={value => this.handleChange(key, index, value)}
      status={status}

    />);
  }
  handleChange(key, index, value) {
    const { data } = this.state;
    data[index][key].value = value;
    data[index].haschangedone=data[index].haschangedone+1;
    if(data[index].haschangedone == 4){
    	var obj={};
	    obj.id=data[index].id.value;
	    obj.name=data[index].name.value;
	    obj.email=data[index].email.value;
	    obj.telephone=data[index].telephone.value;
	    obj.homeplace=data[index].homeplace.value;
	    
	    this.props.dispatch({type:"users/changeItem",item:obj})
    	delete data[index].haschangedone
    }
    this.setState({ data });


  }
  edit(index) {
    const { data } = this.state;
    data[index].haschangedone=0;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true;
      }
    });
    this.setState({ data });

  }
  editDone(index, type) {

    const { data } = this.state;
    

    
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false;
        data[index][item].status = type;
      }
    });
    this.setState({ data }, () => {
      Object.keys(data[index]).forEach((item) => {
        if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
          delete data[index][item].status;
        }
      });
    });
    // this.props.dispatch({type:"users/changeItem",item:obj})
  }
  changeHandler(pagination, filters, sorter){
  	if(Object.keys(sorter).length == 0){
  		sorter.field="id";
  		sorter.order="ascend";
  	}
  	this.props.dispatch({
  		type:"users/changePaginations",
  		page:pagination.current,
		pageSize:this.state.pageSize,
		sortBy:sorter.field,
		order:sorter.order
		
  	})
  }
	render(){
		
		const {
			data
		} = this.state;
		
		const dataSource = data.map((item) => {
			const obj = {};
			Object.keys(item).forEach((key) => {
				obj[key] = key === 'key' ? item[key] : item[key].value;
			});
			return obj;
		});
		const columns = this.columns;
		var self=this;
    	return (

    		<div>
    			<UsersFilter></UsersFilter>
    			<Table bordered dataSource={dataSource} columns={columns}
    				pagination={{
    				    current : parseInt(this.props.users.paginations.page),
    				    pageSize: parseInt(this.props.users.paginations.pageSize),
    				    total : parseInt(this.props.users.paginations.total),
    				    
    				}}
    				onChange={this.changeHandler.bind(this)}  />
    				
    		</div>
    	);
	}
}
export default connect(
	({users})=>({users})
)(SearchUser) ;
