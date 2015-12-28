var isMonth = true;

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
			var newCell = $("<td></td>",{
				"class": "time",
			}).append(DifferenceOfTime($(this).children("td.time").first().text(), "00:30"));
			$(this).children("td.time").last().after(newCell);
		}
	)
	
	$("td.dayoff").attr("colspan", +$("td.dayoff").attr("colspan") + 1);
	
}


// добавляет концовку с итогами по времени для месяца
function AddConclusionForMonth()
{		
	var necessaryWidth = $("table.full-size").css("width");	
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
	
	var barrier = $("<div></div>", {
		"class": "barrier",
	});
	
	var conclusionDiv = $("<div></div>", {
		"class": "conclusion month",
	})
	
	
	.css("width", necessaryWidth)
	.append(label2_1, label2_2)
	.append("<br>", label3_1, label3_2)	
	.append("<br>", "<br>", label1_1, label1_2)
	.append("<br>", label4_1, label4_2, "<br>");
	$(".content-medium").append(barrier, conclusionDiv);
	
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

function GetTimeOfHolidays()
{
	var hours = 8 * $("tr.dayoff").length;
	return Pad(hours, 2) + ":00";
}

function GetCurrentTimeForCurrentDay()
{	
	//var temp = $("tr[id]").not("[class=future]").last().children(".time").eq(2).text();	
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


// убирает концовку для месяца
function RemoveConclusionForMonth()
{
	$(".conclusion.month").prev(".barrier").remove();
	$(".conclusion.month").remove();
}


// добавляет концовку с итогами по времени для недели
function AddConclusionForWeek()
{
	var necessaryWidth = $("table.full-size").css("width");	
	var currentTime = GetCurrentTimeForWeek();
	
	if ($("#NetTime") !== undefined)
	{
		if ($("#NetTime").children("option[selected]").val() == "Yes")
		{
			currentTime = SumOfTime(currentTime, GetTimeOfHolidaysForWeek());
		}
	}	
	
	
	var thisDayLeft = GetCurrentTimeForCurrentDay();
	var timeForWeekLeft = GetTimeForWeekLeft();
	
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
		id: "text_currentTime_week"
	}).append("Отработанное время за неделю: ");
	
	var label1_2 = $("<label></label>", {
		id: "currentTime_week"
	}).append(currentTime);
	
	
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
	
	
	var barrier = $("<div></div>", {
		"class": "barrier",
	});
	
	var conclusionDiv = $("<div></div>", {
		"class": "conclusion week",
	})	
	.css("width", necessaryWidth)
	.append(label2_1, label2_2)
	.append("<br>", label3_1, label3_2)
	.append("<br>", "<br>", label1_1, label1_2, "<br>");
	$(".content-medium").append(barrier, conclusionDiv);
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


function GetTimeOfHolidaysForWeek()
{	
	var hours = 8 * $("tr.dayoff").not('[style="display: none;"]').length;
	return Pad(hours, 2) + ":00";
}

function GetTimeForWeekLeft()
{	
	var sumNormal = "00:00";
	var sumRealTime = "00:00";
	$("tr[id]").not("[class=future]").not('[style="display: none;"]').each(
		function(index)
		{
			sumRealTime = SumOfTime(sumRealTime, $(this).children(".time").first().text());
			sumNormal = SumOfTime(sumNormal, $(this).children(".time").eq(1).text());
			//console.log(sumRealTime, sumNormal);
		}
	)	
	return DifferenceOfTime(sumRealTime, sumNormal);
}


// убирает концовку для недели
function RemoveConclusionForWeek()
{
	$(".conclusion.week").prev(".barrier").remove();
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
	return Pad(sumHours, 2) + ":" + Pad(sumMinutes,2);
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
	if (hours1 < hours2)
	{
		differenceHours = +(hours2 - hours1) + Math.floor((minutes2 - minutes1)/60);
		differenceMinutes = +(minutes2 - minutes1);
		if (minutes2 < minutes1)		
			differenceMinutes += 60;
		if (differenceHours.toString().indexOf("-") > -1)
		{
			differenceHours = differenceHours.toString().substr(1);
		}
		else
		{
			if (!(differenceHours == 0 && differenceMinutes == 0))
				differenceHours = "-" + differenceHours;
		} 		
	}		
	else
	{
		if (hours1 > hours2)
		{
			differenceHours = +(hours1 - hours2) + Math.floor((minutes1 - minutes2)/60);
			differenceMinutes = +(minutes1 - minutes2);
			if (minutes1 < minutes2)		
				differenceMinutes += 60;	
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
	return Pad(differenceHours,2) + ":" + Pad(differenceMinutes,2);
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
	
	$("td.range.text").each(
		function()
		{
			var start = "", finish = "", positionCurrent, startCurrent = "", finishCurrent = "";
			var timeRange = "";
			
			$(this).children("span").each(
				function()
				{
					timeRange = $(this).text();
					positionCurrent = timeRange.indexOf("—");
					if (positionCurrent > -1)
					{
						startCurrent = timeRange.substr(0, positionCurrent);
						finishCurrent = timeRange.substr(positionCurrent + 1);
						start += startCurrent + "<br>";
						finish += finishCurrent + "<br>";
					}
					if ($(this).text().indexOf("...") > -1)
					{
						if (finish == "<br>")
						{
							finish = "&nbsp;...&nbsp;";
						}
						else
						{
							finish += "&nbsp;...&nbsp;";
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
				}).append(tdFinish.text());
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
}

function AddWarningForEmptyTime(type)
{
	$(this).append('<img src="/Content/warning.png" style="float:left; margin-right: 8px;" title="Не зарегистрировано время ' + type + '">');
	
	
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
	$("tr[id], tr.dayoff").not("[class=future]").each(
		function(index)
		{
			if ($(this).children().first().text() == "Пн")
			{
				if ($(this).prev().attr("class") != "intervalRow")
				{	
					if (numberOfWeek == 3)
					{
						titleOfWeek = "3ья неделя."
					}
					else
					{
						titleOfWeek = numberOfWeek + "ая неделя."
					}			
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
				}
			}			
		}
	);
	DivideDayoffIntoParts();
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
					if ($(this).children("td.dayoff").length != 0)
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

function AddFirstRowBetweenWeeks(length)
{
	var firstCell = $("<td></td>",
	{
		"class": "intervalCell"	,	
		"colspan": length,
	}).append("1ая неделя.");
	var firstRow = $("<tr></tr>",
	{
		"class": "intervalRow",
	}).append(firstCell);
	$("tbody").prepend(firstRow);
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

function TestTimeArithmetics()
{
	console.log(SumOfTime("00:00", "00:00"), "00:00");
	console.log(SumOfTime("00:05", "00:05"), "00:10");
	console.log(SumOfTime("-00:05", "-00:05"), "-00:10");
	console.log(SumOfTime("00:05", "-00:05"), "00:00");	
	console.log(SumOfTime("-00:05", "00:05"), "00:00");
	
	console.log(SumOfTime("00:05", "00:06"), "00:11");
	console.log(SumOfTime("00:06", "00:05"), "00:11");
	console.log(SumOfTime("-00:05", "-00:06"), "-00:11");
	console.log(SumOfTime("-00:06", "-00:05"), "-00:11");
	console.log(SumOfTime("-00:05", "00:06"), "00:01", "/*!!!*/"); /*!!!*/
	console.log(SumOfTime("-00:06", "00:05"), "-00:01");
	console.log(SumOfTime("00:05", "-00:06"), "-00:01");
	console.log(SumOfTime("00:06", "-00:05"), "00:01", "/*!!!*/"); /*!!!*/
	
	console.log(SumOfTime("01:05", "02:05"), "03:10");
	console.log(SumOfTime("02:05", "01:05"), "03:10");
	console.log(SumOfTime("-01:05", "-02:05"), "-03:10");
	console.log(SumOfTime("-02:05", "-01:05"), "-03:10");	
	console.log(SumOfTime("-01:05", "02:05"), "01:00");
	console.log(SumOfTime("-02:05", "01:05"), "-01:00");
	console.log(SumOfTime("01:05", "-02:05"), "-01:00");
	console.log(SumOfTime("02:05", "-01:05"), "01:00");
	
	console.log(SumOfTime("01:05", "02:06"), "03:11");
	console.log(SumOfTime("01:06", "02:05"), "03:11");
	console.log(SumOfTime("02:05", "01:06"), "03:11");
	console.log(SumOfTime("02:06", "01:05"), "03:11");
	
	console.log(SumOfTime("-01:05", "-02:06"), "-03:11");
	console.log(SumOfTime("-01:06", "-02:05"), "-03:11");
	console.log(SumOfTime("-02:05", "-01:06"), "-03:11");
	console.log(SumOfTime("-02:06", "-01:05"), "-03:11");
	
	console.log(SumOfTime("-01:05", "02:06"), "01:01");
	console.log(SumOfTime("-01:06", "02:05"), "00:59");
	console.log(SumOfTime("-02:05", "01:06"), "-00:59");
	console.log(SumOfTime("-02:06", "01:05"), "-01:01");
	
	console.log(SumOfTime("01:05", "-02:06"), "-01:01");
	console.log(SumOfTime("01:06", "-02:05"), "-00:59");
	console.log(SumOfTime("02:05", "-01:06"), "00:59");
	console.log(SumOfTime("02:06", "-01:05"), "01:01");
	
	
	
	
	console.log(DifferenceOfTime("00:00", "00:00"), "00:00");
	console.log(DifferenceOfTime("00:05", "00:05"), "00:00");
	console.log(DifferenceOfTime("-00:05", "-00:05"), "00:00");
	console.log(DifferenceOfTime("00:05", "-00:05"), "00:10");	
	console.log(DifferenceOfTime("-00:05", "00:05"), "-00:10");
	
	console.log(DifferenceOfTime("00:05", "00:06"), "-00:01");
	console.log(DifferenceOfTime("00:06", "00:05"), "00:01", "/*!!!*/"); /*!!!*/
	console.log(DifferenceOfTime("-00:05", "-00:06"), "00:01", "/*!!!*/"); /*!!!*/
	console.log(DifferenceOfTime("-00:06", "-00:05"), "-00:01");
	console.log(DifferenceOfTime("-00:05", "00:06"), "-00:11");
	console.log(DifferenceOfTime("-00:06", "00:05"), "-00:11");
	console.log(DifferenceOfTime("00:05", "-00:06"), "00:11");
	console.log(DifferenceOfTime("00:06", "-00:05"), "00:11");
	
	console.log(DifferenceOfTime("01:05", "02:05"), "-01:00");
	console.log(DifferenceOfTime("02:05", "01:05"), "01:00");
	console.log(DifferenceOfTime("-01:05", "-02:05"), "01:00");
	console.log(DifferenceOfTime("-02:05", "-01:05"), "-01:00");	
	console.log(DifferenceOfTime("-01:05", "02:05"), "-03:10");
	console.log(DifferenceOfTime("-02:05", "01:05"), "-03:10");
	console.log(DifferenceOfTime("01:05", "-02:05"), "03:10");
	console.log(DifferenceOfTime("02:05", "-01:05"), "03:10");
	
	console.log(DifferenceOfTime("01:05", "02:06"), "-01:01");
	console.log(DifferenceOfTime("01:06", "02:05"), "-00:59");
	console.log(DifferenceOfTime("02:05", "01:06"), "00:59");
	console.log(DifferenceOfTime("02:06", "01:05"), "01:01");
	
	console.log(DifferenceOfTime("-01:05", "-02:06"), "01:01");
	console.log(DifferenceOfTime("-01:06", "-02:05"), "00:59");
	console.log(DifferenceOfTime("-02:05", "-01:06"), "-00:59");
	console.log(DifferenceOfTime("-02:06", "-01:05"), "-01:01");
	
	console.log(DifferenceOfTime("-01:05", "02:06"), "-03:11");
	console.log(DifferenceOfTime("-01:06", "02:05"), "-03:11");
	console.log(DifferenceOfTime("-02:05", "01:06"), "-03:11");
	console.log(DifferenceOfTime("-02:06", "01:05"), "-03:11");
	
	console.log(DifferenceOfTime("01:05", "-02:06"), "03:11");
	console.log(DifferenceOfTime("01:06", "-02:05"), "03:11");
	console.log(DifferenceOfTime("02:05", "-01:06"), "03:11");
	console.log(DifferenceOfTime("02:06", "-01:05"), "03:11");
}

function CreateSettings()
{
	$("div.navbar").append($("<div id=settings></div>"));
	$("#settings").load("http://co-msk-app02/Preferences/Edit form", 
		function()
		{
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
			$("div.table-form").eq(2).hide();
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
		}
	);
}


$(document).ready
( 
	function() 
	{
		//TestTimeArithmetics();
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
		AddConclusionForMonth();
		CreateSettings();
		
		var shouldBeHidden = false;
		
		$("tr.intervalRow").click(
			function()
			{
				if (!isMonth)
				{
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
				
				var div = $("<div></div>", {
					"class": "buttonDiv"
				}).append("<br><br>", button);
				
				$("table.full-size").after(div);

				var necessaryWidth = $("table.full-size").css("width");
				$(".conclusion").css("width", necessaryWidth);
				
				RemoveConclusionForMonth();
				AddConclusionForWeek();	
				isMonth = false;
				
				

				$(".resetButton").click(
					function()
					{
						if (isMonth)
							return;
						$(".intervalRow").show();
						$("tr[id]").not("[class=future]").show();
						$(".dayoff").show();	
						RemoveConclusionForWeek();
						AddConclusionForMonth();
						isMonth = true;
						shouldBeHidden = false;
						$(".buttonDiv").remove();
					}
				);
			}
		);		
	}
);