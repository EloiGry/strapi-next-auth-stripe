import Stripe from "stripe"
import { notFound } from "next/navigation"
import { getCourseById } from "@/lib/loaders"

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string)

export default async function SuccessPage({
    searchParams,
  }: {
    searchParams: { payment_intent: string }
  }) {
    const paymentIntent = await stripe.paymentIntents.retrieve(
        searchParams.payment_intent
      )
      if (paymentIntent.metadata.courseId == null) return notFound()
    
    //   const course = await db.product.findUnique({
    //     where: { id: paymentIntent.metadata.courseId },
    //   })
    const course = await getCourseById(paymentIntent.metadata.courseId)
      if (course.data.length < 1) return notFound()
    
      const isSuccess = paymentIntent.status === "succeeded"
    return (
        <h1 className="text-4xl font-bold">
        {isSuccess ? "Success!" : "Error!"}
      </h1>
    )
  }