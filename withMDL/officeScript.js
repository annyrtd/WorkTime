// OVERWRITES old selecor
jQuery.expr[':'].contains = function(a, i, m) {
	return jQuery(a).text().toUpperCase()
		.indexOf(m[3].toUpperCase()) >= 0;
};


// для сортировки колонок
function mergeSort(arrayToSort, compare) 
{
    var length = arrayToSort.length,
        middle = Math.floor(length / 2);

    if (!compare) {
      compare = function(left, right) {
        if (left < right)
          return -1;
        if (left == right)
          return 0;
        else
          return 1;
      };
    }

    if (length < 2)
      return arrayToSort;

    return merge(
      mergeSort(arrayToSort.slice(0, middle), compare),
      mergeSort(arrayToSort.slice(middle, length), compare),
      compare
    );
  }

function merge(left, right, compare) 
{
    var result = [];

    while (left.length > 0 || right.length > 0) {
      if (left.length > 0 && right.length > 0) {
        if (compare(left[0], right[0]) <= 0) {
          result.push(left[0]);
          left = left.slice(1);
        }
        else {
          result.push(right[0]);
          right = right.slice(1);
        }
      }
      else if (left.length > 0) {
        result.push(left[0]);
        left = left.slice(1);
      }
      else if (right.length > 0) {
        result.push(right[0]);
        right = right.slice(1);
      }
    }
    return result;
}


// Добавляет поле для ввода для поиска по имени
function CreateSearchInput_withMD()
{
	var input = $("<input>", {
		type: "text",
		"class": "mdl-textfield__input",
		id: "searchInput"
	});
	
	var labelForInput = $("<label></label>", {
		"class": "mdl-textfield__label",
		"for": "searchInput",
		"style": "line-height: 12pt !important;"
	}).append('Сотрудник');	
	
	var icon = $('<i class="material-icons" style="float: left; margin-top: 22px;">search</i>');
	
	var div = $("<div></div>", {
		"class": "mdl-textfield mdl-js-textfield"
	}).append(input, labelForInput);
	
	
	$("th.text").eq(0).children().hide();
	$("th.text").eq(0).append(icon,div);
	
	componentHandler.upgradeElement($(".mdl-textfield.mdl-js-textfield").get(0));
	
	ChangeTitleToMDTooltip("searchInput", 
		"Введите фамилию <br>или имя сотрудника");
}



function escapeHtml(text) 
{
	var map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};

	return text.replace(/[&<>"']/g, function(symbol) 
	{ 
		return map[symbol]; 
	});
}


// добавляет классы для колонок, по которым производится поиск и сортировка
function SetClassesOnColumns()
{
	var header = " header";
	
	
	$("th.text").first().addClass("employee header");
	$("col.text").first().addClass("employee");
	$('tbody tr').each(
		function(index)
		{
			$(this).children("td.text").first().addClass("employee");
		}
	);
	
	$("th.text").eq(1).addClass("info");
	$("col.text").eq(1).addClass("info");
	$('tbody tr').each(
		function(index)
		{
			$(this).children("td.text").eq(1).addClass("info");
		}
	);	

	
	
	$("th.text.phone").first().addClass("first");
	$("col.text.phone").first().addClass("first");
	$('tbody tr').each(
		function(index)
		{
			$(this).children("td.text.phone").first().addClass("first");
		}
	);	
	
	$("th.text.phone").eq(1).addClass("second");
	$("col.text.phone").eq(1).addClass("second");
	$('tbody tr').each(
		function(index)
		{
			$(this).children("td.text.phone").eq(1).addClass("second");
		}
	);
	
	$("th.text.phone").eq(2).addClass("third");
	$("col.text.phone").eq(2).addClass("third");
	$('tbody tr').each(
		function(index)
		{
			$(this).children("td.text.phone").eq(2).addClass("third");
		}
	);

	
	
	$("th.text").eq(5).addClass("workgroup header");
	$("col.text").eq(5).addClass("workgroup");
	$('tbody tr').each(
		function(index)
		{
			$(this).children("td.text").eq(5).addClass("workgroup");
		}
	);
	
	$("th.text").eq(6).addClass("room header");
	$("col.text").eq(6).addClass("room");
	$('tbody tr').each(
		function(index)
		{
			$(this).children("td.text").eq(6).addClass("room");
		}
	);
	
	
	$("th.indicator").first().addClass("workstate header");
	$("col.indicator").first().addClass("workstate");
	$('tbody tr').each(
		function(index)
		{
			$(this).children("td.indicator").first().addClass("workstate");
		}
	);
	
	$("th.indicator").last().addClass("mail");
	$("col.indicator").last().addClass("mail");
	$('tbody tr').each(
		function(index)
		{
			$(this).children("td.indicator").last().addClass("mail");
		}
	);
}	


// добавляют select на колонки 
function CreateSelectForGroups()
{
	var arrayOfGroupNames = [];
	
	$("table.full-size > tbody > tr").each(
		function (index)
		{
			var newOption = $(this).children("td.workgroup").text();
			if (arrayOfGroupNames.indexOf(newOption) < 0)
			{
				arrayOfGroupNames.push(newOption)
			}
		}
	);
	
	arrayOfGroupNames.sort();
	
	var button, tooltip;
	if (IsMyHomeOffice())
	{
		button = $('<button style="float: left;" id="groupSelectButton" class="mdl-button mdl-js-button mdl-button--icon' 
			+'  mdl-button--accent mdl-js-ripple-effect"><i class="material-icons">group</i></button>')
		tooltip = $('<div class="mdl-tooltip" for="groupSelectButton">Моя группа</div>');	
	}
	
	
	var select = $("<select></select>", {
		id: "workgroupSelect",
		title: "Выберите группу"
	})
	.append("<option value=''>Группы</option>");
	
	for (var i = 0; i < arrayOfGroupNames.length; i++)
	{
		if (arrayOfGroupNames[i] != "")
		{
			select.append("<option value='" + arrayOfGroupNames[i] + "'>" + arrayOfGroupNames[i] + "</option>");
		}
		else
		{			
			select.append("<option value='NoGroup'>---</option>");
		}
	}
	
	$("th.text").eq(5).children().hide();
	
	if (button !== undefined && tooltip !== undefined)
	{
		$("th.text").eq(5).append(button, tooltip, select);
		componentHandler.upgradeElement(button.get(0));
		componentHandler.upgradeElement(tooltip.get(0));	
	}	
	else
	{
		$("th.text").eq(5).append(select);
	}
}

function CreateSelectOnWorkState()
{
	var select = $("<select></select>", {
		id: "workStateSelect",
		title: 'Выберите состояние'
	})
	.append("<option value=''></option>")	
	.append("<option id='option_ball_green' value='/Content/ball_green.png'>На работе</option>")
	.append("<option id='option_ball_blue' value='/Content/ball_blue.png'>Работает удаленно</option>")
	.append("<option id='option_ball_yellow' value='/Content/ball_yellow.png'>Закончил работу</option>")
	.append("<option id='option_ball_gray' value='/Content/ball_gray.png'>Отсутствует</option>");
	
	$("th.indicator").eq(0).append(select);
}

function CreateSelectOnRoom()
{
	var arrayOfRoomNumbers = [];
	
	$("table.full-size > tbody > tr").each(
		function (index)
		{
			var newOption = $(this).children("td.room").text();
			if (arrayOfRoomNumbers.indexOf(newOption) < 0)
			{
				arrayOfRoomNumbers.push(newOption)
			}
		}
	);
	
	arrayOfRoomNumbers.sort();
	
	var button, tooltip;
	if (IsMyHomeOffice())
	{
		button = $('<button style="float: left;" id="roomSelectButton" class="mdl-button mdl-js-button mdl-button--icon' 
			+'  mdl-button--accent mdl-js-ripple-effect"><i class="material-icons">weekend</i></button>')
		tooltip = $('<div class="mdl-tooltip" for="roomSelectButton">Моя комната</div>');	
	}
	
	var select = $("<select></select>", {
		id: "roomSelect",
		title: "Выберите номер комнаты"
	})
	.append("<option value=''>Комната</option>");
	
	for (var i = 0; i < arrayOfRoomNumbers.length; i++)
	{
		if (arrayOfRoomNumbers[i] != "")
		{
			select.append("<option value='" + arrayOfRoomNumbers[i] + "'>" + arrayOfRoomNumbers[i] + "</option>");
		}
		else
		{			
			select.append("<option value='NoRoom'>---</option>");
		}
	}
	
	$("th.text").eq(6).children().hide();
	if (button !== undefined && tooltip !== undefined)
	{
		$("th.text").eq(6).append(button, tooltip, select);
		componentHandler.upgradeElement(button.get(0));
		componentHandler.upgradeElement(tooltip.get(0));
	}
	else
	{		
		$("th.text").eq(6).append(select);
	}
}

function IsMyHomeOffice()
{
	var myName = GetMyName();
	if ($('td.employee:contains("' + myName + '")').length > 0)
	{
		return true;
	}
	return false;
}


// добавляют стрелочки для сортировки
function PrepareEmployeeColumnForSort()
{
	var arrowDiv = $("<div></div>",
	{
		"class": "arrowDiv"
	}).css({
		"float": "right",
		"margin": "20px 0px",
		"backgroundImage": "url(" + chrome.extension.getURL("/images/bg.gif") + ")"
	});
	
	var clearfix = $("<div></div>",
	{
		"class": "clearfix"		
	});
	
	$("#searchInput").css("float", "left");
	$("#searchInput").parent().after(arrowDiv, clearfix);
	
}

function PrepareWorkgroupColumnForSort()
{
	var arrowDiv = $("<div></div>",
	{
		"class": "arrowDiv"
	}).css("float", "right")
	.css("backgroundImage", "url(" + chrome.extension.getURL("/images/bg.gif") + ")");
 	
	var clearfix = $("<div></div>",
	{
		"class": "clearfix"		
	});
	
	$("#workgroupSelect").css("float", "left");
	$("#workgroupSelect").after(arrowDiv, clearfix);
}

function PrepareRoomColumnForSort()
{
	var arrowDiv = $("<div></div>",
	{
		"class": "arrowDiv"
	}).css("float", "right")
	.css("backgroundImage", "url(" + chrome.extension.getURL("/images/bg.gif") + ")");
	
	var clearfix = $("<div></div>",
	{
		"class": "clearfix"		
	});
	
	$("#roomSelect").css("float", "left");
	$("#roomSelect").after(arrowDiv, clearfix);
}


// убирает пустые колонки
function RemoveEmptyColumns()
{
	$("table.full-size > thead th").each(
		function(index)
		{
			var shouldBeHidden = true;
			$("table.full-size > tbody > tr").each(
				function (index2)
				{
					if ($(this).children("td").eq(index).html() != "")
					{
						shouldBeHidden = false;
					}						
				}			
			);
			
			if (shouldBeHidden)
			{
				$(this).hide();
				$("table.full-size > tbody > tr").each(
					function (index2)
					{
						$(this).children("td").eq(index).hide();			
					}			
				);				
			}
			
		}
	);
}

// определяет, какую колонку нужно отсортировать
function GetColumnToSort(currentHeader)
{
	if ($(currentHeader).hasClass("employee"))
		return "employee";
	if ($(currentHeader).hasClass("workgroup"))
		return "workgroup";
	if ($(currentHeader).hasClass("room"))
		return "room";
}


function AddResetFiltersButton()
{
	var icon = $('<i class="material-icons">clear</i>');
	
	var button = $("<button></button>", 
	{
		"id": "idReset",
		"class": "mdl-button mdl-js-button  mdl-button--fab mdl-button--icon mdl-button--accent  mdl-js-ripple-effect",
		type: "button"
	}).append(icon);	
	
	var div = $("<div></div>",
	{
		"class": "buttonDiv"
	}).append(button).css("width", "100%");

	$("table.full-size colgroup").append('<col class="reset button">');
	$("table.full-size thead tr").append('<th class="reset button"></th>');
		
	$('th.reset.button').append(div);
	
	$("table.full-size tbody tr").each(
		function()
		{
			$(this).append('<td class="reset button"></td>');
		}
	)
	
	var tooltip = $('<div class="mdl-tooltip" for="idReset">Сбросить<br>фильтры</div>');
	
	componentHandler.upgradeElement(tooltip.get(0));
	componentHandler.upgradeElement(button.get(0));
	$('th.reset.button').append(tooltip);
	$("button#idReset").hide();	
}


// фильтры
function SetFilters()
{
	$("table.full-size > tbody > tr").show();
	$("div.card-square").show();
	
	$("#searchInput").val("");
	$("#card-searchInput").val("");
	FilterGroup();
	FilterWorkState();
	FilterRoom();
}

function FilterGroup()
{
	var inputText = $("select#workgroupSelect option").filter(":selected").val();
	
	if (inputText == "")
	{
		return;
	}
	
	if (inputText == "NoGroup")
	{
		$('td.workgroup').not("[style='display: none;']").each(
			function(index)
			{
				if ($(this).text() == "")
					$(this).parent().show();
				else								
					$(this).parent().hide();
			}
		);
		return;
	}
	var cellsThatContainInputText = 'td.workgroup:contains("' + inputText + '")';
	$(cellsThatContainInputText).parent().not("[style='display: none;']").show();				
	$('td.workgroup').not(cellsThatContainInputText).parent().hide();
}

function FilterWorkState()
{	
	var inputText = $("select#workStateSelect option").filter(":selected").val();
	
	if (inputText == "")
	{
		$("select#workStateSelect").attr("title", "Выберите состояние");
		$("th.workstate i")
		.css("color", "white")
		.attr("title", "Выберите состояние")
		.css("textShadow", "-1px 0 gray, 0 1px gray, 1px 0 gray, 0 -1px gray");
		return;
	}
	
	$("tbody tr").not('[style="display: none;"]').each(
		function(index)
		{
			if ($(this).children("td.indicator").first().children("img").attr("src").indexOf(inputText) > -1)
			{
				$(this).show();
			}
			else
			{							
				$(this).hide();
			}
		}
	);
	var newTitle = $("select#workStateSelect option").filter(":selected").attr("title");
	var color = $("select#workStateSelect option").filter(":selected").attr("id").replace("option_ball_", "");
	switch(color)
	{
		case "green":
			color = "#8bc349";
			break;
		case "blue":
			color = "rgb(63, 81, 181)";
			break;
		case "yellow":
			color = "#ffeb3b";
			break;
	}
	$("select#workStateSelect").attr("title", newTitle);
	$("th.workstate i")
	.css("color", color)
	.attr("title", newTitle)
	.css("textShadow", "none");
}

function FilterRoom()
{					
	var inputText = $("select#roomSelect option").filter(":selected").val();
	
	if (inputText == "")
	{
		return;
	}
	
	if (inputText == "NoRoom")
	{
		$('td.room').not('[style="display: none;"]').each(
			function(index)
			{
				if ($(this).text() == "")
					$(this).parent().show();
				else								
					$(this).parent().hide();
			}
		);
		return;
	}
	var cellsThatContainInputText = 'td.room:contains("' + inputText + '")';
	$(cellsThatContainInputText).parent().not('[style="display: none;"]').show();				
	$('td.room').not(cellsThatContainInputText).parent().hide();			
}


//Выбор "домашних" групп и комнат

function SelectHomeGroup()
{
	$("table.full-size > tbody > tr").show();
	$("div.card-square").show();
	$("#searchInput").val("");
	$("#card-searchInput").val("");
	
	var inputText = GetMyGroupName();	
	$("#workgroupSelect").val(inputText);
	
	if (inputText == "")
	{
		return;
	}
	
	if (inputText == "NoGroup")
	{
		$('td.workgroup').not('[style="display: none;"]').each(
			function(index)
			{
				if ($(this).text() == "")
					$(this).parent().show();
				else								
					$(this).parent().hide();
			}
		);
		return;
	}
	var cellsThatContainInputText = 'td.workgroup:contains("' + inputText + '")';
	$(cellsThatContainInputText).parent().not('[style="display: none;"]').show();				
	$('td.workgroup').not(cellsThatContainInputText).parent().hide();	
	
	$('.card-square').each(
		function()
		{
			if ($(this)
					.children('div.mdl-card__supporting-text').first()
					.children('span.workgroup').first().text()				
					!= inputText) 
			{
				$(this).hide();
			}
		}
	);	
}

function GetMyGroupName()
{
	var groupname = "";
	var myName = GetMyName();
	
	$('td.workgroup').each(
		function(index)
		{
			if ($(this).parent().children("td.employee").text() == myName)
			{
				groupname = $(this).text();
				return false;
			}
		}
	);
	return groupname;
}

function GetMyName()
{
	var myName = $(".status-right a").text();
	
	var position = myName.indexOf(" ");
	var firstName = myName.substr(0, position);
	var lastName = myName.substr(position + 1);
	myName = lastName + " " + firstName;
	
	return myName;
}

function SelectHomeRoom()
{
	$("table.full-size > tbody > tr").show();
	$("div.card-square").show();
	$("#searchInput").val("");
	$("#card-searchInput").val("");
	
	var inputText = GetMyRoomNumber();
	$("#roomSelect").val(inputText);
	
	if (inputText == "")
	{
		return;
	}
	
	if (inputText == "NoRoom")
	{
		$('td.room').not('[style="display: none;"]').each(
			function(index)
			{
				if ($(this).text() == "")
					$(this).parent().show();
				else								
					$(this).parent().hide();
			}
		);
		return;
	}
	var cellsThatContainInputText = 'td.room:contains("' + inputText + '")';
	$(cellsThatContainInputText).parent().not('[style="display: none;"]').show();				
	$('td.room').not(cellsThatContainInputText).parent().hide();	
}

function GetMyRoomNumber()
{
	var roomNumber = "";
	var myName = GetMyName();
	
	$('td.room').each(
		function(index)
		{
			if ($(this).parent().children("td.employee").text() == myName)
			{
				roomNumber = $(this).text();
				return false;
			}
		}
	);
	return roomNumber;
}

function CreateMDLCard()
{
	$(".status-center").hide();
	$(".main").hide();
	
	var header = $('<span></span>',
	{
		"class": "mdl-layout-title"
	}).append($(".status-center").text());
	
	$("table.full-size").addClass("mdl-shadow--2dp");	
	$(".mdl-layout__content").append(header, $("table.full-size"));
}

function ResizeTableHeader()
{
	var $table = $('table.full-size'),
		$bodyCells = $table.find('tbody tr').not("[style='display: none;']").first().children(),
		colWidth;
				
	colWidth = $bodyCells.map(
		function() 
		{
			return $(this).width();
		}
	).get();
		
	// Set the width of thead columns
	$table.find('th').each(
		function(i, v) 
		{
			$(v).width(colWidth[i]);
		}
	);  
}

function CreateSettingsForLang()
{
	$("div.mdl-layout__drawer").append($("<div id=settings></div>"));
	$("#settings").load("http://co-msk-app02/Preferences/Edit form", 
		function()
		{
			$("#settings").hide();
			$("#settings").prepend("<br><br><label><b>Настройки:</b></label><br>");
			$("#ReturnTo").val("/" + window.location.search);
			$("#settings a").hide();
			$("#settings label").removeAttr("for");
			$("#settings label").after("<br>");
			$("div.table-form").last().next().css(
			{
				paddingTop: "2em"
			});
			
			$("div.table-form").hide();
			$("div.table-form").first().show();
			
			ReplaceInput.apply($("form[action='/Preferences/Edit'] input[type=submit]").get(0));
			ChangeButtonsToMD.apply($("form[action='/Preferences/Edit'] button.inputReplaceButton").get(0));
			
			$("form[action='/Preferences/Edit'] button.inputReplaceButton").parent()
			.css("width", "0px");	
			$("#settings").fadeIn("fast");
		}
	);
}

function SetTableHeightForOffice()
{
	var tbody = $("table.full-size tbody");
	
	var height = $(window).height()
		- $('header.mdl-layout__header').outerHeight(true)
		- $('main.mdl-layout__content.content-wide span.mdl-layout-title').outerHeight(true)
		- $('table.full-size thead').outerHeight(true)
		- $('.holiday-box').outerHeight(true)
		//- $('div.toggle').outerHeight(true)
		- 50; 
	
	tbody.height(height);
	if (tbody.get(0).scrollHeight <= tbody.get(0).clientHeight)
	{
		tbody.css('height', 'auto');
	}
}

function CheckResetButton()
{
	if ($("#workgroupSelect").val() != "" ||
	$("#workStateSelect").val() != "" ||
	$("#roomSelect").val() != "" || 
	$("#searchInput").val() != "")
	{
		$("button#idReset").fadeIn("fast");
		$("button#card-idReset").fadeIn("fast");
	}
	else
	{
		$("button#idReset").fadeOut("fast");
		$("button#card-idReset").fadeOut("fast");
	}

}

function AddBorderToStatusSelect()
{
	var span = $("<span></span>").css({
		"display": "block",
		"border": "1px solid rgb(202, 202, 202)",
		"paddingLeft": "3px",
		"borderRadius": "2px"
	}).append($("th.indicator.workstate.header").children());
	
	$("th.indicator.workstate.header").append(span);
}


function AddTooltips_officeScript()
{
	$("tbody i:contains('email')").each(
		function(index)
		{			
			if ($(this).attr("title") === undefined)
			{
				return true;
			}
			var id = "i_email_" + index;
			var title = $(this).attr("title");
			$(this).removeAttr("title");
			$(this).attr("id", id);
			ChangeTitleToMDTooltip(id, title);			
		}
	);
	
	$("tbody i:contains('lens')").each(
		function(index)
		{			
			if ($(this).attr("title") === undefined)
			{
				return true;
			}
			var id = "i_lens_" + index;
			var title = $(this).attr("title");
			$(this).removeAttr("title");
			$(this).attr("id", id);
			ChangeTitleToMDTooltip(id, title);			
		}
	);
	
	$("select").each(
		function(index)
		{
			if ($(this).attr("title") === undefined)
			{
				return true;
			}
			var id = $(this).attr("id");
			var title = $(this).attr("title");
			$(this).removeAttr("title");
			ChangeTitleToMDTooltip(id, title);			
		}
	);
	
	$('span.hidden-text')
	.each(
		function(index)
		{
			if ($(this).attr("title") === undefined)
			{
				return true;
			}
			var id = "span_hidden-text_" + index;
			var title = $(this).attr("title");
			$(this).removeAttr("title");
			$(this).attr("id", id);
			ChangeTitleToMDTooltip(id, title);			
		}
	);
	
}

function ResetTableParametres()
{
	$('.card-square').show();
	$("table.full-size > tbody > tr").show();
	$("#workgroupSelect, #workStateSelect, #roomSelect").val("");
				
	$("#searchInput").val("").parent().removeClass("is-dirty");
	$("#card-searchInput").val("").parent().removeClass("is-dirty");
	
	$("th.workstate i")
	.css("color", "white")
	.css("textShadow", "-1px 0 gray, 0 1px gray, 1px 0 gray, 0 -1px gray");
}



function AddToggleButtonTableAndCards()
{
	var icon1 = $('<i id="table-icon" class="material-icons">list</i>');
	var icon2 = $('<i id="card-icon" class="material-icons">apps</i>');
	
	var button1 = $('<button></button>', {
		id: 'table-button',
		'class': 'mdl-button mdl-js-button mdl-button--icon mdl-button--accent mdl-button--fab mdl-js-ripple-effect'
	}).append(icon1); 
	
	var button2 = $('<button></button>', {
		id: 'card-button',
		'class': 'mdl-button mdl-js-button mdl-button--icon mdl-button--accent mdl-js-ripple-effect'
	}).append(icon2); 
	
	var div = $('<div id="toggle-div" class="toggle"></div>')
	.append(button1, button2);
	
	$('main > span.mdl-layout-title')
	.css({ 
		display: 'flex',
		alignItems: 'center',
		height: '65px'
	})
	.append(div);
	
	var tooltip1 = $('<div id="toggle-tooltip" class="mdl-tooltip" for="table-button">Отображать <br>таблицей</div>');
	var tooltip2 = $('<div id="toggle-tooltip" class="mdl-tooltip" for="card-button">Отображать <br>карточками</div>');
	
	
	componentHandler.upgradeElement(button1.get(0));
	componentHandler.upgradeElement(button2.get(0));
	componentHandler.upgradeElement(tooltip1.get(0));
	componentHandler.upgradeElement(tooltip2.get(0));
	
	div.append(tooltip1, tooltip2);
}

function SetWorkerCards()
{
	var div = $('<div></div>', {
		'class': 'card-box'
	});
	var card;
	var trs = $('table.full-size tbody tr').each(
		function(index)
		{
			card = getMDLCard($(this), index);			
			div.append(card);
		}
	);
	
	$('table.full-size').after(div);
	
	div.hide();
	
	$('div.card-box div.mdl-tooltip').each(
		function() {
			var id = $(this).attr('for');
			var text = $(this).text();
			var toTheLeft = !$(this).parent().hasClass('mdl-card__supporting-text');
			$(this).remove();
			ChangeTitleToMDTooltip(id, text, ( toTheLeft ? 'mdl-tooltip--left' : ''));
		}
	);
}

function getMDLCard(tr, index)
{	
	var imagediv = $('<div id="person-image' + index + '" class="circular" ></div><br><br>');
	
	var h2 = $('<h2 class="mdl-card__title-text"></h2>')
	.css({
		alignSelf: 'flex-start'
	})
	.append(tr.children('td.text.employee').html());
	
	var color = tr.children('td.indicator.workstate').children('i').first().css('color').replace('rgb', 'rgba');
	color = color.substr(0, color.length - 1);
	color += ',0.5)';
	
	var title = $('<div></div>', {
		'class': 'mdl-card__title mdl-card--expand'
	})
	.css({
		backgroundColor: color,
		flexDirection: 'column'
	})
	.append(imagediv, h2);
	
	var workgroup = tr.children('td.text.workgroup').text();
	var room = tr.children('td.text.room').text();
	var info = tr.children('td.text.info').first();
	var phonefirst = tr.children('td.text.phone.first').text();
	var phonesecond = tr.children('td.text.phone.second').text();
	var phonethird = tr.children('td.text.phone.third').text();
	
	
	var supportingtext = $('<div></div>', {
		'class': 'mdl-card__supporting-text'
	})
	.append(workgroup ? '<span class="bold workgroup">' + workgroup + '</span><br>' : '<br>')
	.append(room ? '<span class="room">' + room + '</span><br><br>' : '<br><br>')
	.append(info ? info.html() + '<br><br>' : '<br><br>')
	.append(phonefirst ? 'Tел.: <span class="phone first">' + phonefirst + '</span><br>' : '<br>')
	.append(phonesecond ? 'Моб.тел.: <span class="phone second">' + phonesecond + '</span><br>' : '<br>')
	.append(phonethird ? 'Дом.тел.: <span class="phone third">' + phonethird + '</span><br>' : '<br>')
	
	
	var menu = $('<div></div>', {
		'class': 'mdl-card__menu'
	})
	.append(tr.children('td.indicator.workstate').html())
	.append(tr.children('td.indicator.mail').html())
	
	var idstatus = 'card-' + menu.children('i').first().attr('id');
	var tooltip1 = menu.children('div.mdl-tooltip').first();
	var icon1 = menu.children('i').first();
	icon1.attr('id', idstatus);
	tooltip1.attr('for', idstatus);
	tooltip1.removeAttr('data-upgraded');
	
	var idemail = 'card-' + menu.children('a').first().children('i').first().attr('id');
	var tooltip2 = menu.children('a').first().children('div.mdl-tooltip').first();
	var icon2 = menu.children('a').first().children('i').first()
	icon2.attr('id', idemail);
	tooltip2.attr('for', idemail);	
	tooltip2.removeAttr('data-upgraded');
	
	if (info.children('span.hidden-text').length > 0)
	{
		info.children('span.hidden-text').each(
			function()
			{
				var id = 'card-' + $(this).attr('id');
				var tooltip = info.children('div.mdl-tooltip[for=' + $(this).attr('id') + ']').first();
				$(this).attr('id', id);
				tooltip.attr('for', id);	
				tooltip.removeAttr('data-upgraded');	
			}
		);		
	}
	
	var maindiv = $('<div></div>', {
		'class': 'card-square mdl-card mdl-shadow--2dp'
	})
	.css({
		'order': index
	})
	.append(title, supportingtext, menu);	
	
	return maindiv;	
}

function AddSortingMenuForCards()
{
	var div = $('<div></div>', {
		'class': 'card-sorting-menu toggle'
	})
	
	var homeGroupButton, tooltipHomeGroupButton	
	var homeRoomButton, tooltipHomeRoomButton;
	if (IsMyHomeOffice())
	{
		homeGroupButton = $('<button style="float: left;" id="card-groupSelectButton" class="mdl-button mdl-js-button mdl-button--icon' 
			+'  mdl-button--accent mdl-js-ripple-effect"><i class="material-icons">group</i></button>')
		tooltipHomeGroupButton = $('<div class="mdl-tooltip" for="card-groupSelectButton">Моя группа</div>');	
		
		homeRoomButton = $('<button style="float: left;" id="card-roomSelectButton" class="mdl-button mdl-js-button mdl-button--icon' 
			+'  mdl-button--accent mdl-js-ripple-effect"><i class="material-icons">weekend</i></button>')
		tooltipHomeRoomButton = $('<div class="mdl-tooltip" for="card-roomSelectButton">Моя комната</div>');	
	}
	var resetIcon = $('<i class="material-icons">clear</i>');
	var resetButton = $('<button></button>', {
		"id": "card-idReset",
		"class": "mdl-button mdl-js-button  mdl-button--fab mdl-button--icon mdl-button--accent  mdl-js-ripple-effect",
		type: "button"
	}).append(resetIcon);	
	
	var tooltipResetButton = $('<div class="mdl-tooltip" for="card-idReset">Сбросить<br>фильтры</div>');
	
	$('#toggle-div').after(div);	
	
	
	CreateCardSearchInput();
		
	if (homeGroupButton !== undefined && tooltipHomeGroupButton !== undefined && $('div.card-square span.workgroup').length > 0)
	{
		div.append(homeGroupButton, tooltipHomeGroupButton);
		componentHandler.upgradeElement(homeGroupButton.get(0));
		componentHandler.upgradeElement(tooltipHomeGroupButton.get(0));	
	}	
	
	if (homeRoomButton !== undefined && tooltipHomeRoomButton !== undefined && $('div.card-square span.room').length > 0)
	{
		div.append(homeRoomButton, tooltipHomeRoomButton);
		componentHandler.upgradeElement(homeRoomButton.get(0));
		componentHandler.upgradeElement(tooltipHomeRoomButton.get(0));	
	}	
	
	div.append(resetButton, tooltipResetButton)
	componentHandler.upgradeElement(resetButton.get(0));
	componentHandler.upgradeElement(tooltipResetButton.get(0));
	
	
	resetButton.hide();	
	div.hide();	
}

// Добавляет поле для ввода для поиска по имени
function CreateCardSearchInput()
{
	var input = $("<input>", {
		type: "text",
		"class": "mdl-textfield__input",
		id: "card-searchInput"
	});
	
	var labelForInput = $("<label></label>", {
		"class": "mdl-textfield__label",
		"for": "card-searchInput",
		"style": "line-height: 12pt !important;"
	}).append('Сотрудник');	
	
	var icon = $('<i class="material-icons" style="float: left; margin-top: 22px;">search</i>');
	
	var div = $("<div></div>", {
		"class": "mdl-textfield mdl-js-textfield"
	}).append(input, labelForInput);
	
	var div2 = $("<div class='toggle'></div>").append(icon,div);
	
	$('div.card-sorting-menu').append(div2);
	
	componentHandler.upgradeElement(div.get(0));
	
	ChangeTitleToMDTooltip("card-searchInput", 
		"Введите фамилию <br>или имя сотрудника");
}

function FilterPeople(inputText)
{
	var cells = 'td.employee';
	var cellsThatContainInputText = cells + ':contains("' + inputText + '")';
	$(cellsThatContainInputText).parent().show();				
	$(cells).not(cellsThatContainInputText).parent().hide();
	
	$("th.workstate i")
	.css("color", "white")
	.css("textShadow", "-1px 0 gray, 0 1px gray, 1px 0 gray, 0 -1px gray");	
	
	var cardcells = 'div.card-square > div.mdl-card__title > h2.mdl-card__title-text';
	var cardcellsThatContainInputText = cardcells + ':contains("' + inputText + '")';
	$(cardcellsThatContainInputText).parent().parent().show();	
	$(cardcells).not(cardcellsThatContainInputText).parent().parent().hide();
}

function SetProfileImages()
{
	var today = new Date();		
	var day = today.getDate();
	
	if (day % 7 == 0 && !localStorage['isCleared'])
	{
		localStorage.clear();
		localStorage['isCleared'] = true;
	}
	else
	{
		localStorage['isCleared'] = false;
	}
	
	$('div.card-square').each(
		function() {
			var self = $(this);
			
			var email = self.children('div.mdl-card__menu').first()
				.children('a[href^="mailto:"]').first()
				.attr('href').replace('mailto:', '');
			
			if (email)
			{
				if (localStorage[email])
				{
					var src = localStorage[email];
					
					if (src) 
					{
						self.children('div.mdl-card__title').first()
						.children('div.circular').first()
						.css({
							background: 'url("' + src + '") no-repeat',
							backgroundSize: 'cover'
						});
					}					
				}
				else {
					$.get("http://confirmitconnect.firmglobal.com/Search/Pages/PeopleResults.aspx?k=" + email, {}, function(data, status, xhr) {

						var updatedData = data.replace(/\/(_layouts|Style)+/g, "http://confirmitconnect.firmglobal.com/$1").replace('IMNRC', 'String.prototype.toLowerCase')
						var temp = $("<div></div>");
						temp.html(updatedData);
						
						var src = temp.find('#CSR_IMG_1').attr('src');
							
						if (src) 
						{
							localStorage[email] = src;
							self.children('div.mdl-card__title').first()
							.children('div.circular').first()
							.css({
								background: 'url("' + src + '") no-repeat',
								backgroundSize: 'cover'
							});
						}
					});
				}
			}
		}
	);
}

$(document).ready
( 
	function() 
	{
		CreateSearchInput_withMD();	
		SetClassesOnColumns();		
		
		CreateSelectForGroups();		
		CreateSelectOnWorkState();
		CreateSelectOnRoom();
		
		PrepareEmployeeColumnForSort();
		PrepareWorkgroupColumnForSort();		
		PrepareRoomColumnForSort();
		
		
		RemoveEmptyColumns();
		AddResetFiltersButton();
		CreateSettingsForLang();
		CreateMDLCard();	
		
		AddBorderToStatusSelect();
		AddTooltips_officeScript();
		
		$("button")
		.not("#idReset")
		.not(".mdl-button--icon")
		.not("form[action='/Remote/Come'] button, form[action='/Remote/Leave'] button")
		.each(
			function(index)
			{	
				ChangeButtonsToMD.apply(this);				
			}
		);
		$("table.full-size").before($("div.holiday-box"));
		
		ShowTableFullSizeAndHolidayBox();
		ResizeTableHeader();
		SetTableHeightForOffice();	
		
		AddToggleButtonTableAndCards();
		SetWorkerCards();
		AddSortingMenuForCards();		
		
		SetProfileImages();
		
		$( "#searchInput" ).on("propertychange input change keyup paste click", 
			function() 
			{			
				$("#workgroupSelect, #workStateSelect, #roomSelect").val("");
				var inputText = escapeHtml($(this).val());
				$('#card-searchInput').val(inputText);				
				FilterPeople(inputText);
				
				if (inputText != '')
				{
					$(this).parent().addClass('is-dirty');
					$('#card-searchInput').parent().addClass('is-dirty');
				}
				else
				{
					$(this).parent().removeClass('is-dirty');
					$('#card-searchInput').parent().removeClass('is-dirty');
				}
				
				ResizeTableHeader();
				SetTableHeightForOffice();			
				CheckResetButton();						
			}
		);
		
		
		$("#workgroupSelect, #workStateSelect, #roomSelect").change(
			function ()
			{
				SetFilters();
				ResizeTableHeader();
				SetTableHeightForOffice();
				CheckResetButton();
			}
		);
		
		
		$(".arrowDiv").click(		
			function ()
			{
				// determine column for sort
				var classToSort = GetColumnToSort($(this).parent());
				var arrayToSort = $("table.full-size > tbody > tr");
				if ($(this).hasClass("headerSortUp"))
				{
					//sortDown					
					arrayToSort = mergeSort(arrayToSort, 
						function (item1, item2)
						{
							if ($(item1).children("td." + classToSort).text().toLowerCase() > $(item2).children("td." + classToSort).text().toLowerCase())
							{
								return -1;
							}
							else 
								if ($(item1).children("td." + classToSort).text().toLowerCase() < $(item2).children("td." + classToSort).text().toLowerCase())
								{
									return 1;								
								}
								else
								{
									return 0;
								}
						}
					);
					
					$(this).removeClass("headerSortUp").addClass("headerSortDown")
						.css("backgroundImage", "url(" + chrome.extension.getURL("/images/asc.gif") + ")");					
				}
				else
				{
					//sortUp
					arrayToSort = mergeSort(arrayToSort,
						function (item1, item2)
						{
							if ($(item1).children("td." + classToSort).text() > $(item2).children("td." + classToSort).text())
							{
								return 1;
							}
							else 
								if ($(item1).children("td." + classToSort).text() < $(item2).children("td." + classToSort).text())
								{
									return -1;								
								}
								else
								{
									return 0;
								}
						}
					);
					$(this).removeClass("headerSortDown").addClass("headerSortUp")
						.css("backgroundImage", "url(" + chrome.extension.getURL("/images/desc.gif") + ")");
				}
				$("table.full-size > tbody").append(arrayToSort);
			}
		);
		
		
		$("button#idReset").on("click", 
			function()
			{			
				ResetTableParametres();			
				ResizeTableHeader();
				SetTableHeightForOffice();
				
				$(this).fadeOut("fast");
				$("button#card-idReset").fadeOut("fast");
			}
		);
		
		$("#roomSelectButton").click(
			function()
			{
				ResetTableParametres();
				SelectHomeRoom();
				ResizeTableHeader();
				SetTableHeightForOffice();
				CheckResetButton();
			}
		);
		
		$("#groupSelectButton").click(
			function()
			{
				ResetTableParametres();
				SelectHomeGroup();
				ResizeTableHeader();
				SetTableHeightForOffice();
				CheckResetButton();
			}
		);

		// Adjust the width of thead cells when window resizes
		$(window).resize(
			function() 
			{
				ResizeTableHeader();
				SetTableHeightForOffice();
			}
		).resize(); // Trigger resize handler
		
		$('#table-button').click(
			function() 
			{
				var className = 'mdl-button--fab';
				if ($(this).hasClass(className))
					return;
				$(this).addClass(className);
				$('#card-button').removeClass(className);
				$('table.full-size').show();
				//$('table.full-size tbody').show();
				//ShowHeaders();
				$('div.card-box').hide();
				$('div.card-sorting-menu').hide();
				
				ResizeTableHeader();
				SetTableHeightForOffice();
			}
		);
		
		/******************************
			ACTIONS WITH CARDS
		******************************/
		
		
		$('#card-button').click(
			function() 
			{
				var className = 'mdl-button--fab';
				if ($(this).hasClass(className))
					return;
				$(this).addClass(className);
				$('#table-button').removeClass(className);
				$('div.card-box').show();
				$('div.card-sorting-menu').show();
				$('table.full-size').hide();
				//$('table.full-size tbody').hide();
				//HideHeaders();
			}
		);
		
		
		$('#card-groupSelectButton').click(
			function()
			{
				ResetTableParametres();
				SelectHomeGroup();
				CheckResetButton();
			}
		);
		
		$("button#card-idReset").on("click", 
			function()
			{			
				ResetTableParametres();		
				
				$(this).fadeOut("fast");
				$("button#idReset").fadeOut("fast");
			}
		);
		
		$("#card-searchInput").on("propertychange input change keyup paste click", 
			function() 
			{			
				$("#workgroupSelect, #workStateSelect, #roomSelect").val("");
				var inputText = escapeHtml($(this).val());
				$('#searchInput').val(inputText);
				FilterPeople(inputText);
				
				if (inputText != '')
				{
					$(this).parent().addClass('is-dirty');
					$('#searchInput').parent().addClass('is-dirty');
				}
				else
				{
					$(this).parent().removeClass('is-dirty');
					$('#searchInput').parent().removeClass('is-dirty');
				}
				
				CheckResetButton();						
			}
		);
		
	}		
);