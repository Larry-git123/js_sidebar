/**
 * My sidebar for jQuery
 */
;(function ($){
	var bootstrapTemplate = {
		'ulclass' : 'nav nav-pills flex-column',
		'liclass' : 'nav-item',
		'liclasswithchild' : 'nav-item',
		'subulclass' : 'nav nav-pills'
	};
	
	var adminLTETemplate = {
		'ulclass' : 'sidebar-menu tree',
		'liclass' : null,
		'liclasswithchild' : 'treeview',
		'subulclass' : 'treeview-menu'
	};
	
	var sidebarDefaults = {
		'data' : null,	//侧边导航的条目数据
		'doublelevel' : true,	//允许二级导航
		'header' : 'HEADER',	//头部文字，仅在useHeader为true时有效
		'multilevel' : false,	//允许多级导航（没用）
		'template' : adminLTETemplate,	//采用的模板，默认为bootstrap模板
		'useheader' : false,	//显示头部
		'useicon' : false,	//显示图标
		'usespan' : false,	//采用<span>标签包装文字
		'url' : null	//条目指向的URL
	};
	
	var MySidebar = function(elem, opts) {
		this.elem = elem;
		this.defaults = sidebarDefaults;
		this.options = $.extend({}, this.defaults, opts);
	};
	
	/*$.fn.mySidebar = function(opts) {
		return this.each(function() {
			var elem = $(this);
			var mySidebar = new MySidebar(elem, opts);
			mySidebar.init();
		})
	};*/
	
	$.fn.mySidebar = function(opts) {
		var elem = $(this);
		var mySidebar = new MySidebar(elem, opts);
		mySidebar.init();
		return mySidebar;
	};
	
	MySidebar.prototype = {
		//更改模板
		changeTemplate : function (template) {
			this.options['template'] = template;
			return;
		},
		//获取sidebar对象
		getSidebar : function () {
			return this.elem;
		},
		//获取选项
		getOption : function (opt) {
			return this.options[opt];
		},
		//初始化sidebar
		init : function () {
			var theSidebar = this;
			//需要在ul元素上调用
			var sidebarul = theSidebar.elem;
			//设置ul的class
			sidebarul.addClass(theSidebar.options.template.ulclass);
			//如果没有数据则返回
			if(!theSidebar.options.data) {
				alert('ERROR');
				return;
			}
			//添加导航头部
			var header = null;
			if(theSidebar.options.useheader) {
				header = $("<li></li>").text(theSidebar.options.header);
				header.addClass('header');
				sidebarul.append(header);
			}
			//添加一级导航条目
			$.each(theSidebar.options.data, function(index, object) {
				var entry = $("<li></li>");
				if(object.id) {entry.attr('id', object.id);}
				if(object.name) {entry.attr('name', object.name);}
				var a; if(object.url) {a = $("<a href='" + object.url + "'></a>");} else {a = $("<a href='#'></a>");}
				if(theSidebar.options.useicon && object.icon) {
					//指定显示图标
					var i = $("<i></i>");
					i.addClass(object.icon);
					a.append(i);
				}
				var span;
				if(theSidebar.options.usespan) {span = $("<span></span>").text(object.text);} else {span = object.text;}
				a.append(span);
				entry.append(a);
				//添加二级导航条目（如果有）
				var subul;
				if(theSidebar.options.doublelevel && object.children) {
					entry.addClass(theSidebar.options.template.liclasswithchild);
					subul = $("<ul style='display:none;'></ul>");
					subul.addClass(theSidebar.options.template.subulclass);
					$.each(object.children, function(subi, subo) {
						var subentry = $("<li></li>");
						if(subo.id) {subentry.attr('id', subo.id);}
						if(subo.name) {subentry.attr('name', subo.name);}
						var suba = $("<a href='" + subo.url + "'></a>");
						if(theSidebar.options.useicon && subo.icon) {
							//指定显示图标
							var subicon = $("<i></i>");
							subicon.addClass(subo.icon);
							suba.append(subicon);
						}
						var subspan;
						if(theSidebar.options.usespan) {
							subspan = $("<span></span>").text(subo.text);
						} else {
							subspan = subo.text;
						}
						suba.append(subspan);
						subentry.append(suba);
						subul.append(subentry);
					});
					entry.append(subul);
				}
				sidebarul.append(entry);
			});
		},
		//设定选项
		setOption : function (opt, str) {
			this.options[opt] = str;
			return;
		},
		//设定选中
		setActive : function (str) {
			if(this.elem.find('#'+str)){
				this.elem.find('#'+str).addClass('active');
			}
			//设置上级菜单
			if(this.elem.find('#'+str).parents('li.'+this.options.template.liclasswithchild)){
				//显示当前选中项所在的菜单
				this.elem.find('#'+str).parent('ul.'+this.options.template.subulclass).css('display', '');
				this.elem.find('#'+str).parents('li.'+this.options.template.liclasswithchild).addClass('active menu-open');
			}
		}
	}
})(jQuery);