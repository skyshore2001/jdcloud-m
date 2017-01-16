function initPageListDemo()
{
	var jpage = $(this);

	// 模拟取奇数、偶数接口
	// getList(_pagekey?, _pagesz?, max?=99, type=odd|even)
	MUI.mockData['getList'] = function (param, postParam) {
		var pagekey = param._pagekey || 1;
		var pagesz = param._pagesz || 10;
		var max = param.max || 199;
		var type = param.type;
		var sz = 0;

		var ret = {list: [], nextkey: 1};
		for (var i=0; sz<pagesz; ++i) {
			var id = i + pagekey;
			if (id >= max) {
				delete ret.nextkey;
				break;
			}
			if (type && ( (type == 'odd' && id % 2 == 0) || (type == 'even' && id % 2 == 1)))
				continue;
			++ sz;
			ret.list.push({
				id: id,
				name: "item " + id,
				type: id%2==0? "偶数": "奇数"
			});
			ret.nextkey = id+1;
		}
		return [0, ret];
	}
	MUI.options.mockDelay = 1000;
	// MUI.options.PAGE_SZ = 5;

	// 在点击标题栏后才初始化子列表，从而避免进入页面就获取数据
	jpage.find(">.hd .mui-navbar").click(function (ev) {
		var linkto = $(ev.target).attr("mui-linkto");
		setTimeout(function () {
			initSublist(linkto);
		});
	});

	var lstIf2, lstIf3;
	function initSublist(linkto)
	{
		if (linkto == "#lst2") {
			if (lstIf2 == null) {
				lstIf2 = initPageList(jpage, {
					pageItf: PageOrders,
					navRef: "#lst2 .mui-navbar",
					listRef: "#lst2 .p-list2",
					onAddItem: onAddItem,
					onNoItem: onNoItem,
				});

				// 设置容器高度，从而滚动时标题栏可以不动
				var jlst2 = jpage.find("#lst2Container");
				jlst2.height(jpage.find(".bd").height() - jlst2.prop("offsetTop"));
			}
		}
		else if (linkto == "#lst3") {
			if (lstIf3 == null) {
				lstIf3 = initPageList(jpage, {
					pageItf: PageOrders,
					navRef: "#lst3 .mui-navbar",
					listRef: "#lst3 .p-list2",
					onAddItem: onAddItem,
					onNoItem: onNoItem,
					autoLoadMore: false,
				});
			}
		}
	}

	var lstIf = initPageList(jpage, {
		pageItf: PageOrders,
		navRef: ">.hd .mui-navbar",
		listRef: ">.bd .p-list",
		onAddItem: onAddItem,
		onNoItem: onNoItem,
	});

	function onAddItem(jlst, itemData)
	{
		var cell = {
			bd: "<p><b>" + itemData.name + "</b></p><p>编号: " + itemData.id + "</p>",
			ft: StatusStr[itemData.status]
		};
		var ji = createCell(cell);
		ji.appendTo(jlst);
	}

	function onNoItem(jlst)
	{
		var ji = createCell({bd: "没有数据"});
		ji.css("text-align", "center");
		ji.appendTo(jlst);
	}
}

