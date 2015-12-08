$(document).hide();


// OVERWRITES old selecor
jQuery.expr[':'].contains = function(a, i, m) {
  return jQuery(a).text().toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
};

function SetRaisedForOnlyOneButton()
{
	var colorOfStatus = $("div.status-right > img").attr("src");
	colorOfStatus = colorOfStatus.replace("/Content/ball_", "");
	colorOfStatus = colorOfStatus.replace(".png", "");
	switch(colorOfStatus)
	{
		case "blue":
		case "green":
			$("form[action='/Remote/Come']").children("button")
				.removeClass("mdl-button--raised");
			componentHandler.upgradeElement($("form[action='/Remote/Come']").children("button").get(0));			
			$("form[action='/Remote/Leave']").show();
			break;
		case "yellow":
		case "gray":		
			$("form[action='/Remote/Come']").show();
			$("form[action='/Remote/Leave']").children("button")
				.removeClass("mdl-button--raised");
			componentHandler.upgradeElement($("form[action='/Remote/Leave']").children("button").get(0));
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
	
	var newText = ChangeNumberOfMonthToWord($("div.status-left").text());
	$("div.status-left").empty().append(newText);
}

function ChangeNumberOfMonthToWord(textOfStatusLeftBlock)
{
	var temp = textOfStatusLeftBlock;
	
	var fisrtChar = temp.substr(0,1);
	
	switch(fisrtChar)
	{
		case "п":
			temp = "П" + temp.substr(1);
			break;
		case "в":
			temp = "В" + temp.substr(1);
			break;
		case "с":
			temp = "С" + temp.substr(1);
			break;
		case "ч":
			temp = "Ч" + temp.substr(1);
			break;
	}
	
	temp = temp.replace(".01.", " Января ");	
	temp = temp.replace(".02.", " Февраля ");
	temp = temp.replace(".03.", " Марта ");
	temp = temp.replace(".04.", " Апреля ");
	temp = temp.replace(".05.", " Мая ");
	temp = temp.replace(".06.", " Июня ");
	temp = temp.replace(".07.", " Июля ");
	temp = temp.replace(".08.", " Августа ");
	temp = temp.replace(".09.", " Сентября ");
	temp = temp.replace(".10.", " Октября ");
	temp = temp.replace(".11.", " Ноября ");
	temp = temp.replace(".12.", " Декабря ");
	
	var position = temp.indexOf(",");
	return temp.substr(0, position) + "<br>" + temp.substr(position + 2);
}

function CreateMenu()
{
	var newMenu = $("<ul></ul>",
	{
		"id": "menu", 		
		"class": "nav"
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
			$(this).attr("id", "menu_li" + index).addClass("drop");	
		}
	);
	
	
	$("#menu_li0").append($("<ul id='menu_li0_submenu'><ul>"));
	$("#menu_li0_submenu").load("/ ul.nav2 li", 
		function()
		{
			$("#menu_li0_submenu li").first().children("a").attr("href", "http://co-msk-app02/?officeid=1");
			$("#menu_li0_submenu li").last().children("a").attr("href", "http://co-msk-app02/?officeid=2");
						
		}
	);
	
	$("#menu_li1").append($("<ul id='menu_li1_submenu'><ul>"));
	$("#menu_li1_submenu").load("/Personal ul.nav2 li",
		function()
		{
			$("#menu_li1_submenu li").last().children("a").attr("href", "http://co-msk-app02/Personal");
			
		}
	);
	
	
	$("#menu_li2").append($("<ul id='menu_li2_submenu'><ul>"));
	$("#menu_li2_submenu").load("/Notes ul.nav2 li",
		function()
		{
			$("#menu_li2_submenu li").last().children("a").attr("href", "http://co-msk-app02/Notes");
			
		}
	);
	
	
	$("#menu_li3").append($("<ul id='menu_li3_submenu'><ul>"));
	$("#menu_li3_submenu").load("/Calendar ul.nav2 li",
		function()
		{
			$("#menu_li3_submenu li").eq(1).children("a").attr("href", "http://co-msk-app02/Calendar");
			
		}
	);
}

function ChangeButtonsToMD()
{
	$(this).addClass("mdl-button mdl-button--raised mdl-js-button mdl-button--accent mdl-js-ripple-effect");
	componentHandler.upgradeElement($(this).get(0));	
}

function ReplaceInput()
{
	var button = $("<button></button>",
	{
		type: $(this).attr("type"),
		"class": "inputReplaceButton " + $(this).attr("class")
	}).append($(this).attr("value"));
	
	if($(this).attr("type") == "button")
	{
		button.attr("onclick", $(this).attr("onclick"));
	}
	
	$(this).after(button);
	$(this).hide();
}

function CreateFixedHeader()
{
	$(".status-bar").hide();
	$(".navbar").hide();
	
	
	var title = $('<div class="mdl-layout__header-row" style="flex-wrap: wrap;"><!-- Title -->'
		+ '<span class="mdl-layout-title notfixed" style="padding-right: 146px;">' 
		+ $(".status-left").html() 
		+ '</span>'	
		+ '<span class="mdl-layout-title notfixed" style="padding-right: 200px;"></span>' 
		+ '<span class="mdl-layout-title" style="position: absolute; right: 10px; top: 15px;">' 
		+ $(".status-right").text() + '</span>'
		+ '</div>');
	componentHandler.upgradeElement(title.get(0));
	
	var header = $('<header></header>', {
		"class": "mdl-layout__header"
	}).append(title, $("#menu"));
	componentHandler.upgradeElement(header.get(0));
	
	var drawer = $('<div class="mdl-layout__drawer"></div>')
	.append('<span class="mdl-layout-title">Настройки</span>')
	.append($(".navbar form"));
	componentHandler.upgradeElement(drawer.get(0));
	
	var mainContent = $('<main class="mdl-layout__content"></main>')
	.append($(".status-center"), 
	$(".main"));
	
	componentHandler.upgradeElement(mainContent.get(0));
	
	var div = $("<div></div>", {
		"class": "mainMenu mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-drawer"
	}).append(header, drawer, mainContent);

	$(".navbar").before(div);
	
	$(".mdl-layout-title").eq(2).prepend($(".status-right img"));	
	
	var temp = $("<div></div>");
	temp.load("http://co-msk-app02/Personal tr.summary",
		function ()
		{
			$(".mdl-layout-title").eq(1).append("Текущее время: ", '<span class="mdl-layout-title currentTime" style="display: inline">' 
				+ $(this).children(".summary").last().children("td.time").eq(2).text() + '</span>');
			if ($(this).children(".summary").last().children("td.time").eq(2).hasClass("negative"))
			{
				$("span.currentTime").addClass("accentColor");
			}
		}
	);
	
}



$(document).ready
( 
	function() 
	{
		PutInfoToTheLeftPanel();
		CreateMenu();
		$("ul.nav2").hide();
		$("div.version").hide();	
		$(document).show();		
		$(".status-bar").height("100px");
		
		
		$("input[type=submit], input[type=button]").each(
			function(index)
			{	
				ReplaceInput.apply(this);				
			}
		);
		
		$("button").each(
			function(index)
			{	
				ChangeButtonsToMD.apply(this);				
			}
		);
		SetRaisedForOnlyOneButton();		
		CreateFixedHeader();	
		
		$("div.status-right a, th.indicator a").click(
			function()
			{				
				return false;	
			}
		)
		
		
		$(window).resize(
			function()
			{
				console.log($(this).width());
				if ($(this).width() < 830)
				{
					$("div.mainMenu").addClass("is-small-header");
				}
				else
				{
					$("div.mainMenu").removeClass("is-small-header");
				}
			}
		);
		
	}		
);