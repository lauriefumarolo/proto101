
import ImageGallery from '../product/image-gallery';
export default function($scope, context, $productOptionsElement){
    var product_left = '.halo-productView-left';
    var product_right = '.halo-productView-right';

    $('document').ready(function(){
    	initProductMoreview($(product_left, $scope));

    	$productOptionsElement.on('change', event => {
            const $changedOption = $(event.target);

            // Do not trigger an ajax request if it's a file or if the browser doesn't support FormData
            if ($changedOption.attr('type') === 'file' || window.FormData === undefined) {
                return;
            }

            initProductMoreview($(product_left, $scope), $changedOption );
        });
    });

    function initProductMoreview (productMoreview, $elementChange = false) {
        var sliderNav = productMoreview.find('.productView-thumbnails'),
            vertical = sliderNav.data('vertical');

        if (!sliderNav.hasClass('slick-initialized') ) {
            sliderNav.slick({
                infinite: false,
                slidesToShow: sliderNav.data('rows'),
                vertical: vertical,
                slidesToScroll: 1,
                focusOnSelect: true,
                nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 17 33" xml:space="preserve"><g id="e4eb89a6-f885-43b8-9259-0d6b1516fab0"><g id="_x38_e584754-6657-46f1-a9d8-2cfd6623b552"><g><polygon points="14.9,14.5 0,0 0,3.7 11.1,14.5 13.2,16.5 11.1,18.5 0,29.3 0,33 14.9,18.5 17,16.5 "/></g></g></g></svg></button>',
                prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 33"><g id="7f9a1925-e8c7-4614-8787-3c6095a9f6e1" data-name="Layer 2"><g id="c9b7920a-81fa-4bfe-ad13-4da717c6854b" data-name="Layer 1"><g id="c2d982ff-0cf6-4220-b365-47f30d708fea" data-name="e4eb89a6-f885-43b8-9259-0d6b1516fab0"><g id="f51d455e-6b9c-4c4e-96db-a5004582beda" data-name="8e584754-6657-46f1-a9d8-2cfd6623b552"><polygon points="0 16.5 2.1 18.5 17 33 17 29.3 5.9 18.5 3.8 16.5 5.9 14.5 17 3.7 17 0 2.1 14.5 0 16.5"/></g></g></g></g></svg></button>',
                responsive: [{
                        breakpoint: 1200,
                        settings: {
                            get dots() {
                                if (vertical == true) {
                                    return dots = true;
                                }
                            },
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1,
                            get dots() {
                                if (vertical == true) {
                                    return dots = true;
                                }
                            },
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 7,
                            arrow: false,
                            get dots() {
                                if (vertical == true) {
                                    return dots = true;
                                }
                            },
                        }
                    },
                    {
                        breakpoint: 360,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            get dots() {
                                if (vertical == true) {
                                    return dots = true;
                                }
                            },
                        }
                    }
                ]
            });
        };

        if (context.themeSettings.variant_grouped === true) {
            const myArray = context.themeSettings.variant_name.split(",");

            const labels = productMoreview
                .siblings(product_right)
                .find('[data-product-option-change]')
                .find('label.form-label--inlineSmall');
            let className = '';
            let classN = '.filter-';

            labels.each(function (i, el) {
                const smallText = $(el).find('small').text();
                const labelText = $(el).attr('data-variant-name');

                if (myArray.includes(labelText)) {
                    const attributeObj = $(el).parent('[data-product-attribute]');
                    if (attributeObj) {
                        const inputChecked = attributeObj.data('product-attribute') === "set-select"
                            ? attributeObj.find('select option:selected')
                            : attributeObj.find(':radio:checked');

                        if (inputChecked && inputChecked.length) {
                            let clsName = inputChecked.data('filter');
                            if (clsName) {
                                clsName = clsName.replace('.filter-', '');
                                classN += clsName;
                            }
                        }
                    }
                }
            });
            if (classN !== '.filter-') {
                className = classN;
                // Check if filtered class exists
                if (sliderNav.find(className).length === 0) {
                    sliderNav.slick('slickUnfilter');
                    myArray.forEach(arrayItem => {
                        labels.each(function (i, el) {
                            const smallText = $(el).find('small').text();
                            const labelText = $(el).attr('data-variant-name');


                            if (labelText === arrayItem) {
                                const attributeObj = $(el).parent('[data-product-attribute]');
                                if (attributeObj) {
                                    const inputChecked = attributeObj.data('product-attribute') === "set-select"
                                        ? attributeObj.find('select option:selected')
                                        : attributeObj.find(':radio:checked');

                                    if (inputChecked && inputChecked.length) {
                                        const clsName = inputChecked.data('filter')?.replace('.filter-', '');
                                        if (sliderNav.find(`.filter-${clsName}`).length > 0) {
                                            className = `.filter-${clsName}`;
                                        }
                                    }
                                }
                            }
                        });
                    });
                }

                // Apply filters to sliders
                if (sliderNav.find(className).length) {
                    sliderNav.slick('slickFilter', className);
                }
                // if (sliderFor.find(className).length) {
                //     sliderFor.slick('slickFilter', className);
                // }

                // Update product title visibility
                if ($(className, '.productView-title').length) {
                    $('.productView-title span').removeClass('is-visible');
                    $('.productView-title .text').remove();
                    $(className, '.productView-title').addClass('is-visible');
                }

                // Update description tab visibility
                if ($(className, '#tab-description').length) {
                    $('#tab-description').addClass('is-visible');
                    $('#tab-description > div').removeClass('visible');
                    $(className, '#tab-description').addClass('visible');
                }

                // Reset slider to first slide if necessary
                if (sliderNav.find('.slick-current').length) {
                    sliderNav.slick('slickGoTo', 0);
                    // sliderFor.slick('slickGoTo', 0);
                    sliderNav.find('.slick-current a').trigger('click');
                }

                // Handle slider click events
                sliderNav.on('click', 'a', function (e) {
                    e.preventDefault();
                    const $target = $(e.currentTarget);
                    const slideNo = sliderNav.find('.slick-slide').index($target.parents('.slick-active'));
                    sliderNav.slick('slickGoTo', slideNo);
                    $target.parents('.slick-active').addClass('slick-current');
                });

                // Adjust slider height for vertical layouts
            }
        }

    }
}
