export default {
	namespace : "users",
	state : {
		filters:[
			// {name:"id",value:undefined},
			// {name:"name",value:undefined},
			// {name:"telephone",value:undefined},
			// {name:"keyWord",value:undefined}
		],
		users:[],
		paginations:{
			page:1,
			pageSize:10,
			order:"ascend",
			sortBy:"id",
			total:10
		}
	},
	reducers : {
		update(state,{data}){
			return {
				...state,
				paginations:{
					...state.paginations,
					page:data.page,
					pageSize:data.pageSize,
					order:data.order,
					sortBy:data.sortBy,
					total:data.total
				},
				users:data.users.map((item,index)=>{
					let obj={};
					obj.key=item.id;
					for(let k in item){
						if(k == "id") {
							obj[k]={
								value:item[k]
							}
							continue;
						}
						obj[k]={
							value:item[k],
							editable: false
						}
					}
					return obj;
				})
			}
		},
		addFilter_sync(state,{name,value}){
			return {
				...state,
				filters:[
					...state.filters,
					{
						name,
						value
					}
				]
			}
		},
		changePaginations_sync(state,{page,pageSize,sortBy,order}){
			
			return {
				...state,
				paginations:{
					...state.paginations,
					page,
					pageSize,
					sortBy,
					order
				}
			}
		},
		removeFilter_sync(state,{name}){
			return {
				...state,
				filters : state.filters.filter((item)=>{
					return item.name != name;
				})
			}
		}
	},
	effects : {
		fetchData : function *(action,{put,select}){
			let {filters,paginations} = yield select(state => state.users);
			let {page,pageSize,sortBy,order} = paginations;
			filters = JSON.stringify(filters);
						
			let data = yield fetch(`/api/users?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&order=${order}&filters=${filters}`)
						.then(data=>data.json())
						
			yield put({type:"update",data});
		},
		changeItem : function *({item} ,{put}){
			//更改条目
			let data = yield fetch(`api/users/${item.id}`,{
				method : "POST",
				headers : {
					"Content-Type" : "application/json"
				},
				body:JSON.stringify(item)
			});
			// yield put({type:"fetchData"});
		},
		addFilter : function *({name,value},{put}){
			yield put({type:"addFilter_sync",name,value});
			yield put({type:"fetchData"});
		},
		changePaginations : function*({page,pageSize,sortBy,order},{put}){

			yield put({type:"changePaginations_sync",page,pageSize,sortBy,order});
			yield put({type:"fetchData"});
		},
		removeFilter : function *({name},{put}){
			yield put({type:"removeFilter_sync",name});
			yield put({type:"fetchData"});
		}

	}
}
