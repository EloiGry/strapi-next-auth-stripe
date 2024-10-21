
import { loadStripe } from "@stripe/stripe-js";
import { getUserMeLoader } from "@/services/get-user";
import { getStrapiURL } from "@/lib/utils";
import { getCourses } from "@/lib/loaders";
import { Button } from "../ui/button";

export default async function Checkout () {
    const data = await getUserMeLoader()
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
  const token = process.env.NEXT_PUBLIC_STRAPI_ORDER
  const courses = await getCourses()


  const stripePromise = loadStripe(
    key
  );

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const user = data.data
    try {
      if (stripe) {

        const res = await fetch(getStrapiURL() + "/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ courses, user }),
        });
        const session = await res.json();
      await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      }
    } catch {
      console.log("error")
    }
    
  }
    return (
        <Button onClick={handlePayment}> achat </Button>
    )
}