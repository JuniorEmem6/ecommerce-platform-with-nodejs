module.exports = generateOrder = (req, res) => {
    res.send(`Welcome authenticated user ${req.session.email}`)
}