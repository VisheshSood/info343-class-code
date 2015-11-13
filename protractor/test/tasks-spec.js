/* Test script for the Tasks List app */
describe ('the tasks app', function () {
    var taskTitleInp = element(by.model('newTask.title'));
    var addTaskBtn = element(by.buttonText('Add Task'));
    var tasksList = element.all(by.repeater('task in tasks'));

    beforeEach(function() {
        browser.get('http://localhost:8000');    
    })
    it('must have the proper page title', function () {
        expect(browser.getTitle()).toEqual('My Tasks');
    });

    it('must add a task', function() {
        var test = 'Learn protractor';
        taskTitleInp.sendKeys(test);
        addTaskBtn.click();
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual(test);
    });

    it('must add a task hitting enter', function () {
        var test = 'Learn protractor';
        taskTitleInp.sendKeys(test);
        taskTitleInp.sendKeys(protractor.Key.ENTER);
        expect(tasksList.count()).toEqual(1);
        expect(tasksList.get(0).getText()).toEqual(test);
    })
});