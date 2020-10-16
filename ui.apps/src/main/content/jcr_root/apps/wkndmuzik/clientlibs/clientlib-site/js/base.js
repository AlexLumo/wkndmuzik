$(function() {

    // reinvent wheel since OOTB slideshow is breaking nested components
    var $nextSlideTrigger = $('.cmp-carousel__action--next'),
        $pauseTrigger = $('.cmp-carousel__action--pause'),
        $carousel = $('.cmp-carousel'),
        delay = $carousel.data('cmp-delay'),
        autoplay = $carousel.data('cmp-autoplay'),
        $cmpSearch = $('.cmp-search'),
        $cmpLanguageNavigation = $('.cmp-languagenavigation');

    if ($nextSlideTrigger.length && $pauseTrigger.length && autoplay !== undefined) {
        $pauseTrigger.trigger('click');
        changeSlide();
    }

    function changeSlide() {
        setTimeout(function() {
            $nextSlideTrigger.trigger('click');
            $pauseTrigger.trigger('click');
            changeSlide();
        }, delay);
    }

    $('#back-to-top').on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 1000);
    });

    $('#search-trigger').on('click', function() {
        $cmpSearch.parent().toggle();
        $cmpSearch.parent().toggleClass('search-visible');
    });

    $('#language-trigger').on('click', function() {
        $cmpLanguageNavigation.parent().toggle();
        $cmpLanguageNavigation.parent().toggleClass('lang-visible');
        $cmpSearch.parent().css({right: $(window).width() - $(this).position().left - 23 + 'px'});
    });

    $('#emailme').on('click', function() {
        window.location.href = "mailto:user@example.com?subject=Subject&body=message%20goes%20here";
    });

    $('.cmp-form').on('submit', function(e) {
        e.preventDefault();
        var redirect = null;
        $(this).find('input[type=hidden]').each(function(_, el) {
            if ($(el).attr('name') === ':redirect') {
                redirect = $(el).attr('value');
                return false;
            }
        });
        if (redirect) {
            window.location.href = redirect;
        }
    });

    $('header .cmp-image__image').on('click', function() {
        var currentUrlArray = window.location.pathname.split('/');
        window.location.href = currentUrlArray.slice(0, 5).join('/') + '.html';
    });
});