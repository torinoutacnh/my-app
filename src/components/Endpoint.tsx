import NFT from "./aboutNFT/nft";
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
        name: "NFT",
        path: "/nft",
        page: <NFT />,
    },
]

interface IEndpoint {
    name: string,
    path: string,
    page: JSX.Element,
}
