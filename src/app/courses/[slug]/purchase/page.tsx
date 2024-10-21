import Stripe from "stripe"
import { getCourse } from "@/lib/loaders"
import { notFound } from "next/navigation"
import { CheckoutForm } from "./_components/CheckoutForm"

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string)

export default async function PurchasePage ({
    params: { slug },
  }: {
    params: { slug: string }
  }) {
    const courseData = await getCourse(slug)
    const course = courseData.data[0]
    console.log(course)
    if (course == null) return notFound()

    const paymentIntent = await stripe.paymentIntents.create({
        amount: course.attributes.price * 100,
        currency: "USD",
        metadata: { courseId: String(course.id)},
    })

    if (paymentIntent.client_secret == null) {
        throw Error("Stripe failed to create payment intent")
    }
    return (
        <CheckoutForm
      course={course}
      clientSecret={paymentIntent.client_secret}
    />
    )
}