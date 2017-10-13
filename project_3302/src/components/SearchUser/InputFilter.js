import React from "react";
import {connect} from "dva";
import { Input,Row,Col,Button } from 'antd';

class InputFilter extends React.Component{
	constructor({users}){
		super();
		this.state={
			inputValue:""
		}
	}
	changeHandler(e){
		this.setState({
			inputValue:e.target.value
		})
	}
	clickHandler(){
		this.props.dispatch({type:"users/addFilter",name:this.props.name,value:this.state.inputValue});
		this.setState({
			inputValue:""
		})
	}
	isShow(){
		var filters = this.props.users.filters;
		for (let i=0;i<filters.length;i++){
			if(filters[i].name == this.props.name){
				return false;
			}
		}
		return true;
		
	}
	render(){
		if(this.isShow()){

			return <Col span={12}><div style={{"marginBottom":"10px","width":"300px","display":"flex"}}>
				
					<Input addonBefore={this.props.title}  onChange={(e)=>{this.changeHandler(e)}} />
					{" "}
				
				
					<Button 
						type="primary"
						disabled={this.state.inputValue.length == 0}
						onClick={this.clickHandler.bind(this)} >确定</Button>
				
			</div></Col>
		}else{
			return null;
		}
	}
}

export default connect(
	({users})=>({users})
)(InputFilter);