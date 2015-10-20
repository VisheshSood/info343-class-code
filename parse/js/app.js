/*
    script for the index.html file
*/
Parse.initialize("dmwp0YbNIIzakWfz6pA7NuboChCiTXwK9fKXZl9R", "pdhbayJHBvHrOnEP6uViyfzF2zNmGcI37SYLnm0q");

$(function() {
    'use strict';

    //New Task class for pass
    var Task = Parse.Object.extend('Task');
    //New query that will return all tasks ordered by createAt
    var tasksQuery = new Parse.Query(Task);

    tasksQuery.ascending('createdAt');

    var tasksList = $('#tasks-list');
    //reference to the error message
    var errorMessage = $('#error-message');

    var tasks = [];

    function displayError(err) {
        errorMessage.text(err.message);
        errorMessage.fadeIn();
    }

    function clearError() {
        errorMessage.hide();
    }

    function fetchTasks() {
        tasksQuery.find().then(onData, displayError);
    }

    function onData(results) {
        tasks = results;
        renderTasks();
    }

    function renderTasks() {
        tasksList.empty();
        tasks.forEach(function(task) {
           $(document.createElement('li'))
               .text(task.get('title'))
               .appendTo(tasksList);
        });
    }

    $('#new-task-form').submit(function(evt) {
        evt.preventDefault();

        var titleInput = $(this).find('[name="title"]');

        var title = titleInput.val();

        var task = new Task();

        task.set('title', title);
        task.save().then(fetchTasks(), displayError());
        return false;
    })

    fetchTasks();
});