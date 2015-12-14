$(document).hide();

// OVERWRITES old selecor
jQuery.expr[':'].contains = function(a, i, m) {
  return jQuery(a).text().toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
};


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
			$(this).children("a").text($(this).children("a").text().toUpperCase());
		}
	);
	
	
	
	
	$("#menu_li0").append($("<ul id='menu_li0_submenu'><ul>"));
	$("#menu_li0_submenu").load("/ ul.nav2 li", 
		function()
		{
			$("#menu_li0_submenu li").first().children("a").attr("href", "http://co-msk-app02/?officeid=1");
			$("#menu_li0_submenu li").last().children("a").attr("href", "http://co-msk-app02/?officeid=2")
			$("#menu_li0_submenu a").each(
				function()
				{
					$(this).text($(this).text().toUpperCase());
				}
			);			
		}
	);
	
	$("#menu_li1").append($("<ul id='menu_li1_submenu'><ul>"));
	$("#menu_li1_submenu").load("/Personal ul.nav2 li",
		function()
		{
			$("#menu_li1_submenu li").last().children("a").attr("href", "http://co-msk-app02/Personal");
			$("#menu_li1_submenu a").each(
				function()
				{
					$(this).text($(this).text().toUpperCase());
				}
			);	
			
		}
	);
	
	
	$("#menu_li2").append($("<ul id='menu_li2_submenu'><ul>"));
	$("#menu_li2_submenu").load("/Notes ul.nav2 li",
		function()
		{
			$("#menu_li2_submenu li").last().children("a").attr("href", "http://co-msk-app02/Notes");
			$("#menu_li2_submenu a").each(
				function()
				{
					$(this).text($(this).text().toUpperCase());
				}
			);	
			
		}
	);
	
	
	$("#menu_li3").append($("<ul id='menu_li3_submenu'><ul>"));
	$("#menu_li3_submenu").load("/Calendar ul.nav2 li",
		function()
		{
			$("#menu_li3_submenu li").eq(1).children("a").attr("href", "http://co-msk-app02/Calendar");
			$("#menu_li3_submenu a").each(
				function()
				{
					$(this).text($(this).text().toUpperCase());
				}
			);	
			
		}
	);
}

function ChangeButtonsToMD()
{
	$(this).addClass("mdl-button mdl-button--raised mdl-js-button mdl-button--accent mdl-js-ripple-effect");
	componentHandler.upgradeElement($(this).get(0));	
}

function ChangeTextInputToMD(index)
{	
	$(this).addClass("mdl-textfield__input")
	.css("fontSize", "11pt");
	
	var id;
	if ($(this).attr("id"))
	{
		id = $(this).attr("id");
	}
	else
	{
		id = $(this).attr("name") + "_" + index;
		$(this).attr("id", id);		
	}
	

	var labelForInput = $("<label></label>", {
		"class": "mdl-textfield__label",
		"for": id
	}).append($(this).attr("placeholder"));	
	
	$(this).attr("placeholder", "");
	
	var div = $("<div></div>", {
		"class": "mdl-textfield mdl-js-textfield"
	});
	
	$(this).after(div);
	div.append($(this), labelForInput);	
	
	componentHandler.upgradeElement(div.get(0));
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
		+ '<span class="mdl-layout-title notfixed" style="padding-right: 146px; padding-top: 33px; line-height: 30px;">' 
		+ $(".status-left").html() 
		+ '</span>'	
		+ '<span class="mdl-layout-title notfixed" style="padding-right: 200px; padding-top: 0px;"></span>' 
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
	
	$(".mdl-layout-title").eq(1).append("Текущее время: ", 
		'<span class="mdl-layout-title currentTime" style="display: inline">' 
		+ '</span>');
	
	
	// screenOn: show Body
	$(document.body).show();
	
	var temp = $("<div></div>");
	temp.load("http://co-msk-app02/Personal tr.summary",
		function ()
		{
			//$(".mdl-layout-title").eq(1).append("Текущее время: ", '<span class="mdl-layout-title currentTime" style="display: inline">' 
			//	+ $(this).children(".summary").last().children("td.time").eq(2).text() + '</span>');
			$("span.currentTime").hide();
			var time = $(this).children(".summary").last().children("td.time").eq(2).text();
			$("span.currentTime").text(time);
			if ($(this).children(".summary").last().children("td.time").eq(2).hasClass("negative"))
			{
				$("span.currentTime").removeClass("greenColor").addClass("accentColor");
			}
			else
			{
				$("span.currentTime").removeClass("accentColor").addClass("greenColor");
			}
			$("span.currentTime").fadeIn("slow");
		}
	);
	
}

function ChangePicturesToMDLIcons()
{
	$("img").each(
		function(index)
		{
			var iconType, color;
			switch($(this).attr("src"))
			{
				case "/Content/mail.png":
					iconType = "email";
					color = "gray";
					break;
				case "/Content/ball_gray.png":
					color = "gray";
					iconType = "lens";
					break;
				case "/Content/ball_green.png":
					color = "#8bc349";
					iconType = "lens";
					break;
				case "/Content/ball_blue.png":
					color = "rgb(63, 81, 181)";
					iconType = "lens";
					break;
				case "/Content/ball_yellow.png":
					color = "#ffeb3b";
					iconType = "lens";
					break;
			}
			var icon = $('<i class="material-icons" style="display: block; color:' + color + ';">' + iconType + '</i>');
			icon.attr("title", $(this).attr("title"));
			$(this).after(icon);
			$(this).hide();
		}
	)
	
	$("span.mdl-layout-title i").css(
	{
		"float": "left",
		"fontSize": "20px"
	});
	
	$("table.full-size i").first().hide();
}


function CreateCommonMDLCard()
{
	if (window.location.pathname == "/")
		return;
	
	$(".status-center").hide();
	$(".main").hide();
	var classname = "content-wide";
	
	var title = $('<div class="mdl-card__title"></div>')
	.append('<h2 class="mdl-card__title-text">'
	+ $(".status-center").text()
	+ '</h2>');
	
	var supportingText = $('<div class="mdl-card__supporting-text"></div>')
	.append($("table.full-size"), $("form[action='/Notes']"));
	
	var div = $('<div class="' + classname + ' mdl-card mdl-shadow--2dp">')
	.append(title, supportingText);
	
	
	$(".mdl-layout__content").append(div);
	
	componentHandler.upgradeElement($(".mdl-card").get(0));	
}

function SetAllButtonsAndInputsToMDL()
{
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
		
	$('input[type=text]').not("#idReset").each(
		function(index)
		{
			ChangeTextInputToMD.apply(this, [index]);
		}
	);
		
	$('form.nav2 input[type=text]')
	.parent()
	.css("width", "148px")
	.before($('<i class="material-icons" style="float: left; margin-top:22px;">search</i>'));
		
	if (window.location.pathname == "/Notes")
	{
		$("label[for=Comment]").text("Текст заметки");
	}
			
	SetRaisedForOnlyOneButton();
	PutButtonsToTheOtherLineInNotes();
}


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

function PutButtonsToTheOtherLineInNotes()
{
	$("input#Comment").parent().after("<br><br>");
}


$(document).ready
( 
	function() 
	{
		PutInfoToTheLeftPanel();
		CreateMenu();
		$("ul.nav2").hide();
		$("div.version").hide();	
		//$(document).show();		
		$(".status-bar").height("100px");
		
		SetAllButtonsAndInputsToMDL();		
		CreateFixedHeader();	
		
		ChangePicturesToMDLIcons();
		CreateCommonMDLCard();
		
		
		
		$("div.status-right a, th.indicator a").click(
			function()
			{				
				return false;	
			}
		)		
		
		$(window).resize(
			function()
			{
				if ($(this).width() < 830)
				{
					$("div.mainMenu").addClass("is-small-header");
				}
				else
				{
					$("div.mainMenu").removeClass("is-small-header");
				}
			}
		).resize();
		
	}		
);