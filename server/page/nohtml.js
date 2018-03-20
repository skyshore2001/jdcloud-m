function createPageNoHtml()
{
	var jpage = $('<div>'
			+ '<div class="hd"><a href="javascript:hd_back();" class="btn-icon"><i class="icon icon-back"></i></a><h2>no-html test</h2></div><div class="bd"></div>'
			+ '</div>');

	jpage.on("pagecreate", onPageCreate); // 此时jpage已做过系统初始化
	return jpage;

	// 相当于普通的initPageXXX函数
	function onPageCreate()
	{
		jpage.find(".bd").append($("<p>").html("initPage"));
		jpage.on("pagebeforeshow", onPageBeforeShow);
	}
	function onPageBeforeShow()
	{
		jpage.find(".bd").append($("<p>").html("pagebeforeshow"));
	}
}

MUI.options.onCreatePage = createPageNoHtml;
