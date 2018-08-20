function processData(input) {
    var commandsArray = input.split('\n')
    var data = {};
    var dependencies;
    // define a function to update dependencies that is called when processing depends and supports
    var updateDependencies = function (system, deps) {
    	// add key to object if it doesn't already exist and add dependencies sub-object
    	if(!data[system]) {
    		data[system] = {
                dependencies: {},
                installed: false
            };
    	}
    	//loop through dependencies adding to the dependencies array for this system
    	deps.forEach(function(dep) {
            // get the dependencies of the dependency being added for this system
            var check = getDependencies(dep)
            // if the dependency being added depends on the system it's being added to, reject that processing
            if (system in check) {
                console.log(dep + ' depends on ' + system + '. Ignoring command.')
            }
            // otherwise add the dependency
            else {
                data[system].dependencies[dep] = true;
            }
    	});
    };
    // define a function to return dependencies that is called when processing install and remove
    var getDependencies = function (system) {
    	return (data[system]) ? data[system].dependencies : {};
    };
    // define a function to update the installed status of a system - accepts true/false value to apply to system status
    var updateSystemStatus = function (system, bool) {
    	if(!data[system]) {
    		data[system] = {
                dependencies: {},
                installed: false
            };
    	}
        var action = (bool) ? 'Installing ' : 'Removing ';
        console.log(action + system);
    	data[system].installed = bool;
    }
    // loop through commands processing data
    commandsArray.forEach(function(command) {
        // split on any number of whitespaces to handle extra spaces in input
    	var commandArray = command.split(/\s+/);
    	var commandName = commandArray[0];
        var system = commandArray[1];
        // always echo the command before attempting any processing
        console.log(command);
    	// switch based on first word of command
    	switch(commandName) {
    		case 'DEPENDS':
    			dependencies = commandArray.slice(2);
    			updateDependencies(system, dependencies);
	    		break;
    		case 'SUPPORTS':
                // set system to 3rd array index in case of supports (which is like a reverse of the depends command)
    			system = commandArray[2];
    			dependencies = commandArray.slice(1,2);
				updateDependencies(system, dependencies);
    			break;
    		case 'INSTALL':
    			dependencies = getDependencies(system);
    			// install uninstalled dependencies
    			for (var dep in dependencies) {
                    if (!data[dep] || !data[dep].installed) {
                        updateSystemStatus(dep, true);
                    }
    			}
    			// install system
    			updateSystemStatus(system, true);
    			break;
    		case 'REMOVE':
                var remove = true;
    			dependencies = getDependencies(system);
                // reject removing the system if it is not currently installed
                if (!system in data || !data[system].installed) {
                    console.log(system + ' is not installed.')
                    // set remove flag to false so system is not removed
                    remove = false;
                }
                else {
                    for (var sys in data) {
                        // reject removing the system if a dependendant system is still installed
                        if (data[sys].installed && system in data[sys].dependencies) {
                            console.log(system + ' is still needed.');
                            // set remove flag to false so system is not removed
                            remove = false;
                            break;
                        }
                    }
                }
                // finally remove the system and it's dependencies if the remove flag is still true
                if (remove) {
                    // remove the system
                    updateSystemStatus(system, false);
                    // and loop through removing it's dependencies if they are still installed
                    for (var depToRmv in dependencies) {
                        if (data[depToRmv].installed) {
                            updateSystemStatus(depToRmv, false);
                        }
                    }
                }
                break;
    		case 'STOP':
                return;
    			break;
    		case 'LIST': 
    			var installedItems = [];
    			for (var x in data) {
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
processData('DEPENDS   IRC    TCPIP   NIC\nSUPPORTS   NIC     TCPIP\nDEPENDS     TCPIP   IRC\nDEPENDS  SCP   TCPIP    NIC\nDEPENDS   BROWSER   TCPIP         HTML\nSUPPORTS   TCPIP  TELNET\nINSTALL      NIC\nINSTALL   TELNET\nINSTALL     Xyz\nREMOVE    NIC\nINSTALL    BROWSER\nINSTALL         SCP\nLIST\nREMOVE   TELNET\nREMOVE  NIC\nREMOVE   SCP\nINSTALL     NIC\nREMOVE   TCPIP\nREMOVE   IRC\nREMOVE BROWSER\nREMOVE TCPIP\nLIST\nSTOP');