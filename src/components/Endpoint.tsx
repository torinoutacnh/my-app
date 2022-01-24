import NFT from "./aboutNFT/Nft";
import Home from "./home/Home";

export const Endpoints: IEndpoint[] = [
    {
        name: "Home",
        path: "/",
        page: <Home />,
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
