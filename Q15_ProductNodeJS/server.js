const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {

    // Enable CORS
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Handle GET request for products
    if (req.url === "/api/products" && req.method === "GET") {

        const filePath = path.join(__dirname, "product.json");

        fs.readFile(filePath, "utf-8", (err, data) => {

            // Error handling
            if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Result Not Found Error" }));
                return;
            }

            // Success response
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(data);
        });

    } else {
        // Handle unknown routes
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Not Found" }));
    }
});

// Start server
server.listen(3000, () => {
    console.log("Server is running on port 3000");
});