const express = require('express');
const contactRouter = express.Router();
const transporter = require('../../config/email.config');

contactRouter.get('/', (req, res) => {
    res.render('layouts/contact', {
        title: "Découvrez tous nos contacts."
    });
});

contactRouter.post('/', async (req, res) => {
    const { email, titre, avis } = req.body;

    const mailOptions = {
        from: process.env.USER_EMAIL, 
        replyTo: email, 
        to: 'chumpo@hotmail.fr', 
        subject: titre,
        text: `Ce mail vous a été envoyer par ${email}: ${avis}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.render('layouts/contact', {
            title: "Contactez nous",
            message: "Votre message a été envoyé avec succès."
        });
    } catch (err) {
        console.error(err);
        res.render('layouts/contact', {
            title: "Contactez nous",
            message: "Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer plus tard."
        });
    }
});

module.exports = contactRouter;
