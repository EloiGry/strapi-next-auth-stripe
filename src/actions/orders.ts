"use server"
import { fetchAPI } from "@/lib/fetch-api"
import { getStrapiURL } from "@/lib/utils";


export async function userOrderExists(email: string, courseId: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/orders`;
    const urlParamsObject = {filters: {user: { email }, course: {id: Number(courseId)}}}
    const options = {headers: {Authorization: `Bearer ${token}`}};
    const isOrderExist = await fetchAPI(path, urlParamsObject, options)

  return (
    isOrderExist.data.length > 0
  )
}

export async function createOrder(userId: number, courseId: number) {
  const token = process.env.STRAPI_ORDER;
  const payload = {
    data: {
      user : userId,
      course :  courseId
    }
  }
  try {
    const response = await fetch(getStrapiURL() + "/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...payload }),
    });
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
  // charge.billing_details.email
  // Number(charge.metadata.courseId)
}



// succeed {
//     id: 'ch_3PORRNJLkdWEwICI14nbNi8h',
//     object: 'charge',
//     amount: 19900,
//     amount_captured: 19900,
//     amount_refunded: 0,
//     application: null,
//     application_fee: null,
//     application_fee_amount: null,
//     balance_transaction: null,
//     billing_details: {
//       address: {
//         city: null,
//         country: 'AR',
//         line1: null,
//         line2: null,
//         postal_code: null,
//         state: null
//       },
//       email: 'goki@gmail.com',
//       name: null,
//       phone: null
//     },
//     calculated_statement_descriptor: 'Stripe',
//     captured: true,
//     created: 1717623437,
//     currency: 'usd',
//     customer: null,
//     description: null,
//     destination: null,
//     dispute: null,
//     disputed: false,
//     failure_balance_transaction: null,
//     failure_code: null,
//     failure_message: null,
//     fraud_details: {},
//     invoice: null,
//     livemode: false,
//     metadata: { courseId: '1' },
//     on_behalf_of: null,
//     order: null,
//     outcome: {
//       network_status: 'approved_by_network',
//       reason: null,
//       risk_level: 'normal',
//       risk_score: 54,
//       seller_message: 'Payment complete.',
//       type: 'authorized'
//     },
//     paid: true,
//     payment_intent: 'pi_3PORRNJLkdWEwICI170sv2sm',
//     payment_method: 'pm_1PORWDJLkdWEwICIKlWfvtqM',
//     payment_method_details: {
//       card: {
//         amount_authorized: 19900,
//         brand: 'visa',
//         checks: [Object],
//         country: 'US',
//         exp_month: 12,
//         exp_year: 2025,
//         extended_authorization: [Object],
//         fingerprint: '5bYdBjENeZmhiSna',
//         funding: 'credit',
//         incremental_authorization: [Object],
//         installments: null,
//         last4: '4242',
//         mandate: null,
//         multicapture: [Object],
//         network: 'visa',
//         network_token: [Object],
//         overcapture: [Object],
//         three_d_secure: null,
//         wallet: null
//       },
//       type: 'card'
//     },
//     radar_options: {},
//     receipt_email: null,
//     receipt_number: null,
//     receipt_url: 'https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xS1FxVkNKTGtkV0V3SUNJKI61g7MGMgaGRAwtYvc6LBZEo0X_WCivC-U81q7s8qWY2wmaq-fSCahh1VqXAeARomXKWoiYA4ayWsAb',
//     refunded: false,
//     refunds: {
//       object: 'list',
//       data: [],
//       has_more: false,
//       total_count: 0,
//       url: '/v1/charges/ch_3PORRNJLkdWEwICI14nbNi8h/refunds'
//     },
//     review: null,
//     shipping: null,
//     source: null,
//     source_transfer: null,
//     statement_descriptor: null,
//     statement_descriptor_suffix: null,
//     status: 'succeeded',
//     transfer_data: null,
//     transfer_group: null
//   }
