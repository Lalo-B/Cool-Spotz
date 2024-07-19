import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from "./components/Navigation/Navigation.jsx";
import { restoreUser } from './store/session.js';
import Spots from './components/Spots/Spots.jsx';
import SpotDetails from "./components/SpotDetails/SpotDetails.jsx";
import AddSpot from "./components/AddSpot/AddSpot.jsx";
import ManageSpots from "./components/ManageSpots/ManageSpots.jsx";
import EditSpot from "./components/EditSpot/EditSpot.jsx";


const Layout = () => {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);
  return (
    <>
      <Navigation isLoaded={isLoaded}/>
      {isLoaded && <Outlet />}
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Spots />
      },{
        path: '/spots/:spotId',
        element: <SpotDetails />
      },{
        path: '/reviews',
        element: <h1>reviews</h1>
      },{
        path: '/newSpot',
        element: <AddSpot />
      },{
        path:'/manage',
        element: <ManageSpots />
      },{
        path: '/edit-spot',
        element: <EditSpot/>
      }
    ]
  }
])
function App() {
  return (
    <RouterProvider router={router} />
  );
}

/*
const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginFormPage/>,
    loader: async,
    action: action
  }
])
// LOADER
export async function tweetLoader() {
  const response = await fetch("/api/tweets");
  if (response.ok) {
    const data = await response.json();
    return data;
  }
}

// ACTION
export async function createTweet({ request }) {
  let formData = await request.formData();
  let data = Object.fromEntries(formData);

  let intent = formData.get("intent");

  // if the intent is delete, delete the tweet
  if (intent === "delete") {
    const response = await fetch(`/api/tweets/${data.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return { message: "Successfully deleted" };
    }
    // if there was an error deleting the tweet, I could handle it here
    // return { message: "Error deleting tweet" };
  }

  // if the intent is not delete, create a new tweet
  const response = await fetch(`/api/tweets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const tweet = await response.json();

    return tweet;
  }
  // if there was an error creating the tweet, I could handle it here
  // return { message: "Error creating tweet" };
}
*/

export default App;
