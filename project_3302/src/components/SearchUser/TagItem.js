import React from "react";
import {connect} from "dva";
import {Tag} from "antd";


class TagItem extends React.Component{
	constructor({users,item}){
		super()
	}
	cname(name){
		switch(name){
			case "id":
				return "工号";
			case "name":
				return "姓名";
			case "telephone":
				return "电话";
			case "keyWord":
				return "关键字";
		}
	}
	closeHandler(e){
		// e.preventDefault();
		this.props.dispatch({type:"users/removeFilter",name:this.props.item.name})
	}
	render(){
		return <Tag closable onClose={(e)=>this.closeHandler(e)}>
			
			<b>{this.cname(this.props.item.name)+" : "}</b>
			{String(this.props.item.value)}
			
		</Tag>
	}
}

export default connect(
	({users})=>({users})
)(TagItem);