/*jshint globalstrict:true */
/*global angular:true */
'use strict';
define(
    ["angular", "elastic-angular-client", "elastic"], function(angular, elasticAngularClient) {

        // angular.module('myServices', ['elasticjs.services','dangle'])
        var services = {};
        //map injection
        services.esQueryServiceFactory = function(ejsResource) {
            var _service = {};

            var ejs = ejsResource('http://localhost:9000/query');
            var index = 'user1';
            var type = 'bib';

            _service.queryES = function(queryString, fieldsToReturn, resultCb) {
                var query = ejs.QueryStringQuery(queryString);

                /* execute the request */
                var r = ejs.Request()
                    .indices(index)
                    .types(type)
                    .fields(fieldsToReturn)
                    .query(query);
                /* a function to display results */

                var callbackWrapper = function(results) {
                    resultCb(results.hits.hits);
                }

                r.doSearch(callbackWrapper);

            };

            return _service;
        }

        return services;


    });