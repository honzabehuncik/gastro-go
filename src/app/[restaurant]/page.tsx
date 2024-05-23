import Restaurant from "@/components/restaurant/Restaurant";
import { getRestaurant } from "@/lib/db";


export default async function RestaurantPage({ params }: { params: { restaurant: string } }) {
    const restaurant = await getRestaurant(params.restaurant)

    return (
        <Restaurant restaurant={restaurant}/>
    );
}
