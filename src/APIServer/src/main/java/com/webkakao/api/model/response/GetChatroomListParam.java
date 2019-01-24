package com.webkakao.api.model.response;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.webkakao.api.model.ChatroomInfo;
import com.webkakao.api.model.ChatroomUserList;

public class GetChatroomListParam {

	private List<ChatroomInfo> list;

	public List<ChatroomInfo> getList() {
		return list;
	}

	public void setList(List<ChatroomInfo> list) {
		this.list = list;
	}

	public void setChatroomUserList(List<ChatroomUserList> all, long user_idx) {
		
		Map<Long, List<ChatroomUserList>> map = new HashMap<Long,List<ChatroomUserList>>();
		
		for(int i=0; i<all.size(); i++) {
			if(all.get(i).getUser_idx() != user_idx) {
				if(map.get(all.get(i).getChatroom_idx()) == null) {
					List<ChatroomUserList> tmp = new ArrayList<ChatroomUserList>();
					tmp.add(all.get(i));
					map.put(all.get(i).getChatroom_idx(), tmp);
				} else {
					map.get(all.get(i).getChatroom_idx()).add(all.get(i));
				}
			}
		}
		
		for(int i=0; i<list.size(); i++) {
			List<ChatroomUserList> user_list = map.get(list.get(i).getChatroom_idx());
			list.get(i).setUser_list(user_list);
		}
		
	}

}
