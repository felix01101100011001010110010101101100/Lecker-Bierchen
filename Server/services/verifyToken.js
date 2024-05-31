// Middleware zum Überprüfen des JWT und Extrahieren des Benutzers
function verifyToken(req, res, next) {

    let token;
    // Token aus dem Authorization-Header extrahieren
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        token = authHeader.split(' ')[1];
        // Token kann jetzt richtig verwendet werden sonst ist da noch anderes zeug dran
    } else {
        // Der Token is dann undefined und das wird unten behandelt
    }
    if (typeof token !== 'undefined') {
        // Token überprüfen
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                // Fehler bei der Überprüfung des Tokens
                console.log(fehler);
                res.redirect('../public/html/index.html');
            } else {
                // Token ist gültig, fügen Sie den decodierten Benutzer dem Anfrageobjekt hinzu
                req.user = decoded;
                next();
            }
        });
    } else {
        // Token nicht vorhanden
        res.status(401).json({ message: 'Token fehlt' });
    }
}


module.exports = verifyToken;