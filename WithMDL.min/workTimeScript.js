var isMonth=true;var isStudent=false;function IsReportOnPage(){var a=false;$("th.time").each(function(b){if($(this).text()=="Отчет"){a=true}});return a}function RemoveColumnsWhenReportIsOnPage(){HideCellsInTableHead();HideCellsInTableBody()}function HideCellsInTableHead(){$("th.time").each(function(a){if(!(a==0||a==($("th.time").length-1))){$(this).hide();$("td.dayoff").attr("colspan",$("td.dayoff").attr("colspan")-1)}})}function HideCellsInTableBody(){var a=$("th.time").length-3;$("tbody > tr").each(function(c){var b=$(this).children("td.time").length-1;$(this).children("td.time").each(function(d){if(d!=0&&d!=b){$(this).hide()}});if($(this).attr("class")=="future"){$(this).children("td.time").hide();$(this).children().not("td[class]").each(function(d){if(d<a){$(this).hide()}})}})}function RemoveColumnsWhenThereIsNoReport(){HideAllCellsInTableHeadWhenNoReport();HideAllCellsInTableBodyWhenNoReport();AddReportColumn()}function HideAllCellsInTableHeadWhenNoReport(){$("th.time").each(function(a){if(a!=0){$(this).hide();$("td.dayoff").attr("colspan",$("td.dayoff").attr("colspan")-1)}})}function HideAllCellsInTableBodyWhenNoReport(){var a=$("th.time").length-2;$("tbody > tr").each(function(b){$(this).children("td.time").each(function(c){if(c!=0){$(this).hide()}});if($(this).attr("class")=="future"){$(this).children("td.time").hide();$(this).children().not("td[class]").each(function(c){if(c<a){$(this).hide()}})}})}function AddReportColumn(){var a=$("<th></th>",{"class":"time"}).append("Отчет");$("th.time").last().after(a);$("tr[id]").not("[class=future]").each(function(b){var c=DifferenceOfTime($(this).children("td.time").first().text(),"00:30");var d=$("<td></td>",{"class":"time"}).append(c);$(this).children("td.time").last().after(d)});$("td.dayoff").attr("colspan",+$("td.dayoff").attr("colspan")+1)}function CreateFlex(){var a=$("<div></div>",{"class":"flexParent"}).append($("table.full-size"));$(".mdl-layout__content").append(a)}function AddConclusionForMonth(){var c=GetAlreadyWorkedTimeForMonth();if($("#NetTime")!==undefined){if($("#NetTime").children("option[selected]").val()=="Yes"){c=SumOfTime(c,GetTimeOfHolidays())}}var l=GetCurrentTimeForCurrentDay();var j=DifferenceOfTime(GetTimeForMonthLeft(),l);var k=GetSumReportTimeForMonth();var e;if(l.indexOf("-")>-1){e="notEnoughWorkTime"}else{e="enoughWorkTime"}var n=$("<label></label>",{id:"text_currentTime"}).append("Отработанное время за месяц: ");var m=$("<label></label>",{id:"currentTime"}).append(c);var b=$("<label></label>",{id:"text_thisDayLeft","class":e}).append("Остаток на текущий день: ");var a=$("<label></label>",{id:"thisDayLeft","class":e}).append(l);var g=$("<label></label>",{id:"text_timeForMonthOrWeekLeft"}).append("Остаток до конца месяца: ");var f=$("<label></label>",{id:"timeForMonthOrWeekLeft"}).append(j);var i=$("<label></label>",{id:"text_reportTimeForMonth"}).append("Нужно отработать за месяц: ");var h=$("<label></label>",{id:"reportTimeForMonth"}).append(k);var d=$("<div></div>",{"class":"conclusion month mdl-card mdl-shadow--2dp"}).append("<div><b>Статистика:</b></div>").append(b,a).append("<br>",g,f).append("<br>","<br>",n,m).append("<br>",i,h,"<br>");$(".flexParent").append(d);if($(".future").length==0){$("#text_timeForMonthOrWeekLeft").hide();$("#timeForMonthOrWeekLeft").hide();$("#timeForMonthOrWeekLeft").next().hide();$("#text_reportTimeForMonth").hide();$("#reportTimeForMonth").hide();$("#reportTimeForMonth").next().hide()}}function GetAlreadyWorkedTimeForMonth(){var a=$(".summary").last().children(".time").first().text();$("tr[id]").not("[class=future]").each(function(b){a=DifferenceOfTime(a,"00:30")});return a}function GetAlreadyWorkedTimeForMonth_ForStudent(){return $(".summary").last().children(".time").first().text()}function GetTimeOfHolidays(){var a=8*$("tr.dayoff").length;return a+":00"}function GetCurrentTimeForCurrentDay(){return $(".summary:contains('Итог')").not(":contains('за месяц')").last().children(".time").eq(2).text()}function GetTimeForMonthLeft(){var a="00:00";$("tr.future > td.time").each(function(b){a=SumOfTime(a,$(this).text())});return a}function GetSumReportTimeForMonth(){var a="00:00";$("tr.future > td.time").each(function(b){a=SumOfTime(a,DifferenceOfTime($(this).text(),"00:30"))});$("tr[id]").not("[class=future]").each(function(b){a=SumOfTime(a,DifferenceOfTime($(this).children(".time").eq(1).text(),"00:30"))});return a}function GetSumReportTimeForMonth_ForStudent(){var a="00:00";$("tr.future > td.time").each(function(b){a=SumOfTime(a,$(this).text())});$("tr[id]").not("[class=future]").each(function(b){a=SumOfTime(a,$(this).children(".time").eq(1).text())});return a}function RemoveConclusionForMonth(){$(".flexParent .barrier").remove();$(".conclusion.month").remove()}function AddConclusionForWeek(){var i=GetCurrentTimeForCurrentDay();var e;if(i.indexOf("-")>-1){e="notEnoughWorkTime"}else{e="enoughWorkTime"}var h=GetTimeForWeekLeft();var c=GetCurrentTimeForWeek();if($("#NetTime")!==undefined){if($("#NetTime").children("option[selected]").val()=="Yes"){c=SumOfTime(c,GetTimeOfHolidaysForWeek())}}var b=$("<label></label>",{id:"text_thisDayLeft_week","class":e}).append("Остаток на текущий день: ");var a=$("<label></label>",{id:"thisDayLeft_week","class":e}).append(i);var g=$("<label></label>",{id:"text_timeForMonthOrWeekLeft_week"}).append("Остаток до конца недели: ");var f=$("<label></label>",{id:"timeForMonthOrWeekLeft_week"}).append(h);var k=$("<label></label>",{id:"text_currentTime_week"}).append("Отработанное время за неделю: ");var j=$("<label></label>",{id:"currentTime_week"}).append(c);var d=$("<div></div>",{"class":"conclusion week mdl-card mdl-shadow--2dp"}).append("<div><b>Статистика:</b></div>").append(b,a).append("<br>",g,f).append("<br>","<br>",k,j,"<br>");$(".flexParent").append(d);if($(".future").length==0){$("#text_timeForMonthOrWeekLeft_week").hide();$("#timeForMonthOrWeekLeft_week").hide();$("#timeForMonthOrWeekLeft_week").next().hide()}}function GetTimeForWeekLeft(){var b="00:00";var a="00:00";$("tr.intervalRow").not('[style="display: none;"]').first().nextAll().each(function(){if($(this).hasClass("intervalRow")){return false}if($(this).attr("id")!==undefined){if(($(this).hasClass("future"))){b=SumOfTime(b,$(this).children(".time").first().text())}else{b=SumOfTime(b,$(this).children(".time").eq(1).text());a=SumOfTime(a,$(this).children(".time").first().text())}}});return DifferenceOfTime(a,b)}function GetCurrentTimeForWeek(){var a="00:00";$("tr[id]").not("[class=future]").not('[style="display: none;"]').each(function(b){a=SumOfTime(a,DifferenceOfTime($(this).children(".time").first().text(),"00:30"))});return a}function GetCurrentTimeForWeek_ForStudent(){var a="00:00";$("tr[id]").not("[class=future]").not('[style="display: none;"]').each(function(b){a=SumOfTime(a,$(this).children(".time").first().text())});return a}function GetTimeOfHolidaysForWeek(){var a=8*$("tr.dayoff").not('[style="display: none;"]').length;return a+":00"}function RemoveConclusionForWeek(){$(".flexParent .barrier").remove();$(".conclusion.week").remove()}function SumOfTime(j,i){if(j.toString().indexOf("-")>-1&&i.toString().indexOf("-")>-1){return"-"+SumOfTime(j.substr(1),i.substr(1))}if(j.toString().indexOf("-")>-1){return DifferenceOfTime(i,j.substr(1))}if(i.toString().indexOf("-")>-1){return DifferenceOfTime(j,i.substr(1))}var c=+j.indexOf(":");var b=+i.indexOf(":");var e=+j.substr(0,c);var d=+i.substr(0,b);var g=+j.substr(c+1);var f=+i.substr(b+1);var h=+(e+d)+Math.floor((g+f)/60);var a=+(g+f)%60;return h+":"+Pad(a,2)}function Pad(a,b){var c=a+"";while(c.length<b){c="0"+c}return c}function DifferenceOfTime(k,j){if(k.toString().indexOf("-")>-1&&j.toString().indexOf("-")>-1){return DifferenceOfTime(j.substr(1),k.substr(1))}if(k.toString().indexOf("-")>-1){return"-"+SumOfTime(k.substr(1),j)}if(j.toString().indexOf("-")>-1){return SumOfTime(k,j.substr(1))}var b=+k.indexOf(":");var a=+j.indexOf(":");var d=+k.substr(0,b);var c=+j.substr(0,a);var h=+k.substr(b+1);var g=+j.substr(a+1);var f,e;if(d<c){
/*!!!!! < or <= */
}f=+(c-d)+Math.floor((g-h)/60);e=+(g-h);if(g<h){e+=60}if(f.toString().indexOf("-")>-1){f=f.toString().substr(1)}else{if(!(f==0&&e==0)){f="-"+f}}if(d>=c){if(d>c){f=+(d-c)+Math.floor((h-g)/60);e=+(h-g);if(h<g){e+=60}}else{if(h>=g){f="00";e=+(h-g)}else{f="-0";e=+(g-h)}}}var i=f+":"+Pad(e,2);return i}function SeparateStartAndFinish(){var a=$("<th></th>",{"class":"text range"}).append("Окончание");$("th.text.range").text("Начало").after(a);var d,b="timeOfLeavingSpan";$("td.range.text").each(function(){var l="",h="",g,j="",i="";var f="";$(this).children("span").each(function(){f=$(this).text();if(f==" ... "){d=$(this).attr("title");h+="<span id='"+b+"'>...</span><br>"}g=f.indexOf("—");if(g>-1){j=f.substr(0,g);i=f.substr(g+1);l+=j+"<br>";if(i!=""){h+=i+"<br>"}}});var k=$("<td></td>",{"class":"range text"}).append(h);if($(this).children("span").hasClass("remote")){var e=$("<span></span>",{"class":"remote"}).append(k.text());k.empty().append(e);l=$("<span></span>",{"class":"remote"}).append(l)}$(this).empty().append(l).after(k);if($(this).text()==""){AddWarningForEmptyTime.apply($(this).get(0),["прихода"])}if($(this).next().text()==""){AddWarningForEmptyTime.apply($(this).next().get(0),["ухода"])}});var c=($("td.dayoff").attr("colspan"));$("td.dayoff").attr("colspan",++c);$("td.text[colspan]").each(function(e){c=$(this).attr("colspan");$(this).attr("colspan",++c)});$("tr.future").each(function(e){var f=$("<td></td>");$(this).append(f)});ChangeTitleToMDTooltip(b,d)}function AddWarningForEmptyTime(a){$(this).append('<i class="material-icons" style="color: gray;" title="Не зарегистрировано <br> время '+a+'">warning</i>')}function RemoveUnnesessaryBlocks(){$(".future").hide();$(".summary").hide()}function AddRowBetweenWeeksWithWeekNumber(){var b=+$("th").not("[style='display: none;']").length+1;AddFirstRowBetweenWeeks(b);var a=2;$("tr[id], tr.dayoff").each(function(d){if($(this).children().first().text()=="Пн"){if($(this).prev().attr("class")!="intervalRow"){titleOfWeek=a+"-я неделя.";var c=$("<td></td>",{"class":"intervalCell",colspan:b}).append(titleOfWeek);a++;var e=$("<tr></tr>",{"class":"intervalRow"}).append(c);$(this).before(e);if($(this).hasClass("future")){e.addClass("future");e.hide()}}}});DivideDayoffIntoParts()}function AddFirstRowBetweenWeeks(b){var a=$("<td></td>",{"class":"intervalCell",colspan:b}).append("1-я неделя.");var c=$("<tr></tr>",{"class":"intervalRow"}).append(a);$("tbody").prepend(c)}function DivideDayoffIntoParts(){$("tr.intervalRow").each(function(a){if($(this).prev().attr("class")=="dayoff"&&$(this).next().attr("class")=="dayoff"&&$(this).next().children("td.dayoff").length==0){var b=$("td.dayoff").first().clone();$(this).next().append(b)}});$("td.dayoff").attr("colspan","5").each(function(a){var b=1;$(this).parent().nextUntil(".intervalRow").filter("tr.dayoff").each(function(c){if($(this).children("td.dayoff").length!=0||$(this).children("td.time").length!=0){return false}b++});$(this).attr("rowspan",b)})}function WriteFullNamesOfDays(){$("td.weekday").each(function(a){switch($(this).text()){case"Пн":$(this).text("Понедельник");break;case"Вт":$(this).text("Вторник");break;case"Ср":$(this).text("Среда");break;case"Чт":$(this).text("Четверг");break;case"Пт":$(this).text("Пятница");break;case"Сб":$(this).text("Суббота");break;case"Вс":$(this).text("Воскресенье");break;default:break}})}function CreateSettings(){$("div.mdl-layout__drawer").append($("<div id=settings></div>"));$("#settings").load("http://co-msk-app02/Preferences/Edit form",function(){$("#settings").hide();$("div.table-form").eq(0).remove();$("#settings").prepend("<br><label><b>Настройки:</b></label><br><br>");$("#ReturnTo").val("/Personal"+window.location.search);$("#settings a").hide();$("#settings label").removeAttr("for");$("#settings label").after("<br>");$("div.table-form").last().next().css({paddingTop:"2em"});$("div.table-form").eq(0).children("label").text('Округлять "отчетное" время');$("div.table-form").eq(1).children("label").text("Учитывать отпуск в отработанном времени за месяц");$("div.table-form").eq(2).children("label").text("Я студент");$("div.table-form").eq(4).children("label").text("Cчитать отчетное время до конца месяца");$("div.table-form").eq(3).hide();if($("div.table-form").eq(1).children("select").first().children("option[selected]").val()=="Yes"){$("#currentTime").text(SumOfTime(GetAlreadyWorkedTimeForMonth(),GetTimeOfHolidays()));$("#currentTime_week").text(SumOfTime(GetCurrentTimeForWeek(),GetTimeOfHolidaysForWeek()))}else{$("#currentTime").text(GetAlreadyWorkedTimeForMonth());$("#currentTime_week").text(GetCurrentTimeForWeek())}if($("div.table-form").eq(2).children("select").first().children("option[selected]").val()=="Yes"){isStudent=true;SetUpTimeForStudent()}ReplaceInput.apply($("form[action='/Preferences/Edit'] input[type=submit]").get(0));ChangeButtonsToMD.apply($("form[action='/Preferences/Edit'] button.inputReplaceButton").get(0));$("form[action='/Preferences/Edit'] button.inputReplaceButton").parent().css("width","0px");$("div.table-form select").each(function(){var a=$('<input type="checkbox" id="checkbox_'+$(this).attr("id")+'" class="mdl-switch__input">');var c=$('<span class="mdl-switch__label"></span>');var b=$('<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="checkbox_'+$(this).attr("id")+'">').append(a,c);$(this).after(b);$(this).hide();if($(this).val()=="Yes"){a.attr("checked","checked")}componentHandler.upgradeElement(b.get(0))});$("#settings").fadeIn("fast");$("form[action='/Preferences/Edit'] button.inputReplaceButton").click(function(){$("div.table-form select").each(function(){if($("#checkbox_"+$(this).attr("id")).parent().hasClass("is-checked")){$(this).val("Yes")}else{$(this).val("No")}})})})}function SetUpTimeForStudent(){if(isStudent){$("tr[id]").not("[class=future]").each(function(a){var b=$(this).children("td.time").first().text();$(this).children("td.time").last().text(b)});$("label#currentTime").text(GetAlreadyWorkedTimeForMonth_ForStudent());$("label#reportTimeForMonth").text(GetSumReportTimeForMonth_ForStudent());$("label#currentTime_week").text(GetCurrentTimeForWeek_ForStudent())}}function SetTableHeightForTime(){if(isMonth){$("table.full-size tbody").height($(window).height()-492)}else{$("table.full-size tbody").height($(window).height()-526)}}function AddTooltips_workScript(){$("i:contains('warning')").each(function(a){if($(this).attr("title")===undefined){return true}var c="i_warning_"+a;var b=$(this).attr("title");$(this).removeAttr("title");$(this).attr("id",c);ChangeTitleToMDTooltip(c,b)})}$(document).ready(function(){if(IsReportOnPage()){RemoveColumnsWhenReportIsOnPage()}else{RemoveColumnsWhenThereIsNoReport()}SeparateStartAndFinish();RemoveUnnesessaryBlocks();AddRowBetweenWeeksWithWeekNumber();WriteFullNamesOfDays();CreateSettings();ShowTableFullSizeAndHolidayBox();var a=false;$(window).resize(function(){SetTableHeightForTime()}).resize();$("table.full-size th").first().removeAttr("colspan").addClass("weekday").after("<th class='monthday number'>№</th>");CreateFlex();AddConclusionForMonth();AddTooltips_workScript();$("tr.intervalRow").click(function(){if(!isMonth){$(".intervalRow").show();$(".intervalRow.future").hide();$("tr[id]").not("[class=future]").show();$(".dayoff").show();RemoveConclusionForWeek();AddConclusionForMonth();isMonth=true;a=false;$(".buttonDiv").remove();$(window).resize();SetUpTimeForStudent();return}$(this).prevAll().each(function(){$(this).hide()});$(this).nextAll().each(function(){if($(this).attr("class")=="intervalRow"){a=true}if(a){$(this).hide()}});var c=$("<button></button>",{"class":"resetButton",type:"button"}).append("Вернуться к месяцу...");ChangeButtonsToMD.apply(c.get(0));var d=$("<div></div>",{"class":"buttonDiv"}).append("<br>",c);var b=$("<div></div>",{"class":"barrier"});RemoveConclusionForMonth();AddConclusionForWeek();isMonth=false;$(window).resize();SetUpTimeForStudent();$("table.full-size").parent().append(b,d);$(".resetButton").click(function(){if(isMonth){return}$(".intervalRow").show();$(".intervalRow.future").hide();$("tr[id]").not("[class=future]").show();$(".dayoff").show();RemoveConclusionForWeek();AddConclusionForMonth();isMonth=true;a=false;$(".buttonDiv").remove();$(window).resize();SetUpTimeForStudent()})})});