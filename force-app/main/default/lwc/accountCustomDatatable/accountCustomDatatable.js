import { LightningElement, wire } from 'lwc';
import getAccList from '@salesforce/apex/AccountController.getAccountList';

const COLS = [
    { 
        label: 'Name', 
        fieldName: 'AccountName', 
        type: 'url',
        typeAttributes: {label: {fieldName: 'Name'}, target:'_self'}
    },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Type', fieldName: 'Type'},
];

export default class AccountCustomDatatable extends LightningElement {
    columns = COLS;
    availableAccounts;
    error;

    @wire(getAccList)
    wiredAccount( { error, data } ) {

        if ( data ) {

            let tempRecs = [];
            data.forEach( ( record ) => {
                let tempRec = Object.assign( {}, record );  
                tempRec.AccountName = '/' + tempRec.Id;
                tempRecs.push( tempRec );
                
            });
            this.availableAccounts = tempRecs;
            this.error = undefined;

        } else if ( error ) {

            this.error = error;
            this.availableAccounts = undefined;

        }

    }
}