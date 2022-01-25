import React, { FC, useEffect, useState } from "react";
import * as web3 from "@solana/web3.js";
import * as metadata from "@metaplex-foundation/mpl-token-metadata";
import { CardGroup, Card, Button, Row } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { ConnectionContextState, useConnection, WalletContextState } from "@solana/wallet-adapter-react";
import { WalletContext, ConnectionContext } from "@solana/wallet-adapter-react";

import { getWalletNFTs, getMetadataDetail } from '../../transactions/nftMetadata'
import { buyBySFT } from "../../transactions/instruction";

import "./Home.css";

const marketAddress = process.env.REACT_APP_NFT_ADDRESS || "";

const NFTCard = (metadatadata: metadata.MetadataData) => {
    const [nftdata, setNFTData] = useState<any>({});
    useEffect(() => {
        getMetadataDetail(metadatadata).then((data) => { setNFTData(data); })
    }, [metadatadata]);
    return (
        <ConnectionContext.Consumer>
            {endpoint => (
                <WalletContext.Consumer>
                    {wallets => (
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={nftdata.image} />
                            <Card.Body>
                                <Card.Title>{nftdata.name}</Card.Title>
                                {/* <Card.Subtitle>Symbol : {nftdata.symbol}</Card.Subtitle> */}
                                <Card.Subtitle>Price : 20 SMW</Card.Subtitle>
                                {metadatadata.collection &&
                                    <Card.Text>
                                        Collection : {metadatadata.collection}
                                    </Card.Text>
                                }
                                <Card.Text>
                                    Description : {nftdata.description}
                                </Card.Text>
                                {/* {nftdata.attributes?.map((attribute: any, idx: number) => {
                                    return (
                                        <Card.Subtitle key={idx}>
                                            {attribute.trait_type} : {attribute.value}
                                        </Card.Subtitle>
                                    )
                                })} */}
                                <div style={{ marginTop: 20, textAlign: 'center' }}>
                                    <Button variant="primary"
                                        onClick={() => buyBySFT(endpoint, wallets, metadatadata.mint, 20)}
                                    >
                                        <i className="fa fa-create"></i>
                                        Buy
                                    </Button>
                                    <Button variant="warning" style={{ marginLeft: 10, color: '#BAB2B5' }}>
                                        <Link to={"/detail/".concat(metadatadata.mint)} className="link-none">Detail</Link>
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    )}
                </WalletContext.Consumer>
            )}
        </ConnectionContext.Consumer>
    )
}

const Home: FC = () => {
    const [metadatas, setMetadatas] = useState<metadata.MetadataData[]>([]);
    const connection = useConnection().connection;
    useEffect(() => {
        const pubkey = new web3.PublicKey(marketAddress);
        getWalletNFTs(connection, pubkey).then((data) => setMetadatas(data));
    }, [connection]);
    return (
        <div>
            <h1>Collections</h1>
            <CardGroup>
                <Row md={3} className="g-4">
                    {metadatas.map((data, idx) => (
                        <NFTCard {...data} key={idx} />
                    ))}
                </Row>
            </CardGroup>
        </div>
    )
}

export default Home
// sample metadata
// const data = {
//     "data": {
//         "name": "Yoga Clothes",
//         "symbol": "Elegrent",
//         "description": "\nComfortable",
//         "seller_fee_basis_points": 1000,
//         "image": "https://www.arweave.net/yGzTQcjxzW4Ht2IqgmTxU1DiEAln4zzTgB7ok31dhV8?ext=png",
//         "attributes": [
//             {
//                 "trait_type": "Size",
//                 "value": "XL",
//                 "display_type": ""
//             }
//         ],
//         "external_url": "",
//         "properties": {
//             "files": [
//                 {
//                     "uri": "https://www.arweave.net/yGzTQcjxzW4Ht2IqgmTxU1DiEAln4zzTgB7ok31dhV8?ext=png",
//                     "type": "image/png"
//                 }
//             ],
//             "category": "image",
//             "creators": [
//                 {
//                     "address": "6FVxrqH9FFtEFo643pYx8w5GqfYRS8uWA5hZMUn1VNFr",
//                     "share": 100
//                 }
//             ]
//         }
//     },
//     "status": 200,
//     "statusText": "",
//     "headers": {
//         "content-length": "509",
//         "content-type": "application/json; charset=utf-8"
//     },
//     "config": {
//         "url": "https://arweave.net/Ba2KmyOBsE_jkspbLFlmGBEBy5EyaVe-YQUGeGH4_5c",
//         "method": "get",
//         "headers": {
//             "Accept": "application/json, text/plain, */*"
//         },
//         "transformRequest": [
//             null
//         ],
//         "transformResponse": [
//             null
//         ],
//         "timeout": 0,
//         "xsrfCookieName": "XSRF-TOKEN",
//         "xsrfHeaderName": "X-XSRF-TOKEN",
//         "maxContentLength": -1,
//         "maxBodyLength": -1,
//         "transitional": {
//             "silentJSONParsing": true,
//             "forcedJSONParsing": true,
//             "clarifyTimeoutError": false
//         }
//     },
//     "request": {}
// }
