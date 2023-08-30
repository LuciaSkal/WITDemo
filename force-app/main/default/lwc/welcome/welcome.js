import { LightningElement } from 'lwc';

export default class Welcome extends LightningElement {
    name = '';

    handleChange(event) {
        this.name = event.target.value;
    }
}