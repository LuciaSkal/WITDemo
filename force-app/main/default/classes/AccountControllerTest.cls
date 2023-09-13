@isTest
public class AccountControllerTest {
    public static List<Account> createAccounts(Integer amount) {
        List<Account> accounts = new List<Account>();

        for (Integer i = 1; i <= amount; i++) {
            accounts.add(new Account(Name = 'Name ' + i));
        }

        insert accounts;
        return accounts;
    }

    @isTest
    static void getAccountList() {
        AccountControllerTest.createAccounts(5);

        Test.startTest();
        List<Account> accts = AccountController.getAccountList();
        Test.stopTest();

        Assert.areEqual(5, accts.size(), 'List is empty');
    }
}