import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import Table from 'react-bootstrap/Table'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { systemAddress } from "../../transactions/instruction";
import { getWalletNFTs, getMetadataDetail } from "../../transactions/nftMetadata";
import { MetadataData } from "@metaplex-foundation/mpl-token-metadata";
import { buyBySMW, getCustomToken, smwAddress } from "../../transactions/instruction";
import { CustomToast } from "../layout/toast/Toast";

import './Detail.css'

const Detail: FC = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [metadatadata, setMetadatadata] = useState<MetadataData>();
    const [nftdata, setNftdata] = useState<any>();
    const [walletToast, setWalletToast] = useState(false);
    const [balanceToast, setBalanceToast] = useState(false);
    const [solbalanceToast, setSolBalanceToast] = useState(false);
    const connectionContext = useConnection();
    const wallets = useWallet();

    const handleBuy = async () => {
        if (!wallets.connected) {
            setWalletToast(true);
            return;
        }
        const solbalance = await connectionContext.connection.getBalance(wallets.publicKey, 'confirmed')
        if (solbalance < 0.0005 * (10 ** 9)) {
            setSolBalanceToast(true);
            return;
        }
        const balance = await getCustomToken(connectionContext.connection, smwAddress, wallets.publicKey)
        if (balance.value.uiAmount < 20) {
            setBalanceToast(true);
            return;
        }
        await buyBySMW(connectionContext, wallets, id, 20);
        navigate("/nft", { replace: true })
    }
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
                            <div style={{ borderRadius: '30px', textAlign: 'center' }}>
                                <img src={nftdata?.image} style={{ width: '47%' }} alt="nft" />
                            </div>
                            <div style={{ borderRadius: '30px', paddingTop: '30px' }}>
                                <Row md={1} >
                                    <h5 className="bg-gardient-1" style={{ fontWeight: 'bold' }}>Traits</h5>
                                    <Table striped bordered hover >
                                        <tbody>
                                            {nftdata?.attributes?.map((attribute: any, idx: number) => {
                                                return (
                                                    <tr key={idx}>
                                                        <td className="bg-gardient-2">{attribute.trait_type}</td>
                                                        <td className="bg-gardient-2">{attribute.value}</td>
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
                                <h2 className="bg-gardient-1" style={{ wordWrap: 'break-word', paddingTop: '15px', fontWeight: 'bold' }}>{nftdata?.name}</h2>
                            </Row>
                            <Row md={1}>
                                <h5 className="bg-gardient-1" style={{ paddingTop: '10px', fontWeight: 'bold' }}>Decription</h5>
                                <p className="bg-gardient-2" style={{ wordWrap: 'break-word' }}>{nftdata?.description}</p>
                            </Row>
                            <Row md={1}>
                                <h5 className="bg-gardient-1" style={{ fontWeight: 'bold' }}>Price</h5>
                                <p className="bg-gardient-2" style={{ wordWrap: 'break-word', paddingTop: '10px', fontSize: 25 }}>
                                    <b>20</b> <img src="/SMW.png" style={{ maxWidth: 50 }} alt="" />
                                </p>
                            </Row>
                            <Row md={1}>
                                <h5 className="bg-gardient-1" style={{ fontWeight: 'bold' }}>Create by</h5>
                                {metadatadata && metadatadata.data.creators.map((creator, idx) => {
                                    return (
                                        <p className="bg-gardient-2" key={idx} style={{ wordWrap: 'break-word' }}>
                                            {creator.address.substring(0, 4).concat('....').concat(creator.address.substring(creator.address.length - 4, creator.address.length))}
                                        </p>
                                    )
                                })}
                            </Row>

                            <Row md={2} style={{ paddingLeft: '15px', paddingTop: '30px' }}>
                                <Button variant="primary" className="bg-btn-primary" onClick={() => handleBuy()} >Buy</Button>
                            </Row>
                        </Col>
                        {/* <Row>
                            <Col md={6} style={{ textAlign: "center", paddingBottom: '30px' }}>
                               
                            </Col>
                        </Row> */}
                    </Row>
                    <CustomToast title="Error" message="Please connect wallet before buy" show={walletToast} setShow={setWalletToast} />
                    <CustomToast title="Error" message="Your SMW is not enough" show={balanceToast} setShow={setBalanceToast} />
                    <CustomToast title="Error" message="Your Sol is not enough" show={solbalanceToast} setShow={setSolBalanceToast} />
                </Container>}
        </div>
    )
}

export default Detail

