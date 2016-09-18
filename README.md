# Fieldspy

Most other JS form plugins that conditionally show or hide "sub-fields" can only check for either "and"
or "or", but not for both at the same time. Fieldspy is capable of checking unlimited "and/or"
conditions for "choice" type fields (i.e. select, radio & checkbox).

## jQuery

```JavaScript
$('.field-selector').fieldspy( condition, callback );
```

The fieldspy function accepts 2 parameters and is applied to the field you would like to show or hide
based on the condition given to the condition parameter. The callback parameter lets you pass a
function that handles the result of the condition. Have a look at the following example:

```JavaScript
var condition = [
    { '.other-field-selector' : 'value-to-look-for' }
];
$('.field-selector').fieldspy( condition, function(result) {
    if ( result ) {
        $(this).show();
    } else {
        $(this).hide();
    }
});
```

In the example above `$('.field-selector')` will show or hide depending if the field referenced inside
the condition is set to `value-to-look-for` or not.

### Writing Conditions

As mentioned before, Fieldspy is capable of handling multiple "and/or" conditions. You may have already
noticed in the example above that the condition variable is an array that holds an object literal. You
can pass multiple object literals to the condition array. Imagine an "or" operator between each object
and an "and" operator between all name-value pairs inside an object like so:

```JavaScript
var condition = [
    {
        '.the-checkbox' : [ 'one', 'three' ],
        // and
        '.the-checkbox-2' : 'number'
    },
    // or
    {
        '.the-select' : 'adidas',
        //and
        '.the-select-2' : 'shoe',
    },
    // or
    {
        '.the-radio' : [ 'green', 'blue' ]
        // and
        '.the-radio-2' : 'color'
    }
];
```

The example above would translate to an "if" statement that would look like this:

```JavaScript
if (
    ( $('.the-checkbox').val() === 'one' && $('.the-checkbox').val() === 'three' && $('.the-checkbox-2').val() === 'number' )
    ||
    ( $('.the-select').val() === 'adidas' && $('.the-select-2').val() === 'shoe' )
    ||
    ( $('.the-radio').val() === 'green' && $('.the-radio').val() === 'blue' && $('.the-radio-2').val() === 'color' )
) {
    // do stuff
}
```

## JSON Translations

Because Fieldspy deals with object literals in it's conditions, JSON can help translate conditions
that are written in other languages. Here is PHP example:

```PHP
$condition = array(
    array(
        '.the-checkbox' => array('one','three'),
        // and
        '.the-checkbox-2' => 'number'
    ),
    // or
    array(
        '.the-select' => 'adidas',
        //and
        '.the-select-2' => 'shoe',
    ),
    // or
    array(
        '.the-radio' => array('green','blue'),
        // and
        '.the-radio-2' => 'color'
    )
);

$condition = json_encode( $condition );
?>
<script>
$('.field-selector').fieldspy( <?php echo $condition; ?>, function(result) {
    if ( result ) {
        $(this).show();
    } else {
        $(this).hide();
    }
});
</script>
<?php
```
