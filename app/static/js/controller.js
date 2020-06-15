var controller = {

    init: function() {
        controller.socket = io.connect('http://' + document.domain + ':' + location.port + '/test');
        
        view.init();
        
        model.init()
        
        controller.socket.on('calculation', function(msg) {
            model.logs.concat(msg);
            //add to view, and play a little sound!
            view.append_log(msg);
            console.log(msg);
        });
        
        controller.socket.on('result', function(msg) {
            view.update_result(msg.answer);
            view.remove_error();
        });
        
        controller.socket.on('invalid query', function(msg) {
            view.show_error(msg.response);
            model.current_calculation = '0';
            model.last_input = 'zero';
        });
        
        controller.socket.on('connection', function(msg) {
            console.log("Connected to server!");
            console.log(msg.data);
            view.show_connection(msg.data);
        });
        
        controller.socket.on('disconnect', function(msg) {
            console.log("Disconnected from server!");
            view.show_disconnect();
        });
    },
    
    press_operator: function(input) {
        if (model.last_input == 'zero' && input=="-") {
            model.current_calculation = input;
            model.last_input = 'num';
            view.start_row(input);
        }
        else {
            model.current_calculation += input;
            model.last_input = 'ops';
            view.append_ops(input);
        }
    },
    
    press_num: function(input) {
        
        if (model.last_input == 'zero') {
            model.current_calculation = input;
            view.start_row(input);
        }
        
        else if (model.last_input == 'num') {
            model.current_calculation += input;
            view.append_num(input);
        }
        
        else if (model.last_input == 'ops') {
            model.current_calculation += input;
            view.append_row(input);
        }
        
        model.last_input = 'num';
    },
    
    press_clear: function() {
        model.current_calculation = '0';
        model.last_input = 'zero';
    },
    
    calculate: function() {
        controller.socket.emit('calculate', model.current_calculation);
        model.current_calculation = '0';
        model.last_input = 'zero';
        return false;
    },
    
};

controller.init();