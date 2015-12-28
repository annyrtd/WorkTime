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
function CreateSearchInput()
{
	var input = $("<input>", {
		type: "text",
		id: "searchInput",
		title: "Введите фамилию или имя сотрудника",
		placeholder: "Сотрудник"
	}).css("width", "100px");
	
	$("th.text").eq(0).children().hide();
	$("th.text").eq(0).append(input);
}

function CreateSearchInput_withMD()
{
	var input = $("<input>", {
		type: "text",
		"class": "mdl-textfield__input",
		id: "searchInput",
		title: "Введите фамилию или имя сотрудника",
		//placeholder: "Сотрудник"
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
	
	/*
	<!-- Expandable Textfield -->

	<button class="mdl-button mdl-js-button mdl-button--icon">
		<i class="material-icons">mood</i>
	</button>
	
	<div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
		<label class="mdl-button mdl-js-button mdl-button--icon" for="sample6">
			<i class="material-icons">search</i>
		</label>
		<div class="mdl-textfield__expandable-holder">
			<input class="mdl-textfield__input" type="text" id="sample6">
			<label class="mdl-textfield__label" for="sample-expandable">Expandable Input</label>
		</div>
	</div>
	*/

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
	$('tbody tr').each(
		function(index)
		{
			$(this).children("td.text").first().addClass("employee");
		}
	);

	
	$("th.text").eq(5).addClass("workgroup header");
	$('tbody tr').each(
		function(index)
		{
			$(this).children("td.text").eq(5).addClass("workgroup");
		}
	);
	
	$("th.text").eq(6).addClass("room header");
	$('tbody tr').each(
		function(index)
		{
			$(this).children("td.text").eq(6).addClass("room");
		}
	);
	
	
	$("th.indicator").first().addClass("workstate header");
	$('tbody tr').each(
		function(index)
		{
			$(this).children("td.indicator").first().addClass("workstate");
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
			+'  mdl-button--accent mdl-js-ripple-effect"><i class="material-icons">home</i></button>')
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
	.append("<option value='' title='Выберите состояние'></option>")	
	.append("<option id='option_ball_green' value='/Content/ball_green.png' title='На работе'>На работе</option>")
	.append("<option id='option_ball_blue' value='/Content/ball_blue.png' title='Работает удаленно'>Работает удаленно</option>")
	.append("<option id='option_ball_yellow' value='/Content/ball_yellow.png' title='Закончил работу'>Закончил работу</option>")
	.append("<option id='option_ball_gray' value='/Content/ball_gray.png' title='Отсутствует'>Отсутствует</option>");
	
	
	
	//$("th.indicator").eq(0).children().hide();
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
			+'  mdl-button--accent mdl-js-ripple-effect"><i class="material-icons">home</i></button>')
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
/*
	$("#searchInput").css("float", "left");
	var cell1 = $("<td></td>").append($("#searchInput").parent());
	
	var arrowDiv = $("<div></div>",
	{
		"class": "arrowDiv"
	}).css("float", "right");
	var cell2 = $("<td></td>").append(arrowDiv);
	var row = $("<tr></tr>").append(cell1, cell2);
	
	var table = $("<table></table>").append(row);
	
	$("th.text").first().append(table);
	*/
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
	
	//$(".main").append(div);

	$("table.full-size colgroup").append('<col class="reset button">');
	$("table.full-size thead tr").append('<th class="reset button"></th>');
		
	$('th.reset.button').append(div);
	
	$("table.full-size tbody tr").each(
		function()
		{
			$(this).append('<td class="reset button">abc</td>');
		}
	)
	
	//var tooltip = $('<div class="mdl-tooltip" for="idReset">Сбросить<br>фильтры</div>');
	//componentHandler.upgradeElement(tooltip.get(0));	
	componentHandler.upgradeElement(button.get(0));
	//$(".main").append(tooltip);
	$("button#idReset").hide();	
}


// фильтры
function SetFilters()
{
	$("table.full-size > tbody > tr").show();
	$("#searchInput").val("");
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
	$("#searchInput").val("");
	
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
	$("#searchInput").val("");
	
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
	var classname = $("table.full-size").parent().attr("class");
	
	var title = $('<div class="mdl-card__title"></div>')
	.append('<h2 class="mdl-card__title-text">'
	+ $(".status-center").text()
	+ '</h2>');
	
	var supportingText = $('<div class="mdl-card__supporting-text"></div>')
	.append($("table.full-size"));
	
	//var border = $('<div class="mdl-card__actions mdl-card--border"></div>')
	
	var button = $('<div class="mdl-card__menu"></div>').append($("#idReset"));
	
	var div = $('<div class="' + classname + ' mdl-card mdl-shadow--2dp">')
	.append(title, supportingText, /*border, */button);
	
	
	$(".mdl-layout__content").append(div);
	
	var tooltip = $('<div class="mdl-tooltip" for="idReset">Сбросить<br>фильтры</div>');
	componentHandler.upgradeElement(tooltip.get(0));
	componentHandler.upgradeElement($("#idReset").get(0));	
	$(".mdl-card__menu").append(tooltip);
	
	componentHandler.upgradeElement($(".mdl-card").get(0));	
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
			$("#settings").prepend("<br><label><b>Настройки:</b></label><br><br>");
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
	$("table.full-size tbody").height($(window).height() - 350);
}

function CheckResetButton()
{
	if ($("#workgroupSelect").val() != "" ||
	$("#workStateSelect").val() != "" ||
	$("#roomSelect").val() != "" || 
	$("#searchInput").val() != "")
	{
		$("button#idReset").fadeIn("fast");
	}
	else
	{
		$("button#idReset").fadeOut("fast");
	}
		
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
		AddResetFiltersButton();
		
		RemoveEmptyColumns();
		CreateSettingsForLang();
		CreateMDLCard();		
		
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
		
		$( "#searchInput" ).on("propertychange input change keyup paste click", 
			function() 
			{						
				$("#workgroupSelect, #workStateSelect, #roomSelect").val("");
				var inputText = escapeHtml($(this).val());
				var cellsThatContainInputText = 'td.employee:contains("' + inputText + '")';
				var cellsThatDoNotContainInputText = 'td.employee:contains("' + inputText + '")';
				$(cellsThatContainInputText).parent().show();				
				$('td.employee').not(cellsThatDoNotContainInputText).parent().hide();
				$("th.workstate i")
				.css("color", "white")
				.attr("title", "Выберите состояние")
				.css("textShadow", "-1px 0 gray, 0 1px gray, 1px 0 gray, 0 -1px gray");		
				$("select#workStateSelect").attr("title", "Выберите состояние");				
				ResizeTableHeader();	
				CheckResetButton();						
			}
		);
		
		
		$("#workgroupSelect, #workStateSelect, #roomSelect").change(
			function ()
			{
				SetFilters();
				ResizeTableHeader();
				CheckResetButton();
			}
		);
		
		
		$(".arrowDiv").click(		
			function ()
			{
				//определяем колонку сортировки
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
				$("table.full-size > tbody > tr").show();
				$("#workgroupSelect, #workStateSelect, #roomSelect").val("");
				
				$("#searchInput").val("").parent().removeClass("is-dirty");
				$("th.workstate i")
				.css("color", "white")
				.attr("title", "Выберите состояние")
				.css("textShadow", "-1px 0 gray, 0 1px gray, 1px 0 gray, 0 -1px gray");
				$("select#workStateSelect").attr("title", "Выберите состояние");
				ResizeTableHeader();
				
				$(this).fadeOut("fast");
			}
		);
		
		$("#roomSelectButton").click(
			function()
			{
				SelectHomeRoom();
				ResizeTableHeader();
				CheckResetButton();
			}
		);
		
		$("#groupSelectButton").click(
			function()
			{
				SelectHomeGroup();
				ResizeTableHeader();
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
	}		
);