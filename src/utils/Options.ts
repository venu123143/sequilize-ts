export const swagOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "sample api sequlize documentation",
            version: '1.0.0',
            description: "this is the description page for the sagger pages.",
            contact: {  
                name: "Coding Expert",
                url: "https://venugopalportfolioweb.onrender.com",
                email: "venugopal.v@ahex.co.in"
            }
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ]
    },
    apis: ["./src/routes/*.ts"]
}