function initPageNoHtml()
{
	var jpage = $(this);
	jpage.on("pagebeforeshow", function () {
		jpage.find(".bd").append($("<p>").html("beforeshow"));
	});
}

function createPageNoHtml()
{
	var jpage = $('<div mui-initfn="initPageNoHtml">'
			+ '<div class="hd"><a href="javascript:hd_back();" class="btn-icon"><i class="icon icon-back"></i></a><h2>no-html test</h2></div><div class="bd"></div>'
			+ '</div>');
	return jpage;
}

MUI.options.onCreatePage = createPageNoHtml;
