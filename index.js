const express = require('express');
const winston = require('winston');
const app = express();
const PORT = process.env.PORT || 3000;

// Enhanced logger configuration
const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

app.use(express.json());

// Enhanced calculator function with new operations
const calculate = (operation, num1, num2) => {
    const operations = {
        add: () => num1 + num2,
        subtract: () => num1 - num2,
        multiply: () => num1 * num2,
        divide: () => num2 !== 0 ? num1 / num2 : 'Division by zero',
        exponent: () => Math.pow(num1, num2),
        modulo: () => num2 !== 0 ? num1 % num2 : 'Division by zero'
    };
    return operations[operation] ? operations[operation]() : 'Invalid operation';
};

// Unified error handler middleware
const errorHandler = (err, req, res, next) => {
    logger.error(`${err.status || 500} - ${err.message}`);
    res.status(err.status || 500).json({
        error: {
            message: err.message,
            status: err.status
        }
    });
};

// Enhanced routes with parameter validation
app.get('/:operation', (req, res, next) => {
    try {
        const { operation } = req.params;
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);

        if (isNaN(num1) || isNaN(num2)) {
            throw new Error('Invalid numerical inputs');
        }

        const result = calculate(operation, num1, num2);
        
        if (typeof result === 'string' && result.includes('Division by zero')) {
            throw new Error(result);
        }

        logger.info(`${operation} operation: ${num1} ${operation} ${num2} = ${result}`);
        res.json({ operation, num1, num2, result });

    } catch (error) {
        error.status = 400;
        next(error);
    }
});

// New square root endpoint
app.get('/sqrt/:num', (req, res, next) => {
    try {
        const num = parseFloat(req.params.num);
        
        if (isNaN(num)) {
            throw new Error('Invalid numerical input');
        }
        
        if (num < 0) {
            throw new Error('Negative number input');
        }

        const result = Math.sqrt(num);
        logger.info(`sqrt operation: √${num} = ${result}`);
        res.json({ operation: 'sqrt', num, result });

    } catch (error) {
        error.status = 400;
        next(error);
    }
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Enhanced calculator service running on port ${PORT}`);
    logger.info(`Server initialized on port ${PORT}`);
});
