import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getContactList from '@salesforce/apex/ContactController.getContactList';

const columns = [   
    { label: 'Name', fieldName: 'Name' },
    { label: 'Title', fieldName: 'Title' },
    { label: 'Phone', fieldName: 'Phone' },
    { label: 'Email', fieldName: 'Email' },
    
];
export default class DatatableContactsWithSearch extends NavigationMixin(LightningElement) {
    availableContacts;
    error;
    columns = columns;
    searchString;
    initialRecords;

    @wire( getContactList )  
    wiredContacts( { error, data } ) {
        if ( data ) {
            this.availableContacts = data;
            this.initialRecords = data;
            this.error = undefined;

        } else if ( error ) {
            this.error = error;
            this.availableContacts = undefined;

        }

    }

    handleSearchChange( event ) {
        this.searchString = event.detail.value;
        console.log( 'Updated Search String is ' + this.searchString );
    }

    handleSearch( event ) {
        const searchKey = event.target.value.toLowerCase();
        console.log( 'Search String is ' + searchKey );

        if ( searchKey ) {
            this.availableContacts = this.initialRecords;
            console.log( 'Account Records are ' + JSON.stringify( this.availableContacts ) );
            if ( this.availableContacts ) {
                let recs = [];
                for ( let rec of this.availableContacts ) {
                    console.log( 'Rec is ' + JSON.stringify( rec ) );
                    let valuesArray = Object.values( rec );
                    console.log( 'valuesArray is ' + JSON.stringify( valuesArray ) );
                    for ( let val of valuesArray ) {
                        console.log( 'val is ' + val );
                        let strVal = String( val );
                        if ( strVal ) {
                            if ( strVal.toLowerCase().includes( searchKey ) ) {
                                recs.push( rec );
                                break;
                            }
                        }
                    }
                }
                console.log( 'Matched Accounts are ' + JSON.stringify( recs ) );
                this.availableContacts = recs;
            }
 
        }  else {
            this.availableContacts = this.initialRecords;
        }        
    }

    navigateToList() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'list'
            },
        });
    }
}