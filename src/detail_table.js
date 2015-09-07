;(function ($, window, document, undefined)
{
    "use strict";
    
    var pluginName = "ZDetailTable";
    
    $.fn[ pluginName ] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this ) );
            }
        });
    };
    
    var sort = function() {
        var index = $(this).closest('td').index();
        var direction = $(this).is('.sort_desc') ? 'desc' : 'asc';
        
        var $table = $(this).closest('.detail_table');
        var $rows = $table.find('tr:not(:first-child)');
        $rows.sort(function(a, b) {
            var $sort_cell_a = $($(a).children()[index]);
            var $sort_cell_b = $($(b).children()[index]);
            
            var va = $sort_cell_a.data('sortval') || $sort_cell_a.text();
            var vb = $sort_cell_b.data('sortval') || $sort_cell_b.text();
            
            if ( va < vb ) {
                return direction === 'desc' ? 1 : -1;
            }
            if ( vb < va ) {
                return direction === 'asc' ? 1 : -1;
            }
            
            return 0;
        });
        
        $table.find('.sort_asc,.sort_desc').removeClass('active');
        $($table.find('tr:first-child').children()[index]).find('.sort_' + direction).addClass('active');
        $rows.detach().appendTo($table);
        
        // This line moves all hidden rows to the end of the table, which
        // causes even-odd coloring to work correctly
        $('.filtered_out').detach().appendTo($table);
    };
    
    var doSearch = function() {
        var $table = $(this).data('table');
        var $rows = $table.find('tr:not(:first-child)');
        var v = $(this).val().toLowerCase();
        
        var searchable_indexes = [];
        $table.find('tr:first-child td.searchable').each(function() {
            searchable_indexes.push($(this).index());
        });
        
        $rows.each(function() {
            var i = 0;
            var matches = 0;
            var _v;
            for ( i = 0; i < searchable_indexes.length; i++ ) {
                var _v = $($(this).children()[searchable_indexes[i]]).text().toLowerCase();
                if ( _v.indexOf(v) > -1 ) {
                    matches ++;
                }
            }
            if ( v.length > 0 && matches < 1 ) {
                $(this).addClass('filtered_out');
            }
            else {
                $(this).removeClass('filtered_out');
            }
        });
        
        // This line moves all hidden rows to the end of the table, which
        // causes even-odd coloring to work correctly
        $('.filtered_out').detach().appendTo($table);
    }
    
    function Plugin ( element, options )
    {
        var search = $(element).data('search');
        
        if ( search ) {
            if ( !$(search).is('input[type=text]') ) {
                alert('Search element is not a text input');
            }
            
            $(search).data('table', $(element));
            $(search).on('keyup', doSearch);
        }
        
        // initializes detail table to be sortable on columns that have
        // td.sortable in the first row.
        $(element).find('tr:first-child td.sortable').each(function() {
            // append sort controls
            var sort_asc = $('<a>').addClass('sort sort_asc');
            var sort_desc = $('<a>').addClass('sort sort_desc');
            
            sort_asc.on('click', sort);
            sort_desc.on('click', sort);
            
            $(this).append(sort_asc);
            $(this).append(sort_desc);
            
            if ( $(this).data('default-sort') ) {
                $(this).find('.sort_' + $(this).data('default-sort')).trigger('click');
            }
        })
    }
    
})(jQuery, window, document);
