import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import Table from 'react-bootstrap/Table'
import { Container, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { systemAddress } from "../../transactions/instruction";
import { getWalletNFTs, getMetadataDetail } from "../../transactions/nftMetadata";
import { MetadataData } from "@metaplex-foundation/mpl-token-metadata";
import { buyBySFT } from "../../transactions/instruction";

import './Detail.css'

const Detail: FC = () => {
    let { id } = useParams();
    const [metadatadata, setMetadatadata] = useState<MetadataData>();
    const [nftdata, setNftdata] = useState<any>();
    const connectionContext = useConnection();
    const wallets = useWallet();
    useEffect(() => {
        getWalletNFTs(connectionContext.connection, systemAddress.publicKey).then(data => {
            let filter = data.filter(filtdata => filtdata.mint === id);
            if (filter.length !== 0) {
                setMetadatadata(filter[0]);
                getMetadataDetail(filter[0]).then(finaldata => setNftdata(finaldata));
            }
        })
    }, [id, connectionContext.connection])
    return (
        <div>
            {metadatadata && nftdata && <Container fluid>
                <Row>
                    <Col md={6}>
                        <img src={nftdata?.image} alt="nft" style={{ maxWidth: '300px' }} />
                    </Col>
                    <Col md={6}>
                        <h2>Create by</h2>
                        {metadatadata && metadatadata.data.creators.map((creator, idx) => {
                            return (
                                <p key={idx} style={{ wordWrap: 'break-word' }}>{creator.address}</p>
                            )
                        })}
                        <Row md={1}>
                            <h5 style={{ wordWrap: 'break-word' }}>{nftdata?.name}</h5>
                        </Row>
                        <Row md={1}>
                            <h5>Decription</h5>
                            <p style={{ wordWrap: 'break-word' }}>{nftdata?.description}</p>
                        </Row>
                        <Row md={1} >
                            <h5>Traits</h5>
                            <Table >
                                <tbody>
                                    {nftdata?.attributes?.map((attribute: any, idx: number) => {
                                        return (
                                            <tr key={idx}>
                                                <th>{attribute.trait_type}</th>
                                                <th>{attribute.value}</th>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Row>
                    </Col>

                </Row>
                <Row>
                    <Col md={6}>
                        <Button style={{ width: '100%' }} onClick={() => buyBySFT(connectionContext, wallets, id, 20)} >Buy</Button>
                    </Col>
                </Row>
            </Container>}
        </div>
    )
}

export default Detail

