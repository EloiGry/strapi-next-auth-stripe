

import { getUserMeLoader } from "@/services/get-user";
import { LogoutButton } from "@/components/custom/logoutButton";
import { getCourses } from "@/lib/loaders";
import Video from "@/components/custom/video";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createOrder, userOrderExists } from "@/actions/orders";

export default async function Home() {
  const data = await getUserMeLoader()
  const courses = await getCourses()

  // const test = await userOrderExists("eloi.grychta@gmail.com" , 1)


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data.ok && <LogoutButton/>}
      <div className="h-full w-1/3">
        <Video url={courses.data[0].attributes.url_video_description}/>
        <p> {courses.data[0].attributes.price}€ </p> 
        <Link href={`/courses/${courses.data[0].attributes.slug}/purchase`}> Acheter </Link>
        <Button onClick={() => createOrder(7, 1)}> </Button>
      </div>
    </main>
  );
}
