'use strict';

jQuery(function () {
    init();
    newCourseLandingPush();
});

function init() {

    $(document).on('click', '.course_degree_click', function () {
        var degreeName = $(this).data('degree');
        var position = $(this).data('sort-order');

        dataLayer.push({
            'event': 'eventTracker',
            'eventCategory': 'Ecommerce',
            'eventAction': 'Promotion Click',
            'eventLabel': degreeName,    // Course name example : MBA
            'nonInteraction': 0,
            'ecommerce': {
                'promoClick': {
                    'promotions': [
                        {
                            'id': degreeName.toUpperCase() + '_CARD',                         // Name or ID is required.
                            'name': degreeName,		// Name of the course
                            'creative': degreeName + ' CARD',	// Name of the creative card or banner
                            'position': position
                        }]
                }
            },
            'eventCallback': function () {
                document.location = promoObj.destinationUrl;
            }
        });

    });

    // ONLY for course page
    var $coursepage = $('.course-page');
    if ($coursepage.length > 0) {
        // Measuring Product Detail Views
        dataLayer.push({
            'event': 'eventTracker',
            'eventCategory': 'Ecommerce',
            'eventAction': 'Product Details',
            'eventLabel': $coursepage.attr('data-courseName'),
            'nonInteraction': 1,
            'ecommerce': {
                'currencyCode': 'AED',
                'detail': {
                    'products': [{
                        'name': $coursepage.attr('data-courseName'),
                        'id': $coursepage.attr('data-courseId'),
                        'price': $coursepage.attr('data-price'),
                        'brand': $coursepage.attr('data-brand'),
                        'category': $coursepage.attr('data-category'),
                        'Variant': '',
                        'list': $coursepage.attr('data-list')
                    }]
                }
            },
            'eventCallback': function () {
                dataLayer.push({ 'ecommerce': undefined })
            }
        });
    }

    //.top-links                => Top Links
    //.logo__img                => Logo
    //.main-nav__item__link     => Main menu links
    //.btn-lg                   => Button links
    //.sub-dropdown__link       => Third level sub menu
    //.au-accord__sub__list     => Side bar menu (second level)
    //.side-navigation          => Side bar menu (first level)
    //.level2_navigation        => Side bar menu tab (second level)
    //.footer-navigations       => Footer column links
    //.find-course__link        => Homepage widgets 'Finding a course'
    //.life-change__item        => Homepage widgets 'Life-changing education'
    //.box-link__list           => Homepage widgets 'Course page widget'
    //.news__list               => News widgets
    //.events__list             => Events widgets
    $(".top-links, .logo__img, .main-nav__item__link, .btn-lg, .sub-dropdown__link, .link-arrow, .au-accord__sub__list, .level2_navigation, .footer-navigations, .find-course__link, .life-change__item, .box-link__list, .news__list, .events__list, .side-navigation").click(function () {
        var element = $(this);
        var eventCategory = element.attr('data-eventCategory');
        var eventAction = element.attr('data-eventAction');
        var eventLabel = element.attr('data-eventLabel');
        if (eventCategory != undefined && eventAction != undefined && eventLabel != undefined) {
            dataLayer.push({
                'event': 'eventTracker',
                'eventCategory': eventCategory,
                'eventAction': eventAction,
                'eventLabel': eventLabel,
                'eventValue': 0,
                'nonInteraction': 0,
            });
        }
    });

    //.pag-text                 => Homepage banners
    $("body").on("click", ".pag-text", function () {
        var element = $(this);
        var eventCategory = element.attr('data-eventCategory');
        var eventAction = element.attr('data-eventAction');
        var eventLabel = element.attr('data-eventLabel');
        dataLayer.push({
            'event': 'eventTracker',
            'eventCategory': eventCategory,
            'eventAction': eventAction,
            'eventLabel': eventLabel,
            'eventValue': 0,
            'nonInteraction': 0,
        });
    });

    //content-navigation        => Changes to be made in umbraco RTE
    //.acc-head                 => Accordians
    $(".content-navigation a,.content .acc-head").click(function () {
        var linkName = $(this).text().trim();
        var url = window.location.href;
        var count = url.split('/').length;
        var fullText = url.split('/')[count - 3] + ' : ' + url.split('/')[count - 2] + ' : ' + linkName;
        dataLayer.push({
            'event': 'eventTracker',
            'eventCategory': 'Navigation',
            'eventAction': 'Side Navigation',
            'eventLabel': fullText,
            'eventValue': 0,
            'nonInteraction': 0,
        });
    });

    //.social-links         => Footer social links
    $(".social-links ul li a").click(function () {
        var eventLabel = $(this).attr('data-eventLabel');
        dataLayer.push({
            'event': 'eventTracker',
            'eventCategory': 'Social',
            'eventAction': 'Clicks',
            'eventLabel': eventLabel,
            'eventValue': 0,
            'nonInteraction': 0,
        });
    });

    $(".email-interactions a").click(function () {
        var linkName = $(this).text().trim();
        if (linkName != '') {
            linkName = linkName.replace('@', ' at ');
        }
        dataLayer.push({
            'event': 'eventTracker',
            'eventCategory': 'Email Interactions',
            'eventAction': 'Email ID Clicks',
            'eventLabel': linkName,
            'eventValue': 0,
            'nonInteraction': 0,
        });
    });

    $(document).on('click', '.courses__listPage', function () {
        var element = $(this);
        var dataList = [{
            "name": element.attr('data-courseName'),
            "id": element.attr('data-courseId'),
            "price": element.attr('data-price'),
            "brand": element.attr('data-brand'),
            "category": element.attr('data-category'),
            "Variant": '',
            "position": element.attr('data-position')
        }];
        dataLayer.push({
            'event': 'eventTracker',
            'eventCategory': 'Ecommerce',
            'eventAction': 'Product Click',
            'eventLabel': element.attr('data-courseName'),
            'nonInteraction': 0,
            'ecommerce': {
                'currencyCode': 'AED',
                'click': {
                    'actionField': { 'list': element.attr('data-list') },
                    'products': dataList
                }
            },
            'eventCallback': function () {
                dataLayer.push({ 'ecommerce': undefined })
            }
        });
    });

    $(document).on('click', '.measuring-ecommerce-activities', function () {
        var element = $(this);
        var courseName = element.attr('data-courseName');
        var courseId = element.attr('data-courseId');
        var price = element.attr('data-price');
        var brand = element.attr('data-brand');
        var category = element.attr('data-category');
        var list = element.attr('data-list');
        dataLayer.push({
            'event': 'eventTracker',
            'eventCategory': 'Ecommerce',
            'eventAction': 'Product Add to Cart',
            'eventLabel': courseName,
            'nonInteraction': 0,
            'ecommerce': {
                'currencyCode': 'AED',
                'add': {
                    'products': [{
                        'name': courseName,
                        'id': courseId,
                        'price': price,
                        'brand': brand,
                        'category': category,
                        'Variant': '',
                        'quantity': 1,
                        'list': list
                    }]
                }
            },
            'eventCallback': function () {
                dataLayer.push({ 'ecommerce': undefined })
            }
        });
    });

    if (typeof purchaseDetails == 'undefined') return;
    var purchaseMatrix = JSON.parse(purchaseDetails)
    dataLayer.push({
        'event': 'eventTracker',
        'eventCategory': 'Ecommerce',
        'eventAction': 'Purchase',
        'eventLabel': 'Purchase Success',
        'nonInteraction': 1,
        'paymentMethodCD': 'Credit Card',
        'ecommerce': {
            'currencyCode': 'AED',
            'purchase': {
                'actionField': {
                    'id': purchaseMatrix.TransId,
                    'affiliation': 'EAU',
                    'revenue': purchaseMatrix.TotalPrice,
                    'tax': purchaseMatrix.Tax,
                    'shipping': '0.0',
                    'coupon': ''
                },
                'products': [{
                    'name': purchaseMatrix.CourseName,
                    'id': purchaseMatrix.CourseId,
                    'price': purchaseMatrix.Price,
                    'brand': purchaseMatrix.Brand,
                    'category': purchaseMatrix.Category,
                    'Variant': '',
                    'quantity': 1,
                    'list': purchaseMatrix.List
                }]
            }
        },
        'eventCallback': function () {
            dataLayer.push({ 'ecommerce': undefined })
        }
    });
}

// News letter validation
function NewsLetterDataLayerPush(success, text) {
    var eventLabel = "";
    if (success) {
        eventLabel = "Sign Up Success";
    } else {
        eventLabel = 'Sign Up Error : ' + text;
    }
    dataLayer.push({
        'event': 'eventTracker',
        'eventCategory': 'EAU Newsletter',
        'eventAction': 'Sign Up',
        'eventLabel': eventLabel,
        'eventValue': 0,
        'nonInteraction': 0,
    });
}

function SiteSearchDataLayerPush(result, searchText) {
    dataLayer.push({
        'event': 'eventTracker',
        'eventCategory': 'Internal Site Search',
        'eventAction': result,
        'eventLabel': searchText,
        'eventValue': 0,
        'nonInteraction': 0,
    });
}

function CourseSearchDataLayerPush(result, searchText, courseType, field) {
    courseType = courseType == "" ? 'All Course Types' : courseType;
    field = field == "" ? 'All Schools' : field;
    var eventLabel = searchText + ' : ' + courseType + ' : ' + field;
    dataLayer.push({
        'event': 'eventTracker',
        'eventCategory': 'Internal Course Search',
        'eventAction': result,
        'eventLabel': eventLabel,
        'eventValue': 0,
        'nonInteraction': 0,
    });
}

function SendEnquiryDataLayerPush(result, pageName) {
    dataLayer.push({
        'event': 'eventTracker',
        'eventCategory': 'Send an Enquiry',
        'eventAction': pageName,
        'eventLabel': result,
        'eventValue': 0,
        'nonInteraction': 0,
    });
}

function ProductImpressionDataLayerPush(dataList, courseType) {
    
    if (typeof actionFieldList == 'undefined') return;
    if (dataList.length > 0) {
        var newArray = [];
        $.each(dataList, function (index) {
            var locations = {
                "id": dataList[index].dataLayerTitle.toUpperCase()+"_CARD",
                "name": dataList[index].dataLayerTitle,
                "creative": dataList[index].dataLayerTitle + " CARD",               
                "position": dataList[index].DegreeSortOrder
            };
            newArray.push(locations);
        });
        dataLayer.push({
            'event': 'eventTracker',
            'eventCategory': 'Ecommerce',
            'eventAction': 'Promotion Impressions',
            'eventLabel': 'All Course Types',
            'nonInteraction': 1,
            'ecommerce': {
                'promoView': {
                    'promotions': newArray
                }
            },
            'eventCallback': function () {
                dataLayer.push({ 'ecommerce': undefined });
            }

        });
    }
}

function ProductClicksDataLayerPush(dataList, courseName) {
    dataLayer.push({
        'event': 'eventTracker',
        'eventCategory': 'Ecommerce',
        'eventAction': 'Product Click',
        'eventLabel': courseName,
        'nonInteraction': 0,
        'ecommerce': {
            'currencyCode': 'AED',
            'click': {
                'actionField': { 'list': '' },
                'products': dataList
            }
        },
        'eventCallback': function () {
            dataLayer.push({ 'ecommerce': undefined })
        }
    });
}


function newCourseLandingPush() {
    var $coursepage = $('.new-course-landing-list');
    if ($coursepage.length > 0) {
        //console.log("New course Landing page");

        var data = dataLayerPush;
        //console.log(data);

        dataLayer.push({
            'event': 'eventTracker',
            'eventCategory': 'Ecommerce',
            'eventAction': 'Product Impressions',
            'eventLabel': 'All Course Types',
            'nonInteraction': 1,
            'ecommerce': {
                'currencyCode': 'AED',
                'impressions': data
            },
            'eventCallback': function () {
                dataLayer.push({ 'ecommerce': undefined })
            }
        });

    }
    else {
       // console.log("Other Page");
    }
}
