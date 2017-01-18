'use strict';

// const Hawk = require('hawk/lib/browser');
var Hawk = require('./hawk');

var PawHawkDynamicValue = function () {

    this.evaluate = function (context) {

        if(['sha1', 'sha256'].indexOf(this.algorithm) < 0) {
            throw new Error('The algorithm must be either `sha1` or `sha256`');
        }

        var currentRequest = context.getCurrentRequest();

        var payload = '';
        var contentType = 'text/plain';

        if (currentRequest.body) {
            payload = currentRequest.body;
        }
        if (payload) {
            contentType = currentRequest.headers['Content-Type'];
        }

        var options = {
            credentials: {
                id: this.id || '',
                key: this.key,
                algorithm: this.algorithm
            },
            payload: payload,
            contentType: contentType
        };
        console.log('payload', options.payload);
        console.log('contentType', options.contentType);

        var header = Hawk.client.header(
            currentRequest.url,
            currentRequest.method,
            options
        );

        return header.err ? undefined : header.field;
    };

    this.title = function(context) {
        return "Hawk";
    };

    // this.text = function (context) {
    //     return 'Paw Hawk Dynamic Value';
    // };

    return this;
};

PawHawkDynamicValue.identifier = 'com.shinn.PawExtensions.PawHawkDynamicValue';
PawHawkDynamicValue.title = 'Hawk';
PawHawkDynamicValue.inputs = [
    InputField("id", "ID", "String", {
        placeholder: "Hawk key identifier"
    }),
    InputField("key", "Key", "String", {
        placeholder: "Hawk key"
    }),
    InputField("algorithm", "Algorithm", "Select", {
        choices: {
            "sha1": "SHA-1",
            "sha256": "SHA-256"
        },
        defaultValue: "sha256"
    }),
    // InputField("payload", "Payload", "String", {
    //     placeholder: "payload",
    //     defaultValue: ''
    // }),
    // InputField("contentType", "ContentType", "String", {
    //     placeholder: "content type",
    //     defaultValue: 'text/plain'
    // }),
];

registerDynamicValueClass(PawHawkDynamicValue);