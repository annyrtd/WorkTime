var isMonth = true;
var isStudent = false;
var usualTime = [];
var decimalTime = [];

function IsReportOnPage()
{
	var isHere = false;
	$("th.time").each(
		function(index)
		{
			if ($(this).text() == "Отчет")
			{
				isHere = true;
			}					
		}			
	);
	
	return isHere;
}


//убирают колонки со страницы, когда на ней есть колонка отчет
function RemoveColumnsWhenReportIsOnPage()
{
	HideCellsInTableHead();
	HideCellsInTableBody();
}

function HideCellsInTableHead()
{
	$("th.time").each(
		function(index)
		{
			if (!(index == 0 || index == ($("th.time").length - 1)))
			{
				$(this).hide();
				$("td.dayoff").attr("colspan", $("td.dayoff").attr("colspan") - 1);
			}				
		}			
	);		
}

function HideCellsInTableBody()
{
	var numberOfRemovedItems = $("th.time").length - 3;			
	$("tbody > tr").each(
		function(index1)
		{				
			var lastItem = $(this).children("td.time").length - 1;
			$(this).children("td.time").each(
				function(index2)
				{	
					if (index2 !=0 && index2 != lastItem)
					{
						$(this).hide();
					}
				}
			);
			if ($(this).attr("class") == "future")
			{
				$(this).children("td.time").hide();
				$(this).children().not("td[class]").each(
					function(index)
					{
						if (index < numberOfRemovedItems)
						{
							$(this).hide();
						}
					}
				);
			}
		}
	);
}


// убирают колонки со страницы и добавляют колонку отчет
function RemoveColumnsWhenThereIsNoReport()
{
	HideAllCellsInTableHeadWhenNoReport();
	HideAllCellsInTableBodyWhenNoReport();
	AddReportColumn();
}

function HideAllCellsInTableHeadWhenNoReport()
{
	$("th.time").each(
		function(index)
		{
			if (index != 0)
			{
				$(this).hide();
				$("td.dayoff").attr("colspan", $("td.dayoff").attr("colspan") - 1);
			}				
		}			
	);	
}

function HideAllCellsInTableBodyWhenNoReport()
{	
	var numberOfRemovedItems = $("th.time").length - 2;			
	$("tbody > tr").each(
		function(index1)
		{	
			$(this).children("td.time").each(
				function(index2)
				{	
					if (index2 !=0)
					{
						$(this).hide();
					}
				}
			);
			if ($(this).attr("class") == "future")
			{
				$(this).children("td.time").hide();
				$(this).children().not("td[class]").each(
					function(index)
					{
						if (index < numberOfRemovedItems)
						{
							$(this).hide();
						}
					}
				);
			}
		}
	);
}

function AddReportColumn()
{
	var newHeader = $("<th></th>", {
		 "class": "time"
	}).append("Отчет");
	$("th.time").last().after(newHeader);
	
	$("tr[id]").not("[class=future]").each( 
		function(index)
		{
			var newTime = DifferenceOfTime($(this).children("td.time").first().text(), "00:30");
			var newCell = $("<td></td>",{
				"class": "time",
			}).append(newTime);
			$(this).children("td.time").last().after(newCell);
		}
	)
	
	$("td.dayoff").attr("colspan", +$("td.dayoff").attr("colspan") + 1);
	
}



// создание flex box
function CreateFlex()
{
	var flexParent = $("<div></div>",
	{
		"class": "flexParent"
	}).append($("table.full-size"));
	
	$(".mdl-layout__content").append(flexParent);	
}


// добавляет концовку с итогами по времени для месяца
function AddConclusionForMonth()
{		
	var currentTime = GetAlreadyWorkedTimeForMonth();	
	if ($("#NetTime") !== undefined)
	{
		if ($("#NetTime").children("option[selected]").val() == "Yes")
		{
			currentTime = SumOfTime(currentTime, GetTimeOfHolidays());
		}
	}
	var thisDayLeft = GetCurrentTimeForCurrentDay();
	var timeForMonthLeft = DifferenceOfTime(GetTimeForMonthLeft(), thisDayLeft);
    var reportTimeForMonth = GetSumReportTimeForMonth();	
	var currentTimeClass;
	
	if (thisDayLeft.indexOf("-") > -1)
	{
		currentTimeClass = "notEnoughWorkTime";
	}
	else
	{
		currentTimeClass = "enoughWorkTime";
	}
	
	var label1_1 = $("<label></label>", {
		id: "text_currentTime"
	}).append("Отработанное время за месяц: ");
	
	var label1_2 = $("<label></label>", {
		id: "currentTime"
	}).append(currentTime);
	
	
	var label2_1 = $("<label></label>", {
		id: "text_thisDayLeft",
		"class": currentTimeClass
	}).append("Остаток на текущий день: ");
	
	var label2_2 = $("<label></label>", {
		id: "thisDayLeft",
		"class": currentTimeClass
	}).append(thisDayLeft);
	
	// добавляется, только если есть показ до конца месяца
	
	var label3_1 = $("<label></label>", {
		id: "text_timeForMonthOrWeekLeft"
	}).append("Остаток до конца месяца: ");	
	
	var label3_2 = $("<label></label>", {
		id: "timeForMonthOrWeekLeft"
	}).append(timeForMonthLeft);
	
	var label4_1 = $("<label></label>", {
		id: "text_reportTimeForMonth"
	}).append("Нужно отработать за месяц: ");	
	
	var label4_2 = $("<label></label>", {
		id: "reportTimeForMonth"
	}).append(reportTimeForMonth);
	
	var conclusionDiv = $("<div></div>", {
		"class": "conclusion month mdl-card mdl-shadow--2dp",
	})
	.append('<div><b>Статистика:</b></div>')
	.append(label2_1, label2_2)
	.append("<br>", label3_1, label3_2)	
	.append("<br>", "<br>", label1_1, label1_2)
	.append("<br>", label4_1, label4_2, "<br>");
	
	$(".flexParent").append(conclusionDiv);
	
	// проверяет, есть ли показ до конца месяца
	if ($(".future").length == 0)
	{
		$("#text_timeForMonthOrWeekLeft").hide();
		$("#timeForMonthOrWeekLeft").hide();
		$("#timeForMonthOrWeekLeft").next().hide();
		$("#text_reportTimeForMonth").hide();
		$("#reportTimeForMonth").hide();			
		$("#reportTimeForMonth").next().hide();
	}
}

function GetAlreadyWorkedTimeForMonth()
{
	var time = $(".summary").last().children(".time").first().text();
	$("tr[id]").not("[class=future]").each(
		function (index)
		{
			time = DifferenceOfTime(time, "00:30")
		}
	);
	return time;
}

function GetAlreadyWorkedTimeForMonth_ForStudent()
{
	return $(".summary").last().children(".time").first().text();
}

function GetTimeOfHolidays()
{
	var hours = 8 * $("tr.dayoff").length;
	return hours + ":00";
}


function GetCurrentTimeForCurrentDay()
{	
	return $(".summary:contains('Итог')").not(":contains('за месяц')").last().children(".time").eq(2).text();
}

function GetTimeForMonthLeft()
{
	var sum = "00:00";
	$("tr.future > td.time").each(
		function(index)
		{
			sum = SumOfTime(sum, $(this).text());			
		}
	);
	
	return sum;
}

function GetSumReportTimeForMonth()
{
	var sum = "00:00";
	$("tr.future > td.time").each(
		function(index)
		{
			sum = SumOfTime(sum, DifferenceOfTime($(this).text(), "00:30"));			
		}
	);
	
	$("tr[id]").not("[class=future]").each(
		function(index)
		{
			sum = SumOfTime(sum, DifferenceOfTime($(this).children(".time").eq(1).text(), "00:30"));
		}
	)
	
	return sum;	
}

function GetSumReportTimeForMonth_ForStudent()
{
	var sum = "00:00";
	$("tr.future > td.time").each(
		function(index)
		{
			sum = SumOfTime(sum, $(this).text());			
		}
	);
	
	$("tr[id]").not("[class=future]").each(
		function(index)
		{
			sum = SumOfTime(sum, $(this).children(".time").eq(1).text());
		}
	)
	
	return sum;	
}


// убирает концовку для месяца
function RemoveConclusionForMonth()
{
	$(".flexParent .barrier").remove();
	$(".conclusion.month").remove();
}


// добавляет концовку с итогами по времени для недели
function AddConclusionForWeek()
{	
	var thisDayLeft = GetCurrentTimeForCurrentDay();
	var currentTimeClass;
	
	if (thisDayLeft.indexOf("-") > -1)
	{
		currentTimeClass = "notEnoughWorkTime";
	}
	else
	{
		currentTimeClass = "enoughWorkTime";
	}
		
	var timeForWeekLeft = GetTimeForWeekLeft();
	
	var currentTime = GetCurrentTimeForWeek();
	
	if ($("#NetTime") !== undefined)
	{
		if ($("#NetTime").children("option[selected]").val() == "Yes")
		{
			currentTime = SumOfTime(currentTime, GetTimeOfHolidaysForWeek());
		}
	}
		
	var label2_1 = $("<label></label>", {
		id: "text_thisDayLeft_week",
		"class": currentTimeClass
	}).append("Остаток на текущий день: ");
	
	var label2_2 = $("<label></label>", {
		id: "thisDayLeft_week",
		"class": currentTimeClass
	}).append(thisDayLeft);
	
	
	var label3_1 = $("<label></label>", {
		id: "text_timeForMonthOrWeekLeft_week"
	}).append("Остаток до конца недели: ");	
	
	var label3_2 = $("<label></label>", {
		id: "timeForMonthOrWeekLeft_week"
	}).append(timeForWeekLeft);
	
	
	var label1_1 = $("<label></label>", {
		id: "text_currentTime_week"
	}).append("Отработанное время за неделю: ");
	
	var label1_2 = $("<label></label>", {
		id: "currentTime_week"
	}).append(currentTime);	

	
	var conclusionDiv = $("<div></div>", {
		"class": "conclusion week mdl-card mdl-shadow--2dp",
	})	
	.append('<div><b>Статистика:</b></div>')
	.append(label2_1, label2_2)
	.append("<br>", label3_1, label3_2)
	.append("<br>", "<br>", label1_1, label1_2, "<br>");
	$(".flexParent").append(conclusionDiv);
	
	// проверяет, есть ли показ до конца месяца
	if ($(".future").length == 0)
	{
		$("#text_timeForMonthOrWeekLeft_week").hide();
		$("#timeForMonthOrWeekLeft_week").hide();
		$("#timeForMonthOrWeekLeft_week").next().hide();
	}	
}

function GetTimeForWeekLeft()
{	
	var sumNormal = "00:00";
	var sumRealTime = "00:00";
	
	$("tr.intervalRow")
	.not('[style="display: none;"]')
	.first()
	.nextAll()
	.each(
		function()
		{
			if ($(this).hasClass("intervalRow"))
			{
				return false;
			}
			if ($(this).attr("id") !== undefined)
			{	
				if (($(this).hasClass("future")))
				{
					sumNormal = SumOfTime(sumNormal, $(this).children(".time").first().text());
				}
				else
				{
					sumNormal = SumOfTime(sumNormal, $(this).children(".time").eq(1).text());
					sumRealTime = SumOfTime(sumRealTime, $(this).children(".time").first().text());				
				}
			}				
		}
	);
	return DifferenceOfTime(sumRealTime, sumNormal);
}

function GetCurrentTimeForWeek()
{
	var sum = "00:00";
	$("tr[id]").not("[class=future]").not('[style="display: none;"]').each(
		function(index)
		{
			sum = SumOfTime(sum, DifferenceOfTime($(this).children(".time").first().text(), "00:30"));
		}
	)
	return sum;
}

function GetCurrentTimeForWeek_ForStudent()
{
	var sum = "00:00";
	$("tr[id]").not("[class=future]").not('[style="display: none;"]').each(
		function(index)
		{
			sum = SumOfTime(sum, $(this).children(".time").first().text());
		}
	)
	return sum;
}

function GetTimeOfHolidaysForWeek()
{	
	var hours = 8 * $("tr.dayoff").not('[style="display: none;"]').length;
	return hours + ":00";
}


// убирает концовку для недели
function RemoveConclusionForWeek()
{
	$(".flexParent .barrier").remove();
	$(".conclusion.week").remove();
}


// функции подсчета времени
function SumOfTime(time1, time2)
{
	if (time1.toString().indexOf("-") > -1 && time2.toString().indexOf("-") > -1)
	{
		return "-" + SumOfTime(time1.substr(1), time2.substr(1));
	}
	
	if (time1.toString().indexOf("-") > -1)
	{
		return DifferenceOfTime(time2, time1.substr(1));		
	}	
	
	if (time2.toString().indexOf("-") > -1)
	{
		return DifferenceOfTime(time1, time2.substr(1));		
	}	
	
	// дальше считается для неотрицательных значений
	var position1 = +time1.indexOf(":");
	var position2 = +time2.indexOf(":");
	var hours1 = +time1.substr(0, position1);
	var hours2 = +time2.substr(0, position2);
	var minutes1 = +time1.substr(position1 + 1);	
	var minutes2 = +time2.substr(position2 + 1);
	var sumHours = +(hours1 + hours2) + Math.floor((minutes1 + minutes2)/60);
	var sumMinutes = +(minutes1 + minutes2) % 60;
	return sumHours + ":" + Pad(sumMinutes,2);
}

function Pad(num, size) 
{
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function DifferenceOfTime(time1, time2)
{
	if (time1.toString().indexOf("-") > -1 && time2.toString().indexOf("-") > -1)
	{
		return DifferenceOfTime(time2.substr(1), time1.substr(1));
	}
	
	if (time1.toString().indexOf("-") > -1)
	{
		return "-" + SumOfTime(time1.substr(1), time2);		
	}	
	
	if (time2.toString().indexOf("-") > -1)
	{
		return SumOfTime(time1, time2.substr(1));		
	}	
	
	// дальше считается для неотрицательных значений
	var position1 = +time1.indexOf(":");
	var position2 = +time2.indexOf(":");
	var hours1 = +time1.substr(0, position1);
	var hours2 = +time2.substr(0, position2);
	var minutes1 = +time1.substr(position1 + 1);	
	var minutes2 = +time2.substr(position2 + 1);
	var differenceHours, differenceMinutes;
	if (hours1 < hours2) /*!!!!! < or <= */
	{
		differenceHours = +(hours2 - hours1) + Math.floor((minutes2 - minutes1)/60);
		differenceMinutes = +(minutes2 - minutes1);
		if (minutes2 < minutes1)	
		{			
			differenceMinutes += 60;
		}
		if (differenceHours.toString().indexOf("-") > -1)
		{
			differenceHours = differenceHours.toString().substr(1);
		}
		else
		{
			if (!(differenceHours == 0 && differenceMinutes == 0))
			{
				differenceHours = "-" + differenceHours;
			}
		} 		
	}
	if (hours1 >= hours2)
	{
		if (hours1 > hours2)
		{
			differenceHours = +(hours1 - hours2) + Math.floor((minutes1 - minutes2)/60);
			differenceMinutes = +(minutes1 - minutes2);
			if (minutes1 < minutes2)
			{				
				differenceMinutes += 60;
			}				
		}
		else
		{
			if (minutes1 >= minutes2)
			{
				differenceHours = "00";
				differenceMinutes = +(minutes1 - minutes2);
			}
			else
			{
				differenceHours = "-0";
				differenceMinutes = +(minutes2 - minutes1);
			}
		}
	}
	var ret = differenceHours + ":" + Pad(differenceMinutes,2);
	return ret;
}


// остальные функции
function SeparateStartAndFinish()
{	
	var thFinish =  $("<th></th>", 
	{
		"class": "text range",
	})
	.append("Окончание");
	$("th.text.range").text("Начало").after(thFinish);
	
	var timeOfLeavingSpan_title, timeOfLeavingSpan_id = "timeOfLeavingSpan";
	
	$("td.range.text").each(
		function()
		{
			var start = "", finish = "", positionCurrent, startCurrent = "", finishCurrent = "";
			var timeRange = "";
			
			$(this).children("span").each(
				function()
				{
					timeRange = $(this).text();
					if (timeRange == " ... ")
					{
						timeOfLeavingSpan_title = $(this).attr("title");
						finish += "<span id='" + timeOfLeavingSpan_id + "'>...</span>"
						+ "<br>";
					}
					
					positionCurrent = timeRange.indexOf("—");
					if (positionCurrent > -1)
					{
						startCurrent = timeRange.substr(0, positionCurrent);
						finishCurrent = timeRange.substr(positionCurrent + 1);
						start += startCurrent + "<br>";
						if (finishCurrent != "")
						{
							finish += finishCurrent + "<br>";
						}
					}
				}
			);
			
			var tdFinish =  $("<td></td>", 
			{
				"class": "range text",
			}).append(finish);
			
			if ($(this).children("span").hasClass("remote"))
			{				
				var tdSpanFinish = $("<span></span>",
				{
					"class": "remote",
				}).append(tdFinish.html());
				tdFinish.empty().append(tdSpanFinish);	

				start = $("<span></span>",
				{
					"class": "remote",
				}).append(start);				
			}
					
			$(this).empty().append(start).after(tdFinish);
			
			if ($(this).text() == "")
			{
				AddWarningForEmptyTime.apply($(this).get(0), ["прихода"]);
			}
			
			if ($(this).next().text() == "")
			{
				AddWarningForEmptyTime.apply($(this).next().get(0), ["ухода"]);
			}
		}
	);
	var size = ($("td.dayoff").attr("colspan"));
	$("td.dayoff").attr("colspan", ++size);
	
	$("td.text[colspan]").each(
		function(index)
		{
			size = $(this).attr("colspan");
			$(this).attr("colspan", ++size );
		}
	)	
	
	$("tr.future").each(
		function(index)
		{
			var newItem = $("<td></td>");
			$(this).append(newItem);
		}
	)
	
	ChangeTitleToMDTooltip(timeOfLeavingSpan_id, timeOfLeavingSpan_title);
}

function AddWarningForEmptyTime(type)
{
	$(this).append('<i class="material-icons" style="color: gray;" ' 
		+ 'title="Не зарегистрировано <br> время ' 
		+ type 
		+ '">warning</i>');
}

function RemoveUnnesessaryBlocks()
{
	$(".future").hide();
	$(".summary").hide();
}

function AddRowBetweenWeeksWithWeekNumber()
{
	var length = +$("th").not("[style='display: none;']").length + 1;
	AddFirstRowBetweenWeeks(length);
	var numberOfWeek = 2;
	$("tr[id], tr.dayoff")
	.each(
		function(index)
		{
			if ($(this).children().first().text() == "Пн")
			{
				if ($(this).prev().attr("class") != "intervalRow")
				{		
					titleOfWeek = numberOfWeek + "-я неделя."
					
					var cell = $("<td></td>",
					{
						"class": "intervalCell"	,	
						"colspan": length,
					}).append(titleOfWeek);
					numberOfWeek++;
					var row = $("<tr></tr>",
					{
						"class": "intervalRow",
					}).append(cell);					
					$(this).before(row);
					if($(this).hasClass("future"))
					{
						row.addClass("future");
						row.hide();
					}						
				}
			}			
		}
	);
	DivideDayoffIntoParts();
}

function AddFirstRowBetweenWeeks(length)
{
	var firstCell = $("<td></td>",
	{
		"class": "intervalCell"	,	
		"colspan": length,
	}).append("1-я неделя.");
	var firstRow = $("<tr></tr>",
	{
		"class": "intervalRow",
	}).append(firstCell);
	$("tbody").prepend(firstRow);
}

function DivideDayoffIntoParts()
{
	$("tr.intervalRow").each(
		function(index)
		{
			if ($(this).prev().attr("class") == "dayoff" 
				&& $(this).next().attr("class") == "dayoff" 
				&& $(this).next().children("td.dayoff").length == 0)
			{		
				var newDayoff = $("td.dayoff").first().clone();
				$(this).next().append(newDayoff);				
			}
		}
	);
	

	$("td.dayoff").attr("colspan", "5").each(
		function(index)
		{			
			var rowspan = 1;
			$(this).parent().nextUntil(".intervalRow").filter("tr.dayoff").each(
				function(index)
				{
					if ($(this).children("td.dayoff").length != 0
						|| $(this).children("td.time").length != 0)
					{
						return false;
					}
					rowspan++;
				}
			);
			
			$(this).attr("rowspan", rowspan);
		}
	);
}

function WriteFullNamesOfDays()
{
	$("td.weekday").each(
		function(index)
		{
			switch($(this).text())
			{
				case "Пн":
					$(this).text("Понедельник");
					break;
				case "Вт":
					$(this).text("Вторник");
					break;
				case "Ср":
					$(this).text("Среда");
					break;
				case "Чт":
					$(this).text("Четверг");
					break;
				case "Пт":
					$(this).text("Пятница");
					break;
				case "Сб":
					$(this).text("Суббота");
					break;
				case "Вс":
					$(this).text("Воскресенье");
					break;
				default:
					break;
			}
		}
	)
}

function CreateSettings()
{
	$("div.mdl-layout__drawer").append($("<div id=settings></div>"));
	$("#settings").load("http://co-msk-app02/Preferences/Edit form", 
		function()
		{
			$("#settings").hide();
			// remove rus/eng switch from time settings
			$("div.table-form").eq(0).remove();
			$("#settings").prepend("<br><label><b>Настройки:</b></label><br><br>");
			$("#ReturnTo").val("/Personal" + window.location.search);
			$("#settings a").hide();
			$("#settings label").removeAttr("for");
			$("#settings label").after("<br>");
			$("div.table-form").last().next().css(
			{
				paddingTop: "2em"
			});
			
			
			$("div.table-form").eq(0).children("label").text('Округлять "отчетное" время');
			
			$("div.table-form").eq(1).children("label").text('Учитывать отпуск в отработанном времени за месяц');
			$("div.table-form").eq(2).children("label").text('Я студент');
			$("div.table-form").eq(4).children("label").text('Cчитать отчетное время до конца месяца');
			$("div.table-form").eq(3).hide();
			
			if($("div.table-form").eq(1)
				.children("select").first()
				.children("option[selected]").val() == "Yes")
			{
				$("#currentTime").text(SumOfTime(GetAlreadyWorkedTimeForMonth(), GetTimeOfHolidays()));
				$("#currentTime_week").text(SumOfTime(GetCurrentTimeForWeek(), GetTimeOfHolidaysForWeek()));
			}
			else
			{
				$("#currentTime").text(GetAlreadyWorkedTimeForMonth());				
				$("#currentTime_week").text(GetCurrentTimeForWeek());
			}
			
			if($("div.table-form").eq(2)
				.children("select").first()
				.children("option[selected]").val() == "Yes")
			{				
				isStudent = true;
				SetUpTimeForStudent();		
			}
			
			ReplaceInput.apply($("form[action='/Preferences/Edit'] input[type=submit]").get(0));
			ChangeButtonsToMD.apply($("form[action='/Preferences/Edit'] button.inputReplaceButton").get(0));	

			$("form[action='/Preferences/Edit'] button.inputReplaceButton").parent()
			.css("width", "0px");

			$("div.table-form select").each(
				function()
				{
					var input = $('<input type="checkbox" id="checkbox_' + $(this).attr("id") + '" class="mdl-switch__input">');
					var span = $('<span class="mdl-switch__label"></span>');
					var label = $('<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="checkbox_' 
						+ $(this).attr("id") + '">')
						.append(input, span);
						
					$(this).after(label);
					$(this).hide();
					if ($(this).val() == "Yes")
					{
						input.attr("checked", "checked");
					}
					
					componentHandler.upgradeElement(label.get(0));			
					
				}
			);
			
			$("#settings").fadeIn("fast");
			
			$("form[action='/Preferences/Edit'] button.inputReplaceButton").click(
				function()
				{
					$("div.table-form select").each(
						function()
						{
							if ($('#checkbox_' + $(this).attr("id")).parent().hasClass("is-checked"))
							{
								$(this).val("Yes");
							}
							else
							{
								$(this).val("No");
							}
						}
					);
				}
			);
		}
	);
}

function SetUpTimeForStudent()
{
	if (isStudent)
	{
		$("tr[id]").not("[class=future]").each( 
			function(index)
			{
				var newText = $(this).children("td.time").first().text();
				$(this).children("td.time").last().empty().text(newText);
			}
		);
		
		$("label#currentTime").text(GetAlreadyWorkedTimeForMonth_ForStudent());
		$("label#reportTimeForMonth").text(GetSumReportTimeForMonth_ForStudent());	
		$("label#currentTime_week").text(GetCurrentTimeForWeek_ForStudent());
	}
	
}

function SetTableHeightForTime()
{
	if (isMonth)
	{
		$("table.full-size tbody").height($(window).height() - 492);
	}
	else
	{
		$("table.full-size tbody").height($(window).height() - 526);
	}
}

function AddTooltips_workScript()
{
	$("i:contains('warning')").each(
		function(index)
		{			
			if ($(this).attr("title") === undefined)
			{
				return true;
			}
			var id = "i_warning_" + index;
			var title = $(this).attr("title");
			$(this).removeAttr("title");
			$(this).attr("id", id);
			ChangeTitleToMDTooltip(id, title);			
		}
	);
}

$(document).ready
( 
	function() 
	{
		if(IsReportOnPage())
		{
			RemoveColumnsWhenReportIsOnPage();
		}			
		else
		{
			RemoveColumnsWhenThereIsNoReport();
		}
		SeparateStartAndFinish();		
		RemoveUnnesessaryBlocks();
		AddRowBetweenWeeksWithWeekNumber();
		WriteFullNamesOfDays();	
		CreateSettings();
		ShowTableFullSizeAndHolidayBox();
		
		var shouldBeHidden = false;
		
		$(window).resize(
			function() 
			{
				SetTableHeightForTime();
			}
		).resize(); // Trigger resize handler
		
		$("table.full-size th")
		.first()
		.removeAttr("colspan")
		.addClass("weekday")
		.after("<th class='monthday number'>№</th>");
		
		CreateFlex();		
		AddConclusionForMonth();
		
		AddTooltips_workScript();
		
		$("tr.intervalRow").click(
			function()
			{
				if (!isMonth)
				{
					$(".intervalRow").show();
					$(".intervalRow.future").hide();
					$("tr[id]").not("[class=future]").show();
					$(".dayoff").show();	
					RemoveConclusionForWeek();
					AddConclusionForMonth();
					isMonth = true;
					shouldBeHidden = false;
					$(".buttonDiv").remove();
					$(window).resize();
					SetUpTimeForStudent();
					return;
				}
				$(this).prevAll().each(
					function()
					{
						$(this).hide();
					}
				);
				$(this).nextAll().each(
					function()
					{
						if ($(this).attr("class") == "intervalRow")
						{
							shouldBeHidden = true;
						}
						if (shouldBeHidden)
						{
							$(this).hide();
						}
					}
				);
				
				var button = $("<button></button>", {
					"class": "resetButton",
					type: "button"
				}).append("Вернуться к месяцу...");
				
				
				ChangeButtonsToMD.apply(button.get(0));
				
				var div = $("<div></div>", {
					"class": "buttonDiv"
				}).append("<br>", button);
				
				
				var barrier = $("<div></div>", {
					"class": "barrier",
				});
				
				RemoveConclusionForMonth();
				AddConclusionForWeek();	
				isMonth = false;
				$(window).resize();
				SetUpTimeForStudent();
				
				$("table.full-size").parent().append(barrier, div);

				$(".resetButton").click(
					function()
					{
						if (isMonth)
							return;
						
						$(".intervalRow").show();
						$(".intervalRow.future").hide();						
						$("tr[id]").not("[class=future]").show();
						$(".dayoff").show();	
						RemoveConclusionForWeek();
						AddConclusionForMonth();
						isMonth = true;
						shouldBeHidden = false;
						$(".buttonDiv").remove();
						$(window).resize();
						SetUpTimeForStudent();
					}
				);
			}
		);		
	}
);