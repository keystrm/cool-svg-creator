# Simple Grid SVG Creation Package

This package is used to create simple grid SVGs in Node.js. There are two methods to create animated SVGs using this package:

1. **Using an Express Server:** 
   - Run the application with the command: `node app.js`
   - Send a request to generate the SVG: `http://localhost:3000/generate-svg`

2. **Direct SVG Generation:**
   - Directly generate the SVG using the command: `node generate-svg.js`

```bash
# Start the server
node app.js

# Request SVG generation
curl http://localhost:3000/generate-svg

# Direct SVG generation
node generate-svg.js
```