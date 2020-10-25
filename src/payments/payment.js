import React, { Component } from 'react';
import stripe from 'tipsi-stripe';
import { doPayment } from './api';

stripe.setOptions({
    publishableKey: 'pk_test_9y1fBZMIdEzt1Gu5AQPzCrJ2',
});

export default class Payment extends Component {
    requestPayment = () => {
        this.setState({ isPaymentPending: true });
        return stripe
            .paymentRequestWithCardForm()
            .then(stripeTokenInfo => {
                return doPayment(100, stripeTokenInfo.tokenId);
            })
            .then(() => {
                console.warn('Payment succeeded!');
            })
            .catch(error => {
                console.warn('Payment failed', { error });
            })
            .finally(() => {
                this.setState({ isPaymentPending: false });
            });
    };
    // render() {
    //     return (
    //         <View style={styles.container}>
    //             <Button
    //                 title="Make a payment"
    //                 onPress={this.requestPayment}
    //                 disabled={this.state.isPaymentPending}
    //             />
    //         </View>
    //     );
    // }
}
// const styles = {
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// };