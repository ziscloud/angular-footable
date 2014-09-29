angular-footable
================

This is the directive to allow the use of JQuery footable plugin (http://fooplugins.com/plugins/footable-jquery/) in angular.

Installation
------------

```shell
bower install angular-footable
```

Usage
-----
#### inject into angular
```javascript
angular
    .module('angular-footable-example', [
        'ui.footable'
    ])
```
#### activate the plugin via directive
```html
<table class="table footable">
```
#### sorting
  there is no new configuration add in this module, to enable sorting feature, you only need to follow the setup of the footable
  * include footable.sort.js in your app
```html
<script type="text/javascript" src="footable/js/footable.sort.js"></script>
```
  * configure in the table header
```html
<thead>
  <tr>
      <th data-type="numeric" data-sort-initial="true">
          ID
      </th>
      <th>
          First Name
      </th>
      <th data-sort-ignore="true">
          Last Name
      </th>
      <th data-hide="phone,tablet">
          Job Title
      </th>
      <th data-type="numeric" data-hide="phone,tablet">
          DOB
      </th>
      <th data-hide="phone">
          Status
      </th>
  </tr>
</thead>
```
#### filtering data
  * include footable.filter.js
```html
<script type="text/javascript" src="footable/js/footable.filter.js"></script>
```
  * basic filter
```html
<input id="filter" type="text"/>
<table class="table footable" data-filter="#filter">
```
  * custom filter
    * in the view
    ```html
    <select class="filter-status" ng-model='filter.status' ng-change="filterByStatus()">
      <option></option>
      <option value="active">Active</option>
      <option value="disabled">Disabled</option>
      <option value="suspended">Suspended</option>
    </select>
    <a href="#clear" class="clear-filter" title="clear filter" ng-click="clearFilter()">[clear]</a>
    <table class="table footable" data-before-filtering="filteringEventHandler">
    ```
    * in the controller
    ```javascript
    .controller('exampleCtrl', function($scope) {
          $scope.clearFilter = function() {
              $('.filter-status').val('');
              $('.footable').trigger('footable_clear_filter');
          };
    
          $scope.filteringEventHandler = function(e) {
              var selected = $('.filter-status').find(':selected').text();
              if (selected && selected.length > 0) {
                  e.filter += (e.filter && e.filter.length > 0) ? ' ' + selected : selected;
                  e.clear = !e.filter;
              }
          };
    
          $scope.filterByStatus = function() {
              $('.footable').trigger('footable_filter', {
                  filter: $('#filter').val()
              });
          };
    
          $scope.filter = {
              status: null
          };
      })
    ```
#### paginating
  paginate table is very easy, follow the demo page of footable is enough
  * load foot.paginate.js into your app
```html
<script type="text/javascript" src="footable/js/footable.paginate.js"></script>
```
  * configure the page size on the table element
```html
<table class="table footable" data-page-size="5">
```
  * add the pagination bar in the table foot
```html
<tfoot class="hide-if-no-paging">
<tr>
<td colspan="6" align="center">
  <ul class="pagination"></ul>
</td>
</tr>
</tfoot>
```

License
-------
angular-slimscroll is released under the [MIT License](http://en.wikipedia.org/wiki/MIT_License). Feel free to use it in personal and commercial projects.
