const statusMessage = {
    '200': 'Done',
    '201': 'Created',
    '400': 'Invalid format',
    '500': 'Internal error'
}

exports.success = (req, res, message, status)=>{
    res.status(status || 200).send({
        error: '',
        body: message
    });
}

exports.error = (req, res, message, status)=>{
    res.status(status || 500).send({
        error: message,
        body: ''
    });
}