@isTest
public with sharing class ContactControllerTest {
    public static void createContacts(Integer amount) {
        List<Contact> contacts = new List<Contact>();

        for (Integer i = 1; i <= amount; i++) {
            contacts.add(
                new Contact(
                    FirstName = 'First ' + i,
                    LastName = 'Last ' + i
                )
            );
        }

        insert contacts;   
    }

    
    @isTest
    static void getContactList() {
        ContactControllerTest.createContacts(6);

        Test.startTest();
        List<Contact> conts = ContactController.getContactList();
        Test.stopTest();

        Assert.areEqual(6, conts.size(), 'The contacts retrieved by search should be 6.'
        );
    }


}