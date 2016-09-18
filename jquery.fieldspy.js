/**
 * Fieldspy jQuery Plugin v1.0
 * https://github.com/marclarr/fieldspy/
 *
 * @license
 * Copyright 2016 Marc Wiest (https://marcwiest.com)
 * Released under the MIT license
 */

(function($) {

    $.fn.fieldspy = function( condition, callback ) {

        var target = this,
            fields = getSelectors();

        if ( ! fields ) {
            return;
        }

        /**
         * Establish the initial value.
         */
        $(fields).ready( function() {

            var endResult = evalCondition( condition );

            // feed the endResult and "this" back to the callee
            callback.apply( target, [endResult] );

        });

        /**
         * Watch fields for changes.
         */
        $(fields).change( function() {

            var endResult = evalCondition( condition );

            // feed the endResult and "this" back to the callee
            callback.apply( target, [endResult] );

        });

        /**
         * Evaluate Condition
         *
         * @return    boolean    True if the condition passes, false otherwise.
         */
        function evalCondition( condition ) {

            var results = {},
                endResult = false;

            // fill results object with the results of each && group
            $.each( condition, function( i, group ) {

                var groupId = "g"+i;
                results[ groupId ] = true;

                $.each( group, function( field, reqVal ) {

                    if ( $.type(reqVal) === "string" ) {
                        reqVal = [ reqVal ];
                    }

                    // var reqVal = condition.value,
                    var curVal = getFieldValue( field ),
                        isMatch = compareValues( curVal, reqVal );

                    // If only 1 field fails, the whole group returns false.
                    // This simulates the && operator's behavior.
                    if ( isMatch === false ) {
                        results[ groupId ] = false;
                    }

                });

            });

            // test the results object and set endResult to true or false
            $.each( results, function( id, result ) {

                // If any group is true, the endResult returns true.
                // This simulates the || operator's behavior.
                if ( result === true ) {
                    endResult = true;
                }

            });

            return endResult;
        }

        /**
         * Get Selectors String
         *
         * This function compiles a string of all conditional fields selectors.
         *
         * @return    string    All conditional fields selectors.
         */
        function getSelectors() {

            var selectors = '',
                max = condition.length,
                temp = [];

            for ( var i = 0; i < max; i++ ) {
                for ( var selector in condition[i] ) {

                    if ( $.inArray( selector, temp ) === -1 ) {

                        temp.push( selector );
                        var comma = (selectors === '') ? '' : ', ';
                        selectors += comma + selector;

                    }

                }
            }

            return selectors;
        }

        /**
         * Get Field Value
         *
         * Filters the field type and gets its value.
         *
         * @return    array    The field's current value.
         */
        function getFieldValue( field ) {

            var curVal = [];

            $(field).each( function( i, elem ) {

                var $elem = $(elem),
                    isCheckbox = $elem.is('input:checkbox'),
                    isRadio = $elem.is('input:radio'),
                    isSelect = $elem.is('select');

                if ( isCheckbox || isRadio ) {

                    if ( $elem.is(':checked') ) {
                        curVal.push( $elem.val() );
                    }

                } else if ( isSelect ) {

                    curVal.push( $elem.val() );

                }

            });

            return curVal;
        }

        /**
         * Compare Values
         *
         * Compares the current value to the required value.
         *
         * @return    bool    Returns true if all required values exist.
         */
        function compareValues( curVal, reqVal ) {

            // if any one reqVal does not exist, match fails
            var match = true;
            $.each( reqVal, function( i, val ) {

                if ( $.inArray( val, curVal ) === -1 ) {
                    match = false;
                }

            });

            return match;
        }

    };

})( jQuery );
