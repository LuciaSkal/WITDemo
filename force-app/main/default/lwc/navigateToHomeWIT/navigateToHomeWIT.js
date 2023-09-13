import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class NavigateToHomeWIT extends NavigationMixin(LightningElement) {
    navigateToHomeWIT() {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'Home_WIT'
            }
        });
    }
}