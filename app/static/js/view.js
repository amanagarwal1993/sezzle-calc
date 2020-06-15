var view = {
    
    /* 
        Initialize the view (called by controller)
        1. Sets up elements
        2. Adds event listeners to all buttons
    */
    init: function() {
        
        $('#display > p').text('0');
        
        $('.key--decimal, .key--num').on('click', function() {
            var input = $(this).text();
            controller.press_num(input);
        });
        
        $('.key--operator').on('click', function() {
            var input = $(this).text();
            
            if ($(this).attr('id') == 'multiply')
                input = '*';
            
            controller.press_operator(input);
        });
        
        
        $('#clear').on('click', function() {
            controller.press_clear();
            $('#display > *').remove();
            $('#display').append('<p>0</p>');
        });
        
        $('.key--equal').on('click', function() {
            controller.calculate();    
        });
    },
    
    show_disconnect: function() {
        $('.key--equal').css('background-image', 'linear-gradient(rgb(216, 204, 204), rgb(212, 211, 211))');
        $('#display').css('background-color', '#d5d3ed');
        $('.flash').text('Trying to connect...');
    },
    
    show_connection: function(results) {
        $('.key--equal').css('background-image', 'linear-gradient(to bottom, #fe886a, #ff7033)');
        $('#display').css('background-color', '#a3f0ff');
        $('.flash').text('Connected to server!');
        
        view.refresh_log(results);
    },
    
    // When a user begins to type a new number
    start_row: function(num) {
        $('#display > p:last-child').text(num);
        $('#display').css('background-color: #a3f0ff;')
    },
    
    // When user is continuing the same number
    append_num: function(num) {
        var current = $('#display > p:last-child').text();
        $('#display > p:last-child').text(current + num);
    },
    
    // When user presses an operation key
    append_ops: function(input) {
        if (input == '*')
            input = '&times;';
        $('#display > *').remove();
        $('#display').append('<p class="display-op">' + input + '</p>');
    },
    
    // When user presses a number key after an operation key
    append_row: function(input) {
        $('#display > *').remove();
        $('#display').append('<p>' + input + '</p>');
    },
    
    // Upon connection, the view updates list of previous calculations
    refresh_log: function(results) {
        $('#log-box > *').remove();
        results.forEach(view.append_log);
    },
    
    // Shows the calculated result in the display
    update_result: function(result) {
        $('#display > *').remove();
        $('#display').append('<p>' + result + '</p>');
    },
    
    // Function to add new result in the previous calculations log
    append_log: function(msg) {
        $('#log-box').prepend('<p><span style="color: black;">Query:</span> ' + msg.query + ' <span style="color: black;">Result:</span> ' + msg.answer + '</p>');
    },
    
    // If a user submits and invalid expression
    show_error: function(error) {
        //$('#error').show();
        $('#error').text(error);
        view.update_result('ERROR');
    },
    
    // If user submits valid expression after invalid one
    remove_error: function() {
        $('#error').text('');
    }
};