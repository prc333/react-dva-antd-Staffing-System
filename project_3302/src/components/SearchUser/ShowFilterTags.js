import React from "react";
import {connect} from "dva";
import TagItem from "./TagItem.js";


class ShowFilterTags extends React.Component{
	constructor({users}){
		super()
	}
	showComponent(){
		if(this.props.users.filters.length == 0){
			return null;
		}else{
			return <div>
				<b>当前过滤 : </b>
				
				{
					this.props.users.filters.map((item,index)=>{
						return <TagItem key={item.name} item={item}></TagItem>
					})
				}
				
			</div>
		}
	}
	render(){
		return <div style={{"marginBottom":"10px"}}>
			{this.showComponent()}
		</div>
	}
}

export default connect(
	({users})=>({users})
)(ShowFilterTags);