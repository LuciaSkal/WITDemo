public with sharing class AccountController {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        List<Account> accID = [SELECT Id FROM Account WITH USER_MODE LIMIT 10];
        List<Account> accsList = new List<Account>();
        accsList = [SELECT Id, Name, Phone, Type FROM Account WHERE Id= :accID WITH USER_MODE];
        System.debug('AccsList is: ' + accsList);
        return accsList;
    }
}