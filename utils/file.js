const fs = require('fs').promises;
const path = require('path');

const readData = async function(fileName) {
    try {
        const filePath = path.join(__dirname, '..', 'data', fileName);
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') return [];
        throw new Error(`Error reading file: ${err.message}`);
    }
};

const writeData = async function(fileName, data) {
    try {
        const filePath = path.join(__dirname, '..', 'data', fileName);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        throw new Error (`Error writing file: ${err.message}`);
    }
};

module.exports = {readData, writeData};