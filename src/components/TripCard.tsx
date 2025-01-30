// "use client";

// import { getTrips } from "@/actions/trips.action";
// import { useUser } from "@clerk/nextjs";
// import { useState } from "react";

// type Trips = Awaited<ReturnType<typeof getTrips>>;
// type Trip = Trips["trips"][number];
// const TripCard = ({trip, dbUserId}: {trip: Trip, dbUserId: string | null}) => {
//   const { user } = useUser();
//   const [newComment, setNewComment] = useState("");
//   const [isCommenting, setIsCommenting] = useState(false);
//   const [isLiking, setIsLiking] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [hasLiked, setHasLiked] = useState(trip.likes.some((like) => like.userId === dbUserId));
//   const [optimisticLikes, setOptmisticLikes] = useState(trip._count.likes);
//   const [showComments, setShowComments] = useState(false);

//     const handleLike = async () => {
//       if (isLiking) return;
//       try {
//         setIsLiking(true);
//         setHasLiked((prev) => !prev);
//         setOptmisticLikes((prev) => prev + (hasLiked ? -1 : 1));
//         await toggleLike(trip.id);
//       } catch (error) {
//         setOptmisticLikes(trip._count.likes);
//         setHasLiked(trip.likes.some((like) => like.userId === dbUserId));
//       } finally {
//         setIsLiking(false);
//       }
//     };
//   return (
//     <div>TripCard</div>
//   )
// }

// export default TripCard
