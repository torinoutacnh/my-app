import Detail from "./detailNFT/Detail";
import Home from "./home/Home";

export const Endpoints: IEndpoint[] = [
    {
        name: "Home",
        path: "/",
        page: <Home />,
    },
    {
        name: "Detail",
        path: "/:id",
        page: <Detail />,
    },
    {
        name: "Home",
        path: "/a",
        page: <Home />,
    },
    {
        name: "Home",
        path: "/b",
        page: <Home />,
    },
]

interface IEndpoint {
    name: string,
    path: string,
    page: JSX.Element,
}
