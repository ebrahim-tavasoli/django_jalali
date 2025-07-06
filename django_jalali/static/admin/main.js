document.addEventListener('DOMContentLoaded', function() {
    function activateDatepicker() {
        // Find all date input fields and add the data-jdp attribute
        const dateFields = document.querySelectorAll('.vjDateField');
        dateFields.forEach(function(field) {
            const inputId = field.getAttribute('id') || '';
            // Skip template fields
            if (inputId.includes('__prefix__')) {
                return;
            }
            
            // Add the data-jdp attribute if not already present
            if (!field.hasAttribute('data-jdp')) {
                field.setAttribute('data-jdp', '');
                
                // Check if this is a datetime field or just date field
                const fieldName = field.getAttribute('name') || '';
                const hasTime = fieldName.includes('time') || field.getAttribute('class').includes('DateTime');
                
                if (!hasTime) {
                    field.setAttribute('data-jdp-only-date', '');
                }
            }
        });
        
        // Find datetime fields
        const dateTimeFields = document.querySelectorAll('input[type="text"]:not(.vjDateField)');
        dateTimeFields.forEach(function(field) {
            const inputId = field.getAttribute('id') || '';
            const fieldName = field.getAttribute('name') || '';
            
            // Skip template fields
            if (inputId.includes('__prefix__')) {
                return;
            }
            
            // Check if this looks like a datetime field
            if ((fieldName.includes('datetime') || fieldName.includes('_time')) && 
                !field.hasAttribute('data-jdp')) {
                field.setAttribute('data-jdp', '');
            }
        });
        
        // Initialize the date picker if it exists
        if (typeof jalaliDatepicker !== 'undefined') {
            jalaliDatepicker.startWatch({
                date: true,
                time: true,
                autoShow: true,
                autoHide: true,
                hideAfterChange: true,
                persianDigits: false,
                showTodayBtn: true,
                showEmptyBtn: true,
                container: 'body'
            });
        }
    }

    // Initialize date picker
    activateDatepicker();

    // Handle dynamically added forms (for admin inlines)
    document.addEventListener('formset:added', function(event) {
        setTimeout(activateDatepicker, 100);
    });

    document.addEventListener('formset:removed', function(event) {
        setTimeout(activateDatepicker, 100);
    });
    
    // Handle Django admin's dynamic form addition
    if (typeof django !== 'undefined' && django.jQuery) {
        django.jQuery(document).on('formset:added', function(event, $row, formsetName) {
            setTimeout(activateDatepicker, 100);
        });
        
        django.jQuery(document).on('formset:removed', function(event, $row, formsetName) {
            setTimeout(activateDatepicker, 100);
        });
    }
});
