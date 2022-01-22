import React, { FC, useEffect, useState } from "react";
import * as web3 from "@solana/web3.js";
import * as metadata from "@metaplex-foundation/mpl-token-metadata";
import { CardGroup, Card, Button, Row, Col } from "react-bootstrap";
import { ConnectionContextState, useConnection, WalletContextState } from "@solana/wallet-adapter-react";
import { WalletContext, ConnectionContext } from "@solana/wallet-adapter-react";

import { getWalletNFTs, getMetadataDetail } from '../../transactions/nftMetadata'
import { transferTokenInstruction, sftAddress, smwAddress, systemAddress, makeTransaction } from "../../transactions/instruction";

const marketAddress = process.env.REACT_APP_NFT_ADDRESS || "";

const handleBuy = async (endpoint: ConnectionContextState, wallets: WalletContextState, tokenmint: string) => {
    const instruction: web3.TransactionInstruction[] = [];

    const mintPubkey = new web3.PublicKey(tokenmint);
    const transferNFT = await transferTokenInstruction(systemAddress.publicKey, wallets.publicKey, endpoint.connection, mintPubkey, 0);
    instruction.push(...transferNFT);
    const transferSFT = await transferTokenInstruction(wallets.publicKey, systemAddress.publicKey, endpoint.connection, sftAddress, 20);
    instruction.push(...transferSFT);

    await makeTransaction(wallets, endpoint.connection, instruction, true);
}

const NFTCard = (metadatadata: metadata.MetadataData) => {
    const [nftdata, setNFTData] = useState<any>({});
    useEffect(() => {
        getMetadataDetail(metadatadata).then((data) => { setNFTData(data); console.log(data) })
    }, [metadatadata]);
    return (
        <ConnectionContext.Consumer>
            {endpoint => (
                <WalletContext.Consumer>
                    {wallets => (
                        <Card style={{ width: '18rem', height: '28.6rem' }}>
                            {/* {console.log(metadatadata)} */}
                            <Card.Img variant="top" src={nftdata.image} />
                            <Card.Body>
                                <Card.Title>{nftdata.name}</Card.Title>
                                <Card.Subtitle>{nftdata.symbol}</Card.Subtitle>
                                <Card.Text>
                                    {nftdata.description}
                                </Card.Text>
                                {nftdata.attributes?.map((attribute: any, idx: number) => {
                                    return (
                                        <Card.Subtitle key={idx}>
                                            {attribute.trait_type} : {attribute.value}
                                        </Card.Subtitle>
                                    )
                                })}
                                <Button variant="primary"
                                    onClick={() => handleBuy(endpoint, wallets, metadatadata.mint)}
                                >
                                    Buy
                                </Button>
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
            <h1>Home page</h1>
            <CardGroup>
                <Row xs={1} md={2} className="g-4">
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
