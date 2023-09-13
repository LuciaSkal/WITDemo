public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        List<Contact> conID = [SELECT Id FROM Contact WITH USER_MODE LIMIT 10];
        List<Contact> conList = new List<Contact>();
        conList = [SELECT Id, Name, Title, Phone, Email FROM Contact WHERE Id= :conID WITH USER_MODE];
        System.debug('Contact list  is: ' + conList);
        return conList;
    }
}