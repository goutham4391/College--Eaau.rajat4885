'use strict';

(function ($) {
    var lastIndexNews = 0;
    var lastIndexEvents = 0;
    var spinner = '<div class="spinner">\<div class="double-bounce1"></div><div class="double-bounce2"></div></div>';

    $(function () {
        search.init();
        newsLandingPage.init();
        courseLandingPage.init();
        eventsLandingPage.init();
        searchLandingPage.init();
        applicationFormPage.init();
    });

    //News Landing Page scripts
    var newsLandingPage = (function () {
        var _init = function () {
            if ($(".news-data").length == 0) return;

            //Page Events
            $(document).on("keyup", "#keyword", function () {
                _getNewsData(true);
            })

            $(document).on("change", "#Month", function () {
                _getNewsData(true);
            })

            $(document).on("change", "#Year", function () {
                _getNewsData(true);
            })

            $(document).on("click", ".showmorebutton", function () {
                _getNewsData(false);
            })
            //Page Events

            //Init function
            setTimeout(function () {
                _getNewsData(true);
            }, 500)
        }
        // Getting JSON

        var _getNewsData = function (refresh) {
            var newstemplate = document.getElementById('news-template');
            if (!newstemplate) return; //Check if handlebar template exist

            var source = $("#news-template").html();
            var template = Handlebars.compile(source);

            //Build request URL
            var search = $('#keyword').val();
            var month = $('#Month').val();
            var year = $('#Year').val();
            var numberOfDisplay = $('#news-section').attr("data-numberofdisplay");
            if (refresh) lastIndexNews = 0; //reset index if refreshed
            var url = "/umbraco/api/news/GetNews?search=" + search + "&month=" + month + "&year=" + year + "&lastIndex=" + lastIndexNews + "&refresh=" + refresh + "&numberOfDisplay=" + numberOfDisplay + "&languageCode=" + languageCode;

            //Ajax request
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: url,
                async: true,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    var tabdata = { tabdata: data.DataList };
                    var html = template(tabdata);
                    if (refresh) $(".news-data").empty(); //Empty container if refreshed
                    $(".news-data").append(html);

                    //Show no content text
                    if (!data.DataList || data.DataList.length < 1) {
                        $(".nocontent").show();
                    }
                    else {
                        $(".nocontent").hide();
                        lastIndexNews = data.DataList[data.DataList.length - 1].index;
                    }

                    //Show load more
                    if (!data.LoadMore) {
                        $(".showmorebutton").hide();
                    }
                    else {
                        $(".showmorebutton").show();
                    }
                }
            });

        }

        return {
            init: _init,
            getNewsData: _getNewsData,
        }
    }());

    //Course Landing Page scripts
    var courseLandingPage = (function () {
        var noKeyPress = true;
        var pageLoad = false;
        var _init = function () {
            if ($(".course-data").length == 0) return;

            //Page Events
            $(document).on("keyup", "#keyword", function () {
                noKeyPress = false;
                _getData(true);
            })

            $(document).on("blur", "#keyword", function () {
                noKeyPress = true;
                _getData(true);
            })

            $(document).on("change", "#CourseType", function () {
                var val = $(this).val();
                var field = $('#Field');
                if (val == 'professionaltraining' || val == 'pilottrainingprogramme' || val == 'thepostgraduatecenter')
                {
                    field.val('');
                    field.hide();
                }
                else {
                    field.show();
                }
                $(".course-data").empty();
                if (val == '') {
                    _getData(true);
                } else {
                    _getData(false);
                }
            })

            $(document).on("change", "#Field", function () {
                $(".course-data").empty();
                _getData(false);
            })

            $(document).on("click", ".showmorebutton", function () {
                pageLoad = true;
                $(".course-data").empty();
                _getData(false);
            })
            //Page Events

            //Init function
            setTimeout(function () {
                pageLoad = true;
                _getData(true);
            }, 500)
        }
        // Getting JSON

        var _getData = function (refresh) {
            var coursetemplate = document.getElementById('course-template');
            if (!coursetemplate) return; //Check if handlebar template exist

            var source = $("#course-template").html();
            var template = Handlebars.compile(source);

            //Build request URL
            var courseNodeId = $('#CourseType option:selected').data('course-node-id');
            var search = $('#keyword').val();
            var courseType = $('#CourseType').val();
            var dataCourseType = $('#CourseType option:selected').text();
            var field = $('#Field').val();
            var numberOfDisplay = $('#course-section').attr("data-numberofdisplay");
            if (refresh) lastIndexNews = 0; //reset index if refreshed
            var url = "/umbraco/api/course/GetCourse?search=" + search + "&courseType=" + courseType + "&field=" + field + "&lastIndex=0" + "&refresh=" + refresh + "&numberOfDisplay=" + numberOfDisplay + "&languageCode=" + languageCode +"&courseNodeId="+courseNodeId;

            //Ajax request
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: url,
                async: true,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (pageLoad) {
                        if (data.DataList.length > 0) {
                            pageLoad = false;
                            ProductImpressionDataLayerPush(data.DataLayerList, dataCourseType)
                        }
                    } else {
                        if (data.DataList.length > 0 && noKeyPress) {
                            CourseSearchDataLayerPush('Success', search, dataCourseType, field);
                        } else if (noKeyPress) {
                            CourseSearchDataLayerPush('Fail', search, dataCourseType, field);
                        }
                    }
                    var tabdata = { tabdata: data.DataList };
                    var html = template(tabdata);
                    if (refresh) $(".course-data").empty(); //Empty container if refreshed
                    $(".course-data").append(html);

                    //Show no content text
                    if (!data.DataList || data.DataList.length < 1) {
                        $(".nocontent").show();
                    }
                    else {
                        $(".nocontent").hide();
                        lastIndexNews = data.DataList[data.DataList.length - 1].DegreeSortOrder;
                    }

                    //Show load more
                    if (!data.LoadMore) {
                        $(".showmorebutton").hide();
                    }
                    else {
                        $(".showmorebutton").show();
                    }

                    $(".dotdotdot").dotdotdot({
                        ellipsis : '... '
                    });

                    //appending the availble schools fro Field drop down based on the course selection
                    if (data.AvailableSchools !== null && data.AvailableSchools.length > 0) {
                        $("#Field").empty();
                        $("#Field").append('<option value >' + $("#hiddenSchoolDefaultOption").val()+'</option>');

                        for (var i = 0; i < data.AvailableSchools.length; i++) {

                            if (data.AvailableSchools[i].Selected) {
                                $("#Field").append('<option selected="selected"  value="' + data.AvailableSchools[i].Value + '">' + data.AvailableSchools[i].Text + '</option>');
                            }
                            else {
                                $("#Field").append('<option  value="' + data.AvailableSchools[i].Value + '">' + data.AvailableSchools[i].Text + '</option>');
                            }
                        }
                    }
                    else {
                        $("#Field").empty();
                        $("#Field").append('<option value >' + $("#hiddenSchoolDefaultOption").val() + '</option>');
                    }

                    if (data.CourseDropdownList !== null && data.CourseDropdownList.length > 0) {
                        $("#CourseType").empty();
                        $("#CourseType").append('<option value >' + $("#hiddencourseDefaultOption").val() + '</option>');
                        for (var i = 0; i < data.CourseDropdownList.length; i++) {

                            if (data.CourseDropdownList[i].Selected) {
                                $("#CourseType").append('<option data-course-node-id="' + data.CourseDropdownList[i].NodeId + '" selected="selected"  value="' + data.CourseDropdownList[i].Value + '">' + data.CourseDropdownList[i].Text + '</option>');
                            }
                            else {
                                $("#CourseType").append('<option data-course-node-id="' + data.CourseDropdownList[i].NodeId + '" value="' + data.CourseDropdownList[i].Value + '">' + data.CourseDropdownList[i].Text + '</option>');
                            }
                        }
                    }

                    if (courseType == 'professionaltraining' || courseType == 'pilottrainingprogramme' || courseType == 'thepostgraduatecenter') {
                        $("#Field").val('');
                        $("#Field").hide();
                    }
                }
            });

        }

        return {
            init: _init,
            getData: _getData,
        }
    }());

    var eventsLandingPage = (function () {
        //console.log("works");
        // For loading
        var _init = function () {
            if ($(".event-data").length == 0) return;


            $(document).on("change", "#Month", function () {
                _getEventData(true);
            })

            $(document).on("change", "#Year", function () {
                _getEventData(true);
            })

            $(document).on("click", ".showmorebutton", function () {
                _getEventData(false);
            })



            //Init function
            setTimeout(function () {
                _getEventData(true);
            }, 500)
        }
        // Getting JSON

        var _getEventData = function (refresh) {
            $(".event-data").append(spinner);
            var newstemplate = document.getElementById('event-template');
            if (!newstemplate) return; //Check if handlebar template exist

            var source = $("#event-template").html();
            var template = Handlebars.compile(source);

            //Build request URL
            var month = $('#Month').val();
            var year = $('#Year').val();
            var numberOfDisplay = $('#event-section').attr("data-numberofdisplay");
            if (refresh) lastIndexEvents = 0; //reset index if refreshed
            var url = "/umbraco/api/events/GetEvents?month=" + month + "&year=" + year + "&lastIndex=" + lastIndexEvents + "&refresh=" + refresh + "&numberOfDisplay=" + numberOfDisplay + "&languageCode=" + languageCode;

            //Ajax request
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: url,
                async: true,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    var tabdata = { tabdata: data.DataList };
                    var html = template(tabdata);
                    if (refresh) $(".event-data").empty(); //Empty container if refreshed
                    $(".event-data").find(".spinner").remove();
                    $(".event-data").append(html);

                    //Show no content text
                    if (!data.DataList) {
                        $(".nocontent").show();
                    }
                    else {
                        $(".nocontent").hide();
                        lastIndexEvents = data.DataList[data.DataList.length - 1].index; 
                    }

                    //Show load more
                    if (!data.LoadMore) {
                        $(".showmorebutton").hide();
                    }
                    else {
                        $(".showmorebutton").show();
                    }

                    _svg();
                    initDotDotDot();
                }
            });

        }


        var _svg = function () {
            $("img.svg").each(function () {
                //console.log("1");
                var $img = $(this);
                var imgID = $img.attr('id');
                var imgClass = $img.attr('class');
                var imgURL = $img.attr('src');
                $.get(imgURL, function (data) {
                    // Get the SVG tag, ignore the rest
                    var $svg = $(data).find('svg');
                    // Add replaced image's ID to the new SVG
                    if (typeof imgID !== 'undefined') {
                        $svg = $svg.attr('id', imgID);
                    }
                    // Add replaced image's classes to the new SVG
                    if (typeof imgClass !== 'undefined') {
                        $svg = $svg.attr('class', imgClass + ' replaced-svg');
                    }
                    // Remove any invalid XML tags as per http://validator.w3.org
                    $svg = $svg.removeAttr('xmlns:a');
                    // Replace image with new SVG
                    $img.replaceWith($svg);
                }, 'xml');
            });
        }

        return {
            init: _init,
            getEventData: _getEventData,
            svg: function () {
                _svg();
            }
        }
    }());

	//Search Landing Page scripts
    var searchLandingPage = (function () {
        var _init = function () {
            if ($(".search-data").length == 0) return;
            
            //Page Events
            $(document).on("click", ".search-bttn", function () {
                removeParam("search");
                var search = $('#search').val();
                addQSParm('search', search)
                _getData(true);
            })

            $(document).on("keypress", "#search", function (e) {
                if (e.which == 13) {
                    removeParam("search");
                    var search = $('#search').val();
                    addQSParm('search', search)
                    _getData(true);
                }
            });

            $(document).on("click", ".showmorebutton", function () {
                _getData(false);
            })
            //Page Events

            //Init function
            setTimeout(function () {
                var search = getUrlVars()["search"];
                $('#search').val(unescape(search));
                _getData(true);
            }, 500)
        }
        // Getting JSON

        var _getData = function (refresh) {
            var newstemplate = document.getElementById('search-template');
            if (!newstemplate) return; //Check if handlebar template exist

            var source = $("#search-template").html();
            var template = Handlebars.compile(source);

            //Build request URL
            var search = $('#search').val();
            var numberOfDisplay = $('#search-section').attr("data-numberofdisplay");
            if (refresh) lastIndexNews = 0; //reset index if refreshed
            var url = "/umbraco/api/search/GetSearch?search=" + search + "&lastIndex=" + lastIndexNews + "&refresh=" + refresh + "&numberOfDisplay=" + numberOfDisplay + "&languageCode=" + languageCode;

            //Ajax request
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: url,
                async: true,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.ResultCount > 0) {
                        SiteSearchDataLayerPush('Success', search);
                    } else {
                        SiteSearchDataLayerPush('Fail', search);
                    }
                    var tabdata = { tabdata: data.DataList };
                    var html = template(tabdata);
                    if (refresh) $(".search-data").empty(); //Empty container if refreshed
                    $(".search-data").append(html);

                    //Show no content text
                    if (!data.DataList || data.DataList.length < 1) {
                        $(".nocontent").show();
                    }
                    else {
                        $(".nocontent").hide();
                        lastIndexNews = data.DataList[data.DataList.length - 1].index;
                    }

                    //Show load more
                    if (!data.LoadMore) {
                        $(".showmorebutton").hide();
                    }
                    else {
                        $(".showmorebutton").show();
                    }
                }
            });

        }

        return {
            init: _init,
            getData: _getData,
        }
    }());

    //Application Form Page scripts
    var applicationFormPage = (function () {
        
        var _init = function () {

            if (typeof priceMatrix == 'undefined') return;
            
            var matrix = JSON.parse(priceMatrix) //Parse price matrix
            var matrixFields = matrix.Fields;

            if (matrixFields.length < 1) return;
            if (matrixFields[0] == null) return;

            var matrixPrices = matrix.Prices;
            var matrixMultiplier = matrix.Multiplier;
            var matrixVAT = matrix.VAT;
            var currencyCode = 'AED';
            if (matrix.CurrencyCode && matrix.CurrencyCode != '')
            {
                currencyCode = matrix.CurrencyCode;
            }

            // Check if there is currency field
            // If there is, get the currency from this field
            // And include it to the price refresh event
            var $currencyElement = $("div.contourField.currency"); 
            if ($currencyElement) {
                var $radioCurrency = $currencyElement.find("input:radio:checked");
                if ($radioCurrency) {
                    currencyCode = $radioCurrency.val();
                }

                $(document).on("click", ".currency .radiobuttonlist input", function () {
                    var $this = $(this);
                    currencyCode = $this.val();
                    CalculatePrice();
                });
            }


            //Add the price span. UI container of the price
            if (matrixVAT && matrixVAT != '') {
                var $priceElement = $('<div id="price" class="priceelement"><span class=pricelabel>Price: </span>' + currencyCode + " 0" + '</div><div id="vat" class="priceelement"><span class=pricelabel>VAT: </span>' + currencyCode + " 0" + '</div><div id="totalAmount" class="priceelement"><span class=pricelabel>Total: </span>' + currencyCode + " 0" + '</div>');
                $priceElement.insertBefore($('.contourNavigation'));
            }
            else {
                var $priceElement = $('<div id="price" class="priceelement"><span class=pricelabel>Price: </span>' + currencyCode + " 0" + '</div>');
                $priceElement.insertBefore($('.contourNavigation'));
            }

            //price field events
            //This are the fields that will refresh the span#price when an event has been trigerred
            $.each(matrixFields, function (key, value) {
                if (value != null) {
                    var field = value.toLowerCase();
                    if ($("div.contourField." + field)) {
                        var classVal = $("div.contourField." + field).attr("class");
                        var classArr = classVal.split(" ");
                        if (classArr.length > 2) {
                            var fieldType = classArr[2];
                            switch (fieldType) {
                                case 'fieldtyperadiobutton':
                                case 'singlechoice':
                                    $(document).on("click", "." + field + " .radiobuttonlist input" + ",." + field + " .radio-inline input", function () {
                                        CalculatePrice();
                                    });
                                    break;
                                case 'fieldtypetextstring':
                                    $(document).on("keyup", "." + field + " div input", function () {
                                        CalculatePrice();
                                    });
                                    break;
                                default:
                            }

                        }
                    }
                }
            });

            //Calculate the price
            function CalculatePrice()
            { 
                var coursePrice = 0; 

                //loop through the price fields
                $.each(matrixFields, function (key, value) {
                    if (value != null) {
                        var field = value.toLowerCase();

                        if ($("div.contourField." + field)) {
                            var $contourField = $("div.contourField." + field); //get the div of the field

                            //get the value of the field
                            var fieldVal = '';
                            $($contourField).find('input:text, select, input:radio:checked, input:checkbox:selected')
                                .each(function () {
                                    fieldVal = $(this).val();
                                });

                            if (!fieldVal || fieldVal == '') { return; } //skip there is no val

                            if (matrixMultiplier.indexOf(value) >= 0) { //If its a multiplies, disregard fieldValue in the query
                                if (isInt(fieldVal) || isFloat(fieldVal)) {
                                    //Get the price from the price matrix
                                    var fieldPrice = $.grep(matrixPrices, function (p) { return p.field == value && p.currency == currencyCode; })
                                        .map(function (p) { return p; });

                                    if (fieldPrice[0]) {
                                        var valPrice = fieldPrice[0];
                                        var multipliedTotal = parseFloat(valPrice.price) * parseFloat(fieldVal);
                                        coursePrice += multipliedTotal;
                                    }
                                }

                            }
                            else { // include fieldValue in the query
                                //Get the price from the price matrix
                                var fieldPrice = $.grep(matrixPrices, function (p) { return p.field == value && p.value == fieldVal && p.currency == currencyCode; })
                                    .map(function (p) { return p; });

                                if (fieldPrice[0]) {
                                    var valPrice = fieldPrice[0];
                                    coursePrice += parseFloat(valPrice.price);
                                }
                            }

                        }
                    }
                });

                //Update price labels in the UI
                $('#price').html("<span class=pricelabel>Price: </span>" + currencyCode + ' ' + coursePrice);
                if (matrixVAT && matrixVAT != '') {
                    var amountVAT = coursePrice * (parseFloat(matrixVAT) * 0.01);
                    var amountTotal = coursePrice + amountVAT;
                    $('#vat').html("<span class=pricelabel>VAT: </span>" + currencyCode + ' ' + amountVAT);
                    $('#totalAmount').html("<span class=pricelabel>Total: </span>" + currencyCode + ' ' + amountTotal);
                        
                }
                
            }

            //Initial calculate price
            CalculatePrice();

            //initialize custom field conditions
            //applicationFormPage.customFieldCondition();
            
            //Reset price if morepages is No
            var $morepagesElement = $("div.contourField.morepages");
            if ($morepagesElement) {
                $(document).on("click", ".morepages .radiobuttonlist input", function () {
                    var $this = $(this);
                    var morepages = $this.val();
                    if (morepages == 'No') {
                        $(".extrapages div input").val('');
                        CalculatePrice();
                    }
                });
            }
        }

        

        return {
            init: _init,
        }

    }());



    ///Search functionality used in the header
    var search = (function () {
        var _init = function () {
            if ($(".search__form").length == 0) return;

            var searchURL = $('.search').attr('data-searchurl'); //Get the redirect url 

            //Page Events
            $(document).on('click', '.btn--search', function () {
                var search = $('#search-input').val();//Get the search input
                if (search && search != '' && searchURL && searchURL != '') {
                    window.location = searchURL + "?search=" + search;
                }
            })

            $(document).on("keypress", "#search-input", function (e) {
                if (e.which == 13) {
                    var search = $('#search-input').val();//Get the search input
                    if (search && search != '' && searchURL && searchURL != '') {
                        window.location = searchURL + "?search=" + search;
                    }
                }
            });
            //Page Events
        }
        return {
            init: _init
        }
    }());
})(jQuery);

// To get URL with Parameter
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function (m, key, value) {
            vars[key] = value;
        });
    return vars;
}

// To Add Parameter and update URL without Refreshing
function addQSParm(name, value) {
    var myUrl = window.location.href;


    var re = new RegExp("([?&]" + name + "=)[^&]+", "");

    function add(sep) {
        myUrl += sep + name + "=" + encodeURIComponent(value);
    }

    function change() {
        myUrl = myUrl.replace(re, "$1" + encodeURIComponent(value));
    }
    if (myUrl.indexOf("?") === -1) {
        add("?");
    } else {
        if (re.test(myUrl)) {
            change();
        } else {
            add("&");
        }
    }

    window.history.pushState("", "", myUrl);

}

// To REMOVE Parameter and update URL without Refreshing
function removeParam(key, sourceURL) {
    var sourceURL = window.location.href;
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }

    window.history.pushState("", "", rtn);
    return rtn;
}

//Returns true if parameter is int
function isInt(n) {
    return n != "" && !isNaN(n) && Math.round(n) == n;
}
//Returns true if parameter is float
function isFloat(n) {
    return n != "" && !isNaN(n) && Math.round(n) != n;
}
