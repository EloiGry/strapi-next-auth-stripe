"use client"
import { FormEvent, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import {
    Elements,
    LinkAuthenticationElement,
    PaymentElement,
    useElements,
    useStripe,
  } from "@stripe/react-stripe-js"
import { userOrderExists } from "@/actions/orders"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"

type CheckoutFormProps = {
    course: {
        id: number,
        attributes: {
          title: string,
          description: string, 
          price: number,
          slug: string
        }
    }
    clientSecret: string
  }

export function CheckoutForm ({ course, clientSecret }: CheckoutFormProps) {
    const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
  )
  console.log("im heete" ,course)
  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <div className="flex gap-4 items-center">
        <div className="aspect-video flex-shrink-0 w-1/3 relative">
          <img
            src="https://picsum.photos/300/200"
            alt="test"
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-lg">
            {course.attributes.price}€
          </div>
          <h1 className="text-2xl font-bold">{course.attributes.title}</h1>
          <div className="line-clamp-3 text-muted-foreground">
            {course.attributes.description}
          </div>
        </div>
      </div>
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <Form price={course.attributes.price} courseId={String(course.id)} />
      </Elements>
    </div>
  )
}

function Form ({
    price,
    courseId,
  }: {
    price: number
    courseId: string
  }) {
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>()
    const [email, setEmail] = useState<string>()
  
    async function handleSubmit(e: FormEvent) {
      e.preventDefault()
  
      if (stripe == null || elements == null || email == null) return
  
      setIsLoading(true)
  
      const orderExists = await userOrderExists(email, courseId)
  
      if (orderExists) {
        setErrorMessage(
          "You have already purchased this product. Try downloading it from the My Orders page"
        )
        setIsLoading(false)
        return
      }
  
      stripe
        .confirmPayment({
          elements,
          confirmParams: {
            return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
          },
        })
        .then(({ error }) => {
          if (error.type === "card_error" || error.type === "validation_error") {
            setErrorMessage(error.message)
          } else {
            setErrorMessage("An unknown error occurred")
          }
        })
        .finally(() => setIsLoading(false))
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
            {errorMessage && (
              <CardDescription className="text-destructive">
                {errorMessage}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <PaymentElement />
            <div className="mt-4">
              <LinkAuthenticationElement
                onChange={e => setEmail(e.value.email)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              size="lg"
              disabled={stripe == null || elements == null || isLoading}
            >
              {isLoading
                ? "Purchasing..."
                : `Purchase - ${price}`}
            </Button>
          </CardFooter>
        </Card>
      </form>
    )
}

