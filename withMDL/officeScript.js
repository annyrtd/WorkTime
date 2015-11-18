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
	var newClass = $("th.text").first().attr("class") + " employee"; 
	
	$("th.text").first().attr("class", newClass + header);
	$('tbody tr').each(
		function(index)
		{
			$(this).children("td.text").first().attr("class", newClass);
		}
	);

	newClass = $("th.text").eq(5).attr("class") + " workgroup"; 
	$("th.text").eq(5).attr("class", newClass + header);
	$('tbody tr').each(
		function(index)
		{
			$(this).children("td.text").eq(5).attr("class", newClass);
		}
	);
	
	newClass = $("th.text").eq(6).attr("class") + " room"; 
	$("th.text").eq(6).attr("class", newClass + header);
	$('tbody tr').each(
		function(index)
		{
			$(this).children("td.text").eq(6).attr("class", newClass);
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
	//console.log(arrayOfGroupNames);
	
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
	$("th.text").eq(5).append(select);
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
	//console.log(arrayOfRoomNumbers);
	
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
	$("th.text").eq(6).append(select);
}


// добавляют стрелочки для сортировки
function PrepareEmployeeColumnForSort()
{
	var arrowDiv = $("<div></div>",
	{
		"class": "arrowDiv"
	}).css("float", "right");
	
	var clearfix = $("<div></div>",
	{
		"class": "clearfix"		
	});
	
	$("#searchInput").css("float", "left");
	$("#searchInput").after(arrowDiv, clearfix);
}

function PrepareWorkgroupColumnForSort()
{
	var arrowDiv = $("<div></div>",
	{
		"class": "arrowDiv"
	}).css("float", "right");
	
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
	}).css("float", "right");
	
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
	/*
	componentHandler.upgradeElement(document.querySelector("#idReset"), 'MaterialButton');
	componentHandler.upgradeElement(document.querySelector("#idReset"), 'MaterialRipple');*/
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
	
	$(this).attr("title", $("select#workStateSelect option").filter(":selected").attr("title"));
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




$(document).ready
( 
	function() 
	{
		CreateSearchInput();	
		SetClassesOnColumns();		
		CreateSelectForGroups();
		CreateSelectOnWorkState();
		CreateSelectOnRoom();
		
		PrepareEmployeeColumnForSort();
		PrepareWorkgroupColumnForSort();		
		PrepareRoomColumnForSort();
		//AddResetFiltersButton();
		
		RemoveEmptyColumns();
		$("button.resetButton").parent().append($("<button>Кнопка</button>"));
		
		
		ChangeButtonsToMD();
		
		$("form").last().before($("#workingButton"));
		$("button.resetButton").after($("#workingButton2"), $("#workingButton"));
		
		
		
		$( "#searchInput" ).on("propertychange input change keyup paste click", 
			function() 
			{		
				$("#workgroupSelect, #workStateSelect, #roomSelect").val("");
				var inputText = escapeHtml($(this).val());
				var cellsThatContainInputText = 'td.employee:contains("' + inputText + '")';
				var cellsThatDoNotContainInputText = 'td.employee:contains("' + inputText + '")';
				$(cellsThatContainInputText).parent().show();				
				$('td.employee').not(cellsThatDoNotContainInputText).parent().hide();							
			}
		);
		
		$( "#searchInput" ).focus( 
			function ()
			{
				$(this).attr("placeholder", "");
			}
		);
		
		$( "#searchInput" ).blur( 
			function ()
			{
				$(this).attr("placeholder", "Сотрудник");				
			}
		);
		
		
		$("#workgroupSelect, #workStateSelect, #roomSelect").change(
			function ()
			{
				SetFilters();
			}
		);
		
		/*
		$("#workgroupSelect").change(
			function()
			{		
				//$("#searchInput").val("");
				var inputText = $("select#workgroupSelect option").filter(":selected").val();
				if (inputText == "NoGroup")
				{
					$('td.workgroup').each(
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
				$(cellsThatContainInputText).parent().show();				
				$('td.workgroup').not(cellsThatContainInputText).parent().hide();			
			}
		);
		
		$("#workStateSelect").change(
			function()
			{					
				//$("#searchInput").val("");
				var inputText = $("select#workStateSelect option").filter(":selected").val();
				
				$("tbody tr").each(
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
				
				$(this).attr("title", $("select#workStateSelect option").filter(":selected").attr("title"));
			}
		);
		
		$("#roomSelect").change(
			function()
			{					
				//$("#searchInput").val("");
				var inputText = $("select#roomSelect option").filter(":selected").val();
				if (inputText == "NoRoom")
				{
					$('td.room').each(
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
				if (inputText == "")
				{
					$('td.room').parent().show();
					return;
				}
				var cellsThatContainInputText = 'td.room:contains("' + inputText + '")';
				$(cellsThatContainInputText).parent().show();				
				$('td.room').not(cellsThatContainInputText).parent().hide();			
			}
		);
		
		*/
		
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
					
					$(this).removeClass("headerSortUp").addClass("headerSortDown");					
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
					$(this).removeClass("headerSortDown").addClass("headerSortUp");
				}
				$("table.full-size > tbody").append(arrayToSort);
			}
		);
		
		
		$("button.resetFilters").on("click", 
			function()
			{				
				$("table.full-size > tbody > tr").show();
				$("#workgroupSelect, #workStateSelect, #roomSelect, #searchInput").val("");
			}
		);
		
	}		
);