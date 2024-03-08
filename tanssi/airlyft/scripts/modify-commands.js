const fs = require('fs');

const filePath = 'commands.json';
const newChainId = 'YOUR_CHAIN_ID';

// Read the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    // Parse the JSON data
    const json = JSON.parse(data);
    
    // Check if the "process:prod" command exists
    if (json.commands && json.commands['process:prod']) {
      // Append the chain ID to the command name
      const modifiedCommandName = `process:prod:${newChainId}`;
      
      // Update the command object with the new name
      json.commands[modifiedCommandName] = json.commands['process:prod'];
      delete json.commands['process:prod']; // Remove the old command
      
      // Write the modified JSON back to the file
      fs.writeFile(filePath, JSON.stringify(json, null, 2), (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return;
        }
        console.log('JSON file has been modified successfully.');
      });
    } else {
      console.error('Command "process:prod" not found in the JSON file.');
    }
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
});
