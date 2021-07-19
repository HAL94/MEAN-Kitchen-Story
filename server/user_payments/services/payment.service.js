const Payment = require('../user_payment.schema');
const ErrorHandler = require('../../_utils/handle-error');

exports.addPaymentDetails = async (req, res, next) => {
    try {
        const cardHolderName = req.body.cardHolderName;
        const cardNumber = req.body.cardNumber;
        const cardExpiration = req.body.cardExpiration;
        const ccv = req.body.ccv;

        const address = req.body.address;
        const locale = req.body.locale;
        const city = req.body.city;
        const postalCode = req.body.postalCode;
        const country = req.body.country;

        const userPayment = new Payment({
            user: req.user._id,
            cardHolderName: cardHolderName,
            cardNumber: cardNumber,
            cardExpiration: cardExpiration,
            ccv: ccv,
            address: address,
            locale: locale,
            city: city,
            postalCode: postalCode,
            country: country
        });
 
        const savedUserPayment = await userPayment.save();
        
        return res.status(200).json({
            result: true
        });
        
        // return res.status(200).json({
        //     userId: savedUserPayment.user,
        //     cardHolderName: cardHolderName,
        //     cardNumber: cardNumber,
        //     cardExpiration: cardExpiration,
        //     ccv: ccv,
        //     address: savedUserPayment.address,
        //     locale: savedUserPayment.locale,
        //     city: savedUserPayment.city,
        //     postalCode: savedUserPayment.postalCode,
        //     country: savedUserPayment.country
        // });

    } catch (error) {
        ErrorHandler.handleError(error, req, res, next);
    }
}