var isMonth=true;var isStudent=false;var orderOfDays=[];orderOfDays["Пн"]=1;orderOfDays["Вт"]=2;orderOfDays["Ср"]=3;orderOfDays["Чт"]=4;orderOfDays["Пт"]=5;orderOfDays["Сб"]=6;orderOfDays["Вс"]=7;function IsReportOnPage(){var a=false;$("th.time").each(function(b){if($(this).text()=="Отчет"){a=true}});return a}function RemoveColumnsWhenReportIsOnPage(){HideCellsInTableHead();HideCellsInTableBody()}function HideCellsInTableHead(){$("th.time").each(function(a){if(!(a==0||a==($("th.time").length-1))){$(this).hide();$("td.dayoff").attr("colspan",$("td.dayoff").attr("colspan")-1)}})}function HideCellsInTableBody(){var a=$("th.time").length-3;$("tbody > tr").each(function(c){var b=$(this).children("td.time").length-1;$(this).children("td.time").each(function(d){if(d!=0&&d!=b){$(this).hide()}});if($(this).hasClass("future")){$(this).children("td.time").hide();$(this).children().not("td[class]").each(function(d){if(d<a){$(this).hide()}})}})}function RemoveColumnsWhenThereIsNoReport(){HideAllCellsInTableHeadWhenNoReport();HideAllCellsInTableBodyWhenNoReport();AddReportColumn()}function HideAllCellsInTableHeadWhenNoReport(){$("th.time").each(function(a){if(a!=0){$(this).hide();$("td.dayoff").attr("colspan",$("td.dayoff").attr("colspan")-1)}})}function HideAllCellsInTableBodyWhenNoReport(){var a=$("th.time").length-2;$("tbody > tr").each(function(b){$(this).children("td.time").each(function(c){if(c!=0){$(this).hide()}});if($(this).hasClass("future")){$(this).children("td.time").hide();$(this).children().not("td[class]").each(function(c){if(c<a){$(this).hide()}})}})}function AddReportColumn(){var a=$("<th></th>",{"class":"time"}).append("Отчет");$("th.time").last().after(a);$("tr[id]").not(".future").not(".trTimeChecker").not(".other").not(".header").each(function(b){var c=DifferenceOfTime($(this).children("td.time").first().text(),"00:30");var d=$("<td></td>",{"class":"time"}).append(c);$(this).children("td.time").last().after(d)});$("td.dayoff").attr("colspan",+$("td.dayoff").attr("colspan")+1)}function CreateFlex(){var a=$("<div></div>",{"class":"flexParent"}).append($("table.full-size"));$(".mdl-layout__content").append(a)}function AddConclusionForMonth(){var o=GetAlreadyWorkedTimeForMonth();var h=GetSumReportTimeForMonth();if($("#NetTime")!==undefined){if($("#NetTime").children("option[selected]").val()=="Yes"){o=SumOfTime(o,GetTimeOfHolidays());h=SumOfTime(h,GetTimeOfHolidays())}}var c=GetCurrentTimeForCurrentDay();var j=DifferenceOfTime(GetTimeForMonthLeft(),c);var p;if(c.indexOf("-")>-1){p="notEnoughWorkTime"}else{p="enoughWorkTime"}var e=$("<label></label>",{id:"text_currentTime"}).append("Отработанное время за месяц: ");var d=$("<label></label>",{id:"currentTime"}).append(o);var r=$("<label></label>",{id:"text_thisDayLeft","class":p}).append("Остаток на текущий день: ");var q=$("<label></label>",{id:"thisDayLeft","class":p}).append(c);var g=$("<label></label>",{id:"text_timeForMonthOrWeekLeft"}).append("Остаток до конца месяца: ");var f=$("<label></label>",{id:"timeForMonthOrWeekLeft"}).append(j);var b=$("<label></label>",{id:"text_reportTimeForMonth"}).append("Норма за этот месяц: ");var a=$("<label></label>",{id:"reportTimeForMonth"}).append(h);var m=$('<span class="timeStatisticsSpan" id="span_thisDayLeft"></span>').append(r,q);var l=$('<span class="timeStatisticsSpan" id="span_timeForMonthOrWeekLeft"></span>').append(g,f);var k=$('<span class="timeStatisticsSpan" id="span_currentTime"></span>').append(e,d);var i=$('<span class="timeStatisticsSpan" id="span_reportTimeForMonth"></span>').append(b,a);var n=$("<div></div>",{"class":"conclusion month mdl-card mdl-shadow--2dp"}).append("<div><b>Статистика:</b></div>").append(m,l,"<br>",k,i);$(".flexParent").append(n);if($(".future").length==0){$("#span_timeForMonthOrWeekLeft").hide()}AddTooltipAbout30Minutes();SetConclusionHeight()}function isLastDayOfMonth(){var a=new Date();var c=new Date(a.getTime()),b=c.getMonth();c.setDate(c.getDate()+1);return c.getMonth()!==b}function AddStringWhenLunch(a){return a+'<span class="lunchTimeSpan"><br>(с учетом 30 минут обеда)</span>'}function AddStringWhenThereIsNoLunch(a){return a+'<span class="lunchTimeSpan"><br>(без учета 30 минут обеда)</span>'}function AddTooltipAbout30Minutes(){var e=AddStringWhenLunch("Время, которое осталось отработать сегодня");var f=AddStringWhenLunch("Время, которое осталось отработать до выполнения <br>нормы за месяц");var g=AddStringWhenThereIsNoLunch("Сколько времени Вы отработали <br>в этом месяце");var a=AddStringWhenThereIsNoLunch("Сколько всего времени нужно отработать в этом месяце");var d=AddStringWhenLunch("Время, которое осталось отработать до выполнения <br>нормы за неделю");var c=AddStringWhenThereIsNoLunch("Сколько времени Вы отработали <br>на этой неделе");var b=AddStringWhenThereIsNoLunch("Сколько всего времени нужно отработать на этой неделе");ChangeTitleToMDTooltip("span_thisDayLeft",e);ChangeTitleToMDTooltip("span_timeForMonthOrWeekLeft",f);ChangeTitleToMDTooltip("span_currentTime",g);ChangeTitleToMDTooltip("span_reportTimeForMonth",a);ChangeTitleToMDTooltip("span_thisDayLeft_week",e);ChangeTitleToMDTooltip("span_timeForMonthOrWeekLeft_week",d);ChangeTitleToMDTooltip("span_currentTime_week",c);ChangeTitleToMDTooltip("span_reportTimeForWeek_week",b)}function GetAlreadyWorkedTimeForMonth(){var a=$(".summary").last().children(".time").first().text();$("tr[id]").not(".future").not(".trTimeChecker").not(".other").not(".header").each(function(b){a=DifferenceOfTime(a,"00:30")});return a}function GetAlreadyWorkedTimeForMonth_ForStudent(){return $(".summary").last().children(".time").first().text()}function GetTimeOfHolidays(){var b=new Date();var e=b.getDate();var c=0;$("tr.dayoff").not("tr[id]").each(function(){if(parseInt($(this).children("td.monthday.number").text())<=parseInt(e)){c++}});var a=8*c;return a+":00"}function GetCurrentTimeForCurrentDay(){return $(".summary:contains('Итог')").not(":contains('за месяц')").last().children(".time").eq(2).text()}function GetTimeForMonthLeft(){var a="00:00";$("tr.future > td.time").each(function(b){a=SumOfTime(a,$(this).text())});return a}function GetSumReportTimeForMonth(){var a="00:00";$("tr.future > td.time").each(function(b){a=SumOfTime(a,DifferenceOfTime($(this).text(),"00:30"))});$("tr[id]").not(".future").not(".trTimeChecker").not(".other").not(".header").each(function(b){a=SumOfTime(a,DifferenceOfTime($(this).children(".time").eq(1).text(),"00:30"))});return a}function GetSumReportTimeForMonth_ForStudent(){var a="00:00";$("tr.future > td.time").each(function(b){a=SumOfTime(a,$(this).text())});$("tr[id]").not(".future").not(".trTimeChecker").not(".other").not(".header").each(function(b){a=SumOfTime(a,$(this).children(".time").eq(1).text())});return a}function RemoveConclusionForMonth(){$(".flexParent .barrier").remove();$(".conclusion.month").remove()}function AddConclusionForWeek(){var c=GetCurrentTimeForCurrentDay();var s;if(c.indexOf("-")>-1){s="notEnoughWorkTime"}else{s="enoughWorkTime"}var f=GetTimeForWeekLeft();var q=GetCurrentTimeForWeek();var j=GetSumReportTimeForWeek();if($("#NetTime")!==undefined){if($("#NetTime").children("option[selected]").val()=="Yes"){q=SumOfTime(q,GetTimeOfHolidaysForWeek());j=SumOfTime(j,GetTimeOfHolidaysForWeek())}}var u=$("<label></label>",{id:"text_thisDayLeft_week","class":s}).append("Остаток на текущий день: ");var t=$("<label></label>",{id:"thisDayLeft_week","class":s}).append(c);var h=$("<label></label>",{id:"text_timeForMonthOrWeekLeft_week"}).append("Остаток до конца недели: ");var g=$("<label></label>",{id:"timeForMonthOrWeekLeft_week"}).append(f);var e=$("<label></label>",{id:"text_currentTime_week"}).append("Отработанное время за неделю: ");var d=$("<label></label>",{id:"currentTime_week"}).append(q);var b=$("<label></label>",{id:"text_reportTimeForWeek_week"}).append("Норма за неделю: ");var a=$("<label></label>",{id:"reportTimeForWeek_week"}).append(j);var n=$('<span class="timeStatisticsSpan" id="span_thisDayLeft_week"></span>').append(u,t);var m=$('<span class="timeStatisticsSpan" id="span_timeForMonthOrWeekLeft_week"></span>').append(h,g);var l=$('<span class="timeStatisticsSpan" id="span_currentTime_week"></span>').append(e,d);var k=$('<span class="timeStatisticsSpan" id="span_reportTimeForWeek_week"></span>').append(b,a);var o=$("<div></div>",{"class":"conclusion week mdl-card mdl-shadow--2dp"}).append("<div><b>Статистика:</b></div>").append(n,m,"<br>",l,k);$(".flexParent").append(o);var r=new Date();var p=r.getMonth()+1;var i=r.getFullYear();r="?date="+p+"."+i;if($(".future").length==0&&(window.location.search==""||window.location.search==r)&&!isLastDayOfMonth()){$("#span_timeForMonthOrWeekLeft_week").hide();$("#span_reportTimeForWeek_week").hide()}AddTooltipAbout30Minutes();SetConclusionHeight()}function GetTimeForWeekLeft(){var b="00:00";var a="00:00";$("tr.intervalRow").not('[style~="display: none;"]').first().nextAll().not(".trTimeChecker").not(".other").not(".header").each(function(){if($(this).hasClass("intervalRow")){return false}if($(this).attr("id")!==undefined){if(($(this).hasClass("future"))){b=SumOfTime(b,$(this).children(".time").first().text())}else{b=SumOfTime(b,$(this).children(".time").eq(1).text());a=SumOfTime(a,$(this).children(".time").first().text())}}});return DifferenceOfTime(b,a)}function GetCurrentTimeForWeek(){var a="00:00";$("tr[id]").not(".future").not(".trTimeChecker").not(".other").not(".header").not('[style~="display: none;"]').each(function(b){a=SumOfTime(a,DifferenceOfTime($(this).children(".time").first().text(),"00:30"))});return a}function GetCurrentTimeForWeek_ForStudent(){var a="00:00";$("tr[id]").not(".future").not('[style~="display: none;"]').each(function(b){a=SumOfTime(a,$(this).children(".time").first().text())});return a}function GetTimeOfHolidaysForWeek(){var a=8*$("tr.dayoff").not("tr[id]").not('[style~="display: none;"]').length;return a+":00"}function GetSumReportTimeForWeek(){var a="00:00";$("tr.intervalRow").not('[style~="display: none;"]').first().nextUntil("tr.intervalRow").filter("tr[id]").not(".trTimeChecker").not(".other").not(".header").each(function(b){if($(this).hasClass("future")){a=SumOfTime(a,DifferenceOfTime($(this).children("td.time").text(),"00:30"))}else{a=SumOfTime(a,DifferenceOfTime($(this).children("td.time").eq(1).text(),"00:30"))}});return a}function GetSumReportTimeForWeek_ForStudent(){var a="00:00";$("tr.intervalRow").not('[style~="display: none;"]').first().nextUntil("tr.intervalRow").filter("tr[id]").not(".trTimeChecker").not(".other").not(".header").each(function(b){if($(this).hasClass("future")){a=SumOfTime(a,$(this).children("td.time").text())}else{a=SumOfTime(a,$(this).children("td.time").eq(1).text())}});return a}function RemoveConclusionForWeek(){$(".flexParent .barrier").remove();$(".conclusion.week").remove()}function SumOfTime(j,i){if(j.toString().indexOf("-")>-1&&i.toString().indexOf("-")>-1){return"-"+SumOfTime(j.substr(1),i.substr(1))}if(j.toString().indexOf("-")>-1){return DifferenceOfTime(i,j.substr(1))}if(i.toString().indexOf("-")>-1){return DifferenceOfTime(j,i.substr(1))}var c=+j.indexOf(":");var b=+i.indexOf(":");var e=+j.substr(0,c);var d=+i.substr(0,b);var g=+j.substr(c+1);var f=+i.substr(b+1);var h=+(e+d)+Math.floor((g+f)/60);var a=+(g+f)%60;return h+":"+Pad(a,2)}function Pad(a,b){var c=a+"";while(c.length<b){c="0"+c}return c}function DifferenceOfTime(k,j){if(k.toString().indexOf("-")>-1&&j.toString().indexOf("-")>-1){return DifferenceOfTime(j.substr(1),k.substr(1))}if(k.toString().indexOf("-")>-1){return"-"+SumOfTime(k.substr(1),j)}if(j.toString().indexOf("-")>-1){return SumOfTime(k,j.substr(1))}var b=+k.indexOf(":");var a=+j.indexOf(":");var d=+k.substr(0,b);var c=+j.substr(0,a);var h=+k.substr(b+1);var g=+j.substr(a+1);var f,e;if(d<c){
/*!!!!! < or <= */
}f=+(c-d)+Math.floor((g-h)/60);e=+(g-h);if(g<h){e+=60}if(f.toString().indexOf("-")>-1){f=f.toString().substr(1)}else{if(!(f==0&&e==0)){f="-"+f}}if(d>=c){if(d>c){f=+(d-c)+Math.floor((h-g)/60);e=+(h-g);if(h<g){e+=60}}else{if(h>=g){f="00";e=+(h-g)}else{f="-0";e=+(g-h)}}}var i=f+":"+Pad(e,2);return i}function SeparateStartAndFinish(){var a=$("<th></th>",{"class":"text range"}).append("Окончание");$("th.text.range").text("Начало").after(a);var d,b="timeOfLeavingSpan";$("td.range.text").each(function(){var f="",k="",g,e="",j="";var l="",m;$(this).children("span").each(function(){m=$(this);l=m.text();if(l==" ... "){d=m.attr("title");k+="<span id='"+b+"'>...</span><br>"}else{g=l.indexOf("—");if(g>-1){e=l.substr(0,g);j=l.substr(g+1);f+=e+"<br>";if(j!=""){k+=j+"<br>"}}else{m.parent().nextAll("td.note.text").first().append(m)}}});var i=$("<td></td>",{"class":"range text"}).append(k);if($(this).children("span").hasClass("remote")){var h=$("<span></span>",{"class":"remote"}).append(i.html());i.empty().append(h);f=$("<span></span>",{"class":"remote"}).append(f)}$(this).empty().append(f).after(i);if($(this).text()==""){AddWarningForEmptyTime.apply($(this).get(0),["прихода"])}if($(this).next().text()==""){AddWarningForEmptyTime.apply($(this).next().get(0),["ухода"])}});var c=($("td.dayoff").attr("colspan"));$("td.dayoff").attr("colspan",++c);$("td.text[colspan]").each(function(e){c=$(this).attr("colspan");$(this).attr("colspan",++c)});$("tr.future").each(function(e){var f=$("<td></td>");$(this).append(f)});ChangeTitleToMDTooltip(b,d);$("table.full-size td.note.text span.hidden-text").each(function(e){var f="spaninfo"+e;$(this).attr("id",f);ChangeTitleToMDTooltip(f,$(this).attr("title"));$(this).removeAttr("title")})}function AddWarningForEmptyTime(a){$(this).append('<i class="material-icons" style="color: gray;" title="Не зарегистрировано <br> время '+a+'">warning</i>')}function RemoveUnnesessaryBlocks(){$(".future").hide();$(".summary").hide()}function AddRowBetweenWeeksWithWeekNumber(){var c=+$("th").not('[style~="display: none;"]').length+1;AddFirstRowBetweenWeeks(c);var a=2;var b=$("tr[id], tr.dayoff").not(".trTimeChecker").not(".other").not(".header").first();$("tr[id], tr.dayoff").not(".trTimeChecker").not(".other").not(".header").each(function(e){if(!$(this).prev().hasClass("intervalRow")){if(orderOfDays[$(this).children().first().text()]<=orderOfDays[b.children().first().text()]){titleOfWeek=a+"-я неделя.";var d=$("<td></td>",{"class":"intervalCell",colspan:c}).append(titleOfWeek);a++;var f=$("<tr></tr>",{"class":"intervalRow"}).append(d);$(this).before(f);if($(this).hasClass("future")){f.addClass("future");f.hide()}}}b=$(this)});DivideDayoffIntoParts()}function AddFirstRowBetweenWeeks(b){var a=$("<td></td>",{"class":"intervalCell",colspan:b}).append("1-я неделя.");var c=$("<tr></tr>",{"class":"intervalRow"}).append(a);$("tbody").prepend(c)}function DivideDayoffIntoParts(){$("tr.intervalRow").each(function(a){if($(this).prev().hasClass("dayoff")&&$(this).next().hasClass("dayoff")&&$(this).next().children("td.dayoff").length==0&&$(this).next().children("td.time").length==0){var c=$(this).prevUntil(".intervalRow").filter("tr.dayoff");var d=$("td.dayoff").first().clone();for(var b=0;b<c.length;b++){if($(c[b]).children("td.dayoff").length>0){d=$(c[b]).children("td.dayoff").first().clone();break}}$(this).next().append(d)}});$("td.dayoff").attr("colspan","5").each(function(a){var b=1;$(this).parent().nextUntil(".intervalRow").filter("tr.dayoff").each(function(c){if($(this).children("td.dayoff").length!=0||$(this).children("td.time").length!=0){return false}b++});$(this).attr("rowspan",b)})}function WriteFullNamesOfDays(){$("td.weekday").each(function(a){switch($(this).text()){case"Пн":$(this).text("Понедельник");break;case"Вт":$(this).text("Вторник");break;case"Ср":$(this).text("Среда");break;case"Чт":$(this).text("Четверг");break;case"Пт":$(this).text("Пятница");break;case"Сб":$(this).text("Суббота");break;case"Вс":$(this).text("Воскресенье");break;default:break}})}function CreateSettings(){$("div.mdl-layout__drawer").append($("<div id=settings></div>"));$("#settings").load("http://co-msk-app02/Preferences/Edit form",function(){$("#settings").hide();$("div.table-form").eq(0).remove();$("#settings").prepend("<br><label><b>Настройки:</b></label><br><br>");$("#ReturnTo").val("/Personal"+window.location.search);$("#settings a").hide();$("#settings label").removeAttr("for");$("#settings label").after("<br>");$("div.table-form").last().next().css({paddingTop:"2em"});$("div.table-form").eq(0).children("label").text('Округлять "отчетное" время');$("div.table-form").eq(1).children("label").text("Учитывать отпуск в отработанном времени за месяц");$("div.table-form").eq(2).children("label").text("Я студент");$("div.table-form").eq(4).children("label").text("Cчитать остаток и норму до конца месяца/недели");$("div.table-form").eq(3).hide();var a=new Date();var b=a.getMonth()+1;var c=a.getFullYear();a="?date="+b+"."+c;if(!(window.location.search==""||window.location.search==a)||((window.location.search==""||window.location.search==a)&&$(".future").length==0&&$("div.table-form").eq(4).children("select").first().children("option[selected]").val()=="Yes")){$("div.table-form").eq(4).hide()}if($("div.table-form").eq(1).children("select").first().children("option[selected]").val()=="Yes"){$("#currentTime").text(SumOfTime(GetAlreadyWorkedTimeForMonth(),GetTimeOfHolidays()));$("#currentTime_week").text(SumOfTime(GetCurrentTimeForWeek(),GetTimeOfHolidaysForWeek()));$("#reportTimeForMonth").text(SumOfTime(GetSumReportTimeForMonth(),GetTimeOfHolidays()));$("#reportTimeForWeek_week").text(SumOfTime(GetSumReportTimeForWeek(),GetTimeOfHolidaysForWeek()))}else{$("#currentTime").text(GetAlreadyWorkedTimeForMonth());$("#currentTime_week").text(GetCurrentTimeForWeek())}if($("div.table-form").eq(2).children("select").first().children("option[selected]").val()=="Yes"){isStudent=true;SetUpTimeForStudent()}ReplaceInput.apply($("form[action='/Preferences/Edit'] input[type=submit]").get(0));ChangeButtonsToMD.apply($("form[action='/Preferences/Edit'] button.inputReplaceButton").get(0));$("form[action='/Preferences/Edit'] button.inputReplaceButton").parent().css("width","0px");$("div.table-form select").each(function(){var d=$('<input type="checkbox" id="checkbox_'+$(this).attr("id")+'" class="mdl-switch__input">');var f=$('<span class="mdl-switch__label"></span>');var e=$('<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="checkbox_'+$(this).attr("id")+'">').append(d,f);$(this).after(e);$(this).hide();if($(this).val()=="Yes"){d.attr("checked","checked")}componentHandler.upgradeElement(e.get(0))});$("#settings").fadeIn("fast");$("form[action='/Preferences/Edit'] button.inputReplaceButton").click(function(){$("div.table-form select").each(function(){if($("#checkbox_"+$(this).attr("id")).parent().hasClass("is-checked")){$(this).val("Yes")}else{$(this).val("No")}})})})}function SetUpTimeForStudent(){if(isStudent){$("tr[id]").not(".future").not(".trTimeChecker").not(".other").not(".header").each(function(a){var b=$(this).children("td.time").first().text();$(this).children("td.time").last().empty().text(b)});$("label#currentTime").text(GetAlreadyWorkedTimeForMonth_ForStudent());$("label#reportTimeForMonth").text(GetSumReportTimeForMonth_ForStudent());$("label#currentTime_week").text(GetCurrentTimeForWeek_ForStudent());$("label#reportTimeForWeek_week").text(GetSumReportTimeForWeek_ForStudent());AddSpansForDifferentTypesOfTime();$(".conclusion div.mdl-tooltip span.lunchTimeSpan").remove()}}function SetTableHeightForTime(){var b=$("table.full-size tbody");var a=$(window).height()-$("header.mdl-layout__header").outerHeight(true)-$("main.mdl-layout__content.content-wide span.mdl-layout-title").outerHeight(true)-$("table.full-size thead").outerHeight(true)-50;if(b.parent().outerWidth(true)+$("div.conclusion").outerWidth(true)>$("div.flexParent").width()){a=a-$("div.conclusion").outerHeight(true)-45}if(!isMonth){a=a-$("div.buttonDiv").outerHeight(true)}b.outerHeight(a);if(b.get(0).scrollHeight<=b.get(0).clientHeight){b.css("height","auto")}}function SetConclusionHeight(){var a=20*($("div.conclusion span.timeStatisticsSpan").not('[style~="display: none;"]').length+2);$("div.conclusion").height(a)}function AddTooltips_workScript(){$("i:contains('warning')").each(function(a){if($(this).attr("title")===undefined){return true}var c="i_warning_"+a;var b=$(this).attr("title");$(this).removeAttr("title");$(this).attr("id",c);ChangeTitleToMDTooltip(c,b)})}function AddButtonToShowTimeInDecimals(){var d="timeChangeToDecimalButton";var c="Показвать время<br>в дробях";var a=$('<button id="'+d+'" class="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect"><i class="material-icons">alarm</i></button>');$('th.time:contains("Отчет")').append(a);componentHandler.upgradeElement(a.get(0));var b=$('<div class="mdl-tooltip" for="'+d+'">'+c+"</div>");$("#"+d).after(b);componentHandler.upgradeElement(b.get(0))}function AddSpansForDifferentTypesOfTime(){$("table.full-size tbody tr[id]").not("tr.future").not(".trTimeChecker").not(".other").not(".header").each(function(){var g=$(this).children("td.time").last().text();var e=$("<span></span>",{"class":"usualTime"}).append(g);var a=+g.indexOf(":");var b=+g.substr(0,a);var d=+g.substr(a+1);var h=+(+d/60).toFixed(2);var f=+b+h;var c=$("<span></span>",{"class":"decimalTime"}).append(f);$(this).children("td.time").last().empty().append(e,c);if($("#timeChangeToDecimalButton").hasClass("mdl-button--accent")){TurnOnDecimals()}else{TurnOffDecimals()}})}function TurnOnDecimals(){$("span.usualTime").hide();$("span.decimalTime").show()}function TurnOffDecimals(){$("span.usualTime").show();$("span.decimalTime").hide()}$(document).ready(function(){if(IsReportOnPage()){RemoveColumnsWhenReportIsOnPage()}else{RemoveColumnsWhenThereIsNoReport()}SeparateStartAndFinish();RemoveUnnesessaryBlocks();AddRowBetweenWeeksWithWeekNumber();WriteFullNamesOfDays();CreateSettings();ShowTableFullSizeAndHolidayBox();var a=false;$("table.full-size th").first().removeAttr("colspan").addClass("weekday").after("<th class='monthday number'>№</th>");CreateFlex();AddConclusionForMonth();AddTooltips_workScript();AddButtonToShowTimeInDecimals();AddSpansForDifferentTypesOfTime();$(window).resize(function(){SetTableHeightForTime()}).resize();$("#timeChangeToDecimalButton").click(function(){if($(this).hasClass("mdl-button--accent")){$(this).removeClass("mdl-button--accent");$("div.mdl-tooltip[for=timeChangeToDecimalButton]").html("Показвать время<br>в дробях");TurnOffDecimals()}else{$(this).addClass("mdl-button--accent");$("div.mdl-tooltip[for=timeChangeToDecimalButton]").html("Показвать время<br>в часах/минутах");TurnOnDecimals()}});$("tr.intervalRow").click(function(){if(!isMonth){$(".intervalRow").show();$("tr[id]").not(".trTimeChecker").not(".other").not(".header").show();$(".dayoff").show();$(".future").hide();RemoveConclusionForWeek();AddConclusionForMonth();isMonth=true;a=false;$(".buttonDiv").remove();$(window).resize();SetUpTimeForStudent();SetTableHeightForTime();return}$(this).prevAll().each(function(){$(this).hide()});$(this).nextAll().each(function(){if($(this).hasClass("intervalRow")){a=true}if(a){$(this).hide()}});var c=$("<button></button>",{"class":"resetButton",type:"button"}).append("Вернуться к месяцу...");ChangeButtonsToMD.apply(c.get(0));var d=$("<div></div>",{"class":"buttonDiv"}).append("<br>",c);var b=$("<div></div>",{"class":"barrier"});RemoveConclusionForMonth();AddConclusionForWeek();isMonth=false;$(window).resize();SetUpTimeForStudent();$("table.full-size").parent().append(b,d);SetTableHeightForTime();$(".resetButton").click(function(){if(isMonth){SetTableHeightForTime();return}$(".intervalRow").show();$("tr[id]").not(".trTimeChecker").not(".other").not(".header").show();$(".dayoff").show();$(".future").hide();RemoveConclusionForWeek();AddConclusionForMonth();isMonth=true;a=false;$(".buttonDiv").remove();$(window).resize();SetUpTimeForStudent();SetTableHeightForTime()})})});