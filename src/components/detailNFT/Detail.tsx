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
            {metadatadata && nftdata &&
                <Container fluid style={{ marginTop: '30px' }}>
                    <Row>
                        <Col md={6}>
                            <div style={{ borderRadius: '30px' }}>
                                <img src={nftdata?.image} alt="nft" className="imgfix" />
                            </div>
                            <div style={{ borderRadius: '30px', paddingTop: '30px' }}>
                                <Row md={1} >
                                    <h5 style={{ fontWeight: 'bold' }}>Traits</h5>
                                    <Table striped bordered hover >
                                        <tbody>
                                            {nftdata?.attributes?.map((attribute: any, idx: number) => {
                                                return (
                                                    <tr key={idx}>
                                                        <td>{attribute.trait_type}</td>
                                                        <td>{attribute.value}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </Row>
                            </div>

                        </Col>
                        <Col md={6}>
                            <Row md={1}>
                                <h2 style={{ wordWrap: 'break-word', paddingTop: '15px', fontWeight: 'bold' }}>{nftdata?.name}</h2>
                            </Row>
                            <Row md={1}>

                                <h5 style={{ paddingTop: '10px', fontWeight: 'bold' }}>Decription</h5>
                                <p style={{ wordWrap: 'break-word' }}>{nftdata?.description}</p>
                            </Row>
                            <Row md={1}>
                                <h5 style={{ fontWeight: 'bold' }}>Price</h5>
                                <p style={{ wordWrap: 'break-word', paddingTop: '15px' }}>{nftdata?.price} 20SFT</p>
                            </Row>
                            <Row md={1}>
                                <h5 style={{ fontWeight: 'bold' }}>Create by</h5>
                                {metadatadata && metadatadata.data.creators.map((creator, idx) => {
                                    return (
                                        <p key={idx} style={{ wordWrap: 'break-word' }}>{creator.address}</p>
                                    )
                                })}
                            </Row>
                            
                            <Row md={2} style={{ paddingLeft: '15px',paddingTop:'30px'}}>
                                <Button variant="primary" onClick={() => buyBySFT(connectionContext, wallets, id, 20)} >Buy</Button>
                            </Row>
                        </Col>
                        {/* <Row>
                            <Col md={6} style={{ textAlign: "center", paddingBottom: '30px' }}>
                               
                            </Col>
                        </Row> */}
                    </Row>

                </Container>}
        </div>
    )
}

export default Detail

