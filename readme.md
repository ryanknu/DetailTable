# Detail Table

A jQuery plugin and CSS file that makes searchable and sortable tables *really*
easy to make.

To use the styles, add the class `detail_table` to a `<table>` element.

To declare a column as sortable, add the `sortable` class to the `<td>` element
of the first row of the table.

To declare a column as searchable, add the `searchable` class to the `<td>`
element of the first row, and then add a `data-search="#selector"` to the
`<table>` element.

To make a column sortable by a value other than it's text, add a `data-searchval`
to it's elements with the sortable value in there.

See the demo here: https://ryanknu.github.io/DetailTable/

And the HTML source of the table here: https://github.com/ryanknu/DetailTable/blob/master/index.html#L23-L70
