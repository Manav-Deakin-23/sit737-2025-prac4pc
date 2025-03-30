# sit737-2025-prac4pc
 
Overview
A Node.js/Express microservice designed to perform various arithmetic operations, including addition, subtraction, multiplication, division, exponentiation, modulo, and square root calculations. This project enhances the calculator microservice by incorporating advanced error handling mechanisms and logging capabilities.

Features
Arithmetic Operations:

Addition

Subtraction

Multiplication

Division

Exponentiation

Modulo

Square Root

Error Handling:

Custom error classes for different scenarios

Structured error responses with HTTP status codes

Logging:

Winston logging with JSON format

Separate logs for errors and combined events

Installation
Clone the repository:
git clone https://github.com/yourusername/sit737-2025-prac4c.git
Navigate to the project directory:

cd sit737-2025-prac4c
Install dependencies:

npm install
Start the service:

npm run dev
API Endpoints
Arithmetic Operations
Endpoint: /operation

Method: GET

Parameters: num1, num2 (query parameters)

Supported Operations: add, subtract, multiply, divide, exponent, modulo

Square Root
Endpoint: /sqrt/number

Method: GET

Parameter: number (path parameter)

Example Requests
Exponentiation:

http://localhost:3000/exponent?num1=2&num2=3
Square Root:

http://localhost:3000/sqrt/25
Error Handling
Common Error Responses:

json
{
  "error": {
    "message": "Invalid input format",
    "status": 400
  }
}
Error Codes:

Status Code	Error Type	Resolution
400	Invalid input format	Check parameter data types
400	Division by zero	Ensure divisor ≠ 0
400	Negative sqrt input	Provide non-negative numbers
500	Internal server error	Check server logs
