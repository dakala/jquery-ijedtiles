
(function($) {

    var defaults, methods, debugIjedTiles = false;

    defaults = {
        tilesImgStart : true,
        tilesHorizontalTotal : 4,
        tilesVerticalTotal : 3,
        tilesAlternateRows: true,
        tileWidth : 220,
        tileHeight : 200,
        tilesSeperatorWidth : 1,
        tilesSeperatorColor : '#ffffff',
        tileTextSize: '1em',
        tileBgColor : '#336699',
        tileColor : '#ffffff',
        tileHoverBgColor : '#669900',
        tileHoverColor : '#ffffff',
        tileSlideSpeed : 800,
        items : [ {
            imgSrc : "images/cross.jpg",
            tileTitle : "Isaiah 53:5",
            tileText : "He was hurt for our wrong-doing. He was crushed for our sins. He was punished so we would have peace. He was beaten so we would be healed."
        }, {
            imgSrc : "images/earth.jpg",
            tileTitle : "Psalm 24:1-2",
            tileText : "The earth is the Lord’s, and all that is in it, the world, and all who live in it. For He has built it upon the seas. He has set it upon the rivers."
        }, {
            imgSrc : "images/harp.jpg",
            tileTitle : "Psalm 33:2-3",
            tileText : "Give thanks to the Lord with harps. Sing praises to Him with a harp of ten strings. Sing to Him a new song. Play well with loud sounds of joy."
        }, {
            imgSrc : "images/fire.jpg",
            tileTitle : "Acts 2:3-4",
            tileText : "Then they saw tongues which were divided that looked like fire. These came down on each one of them. They were all filled with the Holy Spirit."
        }, {
            imgSrc : "images/path.jpg",
            tileTitle : "Psalm 119:105-106",
            tileText : "Your Word is a lamp to my feet and a light to my path. I have promised that I will keep Your Law. And I will add strength to this promise."
        }, {
            imgSrc : "images/pregnancy.jpg",
            tileTitle : "Psalm 139:13-14",
            tileText : "For you created my inmost being; you knit me together in my mother’s womb. I praise you because I am fearfully and wonderfully made; your works are wonderful"
        } ]
    };

    methods = {
        // build the box of tiles
        init : function(options) {
            var ijedbox = $(this),
            settings  = $.extend({}, defaults, options),
            ijedBoxId = ijedbox.attr('id'),
            itemIdentifiers = [];

            if (debugIjedTiles) {
                console.log('init() called:');
                console.log(defaults);
                console.log(options);
                console.log(settings);
            }

            // initialise the box
            var i = 1, rows = 1,
            firstElement, secondElement,
            tileImagesPerRow = parseInt(settings.tilesHorizontalTotal) / 2;

            // items to display
            if(settings.items.length) {
                ijedbox.append('<ul></ul>');
            }

            $.each(settings.items, function() {
                var itemIdentifier = methods.slugify.apply(ijedbox, [this.imgSrc]);
                itemIdentifiers.push(itemIdentifier);

                var imgTile = '<li><div id="' + itemIdentifier + '"></div></li>';
                var txtTile = '<li><div class="container"><div id="hidden-' + itemIdentifier + '">' +
                '<h3>' + this.tileTitle + '</h3>' +
                '<p>' + this.tileText + '</p>' +
                '</div></div></li>';

                if(rows === 1 || (settings.tilesAlternateRows === false)) {
                    firstElement = (settings.tilesImgStart) ? imgTile : txtTile;
                    secondElement = (settings.tilesImgStart) ? txtTile : imgTile;
                } else {
                    if(settings.tilesAlternateRows) {
                        if(rows % 2 === 0) {
                            firstElement = (settings.tilesImgStart) ? txtTile : imgTile;
                            secondElement = (settings.tilesImgStart) ? imgTile : txtTile;
                        } else {
                            firstElement = (settings.tilesImgStart) ? imgTile : txtTile;
                            secondElement = (settings.tilesImgStart) ? txtTile : imgTile;
                        }
                    }
                }

                ijedbox.children('ul').append(firstElement + secondElement);

                // update row count
                if(i === tileImagesPerRow) {
                    rows++;
                    i = 1;
                } else {
                    i++;
                }
            });

            // Apply CSS rules
            $('#' + ijedBoxId).css({
                'width' : (parseInt(settings.tileWidth) * parseInt(settings.tilesHorizontalTotal)) + (parseInt(settings.tilesSeperatorWidth) * parseInt(settings.tilesHorizontalTotal) * 2) + 'px',
                'height' : (parseInt(settings.tileHeight) * parseInt(settings.tilesVerticalTotal)) + (parseInt(settings.tilesSeperatorWidth) * parseInt(settings.tilesVerticalTotal) * 2) + 'px',
                'padding' : 0,
                'margin' : '0 auto 0 auto'
            });

            $('#' + ijedBoxId + ' ul').css({
                'padding' : 0,
                'margin' : 0
            });

            $('#' + ijedBoxId + ' ul li').css({
                'float': 'left '
            });

            $('#' + ijedBoxId + ' ul > li').css({
                'display' : 'inline-block',
                'padding' : 0,
                'margin' : 0,
                'width' : settings.tileWidth + 'px',
                'border': 'solid ' + settings.tilesSeperatorWidth + 'px ' + settings.tilesSeperatorColor
            });

            $('#' + ijedBoxId + ' ul > li div').css({
                'padding' : 0,
                'margin' : 0,
                'font-size': settings.tileTextSize,
                'background-color': settings.tileBgColor,
                'width' : settings.tileWidth + 'px',
                'height' : settings.tileHeight + 'px',
                'color' : settings.tileColor
            });

            $('.container').css({
                'width' : parseInt(settings.tileWidth) + 'px',
                'height' : parseInt(settings.tileHeight) + 'px',
                'margin' : '0 auto',
                'position' : 'relative'
            });

            $('div[id^="hidden-"]').each( function() {
                $(this).css({
                    'margin' : 0,
                    'padding' : '5px',
                    'position' : 'relative',
                    'left' : 0,
                    'display' : 'none',
                    'background-color' : settings.tileHoverBgColor,
                    'width' : (parseInt(settings.tileWidth) - 10) + 'px',
                    'height' : (parseInt(settings.tileHeight)- 10) + 'px',
                    'color' : settings.tileHoverColor
                });
            });

            // animate the tiles and return jquery object
            return $.each(itemIdentifiers, function(key, value) {
                $('#' + value)
                .css({
                    'background-image' : 'url(' + settings.items[key].imgSrc + ')'
                })
                .hover(function() {
                    $('#hidden-' + value).slideToggle(settings.tileSlideSpeed);
                    $(this)
                    .css('cursor', 'pointer')
                    .animate({
                        opacity : 0.5
                    }, 500);
                }, function() {
                    $('#hidden-' + value).slideToggle(settings.tileSlideSpeed);
                    $(this).animate({
                        opacity : 1.0
                    }, 500);
                });
            });
        },

        slugify : function(text) {
            var name = text.split('/');
            name = name[name.length-1].split('.')[0];
            return name.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
        }
    };

    // start the plugin
    $.fn.ijedTiles = function(method) {
        if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Method " + method  + " does not exist for jQuery.ijedTiles.");
        }
    };

})(jQuery);
