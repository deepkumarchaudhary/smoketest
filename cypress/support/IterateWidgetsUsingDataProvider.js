import * as Collections from 'typescript-collections';
let setWidgetTypes = new Collections.Set();
let arrWidgetTypes = new Array();
let arrFinalWidgetTypes = new Array();

// var widget = require('../../fixtures/Widgets.js');
 var using = require('jasmine-data-provider');



// This class is to fetch the list of widgets and randomzize them to be stored in array
export default class IterateWidgetsUsingDataProvider {

    //ReadFileFromJson(JsonReadFromTest) {
        ReadFileFromJson() {

        // parse the raw data into meaningful JSON format
        //let widgets = JsonReadFromTest;
        var widgets = require('../fixtures/Widgets');
        using(widgets.WidgetsType, function(data){
            console.log("data " + data);
        })

       // console.log("widgets json" + widgets);


        let widgetsTypeValue = widgets["WidgetsType"];
        let strWidgetTypeName = "";
       

        console.log("List of widget types");
        for (var i = 0; i < widgetsTypeValue.length; i++) {
            var widgetTypeVal = widgetsTypeValue[i];
            console.log(widgetTypeVal.name);
            setWidgetTypes.add(widgetTypeVal.name);

        }

        this.storeValuesFromSetsInArray();
        this.shuffleValuesInArray();
        this.applyConditionalLogicToArray();
        return this.getFinalArray();


    }



    storeValuesFromSetsInArray() {

        let WidgetTypelen = setWidgetTypes.size;

        var i = 0;

        setWidgetTypes.forEach(function display(value) {
            arrWidgetTypes.push(value);
            console.log("arrWidgetTypes value: " + value);
            i++;
        });

    }


    shuffleValuesInArray() {
        arrWidgetTypes = this.shuffle(arrWidgetTypes);
        console.log("shuffle In WidgetTypes : " + arrWidgetTypes);
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
            // console.log('temporaryValue::'+temporaryValue);
        }
        return array;
    }

    applyConditionalLogicToArray() {

        console.log('Storing shuffled values in array after applying condition as 0 or 1:');

        var i = 0;
        for (var widgetType in arrWidgetTypes) {
            if (Math.round(Math.random()) == 1) {
                console.log("\n\Widget Types: ");
                console.log(arrWidgetTypes[widgetType]);
                arrFinalWidgetTypes[i] = arrWidgetTypes[widgetType];
                i++;
            }
        }

    }

    getFinalArray() {
        console.log("Length of array is " + arrFinalWidgetTypes.length);
        return arrFinalWidgetTypes;
    }



}

















