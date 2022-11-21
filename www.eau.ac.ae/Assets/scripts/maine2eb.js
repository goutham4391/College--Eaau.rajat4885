'use strict';

// global Variables
var mobileWidth = 767;
var tabletWidth = 991;
var winWidth = $(window).width();
var languageCode = $('body').attr("data-lang");

/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-touchevents-setclasses !*/
!function (e, n, t) { function o(e, n) { return typeof e === n } function s() { var e, n, t, s, a, i, r; for (var l in c) if (c.hasOwnProperty(l)) { if (e = [], n = c[l], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (t = 0; t < n.options.aliases.length; t++)e.push(n.options.aliases[t].toLowerCase()); for (s = o(n.fn, "function") ? n.fn() : n.fn, a = 0; a < e.length; a++)i = e[a], r = i.split("."), 1 === r.length ? Modernizr[r[0]] = s : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = s), f.push((s ? "" : "no-") + r.join("-")) } } function a(e) { var n = u.className, t = Modernizr._config.classPrefix || ""; if (p && (n = n.baseVal), Modernizr._config.enableJSClass) { var o = new RegExp("(^|\\s)" + t + "no-js(\\s|$)"); n = n.replace(o, "$1" + t + "js$2") } Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), p ? u.className.baseVal = n : u.className = n) } function i() { return "function" != typeof n.createElement ? n.createElement(arguments[0]) : p ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments) } function r() { var e = n.body; return e || (e = i(p ? "svg" : "body"), e.fake = !0), e } function l(e, t, o, s) { var a, l, f, c, d = "modernizr", p = i("div"), h = r(); if (parseInt(o, 10)) for (; o--;)f = i("div"), f.id = s ? s[o] : d + (o + 1), p.appendChild(f); return a = i("style"), a.type = "text/css", a.id = "s" + d, (h.fake ? h : p).appendChild(a), h.appendChild(p), a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(n.createTextNode(e)), p.id = d, h.fake && (h.style.background = "", h.style.overflow = "hidden", c = u.style.overflow, u.style.overflow = "hidden", u.appendChild(h)), l = t(p, e), h.fake ? (h.parentNode.removeChild(h), u.style.overflow = c, u.offsetHeight) : p.parentNode.removeChild(p), !!l } var f = [], c = [], d = { _version: "3.5.0", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function (e, n) { var t = this; setTimeout(function () { n(t[e]) }, 0) }, addTest: function (e, n, t) { c.push({ name: e, fn: n, options: t }) }, addAsyncTest: function (e) { c.push({ name: null, fn: e }) } }, Modernizr = function () { }; Modernizr.prototype = d, Modernizr = new Modernizr; var u = n.documentElement, p = "svg" === u.nodeName.toLowerCase(), h = d._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""]; d._prefixes = h; var m = d.testStyles = l; Modernizr.addTest("touchevents", function () { var t; if ("ontouchstart" in e || e.DocumentTouch && n instanceof DocumentTouch) t = !0; else { var o = ["@media (", h.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join(""); m(o, function (e) { t = 9 === e.offsetTop }) } return t }), s(), a(f), delete d.addTest, delete d.addAsyncTest; for (var v = 0; v < Modernizr._q.length; v++)Modernizr._q[v](); e.Modernizr = Modernizr }(window, document);


// Page init
jQuery(function () {

    initStickyHeader();
    initFastClick();
    initSVG();
    initSearch();
    initHumburgers();
    initNavigation();
    initHeroSwiper();
    initNewsSwiper();
    initAccordion();
    noclick();
    stickyNav();
    initTabs();

    pageNav();
    initDotDotDot();
    backToTop();

    video();
    vimeoVideo();
    initAccordion2();

    // form
    radioButtons();
    validatecontactUs('contactusform');
    validateNewsletter('newsletter-form');
    fileUpload();
    // filtersActiveClass();

    //Application
    stickyApp();
    showLoader();

    countrySelect();

    initTextMask();

    //Search Result page
    searchResult();
    cancelSearch();

    initContactUs();

    loginBtnclone();
});

function initContactUs() {
    $("input[type='radio'][name='optionsRadios']").click(function () {
        var selectedValue = this.value.toLowerCase();

        if (selectedValue == "a prospective student") {
            $("#ProspectiveStudent").show();
            $("#ExistingStudent").hide();

            $("#StudentEauId").removeAttr("aria-required");
        }
        else if (selectedValue == "an existing student") {
            $("#ProspectiveStudent").hide();
            $("#ExistingStudent").show();
            $("#StudentEauId").attr("aria-required", true);
        }
        else {
            $("#ProspectiveStudent").hide();
            $("#ExistingStudent").hide();

            $("#StudentEauId").removeAttr("aria-required");
        }
    });



    $("#ProspectiveTopic").change(function () {

        //alert(this.value);
        if (this.value == "EnglishCourse") {
            $("#divEnglishLanguage").show();
            $("#divProfessionalTrainingCourses").hide();
        } else if (this.value == "TrainingCourses") {

            $("#divEnglishLanguage").hide();
            $("#divProfessionalTrainingCourses").show();
        } else {
            $("#divEnglishLanguage").hide();
            $("#divProfessionalTrainingCourses").hide();
        }

    });



}

function initFastClick() {
    FastClick.attach(document.body);
}

function countrySelect() {

    if ($("body").find(".phone-number").length > 0) {
        $(".phone-number").intlTelInput({
            nationalMode: true,
            preferredCountries: ["ae"],
            initialCountry: "ae",
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/8.4.6/js/utils.js", // just for formatting/placeholders etc
            formatOnDisplay: false

        });

        $(".phone-number").blur(function () {
            $(this).val($(this).intlTelInput("getNumber"));
        });
    }
};

function searchResult() {

    if ($(".search-box").length > 0) {

        $(".search-box .search-input").on('keyup', function () {
            var _val = $(this).val();
            console.log("_val", _val);
            if (_val != '') {
                $(".search-close").show();
            } else {
                $(".search-close").hide();
            }
        })
    }
}

function cancelSearch() {
    $(".search-close").click(function () {
        $(".search-box .search-input").val("");
        $(this).hide();
    })
}

// Changing all .svg img into SVG tag
function initSVG() {
    $("img.svg").each(function () {
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

//Desptop Search overly 
function initSearch() {

    var closeCtrl = document.getElementById('btn-search-close'),
        blackout = document.querySelector('.blackout'),
        searchContainer = document.querySelector('.search-wrap'),
        inputSearch = searchContainer.querySelector('.search__input'),
        btnSearch = $('.mobile-search'),
        body = document.querySelector('body');

    inputSearch.addEventListener('focus', openSearch);
    closeCtrl.addEventListener('click', closeSearch);
    // blackout.addEventListener('click', closeSearch);
    // btnSearch.addEventListener('click', openSearch);
    btnSearch.click(function () {
        openSearch();
    })


    document.addEventListener('keyup', function (ev) {
        // Escape key.
        if (ev.keyCode == 27) {
            closeSearch();
        }
    });

    function openSearch() {
        searchContainer.classList.add('search--is-open');
        body.classList.add('body--is-fixed');
        inputSearch.focus();
    }

    function closeSearch() {
        searchContainer.classList.remove('search--is-open');
        body.classList.remove('body--is-fixed');
        inputSearch.blur();
        inputSearch.value = '';
    }

}


//Humburgers
function initHumburgers() {

    $(".hamburger-menu").click(function () {
        $(this).toggleClass("is-active");
        $(".l-header-top, body").toggleClass("mobile-open");
    })


    $(".hamburger-close").click(function () {
        $(".hamburger-menu").toggleClass("is-active");
        // $(".l-header-top, body").toggleClass("mobile-open");
    })


}

// All navigation functionality
function initNavigation() {


    $('.main-nav__item').hover(function () {
        if ($(this).find(".sub-nav").length > 0) {
            $(this).addClass("focus");
        }

    }, function () {
        $(this).removeClass("focus");
    });


    $(".main-nav__item").each(function () {
        if ($(this).find(".sub-nav").length > 0) {
            $(this).addClass("has-subnav");
            $(this).find(".sub-nav").addClass("aak");

            // console.log($(this).find(".sub-nav .sub-nav__wrap .sub-nav__half").length);
            // if($(this).find(".sub-nav .sub-nav__wrap .sub-nav__half").length > 2){
            //      $(this).addClass("full-nav");
            // }

            if ($(window).width() > tabletWidth) {
                var subnavWidth = $(this).find(".sub-nav").outerWidth();
                var containerWidth = $(".container").width();
                var pl = $(this).position().left;
                //console.log(containerWidth - pl - subnavWidth);
                if (containerWidth - pl - subnavWidth < 0) {
                    $(this).addClass("full-nav");
                }
            }

        }
    })

    $(".has-subnav .main-nav__item__link").click(function () {
        $(this).closest(".has-subnav").toggleClass("subnav-open");
        $(this).closest(".main-nav__item").siblings().removeClass("subnav-open");
        // $(this).next(".sub-nav").slideToggle();
    })

    $(".main-nav__item").click(function () {
        $(this).closest(".main-nav__item").siblings().removeClass("subnav-open");
        // $(this).next(".sub-nav").slideToggle();
    })

    if (winWidth <= tabletWidth) {
        $(".main-nav__item__link ").click(function (e) {
            e.preventDefault();
        })
    }

}

//Hero initHeroSwiper
function initHeroSwiper() {
    if ($(".hero .swiper-slide").length > 1) {
        if ($(".hero").hasClass("hero-option2")) {
            var mySwiper = new Swiper('.hero .swiper-container', {
                // Optional parameters

                // autoplay: 5000,
                autoplayDisableOnInteraction: true,
                speed: 400,
                loop: true,
                slidesPerView: 1,
                spaceBetween: 0,
                parallax: true,
                effect: 'fade',
                fade: {
                    crossFade: false
                },
                pagination: '.pag-shoes',
                paginationClickable: true,
                paginationType: "custom",
                paginationCustomRender: function (swiper, current, total) {
                    var names = [];
                    $(".hero .swiper-wrapper > .swiper-slide").each(function (i) {
                        let link = $(this).data("bannerlink");
                        link = { ...link, name: $(this).data("name") }
                        names.push(link);
                    });
                    var text = "<div style='display: flex; justify-content: space-between;'>";
                    var maxWidth = ($(".l-course-life").outerWidth());
                    var width = maxWidth / total - 4 * (names.length - 2);
                    $(".pag-shoes").css({ "width": (maxWidth) });
                    for (var i = 1; i <= total; i++) {
                        let textCss = current == i ? 'pag-text active' : "pag-text";
                        let tab = names[i];
                        let tabUI = `<div class="${textCss}" data-eventCategory="Banners" data-eventAction="Banner Tab Click"  data-eventLabel="${tab.name}" style="width:${width}px" data-slide="${i}"  >${tab.name}</div>`
                        if (tab.hasOwnProperty("Url")) {
                            text += `<a href="${tab.Url}" target="${tab.Target}" >${tabUI}</a>`;
                        }
                        else {
                            text = text + tabUI;
                        }
                    }
                    text += "</div>";
                    return text;
                }

            })

            $("body").on("click", ".pag-text", function () {
                mySwiper.slideTo($(this).attr("data-slide"), 1000, false)
            })
        } else {
            var mySwiper = new Swiper('.hero .swiper-container', {
                // Optional parameters
                autoplay: 5000,
                autoplayDisableOnInteraction: true,
                speed: 400,
                loop: true,
                slidesPerView: 1,
                spaceBetween: 0,
                parallax: true,
                effect: 'fade',
                fade: {
                    crossFade: true
                }

            })
        }
    }
}

//News initNewsSwiper
function initNewsSwiper() {
    if ($(".news .news__wrap").length > 1) {
        var mySwiper = new Swiper('.news .swiper-container', {
            // Optional parameters
            // autoplay: 5000,
            autoplayDisableOnInteraction: true,
            slidesPerView: 5,
            // centeredSlides: true,
            speed: 400,
            // loop: true,
            spaceBetween: 5,
            slidesPerGroup: 1,
            nextButton: '.news__right',
            prevButton: '.news__left',
            // normalizeSlideIndex: 3,
            // initialSlide: 2,

            // Responsive breakpoints
            breakpoints: {
                // when window width is <= 480px
                992: {
                    slidesPerView: 1.2,
                    spaceBetween: 20,
                    centeredSlides: true,
                    loop: true,
                },
                // when window width is <= 640px
                // 768: {
                //     slidesPerView: 3,
                //     spaceBetween: 30
                // },
                1600: {
                    slidesPerView: 3,
                    spaceBetween: 5
                },
                1000: {
                    slidesPerView: 2,
                    spaceBetween: 5,
                },


            }

        })
    }
}

// initAccordion
function initAccordion() {
    $(".au-accord__sub").each(function () {
        $(this).closest("li").addClass("has-subnav");
    })

    $(".au-accord li.active").find(".au-accord__sub").slideDown();
    $(".au-accord li.has-subnav").click(function () {

        $(this).siblings("li").removeClass("active").find(".au-accord__sub").slideUp();
        $(this).toggleClass("active").find(".au-accord__sub").slideToggle();

    })
}

// noclick
function noclick() {
    $(".no-click").click(function (e) {
        e.preventDefault();
    })
}

function stickyNav() {
    $(window).scroll(function () {
        adjustWidth()
    })

    $(window).resize(function () {
        adjustWidth()
        affixMenu();
        adjustMenuWidth();
    })

    function adjustWidth() {
        var w = $(".sticky-nav").width();
        $(".sticky-nav--wrap.affix").css("width", w);
    }

    function affixMenu() {
        $('.sticky-nav .sticky-nav--wrap').affix({
            offset: {
                top: function () {
                    return (this.top = $('.hero').outerHeight(true))
                },
                bottom: function () {
                    return (this.bottom = $('.footer-main').outerHeight(true) + $(".box-link").outerHeight(true) + 100)
                }
            }
        })
    }

    function adjustMenuWidth() {
        if (winWidth < 992) {
            //console.log("inside");
            var w = 0;
            $('.sticky-nav .sticky-nav--wrap li').each(function () {
                w = w + $(this).outerWidth();
                //console.log("this", $(this).outerWidth());
            })
            //console.log("w", w);
            w = w + 30;

            $('.sticky-nav .sticky-nav--wrap ul').css({ 'width': w });
        }
    }

    adjustWidth();
    affixMenu();
    adjustMenuWidth();
}


//Sticky Header
function initStickyHeader() {

    $(window).scroll(function () {
        stickyHeader();
    });
    //stickyHeader();

    function stickyHeader() {
        var headerscroll = $(window).scrollTop();
        //console.log('est' + headerscroll );

        if (headerscroll >= 3) {
            $("body").addClass("mfixedHeader");
        } else {
            $("body").removeClass("mfixedHeader");
        }
    }
}

// Autospy custom
function pageNav() {
    'use strict';

    var
        $win = $(window),
        $html = $('html, body'),
        $holder = $('.filters'),
        $items = $('.filters .select-box'),
        $btns = $('.filters .select-box a'),
        animDuration = 500,
        scrollId = null;

    var lastActive = 99999;

    var $ids = $btns.map(function (i, elem) {
        return elem.getAttribute('href');
    }),
        $sections = $ids.map(function (i, id) {
            var section = null;

            if (id && id[0] === '#' && id.length > 1) {
                section = $(id)[0];
            }

            return section;
        });

    $btns.each(function (i, elem) {
        $(elem).data('$scrollToElem', $sections.eq(i));
    });

    $sections.each(function (i, elem) {
        $(elem).data('$navItem', $btns.eq(i).parent());
    });

    // sort by top coord
    Array.prototype.sort.call($sections, function (a, b) {
        return $(a).offset().top - $(b).offset().top;
    });

    init();

    function init() {
        checkScroll();

        $btns.on('click', onClick);
        $win.on('scroll resize orientationchange', onScroll);
        $win.on('load', onLoad);
    }

    function scrollTo($elem) {
        $html.stop().animate({
            scrollTop: $elem.offset().top - $holder.outerHeight() + 50
        }, animDuration);
    }



    function setActive($elem) {

        var elemIndex = $elem.index();
        $items.each(function () {
            var indx = $(this).index();
            if (indx <= elemIndex) {
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
        })

    }

    function checkScroll() {
        var $s = $sections.filter(function (i, elem) {
            var
                $elem = $(elem),
                elemOffset = $elem.offset(),
                elemTop = elemOffset.top,
                elemBottom = elemTop + $elem.outerHeight(),
                winTop = $win.scrollTop(),
                winBottom = winTop + $win.height(),
                holderHeight = $holder.outerHeight();

            elemTop = elemTop - holderHeight - 2;



            // return elemTop >= winTop && elemTop < winBottom - 150 
            // ||
            return elemTop < winTop && elemBottom > winTop;
        }),
            $last = $s.last();

        // console.log("$s", $s);
        if ($last.length) {
            setActive($last.data('$navItem'));
        }
        else {
            // $items.removeClass('active');
        }
    }


    // $("#group-title-programselection").css('background', 'red');
    // $("#group-title-personalinformation").css('background', 'red');
    // $("#group-title-contactinfomation").css('background', 'red');
    // $("#group-title-guardianemergencyinformation").css('background', 'red');
    // $("#group-title-qualifications").css('background', 'red');
    // $("#group-title-workexperience").css('background', 'red');
    // $("#group-title-englishproficiency").css('background', 'red');
    // $("#group-title-authenticitystatement").css('background', 'red');
    // $("#contourNavigation").css('background', 'red');
    //////////////
    // HANDLERS //
    //////////////

    function onClick(e) {
        e.preventDefault();

        var
            $elem = $(this),
            $scrollToElem = $elem.data('$scrollToElem');

        if ($scrollToElem && $scrollToElem.length) {
            scrollTo($scrollToElem);
        }

        // setActive($elem.parent());
    }

    function onScroll(e) {
        // clearTimeout(scrollId);
        // scrollId = setTimeout(checkScroll, 150);
        checkScroll();
    }

    function onLoad() {
        checkScroll();
    }
}


function initDotDotDot() {
    $(".dotdotdot").dotdotdot({
        ellipsis: '... '
    });
}

// Init Tabs
function initTabs() {

    $(".tablist a").click(function (e) {
        $(this).tab('show')
        var _scroll = $(this).attr("data-scrollTo");

        if (_scroll) {
            var _scrollTo = $("." + _scroll).offset().top + 10;
            $('html,body').animate({
                scrollTop: _scrollTo
            }, 300);
        }
    })

}

//crolling back to top
function backToTop() {
    if ($('.back-to-top').length) {
        $('.back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }
}


function video() {
    $('.video').each(function () {
        var
            $elem = $(this),
            $poster = $elem.find('.video__poster'),
            $play = $elem.find('.video__play'),
            $player = $elem.find('.video__player'),
            videoId = $elem.attr('data-video');

        $play.on('click', play);

        function play(e) {
            e && e.preventDefault();

            new YT.Player($player[0], {
                videoId: videoId,
                height: '100%',
                width: '100%',
                playerVars: {
                    'wmode': 'opaque'
                },
                events: {
                    onReady: function onPlayerReady(e) {
                        e.target.playVideo();
                    }
                }
            });

            $poster.remove();
            $play.remove();
        }
    });
}

function vimeoVideo() {

    $('.vimeo-video').each(function () {
        var
            $elem = $(this),
            $poster = $elem.find('.video__poster'),
            $play = $elem.find('.video__play'),
            $player = $elem.find('.video__player'),
            videoId = $elem.attr('data-video');

        $play.on('click', play);

        function play(e) {
            e && e.preventDefault();

            var iframe = '<iframe class="vimeo-video__player" src="' + videoId + '?title=0&byline=0&portrait=0&autoplay=1" width="100%" height="620px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'

            $player.html(iframe);

            $poster.remove();
            $play.remove();
        }
    });

}

//faq Accordion
function initAccordion2() {
    $('.acc-slide .acc-head').click(function () {
        var tab = this;
        var fromTop = 0;

        $(this).closest("li").siblings().find(".acc-body").slideUp(500);
        $(this).next("div").slideToggle(500);


        setTimeout(function () {
            $('html, body').animate({
                scrollTop: $($(tab)).offset().top - fromTop
            }, 300);
        }, 500);

        //parent li add class
        $(this).closest("li").siblings().removeClass('active');
        $(this).closest("li").toggleClass('active');
    })
}

function radioButtons() {
    $(".radio-inline input[type=radio]").click(function () {
        $(this).closest(".radio-inline").addClass("checked").siblings(".radio-inline").removeClass("checked");

    })
}

function stickyApp() {

    $(window).resize(function () {
        affixAppMenu();
    })

    function affixAppMenu() {
        var extraOffset;
        if ($(window).width() > 991) {
            extraOffset = -10;
        } else {
            extraOffset = 40;
        };

        // console.log("extraOffset", extraOffset);
        $('.circle-wrap.sticky-nav--wrap').affix({
            offset: {
                top: function () {
                    return (this.top = $('.hero').outerHeight(true) + $('.l-header-top').outerHeight(true) + extraOffset)
                },
                bottom: function () {
                    return (this.bottom = $('.footer-main').outerHeight(true) + $(".box-link").outerHeight(true) + 100)
                }
            }
        })
    }



    affixAppMenu();

}

function addMethods() {
    // add the rule here
    $.validator.addMethod("valueNotEquals", function (value, element, arg) {
        return arg != value;
    }, "Value must not equal arg.");
}

function validateNewsletter(tb) {

    if ($("#" + tb).length > 0) {
        addMethods();
        //console.log("Validation");
        // $("#contactusform").validate();

        var validator = $("#" + tb).validate({
            rules: {
                email: "required",
            },
            messages: {
                email: "Enter your Email",
            },
            highlight: function (element) {
                $(element).closest("div").addClass("field-error");
            },
            unhighlight: function (element) {
                $(element).closest("div").removeClass("field-error");
            },
            // errorElement : 'div',
            // errorLabelContainer: '.errorTxt'
            errorPlacement: function (error, element) {
                var placement = $(element).data('error');
                // For custom error placement
                if (placement) {
                    $(placement).append(error)
                } else {
                    error.insertAfter(element);
                }
            }
        })
    }

}

function validatecontactUs(tb) {

    if ($("#" + tb).length > 0) {
        addMethods();
        //console.log("Validation");
        // $("#contactusform").validate();

        var validator = $("#" + tb).validate({
            rules: {
                title: { valueNotEquals: "-1" },
                firstname: "required",
                lastname: "required",
                email: "required",
                confirmemail: {
                    required: true,
                    equalTo: email
                },
                mobilenumber: "required",
                country: { valueNotEquals: "-1" },
                message: "required",
                optionsRadios: "required",
                eauhear: { valueNotEquals: "-1" },
                toefl: "required",
                ProspectiveTopic: { valueNotEquals: "-1" },
                StudentEauId: "required",
                ExistingStudentTopic: { valueNotEquals: "-1" },
                EnglishLanguage: { valueNotEquals: "-1" },
                ProfessionalTrainingCourses: { valueNotEquals: "-1" },
                // username: {
                //     required: true,
                //     minlength: 2,
                //     remote: "users.php"
                // }
            },
            messages: {
                title: { valueNotEquals: "Please select an item!" },
                firstname: "Enter your firstname",
                lastname: "Enter your lastname",
                email: "Enter your Email",
                confirmemail: "Please reconfirm email correctly",
                mobilenumber: "enter your mobile number",
                country: { valueNotEquals: "Please select country!" },
                message: "Enter message",
                optionsRadios: "Please choose any one",
                eauhear: { valueNotEquals: "Please select an item!" },
                toefl: "Please click",
                ProspectiveTopic: { valueNotEquals: "Please select prospective topic item!" },
                StudentEauId: "Enter student EauId",
                ExistingStudentTopic: { valueNotEquals: "Please select existing topic item!" },
                EnglishLanguage: { valueNotEquals: "Please select english language!" },
                ProfessionalTrainingCourses: { valueNotEquals: "Please select professional training courses!" },
                // username: {
                //     required: "Enter a username",
                //     minlength: jQuery.format("Enter at least {0} characters"),
                //     remote: jQuery.format("{0} is already in use")
                // }
            },
            highlight: function (element) {
                $(element).closest("div").addClass("field-error");
            },
            unhighlight: function (element) {
                $(element).closest("div").removeClass("field-error");
            },
            // errorElement : 'div',
            // errorLabelContainer: '.errorTxt'
            errorPlacement: function (error, element) {
                var placement = $(element).data('error');

                // For custom error placement
                if (placement) {
                    $(placement).append(error)
                } else {
                    error.insertAfter(element);
                }

                // For checkbox error
                // if (element.is(':checkbox')) {
                //     $(element).parent('div').addClass('checkbox-error');
                // }


                // For radio radioButtons
                // if (element.is(':radio')) {
                //     console.log("TRUE");
                //     $(element).closest('div').addClass('radio-error');
                // }
            }
        })
    }
}

function fileUpload() {
    $(".file-input input[type=file]").change(function (e) {
        var vale = $(this).val();
        var filename = getFileName(vale);
        $(this).closest(".file-input-wrap").find(".file-name").html(filename);
    })

    function getFileName(path) {
        var fullPath = path;
        if (fullPath) {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
            return filename;
        }
    }
}

function showLoader() {
    // $('body').on('click', '.onSpiner', function(){
    $('.onSpiner').on('click', function () {
        $('body').find('.p-w').show();
    })
}

function initTextMask() {
    $('.datepickerfield').each(function () {
        var field = $(this);
        var textMask = field.attr("data-mask");
        if (textMask == undefined || textMask == '') {
            field.mask('00/00/0000', { placeholder: "dd/mm/yyyy" });
        }
    });
    $('.phone-number').each(function () {
        var field = $(this);
        var textMask = field.attr("data-mask");
        if (textMask == undefined || textMask == '') {
            field.mask('###############');
        }
    });
}

function loginBtnclone() {
    $('.btnlogin').clone().appendTo("#js-looginClone");
    initSVG();
}