# Fieldspy

Fieldspy lets you show or hide fields based on other fields current value.

#### Features

- Easy to setup
- Only requires jQuery
- Can handle multiple conditions at once
- Use on unlimited fields

## Enqueue Scripts

```HTML
<script src="jquery.js"></script>
<script src="jquery.fieldspy.min.js"></script>
```

## jQuery

```JavaScript
jQuery.fn.fieldspy( condition, callback );
```

The jQuery fieldspy function accepts 2 parameters and is applied to the field you would like to show
or hide based on the condition given to the condition parameter. The callback parameter lets you pass
a function that handles the result of the condition. Have a look at the following example:

```JavaScript
var condition = [
    { '.other-field-selector' : 'value-to-look-for' }
];
$('.field-selector').fieldspy( condition, function(result) {
    $(this).toggle(result);
});
```

In the example above, the `result` parameter of the callback function is a boolean and
`$('.field-selector')` will show or hide if `value-to-look-for` is the current value of
`.other-field-selector`. The condition must always be an array containing object literals.

### Writing Conditions

Fieldspy is capable of handling multiple "and/or" conditions simultaneously. However, Fieldspy currently
only works for "choice" field types (i.e. select, radio & checkbox). You may have already noticed that in the
example above the condition variable is an array that holds an object literal. You can pass multiple
object literals to the condition array and than simply imagine an "or" operator between each object
and an "and" operator between all name-value pairs. Have a look at the example below:

```JavaScript
var condition = [
    {
        '.the-checkbox' : [ 'one', 'three' ],
        // and
        '.the-checkbox-2' : 'number',
    },
    // or
    {
        '.the-select' : 'adidas',
        //and
        '.the-select-2' : 'shoe',
    },
    // or
    {
        '.the-radio' : [ 'green', 'blue' ],
        // and
        '.the-radio-2' : 'color',
    }
];
```

Value arrays (i.e. `[ 'one', 'three' ]` & `[ 'green', 'blue' ]`) inside an object are shorthand "and"
operators. With that in mind, the example above would translate to an "if" statement that would look
like this:

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
that are written in other languages. Here is an example written in PHP:

```PHP
$condition = array(
    array(
        '.the-checkbox' => array('one','three'),
        // and
        '.the-checkbox-2' => 'number',
    ),
    // or
    array(
        '.the-select' => 'adidas',
        // and
        '.the-select-2' => 'shoe',
    ),
    // or
    array(
        '.the-radio' => array('green','blue'),
        // and
        '.the-radio-2' => 'color',
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

## CSS

Fieldspy does not handle any CSS on your behalf. However, there is no need to hide your fields
initially via CSS yourself. When the DOM is ready, Fieldspy will fire once to set the inital state of
your fields via the callbacks you chose to apply.

## Roadmap

- Passing conditions via HTML5 `data-fieldspy-condition` attribute.
- Passign animation callbacks as keywords via HTML5 `data-fieldspy-callback` attribute.
- Ability to check text & number input values.
- Ability to pass a single object literal as a condition.
- Creation of an HTML document showing examples.
