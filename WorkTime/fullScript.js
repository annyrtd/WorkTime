$(document).hide();


// OVERWRITES old selecor
jQuery.expr[':'].contains = function(a, i, m) {
  return jQuery(a).text().toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
};

function SetOnlyOneButton()
{
	var colorOfStatus = $("div.status-right > img").attr("src");
	colorOfStatus = colorOfStatus.replace("/Content/ball_", "");
	colorOfStatus = colorOfStatus.replace(".png", "");
	switch(colorOfStatus)
	{
		case "blue":
		case "green":
			$("form[action='/Remote/Come']").hide();			
			$("form[action='/Remote/Leave']").show();
			break;
		case "yellow":
		case "gray":		
			$("form[action='/Remote/Come']").show();			
			$("form[action='/Remote/Leave']").hide();
			break;
	}
}

function PutInfoToTheLeftPanel()
{
	var clearfix1 = $("<div></div>",
	{
		"class": "clearfix"		
	}).css(
	{
		"height": "40px"
	});
	
	var clearfix2 = $("<div></div>",
	{
		"class": "clearfix"		
	}).css(
	{
		"height": "40px"
	});
	
	$("form[action='/Remote/Come']").before($("div.status-right"), 
	clearfix1,
	$("div.status-left"),
	clearfix2);	
}

function CreateMenu()
{
	var newMenu = $("<ul></ul>",
	{
		"id": "menu"
	})
	.append($(".navbar ul").first().children("li"));
	
	var clearfix = $("<div></div>",
	{
		"class": "clearfix"		
	})
	.css(
	{
		height: "55px"
	});
	
	
	$(".status-bar").append(newMenu);
	$(".status-bar").after(clearfix);
	
	$("#menu").children().each( 
		function(index)
		{
			$(this).attr("id", "menu_li" + index);		
		}
	);
	
	
	$("#menu_li0").append($("<ul id='menu_li0_submenu'><ul>"));
	$("#menu_li0_submenu").load("/ ul.nav2 li", 
		function()
		{
			$("#menu_li0_submenu li").last().children("a").attr("href", "http://co-msk-app02/");
		}
	).hide();
	
	$("#menu_li1").append($("<ul id='menu_li1_submenu'><ul>"));
	$("#menu_li1_submenu").load("/Personal ul.nav2 li",
		function()
		{
			$("#menu_li1_submenu li").last().children("a").attr("href", "http://co-msk-app02/Personal")
		}
	).hide();
	
	
	$("#menu_li2").append($("<ul id='menu_li2_submenu'><ul>"));
	$("#menu_li2_submenu").load("/Notes ul.nav2 li",
		function()
		{
			$("#menu_li2_submenu li").last().children("a").attr("href", "http://co-msk-app02/Notes")
		}
	).hide()
	
	
	$("#menu_li3").append($("<ul id='menu_li3_submenu'><ul>"));
	$("#menu_li3_submenu").load("/Calendar ul.nav2 li",
		function()
		{
			$("#menu_li3_submenu li").eq(1).children("a").attr("href", "http://co-msk-app02/Calendar")
		}
	).hide();
}



$(document).ready
( 
	function() 
	{
		SetOnlyOneButton();
		PutInfoToTheLeftPanel();
		CreateMenu();
		$("ul.nav2").hide();
		$("div.version").hide();	
		$(document).show();		
		$(".status-bar").height("100px");
		
		$("div.status-right a").click(
			function()
			{				
				return false;	
			}
		)		
	}		
);