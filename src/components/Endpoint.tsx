import NFT from "./aboutNFT/NFT";
import Detail from "./detailNFT/Detail";
import Home from "./home/Home";

export const Endpoints: IEndpoint[] = [
    {
        name: "Home",
        path: "/",
        page: <Home />,
        isNav: true,
    },
    {
        name: "Home",
        path: "/detail/:id",
        page: <Detail />,
        isNav: false,
    },
    {
        name: "NFT",
        path: "/nft",
        page: <NFT />,
        isNav: true,
    },
]

interface IEndpoint {
    name: string,
    path: string,
    page: JSX.Element,
    isNav: boolean,
}
