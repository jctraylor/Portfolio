function processData(input) {
    var commandsArray = input.split('\n')
    var data = {};
    var system;
    var dependencies;
    // define a function to update dependencies that is called when processing depends and supports
    var updateDependencies = function (system, deps) {
    	// add key to object if it doesn't already exist and add dependencies sub-object
    	if(!data[system]) {
    		data[system] = {}
    		data[system].dependencies = [];
    	}
    	//loop through dependencies adding to the dependencies array for this system
    	deps.forEach(function(dep) {
    		data[system].dependencies.push(dep);
    	});
    };
    // define a function to return dependencies that is called when processing install and remove
    var getDependencies = function (system) {
    	return data[system].dependencies;
    };
    // define a function to update the installed status of a system - accepts true/false value to apply to system status
    var updateSystemStatus = function (system, bool) {
    	if(!data[system]) {
    		data[system] = {};
    	}
    	data[system].installed = bool;
    }
    // loop through commands processing data
    commandsArray.forEach(function(command) {
    	var commandArray = command.split(' ');
    	var commandName = commandArray[0];
    	// switch based on first word of command
    	switch(commandName) {
    		case 'DEPENDS':
    			system = commandArray[1];
    			dependencies = commandArray.slice(2);
    			updateDependencies(system, dependencies);
	    		console.log(command);
	    		break;
    		case 'SUPPORTS':
    			system = commandArray[2];
    			dependencies = commandArray.slice(1,2);
				updateDependencies(system, dependencies);
    			console.log(command);
    			break;
    		case 'INSTALL':
    			system = commandArray[1];
    			dependencies = getDependencies(system);
    			// install dependencies
    			dependencies.forEach(function(dep) {
    				updateSystemStatus(dep, true);
    			});
    			// install system
    			updateSystemStatus(system, true);
    			break;
    		case 'REMOVE':
    			system = commandArray[1];
    			dependencies = getDependencies(system);
    			updateSystemStatus(system, false);
    		case 'STOP':
    			console.log(command);
    			break;
    		case 'LIST': 
    			console.log(command);
    			var installedItems = [];
    			for (x in data) {
    				if (data[x].installed) {
    					installedItems.push(x);
    				}
    			}
    			console.log(installedItems.sort().toString().replace(/,/g,'\n'));
    			break;
    		default:
    			console.log('COMMAND NOT RECOGNIZED: ' + command);
    			break;
    	}
    });
} 
processData('DEPENDS IRC TCPIP NIC\nSUPPORTS NIC TCPIP\nINSTALL IRC\nREMOVE TCPIP\nLIST\nSTOP');