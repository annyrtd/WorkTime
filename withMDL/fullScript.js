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
	//$("div.status-bar").addClass("mdl-layout__tab-bar");
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
			ChangeButtonsToMD();			
		}
	);
	
	$("#menu_li1").append($("<ul id='menu_li1_submenu'><ul>"));
	$("#menu_li1_submenu").load("/Personal ul.nav2 li",
		function()
		{
			$("#menu_li1_submenu li").last().children("a").attr("href", "http://co-msk-app02/Personal");
			ChangeButtonsToMD();
		}
	);
	
	
	$("#menu_li2").append($("<ul id='menu_li2_submenu'><ul>"));
	$("#menu_li2_submenu").load("/Notes ul.nav2 li",
		function()
		{
			$("#menu_li2_submenu li").last().children("a").attr("href", "http://co-msk-app02/Notes");
			ChangeButtonsToMD();
		}
	);
	
	
	$("#menu_li3").append($("<ul id='menu_li3_submenu'><ul>"));
	$("#menu_li3_submenu").load("/Calendar ul.nav2 li",
		function()
		{
			$("#menu_li3_submenu li").eq(1).children("a").attr("href", "http://co-msk-app02/Calendar");
			ChangeButtonsToMD();
		}
	);
	
	
	
	
	
	
	
	
}

function ChangeButtonsToMD()
{
	$("button, input[type=submit], input[type=button]").each(
		function()
		{
			$(this).addClass("mdl-button mdl-button--raised mdl-js-button mdl-button--accent mdl-js-ripple-effect");
		}
	);
	
	$(".mdl-button").click(
		function()
		{
			var z = $(this);
			window.setTimeout( 
				function()
				{
					z.blur();
				},
				100
			);			
		}
	);
	/*
	$("button, input[type='submit'], input[type='button']").each(
		function()
		{
			componentHandler.upgradeElement(this, 'MaterialButton');
			componentHandler.upgradeElement(this, 'MaterialRipple');
		}
	)*/
	
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
		
		$("form").last().append($("<button id='workingButton'>Кнопка</button>"));		
		$("form").last().append($("<button id='workingButton2'>Кнопка</button>"));
		
		var button = $("<button></button>", 
	{
		"id": "idReset",
		"class": "resetButton resetFilters",
		type: "button"
	}).append("Сбросить фильтры");
	
	
	
	var div = $("<div></div>",
	{
		"class": "buttonDiv"
	}).append(button).css("width", "100%");
	
	$(".status-bar").append(div);
		
		
		ChangeButtonsToMD();
		
		$("div.status-right a").click(
			function()
			{				
				return false;	
			}
		)		
	}		
);