import React from "react";
import {connect} from "dva";
import ShowFilterTags from "./ShowFilterTags.js";
import InputFilter from "./InputFilter.js";
import {Row} from "antd";

class UsersFilter extends React.Component{
	constructor({users}){
		super()
	}
	render(){
		return <div>
			<ShowFilterTags></ShowFilterTags>
			<Row>
				<InputFilter title="工号" name="id"></InputFilter>
				<InputFilter title="姓名" name="name"></InputFilter>
			</Row>
			<Row>
				<InputFilter title="电话" name="telephone"></InputFilter>
				<InputFilter title="关键字" name="keyWord"></InputFilter>
			</Row>
		</div>
	}
}

export default connect(
	({users})=>({users})
)(UsersFilter);