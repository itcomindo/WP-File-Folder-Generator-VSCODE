window.addEventListener('DOMContentLoaded', (event) => {
    jQuery(function () {
        //JQuery start below.

        // getScreenWidth start
        function getScreenWidth() {
            return window.innerWidth;
        }
        // getScreenWidth end
        // ##############################################################
        // ##############################################################
        // ##############################################################
        // getBodyClass start
        function getBodyClass() {
            $bodyClass = jQuery('body').attr('class');
            return $bodyClass;
        }
        // getBodyClass end
        // ##############################################################
        // ##############################################################
        // ##############################################################
        // add title to image start
        function addTitleToImage() {
            var $bodyClass = getBodyClass();
            if ($bodyClass.includes('single')) {
                var $postTitle = jQuery('h1.single-post-title').text();
                jQuery('#the-content p img').each(function () {
                    var $this = jQuery(this);
                    if (!$this.attr('alt')) {
                        $this.attr('alt', $postTitle);
                    }
                    if (!$this.attr('title')) {
                        $this.attr('title', $postTitle);
                    }
                });
            }
        }
        addTitleToImage();
        // add title to image End
        // ##############################################################
        // ##############################################################
        // ##############################################################
        // add title to #the-content p a start
        function addTitleToContentLink() {
            var $bodyClass = getBodyClass();
            if ($bodyClass.includes('single')) {

                jQuery('#the-content p a').each(function () {
                    var $this = jQuery(this);
                    var $text = $this.text();
                    var $title = $this.attr('title');
                    if (!$title) {
                        $this.attr('title', $text);
                        //add attribute target blank to all link in #the-content p
                        $this.attr('target', '_blank');
                        //add rel noopenner to all link in #the-content p
                        $this.attr('rel', 'noopener');
                    }
                });
            }
        }
        addTitleToContentLink();
        // add title to #the-content p a end
        // ##############################################################
        // ##############################################################
        // ##############################################################
        //Table of Content start
        function tableOfContent() {

            var $dataTOC = jQuery('#sing').attr('data-toc');
            if ($dataTOC == 'true') {
                var content = jQuery('#the-content');
                var toc = jQuery('<nav class="toc"><span class="head-smaller">Table of Contents</span><ul class="list-no-style toc-list"></ul></nav>');
                var tocUl = toc.find('ul');

                // Buat elemen ToC
                content.find('h2, h3, h4, h5').each(function () {
                    var heading = jQuery(this);
                    var headingText = heading.text();
                    var cleanedText = headingText.replace(/^\d+\.\s*/, ''); // Hapus angka dan titik di awal teks
                    var id = cleanedText.toLowerCase().replace(/\s+/g, '-');
                    heading.attr('id', id).text(cleanedText); // Set ID dan teks heading tanpa prefix angka

                    var link = jQuery('<a></a>').attr('href', '#' + id).attr('rel', 'nofollow').text(cleanedText);
                    var listItem = jQuery('<li></li>').append(link);

                    // Tambahkan class sesuai dengan tag heading pada elemen li
                    if (heading.is('h2')) {
                        listItem.addClass('th2');
                    } else if (heading.is('h3')) {
                        listItem.addClass('th3');
                    } else if (heading.is('h4')) {
                        listItem.addClass('th4');
                    } else if (heading.is('h5')) {
                        listItem.addClass('th5');
                    }

                    tocUl.append(listItem);
                });

                // Temukan paragraf pertama dan tambahkan ToC setelahnya.
                content.find('p').eq(0).after(toc);
            }
        }
        tableOfContent();
        //Table of Content End
        // ##############################################################
        // ##############################################################
        // ##############################################################
        // Rekomendasi Start
        function rekomendasi() {

            var $dataRekomendasi = jQuery('#sing').attr('data-rekomendasi');
            if ($dataRekomendasi == 'true') {
                var content = jQuery('#the-content');
                var rekomendasiContent = jQuery('.rekom-wr');

                //Find tag p in #the-content, index it and insert rekomendasiContent after index 3
                content.find('p').each(function (index) {
                    if (index == 3) {
                        jQuery(this).after(rekomendasiContent);
                    }
                });

            }
        }
        rekomendasi();
        // Rekomendasi End
        // ##############################################################
        // ##############################################################
        // ##############################################################
        // floatingCTA start
        function floatingCTA() {
            jQuery('#flo-cta-trigger').slideUp(0);
            jQuery('#flo-cta-close').on('click', function () {
                jQuery('#flo-cta-trigger').slideDown();
                jQuery('#flo-cta').slideUp();
                jQuery('.flo-perusahaan').slideUp();
            });
            jQuery('.flo-cta-launcher').on('click', function () {
                jQuery('#flo-cta-trigger').slideUp();
                jQuery('#flo-cta').slideDown();
                setTimeout(function () {
                    jQuery('.flo-perusahaan').slideDown();
                }, 1000);

            });
        }
        floatingCTA();
        // floatingCTA end
        // ##############################################################
        // ##############################################################
        // ##############################################################
        // HeaderMenu start
        function headerMenu() {
            var $trigger = jQuery('.header-menu-trigger');

            $trigger.on('click', function () {
                //Create Head Mobile Menu.
                var $mobmenuHeader = '<div id="mmHead" class="flex-col align-center"><h2 class="head-smallest">OutsourcingIndo.com</h2><span class="text-smaller text-center">Info Perusahaan Outsourcing Indonesia</span><span class="text-smaller text-center">Jl. Mujahidin 1 No.112 Kreo Selatan, Larangan, Kota Tangerang, Banten 15156</span></div>';



                jQuery('#header-menu-trigger').addClass('active');
                jQuery('#header-menu').addClass('active');

                //append mobile menu header at the top of the menu.
                jQuery('#header-menu').prepend($mobmenuHeader);



                jQuery('body').addClass('no-scroll');
                var $triggerClose = '<div class="close-header-menu">X</div>';
                jQuery('#header-menu').prepend($triggerClose);
                jQuery('.close-header-menu, #header-menu li').on('click', function () {
                    jQuery('#header-menu-trigger').removeClass('active');
                    jQuery('#header-menu').removeClass('active');
                    jQuery('.close-header-menu').remove();
                    jQuery('#header-menu-trigger').slideDown();
                    jQuery('body').removeClass('no-scroll');

                    //remove mobile menu header
                    jQuery('#mmHead').remove();
                });
            });
        }
        headerMenu();
        // HeaderMenu end
        // ##############################################################
        // ##############################################################
        // ##############################################################
        // slickSlider start
        function slideOut() {
            var $dataSlideout = jQuery('#the-footer').attr('data-slideout');

            //get All class from #the-footer.
            var $footerClass = jQuery('#the-footer').attr('class');

            if ('true' === $dataSlideout) {
                jQuery('.so-wr').slick(
                    {
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        dots: false,
                        arrows: false,
                        centerMode: true,
                        centerPadding: '0px',
                    }
                );
                setTimeout(function () {
                    jQuery('#so').addClass('show').removeClass('hide');
                    jQuery('#so-close').on('click', function () {
                        jQuery('#so').slideUp();
                    });

                }, 1000);
            } else {
                jQuery('#so').remove();
            }
        }
        slideOut();
        // slickSlider End
        // ##############################################################
        // ##############################################################
        // ##############################################################
        //find this
        function mm_find_image_width_height() {
            var imgs = jQuery('img.find-this');
            imgs.each(function () {
                var ini = jQuery(this);
                var w = ini.width();
                var h = ini.height();
                ini.attr('width', w);
                ini.attr('height', h);
            });
        }
        // Fungsi debounce untuk membatasi frekuensi pemanggilan fungsi
        function mm_debounce(func, wait, immediate) {
            var timeout;
            return function () {
                var context = this, args = arguments;
                var later = function () {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        };
        mm_find_image_width_height();
        jQuery(window).on('resize', mm_debounce(function () {
            mm_find_image_width_height();
        }, 250));
        //find this end
        // ##############################################################
        // ##############################################################
        // ##############################################################
        //Tabbed Block post start

        function tabbedBlockPost() {
            var $tabbedTrigger = jQuery('.tabbed-list-item');
            $tabbedTrigger.on('click', function () {
                jQuery('.tabbed-list-item').removeClass('active').addClass('inactive');
                jQuery(this).addClass('active').removeClass('inactive');
                // Tabbed category.
                var $tabbedCategory = jQuery(this).attr('data-tabbed');
                jQuery('.tabbed-item').addClass('inactive').removeClass('active');
                jQuery('.' + $tabbedCategory).addClass('active').removeClass('inactive');
            });
        }
        tabbedBlockPost();
        //Tabbed Block post end
        // ##############################################################
        // ##############################################################
        // ##############################################################
        // Infinite Scroll Start
        function infiniteScroll() {
            $bodyClass = getBodyClass();
            if ($bodyClass.includes('category')) {
                jQuery('.the-cat-item-wr').infiniteScroll({
                    // options
                    path: '.paged-next',
                    append: '.the-cat-item',
                    history: false,
                });
            }
        }
        infiniteScroll();
        // Infinite Scroll End
        // ##############################################################
        // ##############################################################
        // ##############################################################
        // disclaimerStart
        function disclaimer() {
            jQuery('#disclaimer-content').slideUp(0);
            jQuery('#disclaimer-top').on('click', function () {
                jQuery('#disclaimer-content').slideToggle();
                jQuery('#disclaimer-top span i').toggleClass('fa-chevron-up');
            });
        }
        disclaimer();
        // disclaimerEnd










        //JQuery end above.
    });
});
