import PageManager from './page-manager';
import haloYoutubeCarousel from './halothemes/haloYoutubeVideo';

export default class Home extends PageManager {
    onReady() {
    	this.initHomeMainCarousel();
    }

    initHomeMainCarousel() {
        if(this.context.hasMainCarousel) {
            haloYoutubeCarousel($('.heroCarousel-wrapper'));
        }
    }
}
